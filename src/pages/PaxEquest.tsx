// src/pages/SearchSafe.tsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Gallery from "../components/gallery";
import invoice from "../assets/invoice.png";
import login from "../assets/login.png";
import manage from "../assets/manage.png";
import orders from "../assets/orders.png";
import timeline from "../assets/timeline.png";



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

export default function PaxEquest() {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  // Active helper (keeps pill active on child routes too)
  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const myImages = [
    { image: login, description: "Login page" },
    { image: manage, description: "Manage Page" },
    { image: orders, description: "Order Page" },
    { image: timeline, description: "Timeline Page" },

    { image: invoice, description: "invoice" },
 
        

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
            <h1>Pax Equestrian Services</h1>
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
            <h2>Introduction</h2>

<p>
Pax Equestrian Services is a small bridlework and saddlery repair business operated as a sole trader by its founder and owner. 
As the client base rapidly expanded, the demand for repairs began to exceed manageable capacity, resulting in a growing waitlist 
and challenges in time management. During the discovery phase, it became clear that a digital client and order management solution 
was needed to help streamline operations, track orders, and improve efficiency in scheduling and communication.
</p>

<br />

<p>
The primary goal of the project was to design a client management and scheduling platform that would allow the business owner 
to efficiently organise tasks, monitor client orders, and allocate working hours effectively. To achieve this, a web application 
was developed using <strong>React Native</strong> for the front end and <strong>Firebase</strong> for the backend and hosting.
</p>

<br />

<h2>Features</h2>

<p>
<strong>Client Page:</strong> This section manages client information and stores all associated orders. It includes 
payment tracking to indicate whether clients have outstanding balances. Completed orders can be automatically 
populated into a professional invoice template—styled to match the company’s branding—which can be printed or shared 
directly with the client, saving significant administrative time.
</p>

<br />

<p>
<strong>Manage Page:</strong> New clients can be added, and new orders can be created with associated costs 
and estimated completion times. Once created, these orders automatically appear in the main orders dashboard, 
ensuring all work remains organised and easily accessible.
</p>

<br />

<p>
<strong>Orders Page:</strong> Displays all current orders and allows real-time updates to order status, 
progress, notes, and any other relevant details. This provides a centralised location to manage ongoing work 
and track development efficiently.
</p>

<br />

<p>
<strong>Timeline Screen:</strong> The most impactful feature of the platform, this screen enables the user 
to define their standard work schedule (e.g., five days a week, six hours per day) and book any custom days off. 
Using this information, the system automatically calculates optimal task order, predicts completion dates, and 
displays warnings for any orders at risk of missing deadlines. This automation removes the manual burden of 
time management and provides clear visibility into workload distribution and expected completion times.
</p>

<br />

<h2>Conclusion</h2>

<p>
After initial familiarisation, the client reported a significant improvement in work–life balance and productivity. 
The application’s automated scheduling, order tracking, and printable invoice functionality have reduced administrative 
tasks, improved time management, and enhanced communication with customers. The feedback from the client has been 
extremely positive—the whiteboard once used for order tracking is now clear, as the application has become the 
sole method of managing orders and client information.
</p>



          </section>


        </div>

        
      </main>
    </div>


    
    
  );
}
