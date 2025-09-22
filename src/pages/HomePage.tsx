// src/pages/HomePage.tsx
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "../styles/base.css";
import "../styles/HomePage.css";
import ScanSafe from "../assets/ScanSafe.png";
import { useNavigate, useLocation } from "react-router-dom";




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
    image: ScanSafe,
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

type Theme = "light" | "dark";
const THEME_KEY = "site-theme";

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}
function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export default function HomePage() {   // <— renamed from App to HomePage
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  const autoRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  /* Theme */
  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}
  }, [theme]);

  /* Autoplay (pause on hover) */
  useEffect(() => {
    if (hovering) return;
    stopAuto();
    autoRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % projects.length);
    }, 5500);
    return stopAuto;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovering]);
  function stopAuto() {
    if (autoRef.current) {
      window.clearInterval(autoRef.current);
      autoRef.current = null;
    }
  }

  /* Order helpers for left/center/right */
  const order = useMemo(() => {
    const left = (index - 1 + projects.length) % projects.length;
    const right = (index + 1) % projects.length;
    return { left, center: index, right };
  }, [index]);

  function select(i: number) {
    setIndex(i);
  }

  /* Keyboard + touch */
  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") setIndex((i) => (i + 1) % projects.length);
    if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + projects.length) % projects.length);
  }
  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start == null) return;
    const dx = e.changedTouches[0].clientX - start;
    if (dx < -40) setIndex((i) => (i + 1) % projects.length);
    if (dx > 40) setIndex((i) => (i - 1 + projects.length) % projects.length);
  }

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;

    const measure = () => {
      track.classList.add("is-measuring");

      let maxImgH = 0;
      const imgs = track.querySelectorAll<HTMLImageElement>(".card-visual img");
      imgs.forEach((img) => {
        maxImgH = Math.max(maxImgH, img.getBoundingClientRect().height);
      });
      track.style.setProperty("--img-min-h", `${Math.round(maxImgH)}px`);

      let maxCardH = 0;
      const cards = track.querySelectorAll<HTMLElement>(".card");
      cards.forEach((c) => {
        maxCardH = Math.max(maxCardH, c.scrollHeight);
      });
      track.style.setProperty("--card-h", `${Math.round(maxCardH)}px`);

      track.classList.remove("is-measuring");
    };

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    });
    ro.observe(track);

    const imgs = Array.from(track.querySelectorAll<HTMLImageElement>(".card-visual img"));
    const unloaders: Array<() => void> = [];
    imgs.forEach((img) => {
      if (img.complete) return;
      const onLoad = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); };
      img.addEventListener("load", onLoad);
      unloaders.push(() => img.removeEventListener("load", onLoad));
    });

    raf = requestAnimationFrame(measure);

    return () => {
      ro.disconnect();
      unloaders.forEach((u) => u());
      cancelAnimationFrame(raf);
    };
  }, [projects, index]);

  

  return (
    <div className="app" onKeyDown={onKey} tabIndex={0}>
      {/* Header */}
      <header className="app-header">
        <div className="container header-grid">
          <div />
          <div className="name">
            <h3>Samuel Jones</h3>
          </div>
        </div>
      </header>

      <header className="app-header">
        <div className="container header-grid">
          <div />
          <div className="brand">
            <h1>FULL STACK DEVELOPMENT</h1>
          </div>

          {/* subnav row */}
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
                  <path
                    d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
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

      {/* HERO with carousel */}
      <section className="band">
        <div className="container band-inner">
          <div
            className="carousel"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="carousel-track" ref={trackRef} role="listbox" aria-label="Featured projects">
              {projects.map((p, i) => {
                const state =
                  i === order.center ? "is-center" :
                  i === order.left   ? "is-left"   :
                  i === order.right  ? "is-right"  : "";

                return (
                  <article
                    key={p.id}
                    className={`card ${state}`}
                    role="option"
                    aria-selected={i === index}
                    onClick={() => select(i)}
                    aria-label={`${p.title}: ${p.blurb}`}
                    tabIndex={0}
                  >
                    <div className="card-visual" aria-hidden="true">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        decoding="async"
                        style={{
                          height: "100%",
                          width: "auto",
                          maxHeight: "100%",
                          maxWidth: "90%",
                          objectFit: "contain",
                          display: "block",
                        }}
                      />
                    </div>
                    <div className="card-content">
                      <h3>{p.title}</h3>
                      <p>{p.blurb}</p>
                      <div className="actions">
                        <a className="btn btn-accent" href={p.href}>
                          {p.cta}
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

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
        </div>
      </section>

      {/* Message */}
      <section className="message">
        <p className="tagline">
          Applying for graduate software engineering and tech jobs with skills and experience in client facing development.
        </p>
      </section>
    </div>
  );
}
