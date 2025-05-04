{/*import React, { useRef, useState } from "react";
import Navbar from "./Navbar";
import { useTranslation } from "../hooks/useTranslation";
import { useIsMobile } from "../hooks/useIsMobile";
import "../styles/LandingPage.css";       // estilo para desktop
import "../styles/LandingPagePhone.css";  // estilo para telemóvel

type LandingPageProps = {
  onOpenSettings: () => void;
};

const LandingPage = ({ onOpenSettings }: LandingPageProps) => {
  const [introSkipped, setIntroSkipped] = useState(false);
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();

  const handleVideoEnd = () => {
    setIntroSkipped(true);
  };

  const renderContent = () => (
    <>
      {!isMobile && introSkipped && (
        <video
          className="background-video"
          src="/bgg.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {!isMobile && !introSkipped && (
        <video
          ref={videoRef}
          className="landing-video"
          src="/intro.mp4"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
        />
      )}

      {!isMobile && !introSkipped && (
        <button
          className="skip-intro-btn"
          onClick={() => setIntroSkipped(true)}
        >
          {t("skipIntro")}
        </button>
      )}

      {(isMobile || introSkipped) && (
        <>
          <Navbar onOpenSettings={onOpenSettings} />
          <div className="sticky-notes-overlay">
            <div className="note top-left">{t("intro.welcome")}</div>
            <div className="note middle-left">{t("intro.mix")}</div>
            <div className="note bottom-left">{t("intro.prediction")}</div>

            
            <div className="note top-right">{t("intro.graphs")}</div>
            <div className="note middle-right">{t("intro.settings")}</div>
            <div className="note bottom-right">{t("intro.compare")}</div>

            <div className="footer">{t("footer")}</div>
          </div>
        </>
      )}
    </>
  );

  return (
    <div className={isMobile ? "landing-page-phone" : "landing-page"}>
      {renderContent()}
    </div>
  );
};

export default LandingPage;*/}
// File: LandingPage.tsx

import React from "react";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <h1>My Website</h1>
      </nav>
      <main className="main-content">
        <div className="note">
          Welcome to my simple page!
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
