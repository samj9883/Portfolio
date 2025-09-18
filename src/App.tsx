import { useEffect, useMemo, useRef, useState } from "react";
import "./styles/base.css";
import "./App.css";

/** ------------------------------
 *  Demo project data
 *  Replace image URLs with your own assets in /public if you prefer.
 *  ------------------------------ */
type Project = {
  id: string;
  title: string;
  blurb: string;
  image: string;
  cta: string;
  href: string;
};

const projects: Project[] = [
  {
    id: "searchsafe",
    title: "SearchSafe",
    blurb:
      "Scan product ingredients against allergy profiles to instantly see if items are safe.",
    image:
      "https://images.unsplash.com/photo-1556139943-4bdca53adf1e?q=80&w=1200&auto=format&fit=crop",
    cta: "Find Out More",
    href: "#searchsafe",
  },
  {
    id: "portfolio",
    title: "Portfolio Platform",
    blurb:
      "A performant React + Vite stack with modular components, theming, and analytics.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    cta: "View Case Study",
    href: "#portfolio",
  },
  {
    id: "dashboard",
    title: "Analytics Dashboard",
    blurb:
      "Real-time KPIs with role-based access, RESTful APIs, and beautiful charts.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    cta: "See Dashboard",
    href: "#dashboard",
  },
];

/** ------------------------------
 *  Theme helpers
 *  ------------------------------ */
type Theme = "light" | "dark";
const THEME_KEY = "site-theme";

function getInitialTheme(): Theme {
  const stored = (localStorage.getItem(THEME_KEY) as Theme | null);
  if (stored === "light" || stored === "dark") return stored;
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

/** ------------------------------
 *  Main App
 *  ------------------------------ */
export default function App() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());
  const [index, setIndex] = useState<number>(0);
  const [isHovering, setIsHovering] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const autoRef = useRef<number | null>(null);

  // Apply theme on load and when changed
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Auto-rotate every 6s, pause on hover
  useEffect(() => {
    if (isHovering) return;
    stopAuto();
    autoRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % projects.length);
    }, 6000);
    return stopAuto;
  }, [isHovering]);

  function stopAuto() {
    if (autoRef.current) {
      window.clearInterval(autoRef.current);
      autoRef.current = null;
    }
  }

  const order = useMemo(() => {
    // Return indexes for prev, active, next
    const prev = (index - 1 + projects.length) % projects.length;
    const next = (index + 1) % projects.length;
    return { prev, index, next };
  }, [index]);

  function select(i: number) {
    setIndex(i);
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") setIndex((i) => (i + 1) % projects.length);
    if (e.key === "ArrowLeft")
      setIndex((i) => (i - 1 + projects.length) % projects.length);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    const threshold = 40;
    if (dx < -threshold) setIndex((i) => (i + 1) % projects.length);
    if (dx > threshold) setIndex((i) => (i - 1 + projects.length) % projects.length);
  }

  return (
    <div className="app" onKeyDown={onKey} tabIndex={0}>
      {/* Header */}
      <header className="app-header">
        <div className="container header-grid">
          {/* left spacer */}
          <div />

          <div className="brand">
            <h1>Full Stack Development</h1>
          </div>

          {/* Theme Toggle */}
          <div className="theme-toggle">
            <button
              aria-pressed={theme === "dark"}
              aria-label="Toggle light and dark theme"
              className="btn btn-outline"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              title="Toggle theme"
            >
              {theme === "light" ? (
                // Moon icon
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z" stroke="currentColor" strokeWidth="2" />
                </svg>
              ) : (
                // Sun icon
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07 6.07-1.41-1.41M8.34 8.34 6.93 6.93m10.14 0-1.41 1.41M8.34 15.66l-1.41 1.41"
                    stroke="currentColor" strokeWidth="2" />
                </svg>
              )}
              <span style={{ marginLeft: 6 }}>{theme === "light" ? "Dark" : "Light"}</span>
            </button>
          </div>

          {/* Subnav */}
          <nav className="subnav">
            <a className="btn nav-pill" href="#skills">Skills &amp; CV</a>
            <a className="btn nav-pill" href="#about">About Me</a>
            <a className="btn nav-pill" href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* Band with Carousel */}
      <section className="band">
        <div className="container band-inner">
          <div
            className="carousel"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="carousel-track" role="listbox" aria-label="Featured projects">
              {projects.map((p, i) => {
                // Determine visual state
                const classNames = ["card"];
                if (i === order.index) classNames.push("is-active");
                else if (i === order.next) classNames.push("is-next");
                else if (i === order.prev) classNames.push("is-prev");

                return (
                  <article
                    key={p.id}
                    className={classNames.join(" ")}
                    role="option"
                    aria-selected={i === index}
                    onClick={() => select(i)}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <div className="card-visual" aria-hidden="true">
                      <img src={p.image} alt="" />
                    </div>

                    <div className="card-content">
                      <h3>{p.title}</h3>
                      <p>{p.blurb}</p>
                      <div className="actions">
                        <a className="btn btn-accent" href={p.href}>{p.cta}</a>
                        <button className="btn btn-outline" onClick={() => select(i)}>
                          Make Current
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Dots */}
            <div className="controls" aria-label="Project selection">
              {projects.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === index ? "is-current" : ""}`}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => select(i)}
                />
              ))}
            </div>
          </div>

          <p className="tagline">
            Applying for graduate software engineering and tech roles with hands-on, client-facing experience.
          </p>
        </div>
      </section>
    </div>
  );
}
