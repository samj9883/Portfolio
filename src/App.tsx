import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import SkillsPage from "./pages/SkillsPage";
import SearchSafe from "./pages/SearchSafe";
import WebDev from "./pages/WebDev";
import FinalYear from "./pages/FinalYear";
import PaxEquest from "./pages/PaxEquest";


function App() {
  return (
    <div>
      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/searchsafe" element={<SearchSafe />} />
        <Route path="/web" element={<WebDev />} />
        <Route path="/pax" element={<PaxEquest />} />
        <Route path="/project" element={<FinalYear />} />

        
    </Routes>

    </div>
  );
}

export default App;
