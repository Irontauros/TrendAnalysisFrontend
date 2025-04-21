import React, { createContext, useState } from "react";

export interface SettingsContextType {
  language: string;
  setLanguage: (lang: string) => void;
  seriousMode: boolean;
  setSeriousMode: (mode: boolean) => void;
}

export const SettingsContext = createContext<SettingsContextType>({} as SettingsContextType);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState("pt"); // was "en"
  const [seriousMode, setSeriousMode] = useState(false);

  return (
    <SettingsContext.Provider
      value={{
        language,
        setLanguage,
        seriousMode,
        setSeriousMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
