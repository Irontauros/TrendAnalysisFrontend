// src/components/LandingPage.tsx

import React, { useContext, useRef, useState } from "react";
import Navbar from "./Navbar";
import { useTranslation } from "../hooks/useTranslation";
import { SettingsContext } from "../context/SettingsContext";
import "../styles/LandingPage.css";

type LandingPageProps = {
  onOpenSettings: () => void;
};

const LandingPage = ({ onOpenSettings }: LandingPageProps) => {
  const { seriousMode } = useContext(SettingsContext);
  const [introSkipped, setIntroSkipped] = useState(false);
  const [openPopup, setOpenPopup] = useState<string | null>(null);
  const [backgroundVideoLoaded, setBackgroundVideoLoaded] = useState(false);
  const [introVideoLoaded, setIntroVideoLoaded] = useState(false);
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    setIntroSkipped(true);
  };

  const togglePopup = (key: string) => {
    setOpenPopup(prev => (prev === key ? null : key));
  };

  // Decide background color dynamically
  const getBackgroundColor = () => {
    if (seriousMode) return "#0f172a";
    if (!introSkipped) {
      return introVideoLoaded ? "transparent" : "#0f172a";
    }
    return backgroundVideoLoaded ? "transparent" : "#0f172a";
  };

  return (
    <div
      className="landing-page"
      style={{
        backgroundColor: getBackgroundColor(),
        minHeight: "100vh",
        minWidth: "100vw",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background video after intro */}
      {introSkipped && (
        <video
          className="background-video"
          src="/bgg.mp4"
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
        />
      )}

      {/* Main content */}
      {introSkipped ? (
        <>
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

          <Navbar onOpenSettings={onOpenSettings} />

          <div className="landing-layout">
            <div className="sidebar-buttons">
              <button onClick={() => togglePopup("intro.welcome")} className="landing-button">
                {t("hello")}
              </button>
              <button onClick={() => togglePopup("intro.graphs")} className="landing-button">
                {t("Dashboard")}
              </button>
              <button onClick={() => togglePopup("intro.compare")} className="landing-button">
                {t("Table")}
              </button>
              <button onClick={() => togglePopup("intro.prediction")} className="landing-button">
                {t("Predictive")}
              </button>
              <button onClick={() => togglePopup("intro.mix")} className="landing-button">
                {t("mix")}
              </button>
              <button onClick={() => togglePopup("intro.settings")} className="landing-button">
                {t("settings")}
              </button>
              <button onClick={() => togglePopup("footerText")} className="landing-button">
                {t("footer")}
              </button>
            </div>

            <div className="popup-area">
              {openPopup && (
                <div className="popup-box">
                  {t(openPopup)}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Intro video */}
          <video
            ref={videoRef}
            className="landing-video"
            src="/video.mp4"
            autoPlay
            playsInline
            onEnded={handleVideoEnd}
            onLoadedData={() => setIntroVideoLoaded(true)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              minWidth: "100vw",
              minHeight: "100vh",
              objectFit: "cover",
              zIndex: -1,
            }}
          />

          <button
            className="skip-intro-btn"
            onClick={() => setIntroSkipped(true)}
          >
            {t("skipIntro")}
          </button>
        </>
      )}
    </div>
  );
};

export default LandingPage;
