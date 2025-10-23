// SkillsPage.tsx
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import "../styles/skills.css";

import animationDataLight from "../assets/light.json";
import animationDataDark from "../assets/dark.json";

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

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    setReduced(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export default function SkillsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => applyTheme(theme), [theme]);

  useEffect(() => {
    const api = lottieRef.current;
    if (!api) return;
    if (prefersReduced) api.pause();
    else api.play();
  }, [prefersReduced, theme]);

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const animationData = theme === "dark" ? animationDataDark : animationDataLight;

  return (
    <div className="app">
      <header className="app-header">
        <section className="lottie-wrap" aria-hidden="true">
          <Lottie
            key={theme}
            lottieRef={lottieRef}
            animationData={animationData}
            loop={!prefersReduced}
            autoplay={!prefersReduced}
            className="lottie-player"
          />
        </section>

        <div className="container header-grid">
          <nav className="subnav" aria-label="Secondary navigation">
            <button className={`btn nav-pill ${isActive("/home") ? "active" : ""}`} onClick={() => navigate("/home")}>
              Home &amp; Portfolio
            </button>
            <button className={`btn nav-pill ${isActive("/skills") ? "active" : ""}`} onClick={() => navigate("/skills")}>
              Skills &amp; CV
            </button>
            <button className={`btn nav-pill ${isActive("/about") ? "active" : ""}`} onClick={() => navigate("/about")}>
              About Me
            </button>
            <button className={`btn nav-pill ${isActive("/contact") ? "active" : ""}`} onClick={() => navigate("/contact")}>
              Contact
            </button>

            {/* Theme toggle */}
            <button
              type="button"
              className="btn nav-pill theme-pill btn-outline"
              aria-label="Toggle light and dark"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? "Dark" : "Light"}
            </button>
          </nav>
        </div>
      </header>

      <main className="container skills-main">
        <section aria-labelledby="cv-title" className="pdf-section">
          <div className="pdf-toolbar">
            <h2 id="cv-title" className="pdf-title">My CV</h2>
            <a href="/SamuelJonesCV.pdf" target="_blank" rel="noopener" className="pdf-open-link">
              Open in new tab
            </a>
          </div>

          <iframe
            className="pdf-viewer"
            src="/SamuelJonesCV.pdf"
            title="Samuel Jones CV"
            loading="lazy"
          ></iframe>

          <p className="pdf-fallback">
            If the PDF does not display,{" "}
            <a href="/SamuelJonesCV.pdf" target="_blank" rel="noopener">open it in a new tab</a>.
          </p>
        </section>
      </main>
    </div>
  );
}
