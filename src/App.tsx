import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Graphs from "./components/Graphs";
import Comparison from "./components/Comparison";
import Navbar from "./components/Navbar";
import Mix from "./components/Mix";
import Prediction from "./components/Prediction";
import { Settings } from "./components/Settings";
import './app.css';
import { SettingsProvider, SettingsContext } from "./context/SettingsContext";
import LandingPage from "./components/LandingPage";

const AppContent = () => {
  const { seriousMode } = useContext(SettingsContext);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className={`app-wrapper ${seriousMode ? 'serious-mode' : ''}`}>
      {/* Background Image or Dark Mode based on Serious Mode */}
      {seriousMode ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#0f172a',
            zIndex: -1,
          }}
        />
      ) : (
        <video className="background-video" autoPlay loop muted playsInline>
  <source src="/bg.mp4" type="video/mp4" />
</video>
      )}

      <Navbar onOpenSettings={() => setShowSettings(true)} />

      <main className="main-content">
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/comparison" element={<Comparison />} />
  <Route path="/graphs" element={<Graphs />} />
  <Route path="/mix" element={<Mix />} />
  <Route path="/prediction" element={<Prediction />} />
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>

      </main>

      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  );
};

const App = () => (
  <SettingsProvider>
    <DndProvider backend={HTML5Backend}>
      <Router>
        <AppContent />
      </Router>
    </DndProvider>
  </SettingsProvider>
);

export default App;
