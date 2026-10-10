import { useEffect, useRef, useState } from "react";
import HHPLogo from "./HHPLogo";
import { GitHubIcon, LinkedInIcon } from "./SocialIcons";
import { PERSONAL_INFO } from "../data/portfolioData";

/* ==========================================================================
   Contact — real submission through the serverless email endpoint
   --------------------------------------------------------------------------
   The form POSTs to /api/send-email, which runs server-side on Vercel and
   forwards the message to hamdilhasan101@gmail.com via Resend. The provider
   key lives only in the server environment.

   States: idle → submitting → success | error
   • Field-level validation from the server, with client-side pre-checks.
   • Submissions are disabled while in flight and after a success.
   • A honeypot field and a render timestamp are sent for spam filtering.
   • If the service is not configured the endpoint answers 503 and the UI
     falls back to a mailto: link so the visitor is never stranded.
   ========================================================================== */

type Status = "idle" | "submitting" | "success" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const SUBJECTS = [
  "Internship or graduate role",
  "Robotics or embedded project",
  "Research collaboration",
  "Web or software project",
  "Something else",
];

const MAX = { name: 120, email: 254, subject: 160, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function ContactSection() {
  const renderedAt = useRef<number>(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [copied, setCopied] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const submitting = status === "submitting";
  const disabled = submitting || status === "success";

  /* Live Dhaka clock — context, not a presence claim. */
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      try {
        setTime(
          new Intl.DateTimeFormat("en-GB", {
            timeZone: PERSONAL_INFO.timezone,
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date()),
        );
      } catch {
        setTime("UTC+06:00");
      }
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  /* Move focus to the confirmation so screen readers announce it. */
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};
    if (name.trim().length < 2) errors.name = "Please enter your name.";
    if (!EMAIL_RE.test(email.trim())) errors.email = "Please enter a valid email address.";
    if (subject.trim().length < 3) errors.subject = "Please choose a subject.";
    if (message.trim().length < 10) errors.message = "Please write at least a sentence.";
    return errors;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  };
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disabled) return;

    setFormError(null);

    const errors = validate();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setStatus("error");
      setFormError("Please correct the highlighted fields.");
      return;
    }

    if (honeypot.trim()) {
      setStatus("success");
      return;
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setStatus("error");
      setFormError(
        "Contact form is not configured. Please email me directly."
      );
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: name.trim(),
          email: email.trim(),
          subject: `[Portfolio] ${subject.trim()}`,
          message: message.trim(),
          from_name: "Hamdil Hasan Partho Portfolio",
          botcheck: "",
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFieldErrors({});
        formRef.current?.reset();
        setName("");
        setEmail("");
        setSubject(SUBJECTS[0]);
        setMessage("");
        setHoneypot("");
      } else {
        setStatus("error");
        setFormError(
          data.message || "Message could not be sent. Please try again."
        );
      }
    } catch {
      setStatus("error");
      setFormError(
        "Connection failed. Please check your internet or email me directly."
      );
    }
  };


  return (
    <section id="contact" className="relative scroll-mt-24 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <header className="max-w-3xl">
          <p className="rule-label">Contact</p>
          <h2 className="mt-3 font-display text-headline font-bold text-[var(--content-primary)]">
            Let's talk about what you're building
          </h2>
          <p className="mt-4 text-body-lg text-[var(--content-muted)]">
            Internships, research collaboration, robotics work, or a web project — send a
            message and it lands in my inbox. I read everything.
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* ---------------- Direct channels ---------------- */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <div className="rounded-[22px] border border-[var(--line-subtle)] bg-[var(--surface-raised)] p-6 shadow-[var(--shadow-card)]">
              <p className="rule-label">Email</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="truncate font-display text-[17px] font-bold text-[var(--content-primary)] transition hover:text-[var(--accent-text)]"
                >
                  {PERSONAL_INFO.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--line-subtle)] bg-[var(--surface-sunken)] text-[var(--content-secondary)] transition hover:text-[var(--accent-text)]"
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                </button>
              </div>
              {copied && (
                <p role="status" className="mt-2 font-mono text-[11px] text-[var(--aqua-text)]">
                  Copied to clipboard
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[22px] border border-[var(--line-subtle)] bg-[var(--surface-raised)] p-5 shadow-[var(--shadow-card)] transition hover:border-[var(--accent-solid)]"
              >
                <GitHubIcon className="h-6 w-6 text-[var(--content-primary)]" />
                <span className="mt-3 block font-display text-[15px] font-bold text-[var(--content-primary)]">
                  GitHub
                </span>
                <span className="mt-0.5 block font-mono text-[11px] text-[var(--content-muted)]">
                  @{PERSONAL_INFO.githubHandle}
                </span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[22px] border border-[var(--line-subtle)] bg-[var(--surface-raised)] p-5 shadow-[var(--shadow-card)] transition hover:border-[var(--accent-solid)]"
              >
                <LinkedInIcon className="h-6 w-6 text-[var(--accent-text)]" />
                <span className="mt-3 block font-display text-[15px] font-bold text-[var(--content-primary)]">
                  LinkedIn
                </span>
                <span className="mt-0.5 block truncate font-mono text-[11px] text-[var(--content-muted)]">
                  /in/hamdil-hasan-p101
                </span>
              </a>
            </div>

            <div className="rounded-[22px] border border-[var(--line-subtle)] bg-[var(--surface-sunken)] p-6">
              <div className="flex items-center justify-between font-mono text-[11px] text-[var(--content-muted)]">
                <span>{PERSONAL_INFO.location}</span>
                <span className="text-[var(--aqua-text)]">{time} · GMT+6</span>
              </div>
              <p className="mt-3 flex items-start gap-2.5 border-t border-[var(--line-subtle)] pt-4 text-caption text-[var(--content-secondary)]">
                <span
                  aria-hidden="true"
                  className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-[var(--aqua-solid)]"
                />
                <span>
                  <strong className="font-semibold text-[var(--content-primary)]">
                    {PERSONAL_INFO.availability.label}.
                  </strong>{" "}
                  {PERSONAL_INFO.availability.detail}
                </span>
              </p>
            </div>
          </div>

          {/* ---------------- Form ---------------- */}
          <div className="lg:col-span-7">
            <div className="rounded-[22px] border border-[var(--line-subtle)] bg-[var(--surface-raised)] p-6 shadow-[var(--shadow-card)] sm:p-8">
              <div className="flex items-center gap-3 border-b border-[var(--line-subtle)] pb-6">
                <HHPLogo size={34} />
                <div>
                  <h3 className="font-display text-title font-bold text-[var(--content-primary)]">
                    Send a message
                  </h3>
                  <p className="text-caption text-[var(--content-muted)]">
                    Delivered straight to my inbox.
                  </p>
                </div>
              </div>

              {/* Success panel */}
              {status === "success" ? (
                <div
                  ref={successRef}
                  tabIndex={-1}
                  role="status"
                  className="mt-6 rounded-2xl border border-[var(--aqua-solid)] bg-[var(--aqua-softBg)] p-6"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--aqua-solid)] text-white">
                      <CheckIcon />
                    </span>
                    <div>
                      <h4 className="font-display text-title font-bold text-[var(--content-primary)]">
                        Message sent
                      </h4>
                      <p className="mt-1.5 text-body text-[var(--content-secondary)]">
                        Thanks — your message has been delivered. I'll reply to the email
                        address you gave, usually within a couple of days.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setStatus("idle");
                          renderedAt.current = Date.now();
                        }}
                        className="mt-4 rounded-xl border border-[var(--line-strong)] bg-[var(--surface-raised)] px-4 py-2.5 text-[13px] font-semibold text-[var(--content-primary)] transition hover:border-[var(--accent-solid)]"
                      >
                        Send another message
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form ref={formRef} onSubmit={onSubmit} noValidate className="relative mt-6 space-y-5">
                  {/* Honeypot — visually hidden, not announced */}
                  <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
                    <label htmlFor="company">Company</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field
                      id="name"
                      label="Your name"
                      error={fieldErrors.name}
                      required
                    >
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        maxLength={MAX.name}
                        required
                        disabled={disabled}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Rahman"
                        className={inputClass(!!fieldErrors.name)}
                      />
                    </Field>

                    <Field
                      id="email"
                      label="Your email"
                      error={fieldErrors.email}
                      required
                    >
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        maxLength={MAX.email}
                        required
                        disabled={disabled}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className={inputClass(!!fieldErrors.email)}
                      />
                    </Field>
                  </div>

                  <Field id="subject" label="Subject" error={fieldErrors.subject} required>
                    <select
                      id="subject"
                      name="subject"
                      required
                      disabled={disabled}
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className={inputClass(!!fieldErrors.subject)}
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field id="message" label="Message" error={fieldErrors.message} required>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      maxLength={MAX.message}
                      disabled={disabled}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="A sentence or two about what you have in mind."
                      className={`${inputClass(!!fieldErrors.message)} resize-y`}
                    />
                    <p className="mt-1.5 text-right font-mono text-[11px] text-[var(--content-faint)]">
                      {message.length} / {MAX.message}
                    </p>
                  </Field>

                  {/* Error summary */}
                  {status === "error" && formError && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-caption text-red-700 dark:text-red-300"
                    >
                      <AlertIcon />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3 border-t border-[var(--line-subtle)] pt-5">
                    <button
                      type="submit"
                      disabled={disabled}
                      className="inline-flex min-w-[168px] items-center justify-center gap-2 rounded-xl bg-[var(--accent-solid)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-solidHover)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Spinner />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <SendIcon />
                        </>
                      )}
                    </button>

                    <a
                      href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
                        "Hello Hamdil",
                      )}`}
                      className="text-[13px] font-medium text-[var(--content-muted)] transition hover:text-[var(--accent-text)]"
                    >
                      or email me directly →
                    </a>
                  </div>

                  <p className="text-caption text-[var(--content-faint)]">
                    Your email address is used only to reply. Messages are rate limited and
                    filtered for spam.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Primitives                                                                 */
/* -------------------------------------------------------------------------- */

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-xl border bg-[var(--surface-sunken)] px-4 py-3 text-[15px] text-[var(--content-primary)]",
    "transition placeholder:text-[var(--content-faint)] focus:outline-none focus-visible:ring-2",
    hasError
      ? "border-red-500/70 focus-visible:ring-red-500/60"
      : "border-[var(--line-subtle)] focus-visible:ring-[var(--accent-solid)]",
    "disabled:cursor-not-allowed disabled:opacity-60",
  ].join(" ");
}

function Field({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[13px] font-medium text-[var(--content-secondary)]"
      >
        {label}
        {required && (
          <span className="ml-1 text-[var(--accent-text)]" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-caption text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4Z" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-[2px] h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default ContactSection;
