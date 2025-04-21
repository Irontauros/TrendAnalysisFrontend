import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"; // ✅ import here

const Landing = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 3000); // show after 3s
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
          <Navbar onOpenSettings={() => {}} /> {/* ✅ show only after 3s */}
          <h1 className="welcome-text">Welcome</h1>
        </div>
      )}
    </div>
  );
};

export default Landing;
