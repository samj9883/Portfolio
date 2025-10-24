// ContactPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/ContactPage.css";

type Theme = "light" | "dark";
const THEME_KEY = "site-theme";

const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (t: Theme) => {
  document.documentElement.setAttribute("data-theme", t);
  try {
    localStorage.setItem(THEME_KEY, t);
  } catch {}
};

export default function ContactPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());
  const [copied, setCopied] = useState<string | null>(null);

  // CV details (from screenshot)
  //const name = "Samuel Jones";
  const phone = "07496745208";
  const email = "samj9883@gmail.com";
  const linkedin = "https://www.linkedin.com/in/sam-jones-cs26";
  const github = "https://github.com/samj9883";
  const portfolio = "https://samuel-jones-portfolio.co.uk";

  // Active helper (keeps pill active on child routes too)
  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const copy = async (txt: string, label?: string) => {
    try {
      await navigator.clipboard.writeText(txt);
      setCopied(label ?? txt);
      setTimeout(() => setCopied(null), 1600);
    } catch {}
  };

  // Builds a mailto URL from the mini form
  const handleMailto = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent(String(fd.get("subject") || ""));
    const body = encodeURIComponent(String(fd.get("message") || ""));
    const url = `mailto:${email}?subject=${subject}&body=${body}`;
    window.location.href = url;
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="container header-grid">
          <div />
          <div className="brand">
            <h1>CONTACT</h1>
          </div>

          <nav className="subnav">
            <button
              className={`btn nav-pill ${isActive("/home") ? "active" : ""}`}
              aria-current={isActive("/home") ? "page" : undefined}
              onClick={() => navigate("/home")}
            >
              Home &amp; Portfolio
            </button>

            <button
              className={`btn nav-pill ${isActive("/skills") ? "active" : ""}`}
              aria-current={isActive("/skills") ? "page" : undefined}
              onClick={() => navigate("/skills")}
            >
              Skills &amp; CV
            </button>

            <button
              className={`btn nav-pill ${isActive("/about") ? "active" : ""}`}
              aria-current={isActive("/about") ? "page" : undefined}
              onClick={() => navigate("/about")}
            >
              About Me
            </button>

            <button
              className={`btn nav-pill ${isActive("/contact") ? "active" : ""}`}
              aria-current={isActive("/contact") ? "page" : undefined}
              onClick={() => navigate("/contact")}
            >
              Contact
            </button>

            {/* Theme toggle */}
            <button
              type="button"
              className="btn nav-pill theme-pill btn-outline"
              aria-label="Toggle light and dark"
              aria-pressed={theme === "dark"}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              title="Toggle theme"
            >
              {theme === "light" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z" stroke="currentColor" strokeWidth="2" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07 6.07-1.41-1.41M8.34 8.34 6.93 6.93m10.14 0-1.41 1.41M8.34 15.66l-1.41 1.41"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              )}
              <span className="label" style={{ marginLeft: 6 }}>
                {theme === "light" ? "Dark" : "Light"}
              </span>
            </button>
          </nav>
        </div>
      </header>

      <main className="container" style={{ paddingBlock: "2rem" }}>
        <section className="contact-hero">
          <h2 className="contact-title">Get In Touch</h2>
          <p className="contact-tagline">
            Reach me directly using the options below
            or send a quick message and I’ll get back to you.
          </p>
        </section>

        <section className="contact-grid">
          {/* Quick actions */}
          <div className="contact-card">
            <h3 className="card-title">Direct</h3>

            <ul className="contact-list">
              <li>
                <a className="contact-link" href={`tel:${phone.replace(/\s+/g, "")}`}>
                  <span className="icon" aria-hidden>📞</span>
                  <span className="link-text">{phone}</span>
                </a>
                <button className="mini-btn" onClick={() => copy(phone, "Phone number")}>
                  Copy
                </button>
              </li>

              <li>
                <a className="contact-link" href={`mailto:${email}`}>
                  <span className="icon" aria-hidden>✉️</span>
                  <span className="link-text">{email}</span>
                </a>
                <button className="mini-btn" onClick={() => copy(email, "Email")}>
                  Copy
                </button>
              </li>

              <li>
                <a className="contact-link" href={linkedin} target="_blank" rel="noreferrer">
                  <span className="icon" aria-hidden>🔗</span>
                  <span className="link-text">LinkedIn</span>
                </a>
                <button className="mini-btn" onClick={() => copy(linkedin, "LinkedIn URL")}>
                  Copy
                </button>
              </li>

              <li>
                <a className="contact-link" href={github} target="_blank" rel="noreferrer">
                  <span className="icon" aria-hidden>💻</span>
                  <span className="link-text">GitHub</span>
                </a>
                <button className="mini-btn" onClick={() => copy(github, "GitHub URL")}>
                  Copy
                </button>
              </li>

              <li>
                <a className="contact-link" href={portfolio} target="_blank" rel="noreferrer">
                  <span className="icon" aria-hidden>🌐</span>
                  <span className="link-text">Portfolio</span>
                </a>
                <button className="mini-btn" onClick={() => copy(portfolio, "Portfolio URL")}>
                  Copy
                </button>
              </li>
            </ul>

            {copied && <div className="copied-badge" role="status">{copied} copied</div>}
          </div>

          {/* Message form (mailto) */}
          <div className="contact-card">
            <h3 className="card-title">Message</h3>
            <form className="contact-form" onSubmit={handleMailto}>
              <label className="field">
                <span>Subject</span>
                <input
                  name="subject"
                  type="text"
                  placeholder="e.g., Freelance project inquiry"
                  required
                  aria-required="true"
                />
              </label>

              <label className="field">
                <span>Message</span>
                <textarea
                  name="message"
                  rows={6}
                  placeholder="Tell me a bit about what you need and any timelines."
                  required
                  aria-required="true"
                />
              </label>

              <div className="form-actions">
                <button className="btn primary" type="submit">Open Email</button>
                <a className="btn btn-outline" href={`mailto:${email}`}>Email directly</a>
              </div>
              <p className="privacy-hint">
                This form opens your email app — no data is stored on this site.
              </p>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
