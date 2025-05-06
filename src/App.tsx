// src/App.tsx

import React, { useContext, useState, useEffect } from "react";
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
import UnsupportedScreen from "./components/UnsupportedScreen";

import "./App.css";
import { SettingsProvider, SettingsContext } from "./context/SettingsContext";

// Hook to get window width
const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

const AppContent = () => {
  const { seriousMode } = useContext(SettingsContext);
  const [showSettings, setShowSettings] = useState(false);
  const [backgroundVideoLoaded, setBackgroundVideoLoaded] = useState(false);
  const location = useLocation();
  const width = useWindowWidth();

  const isLandingPage = location.pathname === "/";

  if (width < 1024) {
    return <UnsupportedScreen />;
  }

  const getBackgroundColor = () => {
    if (seriousMode) return "#0f172a";
    return backgroundVideoLoaded ? "transparent" : "#0f172a";
  };

  return (
    <div
      className={`app-wrapper ${seriousMode ? "serious-mode" : ""}`}
      style={{
        backgroundColor: getBackgroundColor(),
        minHeight: "100vh",
        minWidth: "100vw",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background video */}
      {!isLandingPage && (
        <video
          className="background-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setBackgroundVideoLoaded(true)}
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

      {/* Serious Mode overlay */}
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

      {/* Navbar */}
      {!isLandingPage && (
        <Navbar onOpenSettings={() => setShowSettings(true)} />
      )}

      {/* Main content */}
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

      {/* Settings Panel */}
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
