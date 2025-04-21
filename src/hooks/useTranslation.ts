// /src/hooks/useTranslation.ts
import { useContext } from "react";
import translations from "../i18n";
import { SettingsContext } from "../context/SettingsContext";

export const useTranslation = () => {
  const { language } = useContext(SettingsContext);

  const t = (key: keyof typeof translations["en"]) => {
    return translations[language][key] || key;
  };

  return { t };
};
