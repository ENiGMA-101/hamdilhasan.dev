/* ==========================================================================
   Vercel Serverless Function — POST /api/send-email
   --------------------------------------------------------------------------
   Delivers contact-form messages to hamdilhasan101@gmail.com via Resend.

   SECURITY MODEL
   • The provider API key is read from the RESEND_API_KEY environment variable
     and is never bundled into, or referenced by, client-side code.
   • The recipient address is hard-coded. A visitor can never choose it.
   • Input is length-limited, type-checked, trimmed and sanitised on the
     server; the browser copy is only a convenience.
   • A honeypot field, a submission time floor and a per-IP rate limit reduce
     automated abuse.
   • Error responses are deliberately generic. Provider errors are logged
     server-side only and never returned to the client.

   REQUIRED ENVIRONMENT VARIABLES (set in the Vercel dashboard)
   • RESEND_API_KEY      — Resend API key (re_…)
   • RESEND_FROM_EMAIL   — verified sender, e.g. "Portfolio <noreply@yourdomain.com>"
   • CONTACT_TO_EMAIL    — recipient. Defaults to hamdilhasan101@gmail.com.
   Optional:
   • RESEND_REPLY_TO     — overrides the reply-to fallback address.

   Resend's test sender (onboarding@resend.dev) works without a domain but can
   only deliver to the address that owns the Resend account. Add and verify a
   domain to deliver to hamdilhasan101@gmail.com from your own address.
   ========================================================================== */

export const config = { runtime: "edge" };

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

const RECIPIENT = "hamdilhasan101@gmail.com";

const LIMITS = {
  name: 120,
  email: 254,
  subject: 160,
  message: 5000,
  /** Reject bodies larger than this before parsing. */
  maxBodyBytes: 32 * 1024,
};

/** Reject anything submitted faster than this — bots fill forms instantly. */
const MIN_FILL_MS = 2500;

/** Per-IP submission budget. */
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  /** Honeypot — must stay empty. */
  company?: string;
  /** Timestamp the form was rendered, for the time-floor check. */
  renderedAt?: number;
}

type VercelRequest = Request & {
  ip?: string;
  headers: Headers;
};

/* -------------------------------------------------------------------------- */
/* Rate limiting (edge instances are short-lived; this is best-effort)        */
/* -------------------------------------------------------------------------- */

const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  list.push(now);
  hits.set(key, list);
  // Keep the map from growing without bound inside one instance.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t > RATE_LIMIT.windowMs)) hits.delete(k);
    }
  }
  return list.length > RATE_LIMIT.max;
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}

/** Strip control characters and collapse runaway whitespace. */
function sanitize(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(CONTROL_CHARS, "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

/** Header values are CRLF-injected into email headers if not cleaned. */
function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function clientIp(req: VercelRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.ip ?? "unknown";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* -------------------------------------------------------------------------- */
/* Handler                                                                    */
/* -------------------------------------------------------------------------- */

export default async function handler(req: VercelRequest): Promise<Response> {
  if (req.method !== "POST") {
    return json({ ok: false, error: "Method not allowed." }, 405);
  }

  /* ---- configuration guard (never leak which variable is missing) -------- */
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || RECIPIENT;

  if (!apiKey || !from) {
    // 503, not 500: the deployment is reachable but not configured.
    console.error("[send-email] Missing RESEND_API_KEY or RESEND_FROM_EMAIL.");
    return json(
      {
        ok: false,
        error:
          "The contact service isn't configured yet. Please email hamdilhasan101@gmail.com directly.",
      },
      503,
    );
  }

  /* ---- body size guard --------------------------------------------------- */
  const declared = Number(req.headers.get("content-length") ?? "0");
  if (declared > LIMITS.maxBodyBytes) {
    return json({ ok: false, error: "Message is too large." }, 413);
  }

  /* ---- parse ------------------------------------------------------------- */
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ ok: false, error: "Invalid request body." }, 400);
  }

  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) {
    return json({ ok: false, error: "Invalid request body." }, 400);
  }

  const body = raw as Partial<ContactPayload> & Record<string, unknown>;

  /* ---- honeypot ---------------------------------------------------------- */
  if (typeof body.company === "string" && body.company.trim() !== "") {
    // Pretend to succeed so bots don't learn they were caught.
    return json({ ok: true, id: "filtered" }, 200);
  }

  /* ---- time floor -------------------------------------------------------- */
  const renderedAt = typeof body.renderedAt === "number" ? body.renderedAt : 0;
  if (renderedAt && Date.now() - renderedAt < MIN_FILL_MS) {
    return json(
      { ok: false, error: "That was too fast — please take a moment and resend." },
      400,
    );
  }

  /* ---- validate & sanitise ----------------------------------------------- */
  const name = sanitize(body.name, LIMITS.name);
  const email = sanitize(body.email, LIMITS.email).toLowerCase();
  const subject = headerSafe(sanitize(body.subject, LIMITS.subject));
  const message = sanitize(body.message, LIMITS.message);

  const fieldErrors: Record<string, string> = {};
  if (name.length < 2) fieldErrors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Please enter a valid email address.";
  if (subject.length < 3) fieldErrors.subject = "Please add a subject.";
  if (message.length < 10) fieldErrors.message = "Please write at least a sentence.";

  if (Object.keys(fieldErrors).length > 0) {
    return json({ ok: false, error: "Please check the form.", fields: fieldErrors }, 422);
  }

  /* ---- rate limit -------------------------------------------------------- */
  if (rateLimited(clientIp(req))) {
    return json(
      { ok: false, error: "Too many messages sent. Please try again later." },
      429,
    );
  }

  /* ---- build the email --------------------------------------------------- */
  const replyTo = email; // validated above
  const fullSubject = `[Portfolio] ${subject}`;

  const text = [
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Subject: ${subject}`,
    "",
    "Message:",
    message,
    "",
    "—",
    "Sent from hamdilhasan.dev contact form",
  ].join("\n");

  const html = `
<div style="font-family:Inter,Helvetica,Arial,sans-serif;line-height:1.6;color:#111827">
  <h2 style="margin:0 0 4px;font-size:17px">New message from your portfolio</h2>
  <p style="margin:0 0 20px;color:#6b7280;font-size:13px">hamdilhasan.dev contact form</p>
  <table cellpadding="0" cellspacing="0" style="font-size:14px;border-collapse:collapse">
    <tr><td style="padding:4px 14px 4px 0;color:#6b7280">Name</td><td style="padding:4px 0"><strong>${escapeHtml(name)}</strong></td></tr>
    <tr><td style="padding:4px 14px 4px 0;color:#6b7280">Email</td><td style="padding:4px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
    <tr><td style="padding:4px 14px 4px 0;color:#6b7280">Subject</td><td style="padding:4px 0">${escapeHtml(subject)}</td></tr>
  </table>
  <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0" />
  <p style="margin:0;white-space:pre-wrap;font-size:14px">${escapeHtml(message)}</p>
</div>`.trim();

  /* ---- send -------------------------------------------------------------- */
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to], // hard-coded recipient
        reply_to: replyTo,
        subject: fullSubject,
        text,
        html,
      }),
    });

    if (!res.ok) {
      // Log the detail server-side; return nothing specific to the client.
      const detail = await res.text().catch(() => "");
      console.error(`[send-email] Resend returned ${res.status}: ${detail.slice(0, 500)}`);
      return json(
        {
          ok: false,
          error:
            "Your message couldn't be delivered just now. Please try again, or email hamdilhasan101@gmail.com directly.",
        },
        502,
      );
    }

    const data = (await res.json().catch(() => ({}))) as { id?: string };
    return json({ ok: true, id: data.id ?? null }, 200);
  } catch (err) {
    console.error("[send-email] Unexpected failure:", err);
    return json(
      {
        ok: false,
        error:
          "Something went wrong sending your message. Please try again, or email hamdilhasan101@gmail.com directly.",
      },
      500,
    );
  }
}
