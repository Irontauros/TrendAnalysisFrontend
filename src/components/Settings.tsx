import React from "react";
import { useTranslation } from "../hooks/useTranslation";
import { SettingsContext } from "../context/SettingsContext";

type Props = {
  onClose: () => void;
};

export const Settings: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();
  const {
    language,
    setLanguage,
    seriousMode,
    setSeriousMode,
  } = React.useContext(SettingsContext);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#1e293b",
          color: "#fff",
          padding: "2rem",
          borderRadius: "1rem",
          width: "90%",
          maxWidth: "400px",
          boxShadow: "0 0 20px #71fafc",
          position: "relative",
        }}
      >
        <h2 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>{t("settings")}</h2>

        {/* Language toggle */}
        <div style={{ marginBottom: "1rem" }}>
          <label>{t("language")}:</label>
          <div style={{ marginTop: "0.5rem" }}>
            <button
              onClick={() => setLanguage("pt")}
              style={{
                marginRight: "1rem",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                background: language === "pt" ? "#6366f1" : "#334155",
                color: "#fff",
                border: "none",
              }}
            >
              Português
            </button>
            <button
              onClick={() => setLanguage("en")}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                background: language === "en" ? "#6366f1" : "#334155",
                color: "#fff",
                border: "none",
              }}
            >
              English
            </button>
          </div>
        </div>

        {/* Serious mode toggle */}
        <div style={{ marginBottom: "1rem" }}>
          <label>🎯 Serious Mode:</label>
          <div style={{ marginTop: "0.5rem" }}>
            <button
              onClick={() => setSeriousMode(true)}
              style={{
                marginRight: "1rem",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                background: seriousMode ? "#6366f1" : "#334155",
                color: "#fff",
                border: "none",
              }}
            >
              On
            </button>
            <button
              onClick={() => setSeriousMode(false)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                background: !seriousMode ? "#6366f1" : "#334155",
                color: "#fff",
                border: "none",
              }}
            >
              Off
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          ✖
        </button>
      </div>
    </div>
  );
};
