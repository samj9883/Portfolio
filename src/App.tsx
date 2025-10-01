import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import SkillsPage from "./pages/SkillsPage";
import SearchSafe from "./pages/searchSafe"; 


function App() {
  return (
    <div>
      {/* Page Routes */}
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/searchsafe" element={<SearchSafe />} />
      </Routes>
    </div>
  );
}

export default App;
