// src/pages/SearchSafe.tsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Gallery from "../components/gallery";

import finalYear from "../assets/finalYear.jpeg";


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

export default function FinalYear() {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  // Active helper (keeps pill active on child routes too)
  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const myImages = [
    { image: finalYear, description: "Final Year Project" },
    
    
        

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
            <h1>Final Year Project</h1>
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
            <h2>Final Year Project – Asset Finance Document Accuracy Platform</h2>

<p>
As part of my final year studying <strong>Computer Science (BSc)</strong> at Loughborough University, 
I am developing a web-based platform that addresses a real-world problem in the <strong>asset finance industry</strong> — 
the inefficiency and inaccuracy of documentation workflows between brokers and lenders. 
The project is inspired by first-hand industry experience and consultation with senior professionals 
from companies including <em>Haydock Finance</em> and <em>Novuna Business Finance</em>.
</p>

<br />

<p>
The <strong>UK asset finance broker market</strong> processes over £8.5 billion annually, 
yet a significant proportion of deal submissions are delayed or rejected due to documentation errors, 
inconsistent formatting, and compliance mismatches across multiple lenders. 
These inaccuracies cause multi-touch processing, delayed payouts, and increased operational costs 
for brokers, lenders, and customers alike.
</p>

<br />

<p>
To tackle this, my project aims to create a <strong>specialised Customer Relationship Management (CRM) 
and document validation system</strong> designed for small, independent brokerage firms. 
This system will digitise the process of submitting, reviewing, and tracking finance agreements 
while automatically analysing patterns of document errors to improve accuracy and efficiency.
</p>

<br />

<h3>Technical Overview</h3>

<p>
The platform is being built using <strong>React</strong> for the front-end and <strong>Firebase</strong> for hosting, authentication, 
and database management. Planned extensions include <strong>AWS IDP</strong> and <strong>n8n/OpenAI</strong> integration 
to enable intelligent document validation and workflow automation.
</p>

<br />

<h3>Core Features</h3>

<ul>
  <li><strong>Application Page:</strong> Brokers can upload finance agreements and deal details directly to lenders. 
  Each submission is stored in the database and marked with its current status.</li>

  <li><strong>Status Tracking:</strong> The CRM records every application’s state — 
  <em>Sent, Pending, Declined, or Approved</em> — and logs reasons for rejections 
  to help identify recurring issues.</li>

  <li><strong>Review Page:</strong> Enables quick editing and re-submission of deals with preloaded data, 
  improving turnaround time for corrections.</li>

  <li><strong>Client Page:</strong> Displays all clients and their previous finance applications with searchable records, 
  improving transparency and organisation.</li>

  <li><strong>Analytics Page:</strong> Provides data visualisations and insights on common document errors 
  and workflow bottlenecks — helping justify future process automation in the industry.</li>
</ul>

<br />

<h3>Project Context & Goals</h3>

<p>
This project bridges my interests in <strong>software development, automation, and finance technology</strong>, 
combining academic research with practical impact. 
It was inspired by my work experience assisting in database management and automation 
for a real finance brokerage, where I observed how simple errors and unstructured communication 
can delay entire funding cycles.
</p>

<p>
Through collaboration with industry partners and supervision from <strong>Dr. Yanning Yang</strong>, 
the goal is to design a scalable, user-friendly system that not only improves efficiency for brokers 
but also <strong>captures and visualises data patterns</strong> to demonstrate where inefficiencies occur in the 
deal lifecycle — ultimately supporting the case for broader industry reform.
</p>

<br />

<h3>Skills & Technologies</h3>

<ul>
  <li>React, TypeScript, and Firebase (Hosting, Firestore, Authentication)</li>
  <li>Data visualisation with Chart.js / Recharts</li>
  <li>RESTful API design and integration</li>
  <li>Automation and AI experimentation with n8n and OpenAI</li>
  <li>UI/UX design principles and responsive front-end development</li>
</ul>

<br />

<h3>Outcome</h3>

<p>
By the end of the project, I aim to deliver a functional prototype that demonstrates 
how intelligent document validation and workflow visualisation can drastically improve 
document accuracy and turnaround times in the asset finance industry. 
Beyond the technical achievement, this project represents my broader ambition 
to apply software engineering principles to solve <strong>real-world business inefficiencies</strong> 
and to contribute to <strong>data-driven innovation</strong> within traditional financial sectors.
</p>



          </section>


        </div>

        
      </main>
    </div>


    
    
  );
}
