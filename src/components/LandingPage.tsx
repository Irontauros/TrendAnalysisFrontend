// src/components/Landing.tsx
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useTranslation } from "../hooks/useTranslation";

const Landing = () => {
  const [showContent, setShowContent] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="landing-page">
      <video
        className="landing-video"
        src="/intro.mp4"
        autoPlay
        muted
        playsInline
      />
      {showContent && (
        <div className="landing-overlay fade-in">
          <Navbar onOpenSettings={() => {}} />
          <h1 className="welcome-text">{t("welcome")}</h1>
        </div>
      )}
    </div>
  );
};

export default Landing;
