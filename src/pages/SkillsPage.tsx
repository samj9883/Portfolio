// SkillsPage.tsx
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";

// Light/Dark animations (using the same file for now; swap the dark import later)
import animationDataLight from "../assets/light.json";
// TODO: replace with your dark-mode animation file when ready, e.g. "../assets/data-dark.json"
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

// Optional: respect reduced-motion for accessibility
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

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Keep nav pill active on child routes too
  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  // Keep playback aligned with reduced-motion preference
  useEffect(() => {
    const api = lottieRef.current;
    if (!api) return;
    if (prefersReduced) api.pause();
    else api.play();
  }, [prefersReduced, theme]);

  // Pick animation based on theme (both are the same file for now)
  const animationData = theme === "dark" ? animationDataDark : animationDataLight;

  return (
    <div className="app">
      <header className="app-header">
        {/* Looping Lottie (no scroll control) */}
        <section
          style={{ display: "grid", placeItems: "center" }}
        >
          
          <Lottie
            key={theme} // remount when theme changes so the correct file loads
            lottieRef={lottieRef}
            animationData={animationData}
            loop={!prefersReduced}
            autoplay={!prefersReduced}
            style={{ width: "100%", height: "auto" }}
          />
        </section>

        <div className="container header-grid">
          <div />
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
        {/* Your page content... */}
      </main>
    </div>
  );
}
