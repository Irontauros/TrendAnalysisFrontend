import React, { useRef, useState } from "react";
import Navbar from "./Navbar";
import { useTranslation } from "../hooks/useTranslation";
import "../styles/LandingPage.css";

type LandingPageProps = {
  onOpenSettings: () => void;
};

const LandingPage = ({ onOpenSettings }: LandingPageProps) => {
  const [introSkipped, setIntroSkipped] = useState(false);
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    setIntroSkipped(true);
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
          <div className="sticky-notes-overlay">
            <div className="notes-grid">
              <div className="note">{t("intro.welcome")}</div>
              <div className="note">{t("intro.mix")}</div>
              <div className="note">{t("intro.prediction")}</div>
              <div className="note">{t("intro.graphs")}</div>
              <div className="note">{t("intro.settings")}</div>
              <div className="note">{t("intro.compare")}</div>
            </div>
            <div className="footer">
              {t("footer")}
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
