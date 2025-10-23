// src/pages/SearchSafe.tsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Gallery from "../components/gallery";
import in1Home from "../assets/in1Home.jpeg";
import in1Load from "../assets/in1Load.png";
import pjfsHome from "../assets/pjfsHome.png";
import pjfsPriv from "../assets/pjfsPriv.jpeg";
import pp from "../assets/pp.jpeg";
import TPS from "../assets/TPS.jpeg";


import "../styles/SearchSafe.css";


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

export default function WebDev() {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  // Active helper (keeps pill active on child routes too)
  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const myImages = [
    { image: pp, description: "Paused Perception" },
    { image: in1Load, description: "IN1 Load Screen" },
    { image: in1Home, description: "IN1 Home Screen" },
    { image: pjfsHome, description: "PJFS" },
    { image: pjfsPriv, description: "PJFS Privacy and Partners" },
    { image: TPS, description: "TPS" },

    
        

  ];

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="container header-grid">
          <div />
          <div className="brand">
            <h1>Web Development</h1>
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
        {/* Page content for SearchSafe goes here */}

        <div className="content">

          <section>
             <Gallery items={myImages} />
          </section>

          <section>
            <h2>Paused Perception</h2>

<p>
Over the past 14 months, I’ve had the opportunity to grow as a Junior Web Developer at the innovative communications agency 
<a href="https://pausedperception.com/" target="_blank"> Paused Perception</a>. 
In this role, I’ve been responsible for a diverse range of web development projects — from delivering custom-coded Shopify 
and WordPress components to taking full ownership of complete WordPress site builds, guiding each project from the initial brief 
through to launch.
</p>

<br />

<p>
This position has allowed me to strengthen my technical development skills while gaining valuable experience in client communication, 
project management, and collaborative design. Working closely with designers and clients has deepened my understanding of how thoughtful 
UI/UX design and clear communication are essential to delivering great digital experiences. 
</p>

<br />

<p>
Balancing this role alongside my Computer Science degree at Loughborough University — as well as coaching and playing hockey for the university — 
has been both challenging and rewarding. These experiences have developed my discipline, time management, and ability to maintain 
creativity under pressure, all of which have proven invaluable in both professional and academic settings.
</p>

<br />

<h3>Selected Projects</h3>
<ul>
  <li><a href="https://in1.co.uk/" target="_blank">IN1</a></li>
  <li><a href="https://pjfinancialsolutions.co.uk/" target="_blank">PJ Financial Solutions</a></li>
  <li><a href="https://techpowerservices.co.uk/" target="_blank">Tech Power Services</a></li>
</ul>


          </section>


        </div>

        
      </main>
    </div>


    
    
  );
}
