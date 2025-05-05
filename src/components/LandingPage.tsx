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

  const popupContent = {
    welcome: t("intro.welcome"),
    mix: t("intro.mix"),
    graphs: t("intro.graphs"),
    prediction: t("intro.prediction"),
    settings: t("intro.settings"),
    compare: t("intro.compare"),
    footer: t("footer"),
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
              {Object.keys(popupContent).map((key) => (
                <button
                  key={key}
                  className="landing-button"
                  onClick={() => togglePopup(key)}
                >
                  {t(`buttonTitles.${key}`)}
                </button>
              ))}
            </div>

            <div className="popup-area">
              {openPopup && (
                <div className="popup-box">
                  {popupContent[openPopup]}
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
