import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Graphs from "./components/Dashboard";
import Comparison from "./components/Table";
import Navbar from "./components/Navbar";
import Mix from "./components/Mix";
import Prediction from "./components/Predictive";
import { Settings } from "./components/Settings";
import LandingPage from "./components/LandingPage";

import "./App.css";
import { SettingsProvider, SettingsContext } from "./context/SettingsContext";

const AppContent = () => {
  const { seriousMode } = useContext(SettingsContext);
  const [showSettings, setShowSettings] = useState(false);
  const location = useLocation();

  const isLandingPage = location.pathname === "/";

  return (
    <div className={`app-wrapper ${seriousMode ? "serious-mode" : ""}`}>
      {/* Background video only for non-landing routes */}
      {!isLandingPage && (
        <video
          className="background-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            minWidth: "100vw",
            minHeight: "100vh",
            objectFit: "cover",
            zIndex: -1,
          }}
        >
          <source src="/bgg.mp4" type="video/mp4" />
        </video>
      )}

      {/* Serious mode overlay */}
      {seriousMode && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#0f172a",
            zIndex: 0,
          }}
        />
      )}

      {/* Show navbar only on non-landing pages */}
      {!isLandingPage && (
        <Navbar onOpenSettings={() => setShowSettings(true)} />
      )}

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<LandingPage onOpenSettings={() => setShowSettings(true)} />}
          />
          <Route path="/table" element={<Comparison />} />
          <Route path="/dashboard" element={<Graphs />} />
          <Route path="/mix" element={<Mix />} />
          <Route path="/predictive" element={<Prediction />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Show settings only when triggered */}
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
