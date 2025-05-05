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
          {/* Vídeo de fundo (loop) */}
          <video
            className="background-video"
            src="/bgg.mp4"
            autoPlay
            muted
            loop
            playsInline
          />

          {/* Navbar no topo */}
          <Navbar onOpenSettings={onOpenSettings} />

          {/* Conteúdo principal: grelha 3x2 e footer */}
          <div className="landing-boxes-wrapper">
            <div className="landing-boxes">
{/* 1ª linha */}
<div className="note top-left">{t("intro.welcome")}</div>
<div className="note top-right">{t("intro.graphs")}</div>
<div className="note">{t("intro.settings")}</div> {/* centro topo */}

{/* 2ª linha */}
<div className="note bottom-left">{t("intro.prediction")}</div>
<div className="note bottom-right">{t("intro.compare")}</div>
<div className="note">{t("intro.mix")}</div> {/* centro fundo */}

            </div>
          </div>

          {/* Footer fixo no fundo */}
          <div className="footer">{t("footer")}</div>
        </>
      ) : (
        <>
          {/* Vídeo de introdução */}
          <video
            ref={videoRef}
            className="landing-video"
            src="/intro.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
          />

          {/* Botão para ignorar introdução */}
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
