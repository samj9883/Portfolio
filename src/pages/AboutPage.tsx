// AboutPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AboutCard from "../components/aboutCards";
import "../styles/about.css";

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

export default function AboutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  // Active helper (keeps pill active on child routes too)
  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="container header-grid">
          <div />
          <div className="brand">
            <h1>About</h1>
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
        {/* ... */}

        <section className="cards">
          <AboutCard
            title="EDUCATION"
            description={
              <>
              <br />
                <p>
                  I studied <strong>Biology</strong>, <strong>Geography</strong>, and <strong>Economics</strong> at
                  Hereford Sixth Form, achieving A*, A, and A, respectively. I then took a gap year between completing my
                  A levels and applying to university.
                </p>

                <br />

                <p>
                  During my gap year I worked for my family business, <em>PJ Financial Solutions</em>, an agricultural and
                  business finance brokerage. I realised economics was not the direction I wanted to pursue and developed a strong
                  interest in quantitative finance—building algorithmic trading models to forecast currency momentum and analyse
                  correlations for potential arbitrage opportunities. This led me towards computer science, so I self-studied
                  AS Level Mathematics to strengthen the necessary foundations.
                </p>

                <br />

                <p>
                  While studying AS Mathematics, I applied for <strong>Computer Science with a Foundation Year</strong> at
                  Loughborough University, a programme designed to reinforce core topics. In summer 2022 I sat AS Mathematics as an
                  external candidate, achieved an A, and confirmed my place at Loughborough.
                </p>

                <br />


                <p>
                  The foundation year was a valuable opportunity to accelerate my learning before starting the main course. I
                  enjoyed the transition to university life especially after a year working and learning from home. Working hard to make the most 
                  out of this foundation year I earned a scholarship for exceptional academic performance (average &gt; 75%) and was ready to start my full degree in 2023.
                </p>

                <br />

                <p>
                  Since then I have continued to achieve strong results while balancing work and extracurricular commitments, and my
                  average remains on track for a First. I am now in my final year at Loughborough and while working on my end of degree project I am excited 
                  at the prospect of applying the skills I have developed to the industry.
                </p>

              </>
            }
          />

          <AboutCard
            title="EXTRACURRICULAR"
            description={
              <>
                <p><strong>Sport</strong></p>
                <p>
                  Sport has always been a central part of my life and has shaped who I am.
                </p>

                <br />

                <p><strong>Golf</strong></p>
                <p>
                  Golf was my primary commitment growing up. I represented the
                  Shropshire &amp; Herefordshire junior county team from age 12 to 18.
                  Matches followed a Ryder Cup–style format—pairs in the morning and
                  singles in the afternoon. The commitment taught me teamwork, patience,
                  and resilience. I still play regularly at university and at home for my clubs mens scratch team; 
                  it’s a great social outlet, and the sport’s popularity has grown significantly since COVID.
                </p>
                <br />
                <p><strong>Hockey</strong></p>
                <p>
                  At Hereford Sixth Form I took up hockey, which wasn’t offered at my
                  school. I enjoyed moving from an individual sport to a team
                  environment and joined my local men’s club. With strong coaching
                  support I progressed and was selected at trials when I moved to
                  Loughborough. The standard and commitment at
                  university have been exceptional, and being part of a university team
                  has been a highlight of my time here.
                </p>
                <br />

                <p>
                  Beyond playing for the mens 2s and being part of the leadership group for the team, 
                  I’ve contributed as a committee member and coach. I’ve
                  coached the men’s 5s, women’s 5s, and women’s 4s—roles that involve
                  planning and running training sessions, selecting matchday squads, and
                  managing the team on match day. These experiences have strengthened my
                  leadership, organisation, and people-management skills, and I’ve
                  loved coaching and playing at Loughborough.
                </p>
              </>
            }
          />

          <AboutCard
            title="EXPERIENCE"
            description={
              <>
              <br />
                <p><strong>Paused Perception — Junior Web Developer (2024–Present)</strong></p>
                <ul>
                  <li>Delivered custom-coded Shopify and WordPress components for client projects.</li>
                  <li>Took end-to-end ownership of live WordPress sites—from requirements capture to delivery.</li>
                  <li>Collaborated directly with clients to tailor solutions, strengthening UI/UX practice and client communication.</li>
                </ul>
                <br />
          
                <p><strong>PJ Financial Solutions — Admin &amp; Data Analysis (2022)</strong></p>
                <ul>
                  <li>Supported financial consultants with data processing, reporting, and Excel-based analysis.</li>
                  <li>Built a Python document-scraping tool to extract information from client documents and update databases.</li>
                </ul>
                <br />

                <p><strong>Customer Service Roles — Various (Hospitality &amp; Retail) (2019–2022)</strong></p>
                <ul>
                  <li>Worked in bar, sales, and customer-facing roles (pubs, golf club).</li>
                  <li>Developed resilience, teamwork, and clear communication in fast-paced environments.</li>
                </ul>
              </>
            }
          />

          
          </section>

      </main>
    </div>
  );
}

