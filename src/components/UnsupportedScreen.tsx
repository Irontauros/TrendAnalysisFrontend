// src/components/UnsupportedScreen.tsx

import React from "react";
import { useTranslation } from "../hooks/useTranslation"; 

const UnsupportedScreen: React.FC = () => {
  const { t } = useTranslation(); 

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-[#0d1b2a] text-white text-center px-6"
      style={{
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        minWidth: "100vw",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div className="max-w-md">
        <h1 className="text-4xl font-bold mb-6">{t("unsupported.title")}</h1>
        <p className="text-lg mb-4">{t("unsupported.description")}</p>
        <p className="text-md mb-6">{t("unsupported.instruction")}</p>
        <p className="text-sm opacity-60">{t("unsupported.minWidth")}</p>
      </div>
    </div>
  );
};

export default UnsupportedScreen;
