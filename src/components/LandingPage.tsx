// src/components/LandingPage.tsx

import React, { useRef, useState } from "react";
import Navbar from "./Navbar";
import { useTranslation } from "../hooks/useTranslation";
import "../styles/LandingPage.css";

type LandingPageProps = {
  onOpenSettings: () => void;
};

const LandingPage = ({ onOpenSettings }: LandingPageProps) => {
  const [introSkipped, setIntroSkipped] = useState(false);
  const [openPopup, setOpenPopup] = useState<string | null>(null);
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    setIntroSkipped(true);
  };

  const togglePopup = (key: string) => {
    setOpenPopup(prev => (prev === key ? null : key));
  };

  return (
    <div className="landing-page">
      {introSkipped ? (
        <>
          <video
            className="background-video"
            src="/bgg.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <Navbar onOpenSettings={onOpenSettings} />
          <div className="landing-layout">
            <div className="sidebar-buttons">
              <button onClick={() => togglePopup("graphs")} className="landing-button">
                {t("dashboard")}
              </button>
              <button onClick={() => togglePopup("graphs")} className="landing-button">
                {t("predictive")}
              </button>
              <button onClick={() => togglePopup("mix")} className="landing-button">
                {t("mix")}
              </button>
              <button onClick={() => togglePopup("settings")} className="landing-button">
                {t("settings")}
              </button>
              <button onClick={() => togglePopup("footerText")} className="landing-button">
                {t("footer")}
              </button>
              <button onClick={() => togglePopup("welcome")} className="landing-button">
                {t("hello")}
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
          <video
            ref={videoRef}
            className="landing-video"
            src="/intro.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
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
