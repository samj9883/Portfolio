// src/pages/SearchSafe.tsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Gallery from "../components/gallery";
import ssSave from "../assets/ssSaved.png";
import ssSearch from "../assets/ssSearch.png";
import ssHome from "../assets/SSHome.png";
import ssPersonal from "../assets/ssPersonal.png";
import ssProfile from "../assets/ssProfile.png";


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
    { image: ssHome, description: "Home Page" },
    { image: ssSave, description: "Saved page" },
    { image: ssSearch, description: "Search Page" },
    { image: ssProfile, description: "Profile Page" },
    { image: ssPersonal, description: "Allergen Page" },
    
        

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
            <h2>Introduction</h2>
             
            <p>SearchSafe is a barcode search app that uses a personal allergy 
              profile set by the user to determine whether a product is safe to consume. Making use of 
              the open food facts api product ingredients, images and descriptions can be returned.</p>
            <br />
            <p>This project started off with its first iteration of the concept using react native to produce a 
              web / mobile friendly application. This first iteration used a different api which allowed the user to search recipes, 
              a dish name search would return 10 recipes and all recipes would be searched for allergen words. if none of the returned 
              recipes contained an allergen in the ingredients or desrciption the dish was catagorised as safe.</p>

            <br />
            <h2>Coursework</h2>
            <p>When one of my second year university modules set a coursework to 
              produce an android mobile app I decided to improve on the 
              first iteration changing the focus to products not meals. The project is 
              coded in kotlin and uses the openFoodFacts api with firbase to store user and product information.</p>
            
            <br />
            <p>The coursework was a success and the second version of this project was far more effective than the first.
              The user interface made it simple and quick to build your personal allergen profile (listing all of your allergens)
              which could be used to cross reference a barcode searched product's ingredients list. The searched products could be stored and shared via sms.
      
            </p>

            <br />

            <p>In future to further develop the project I would like to explore the concept of creating "safe Recipes", where the user can group 
              safe searched items to compile a full ingredients list of a recipe that they want to cook and the entire recipe can be concluded to be safe or not.
            </p>


          </section>


        </div>

        
      </main>
    </div>


    
    
  );
}
