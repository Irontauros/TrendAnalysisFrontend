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
            {/* Left side */}
            <div className="note top-left sm:max-w-[90%] sm:text-base sm:p-4 sm:left-4 sm:right-4">
              {t("intro.welcome")}
            </div>
            <div className="note middle-left sm:max-w-[90%] sm:text-base sm:p-4 sm:top-1/2 sm:left-4 sm:right-4 sm:-translate-y-1/2">
              {t("intro.mix")}
            </div>
            <div className="note bottom-left sm:max-w-[90%] sm:text-base sm:p-4 sm:left-4 sm:right-4">
              {t("intro.prediction")}
            </div>

            {/* Right side */}
            <div className="note top-right sm:max-w-[90%] sm:text-base sm:p-4 sm:left-4 sm:right-4">
              {t("intro.graphs")}
            </div>
            <div className="note middle-right sm:max-w-[90%] sm:text-base sm:p-4 sm:top-1/2 sm:left-4 sm:right-4 sm:-translate-y-1/2">
              {t("intro.settings")}
            </div>
            <div className="note bottom-right sm:max-w-[90%] sm:text-base sm:p-4 sm:left-4 sm:right-4">
              {t("intro.compare")}
            </div>

            {/* Footer */}
            <div className="footer sm:text-xs sm:p-2 sm:w-[95%]">
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
            className="skip-intro-btn sm:top-4 sm:right-4 sm:py-2 sm:px-4 sm:text-sm"
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
