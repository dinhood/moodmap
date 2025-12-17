import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import ConfidentialBanner from "./components/ConfidentialBanner.jsx";
import BootScreen from "./components/BootScreen.jsx";
import HomePage from "./pages/HomePage.jsx";
import RegisterMoodPage from "./pages/RegisterMoodPage.jsx";
import MoodMapPage from "./pages/MoodMapPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <div className="app-container">
      {/* Tela de boot aparece por cima do app e some sozinha */}
      <BootScreen />

      <Header />

      <main className="app-main">
        <ConfidentialBanner />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registrar" element={<RegisterMoodPage />} />
          <Route path="/mapa" element={<MoodMapPage />} />
          <Route path="/mapa/:date" element={<MoodMapPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}
