(() => {
  "use strict";

  /* ---------- mobile nav ---------- */
  const menuBtn = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(e.target) || menuBtn.contains(e.target)) return;
      nav.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  }

  /* ---------- active nav link ---------- */
  const path = window.location.pathname.replace(/\/index\.html$/, "/");
  document.querySelectorAll(".site-nav a").forEach((link) => {
    try {
      const linkPath = new URL(link.href).pathname.replace(/\/index\.html$/, "/");
      if (linkPath === path && linkPath !== "/") {
        link.classList.add("is-active");
      } else if (linkPath === "/" && path === "/") {
        link.classList.add("is-active");
      }
    } catch (err) { /* external link, ignore */ }
  });

  /* ---------- theme toggle ---------- */
  const THEME_KEY = "hamdil-theme";
  const root = document.documentElement;
  const toggleBtn = document.querySelector(".theme-toggle");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (err) { /* storage unavailable */ }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }

  /* ---------- scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    ".post-card, .explore-card, .section-heading, .split-callout, .post-row, .archive-row"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window && revealTargets.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- back to top ---------- */
  const topBtn = document.querySelector(".back-to-top");
  if (topBtn) {
    const onScroll = () => {
      topBtn.classList.toggle("is-visible", window.scrollY > 480);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- reading progress (article pages) ---------- */
  const progressBar = document.querySelector(".reading-progress-bar");
  const articleEl = document.querySelector(".article-content");
  if (progressBar && articleEl) {
    const update = () => {
      const rect = articleEl.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      progressBar.style.width = pct + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- copy button on code blocks ---------- */
  document.querySelectorAll(".article-content pre").forEach((pre) => {
    const codeEl = pre.querySelector("code");
    if (!codeEl) return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-code-btn";
    btn.textContent = "Copy";
    btn.setAttribute("aria-label", "Copy code to clipboard");

    btn.addEventListener("click", async () => {
      const text = codeEl.textContent || "";
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        }
        btn.textContent = "Copied!";
        btn.classList.add("is-copied");
        setTimeout(() => {
          btn.textContent = "Copy";
          btn.classList.remove("is-copied");
        }, 1600);
      } catch (err) {
        btn.textContent = "Error";
      }
    });

    pre.appendChild(btn);
  });
})();
