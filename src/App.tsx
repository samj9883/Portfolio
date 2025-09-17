// src/App.tsx
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* ===== HEADER / NAV ===== */}
      <header className="header">
        <nav className="nav">
          <h1 className="logo">My Portfolio</h1>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="hero">
        <h2>Hello, I’m [Your Name]</h2>
        <p>A [Your Role] passionate about [keywords/skills]</p>
        <a href="#projects" className="btn">View My Work</a>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="about">
        <h2>About Me</h2>
        <p>
          Write a short intro here about who you are, your background, and what
          makes you unique. Mention skills, interests, or goals.
        </p>
      </section>

      {/* ===== PROJECTS ===== */}
      <section id="projects" className="projects">
        <h2>Projects</h2>
        <div className="project-list">
          <div className="project-card">
            <h3>Project Title</h3>
            <p>Short description of the project.</p>
            <a href="#">View Project</a>
          </div>
          <div className="project-card">
            <h3>Another Project</h3>
            <p>Short description of this project.</p>
            <a href="#">View Project</a>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="contact">
        <h2>Contact</h2>
        <p>Feel free to reach out!</p>
        <ul>
          <li>Email: <a href="mailto:you@example.com">you@example.com</a></li>
          <li>LinkedIn: <a href="#">Your Profile</a></li>
          <li>GitHub: <a href="#">Your Profile</a></li>
        </ul>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
