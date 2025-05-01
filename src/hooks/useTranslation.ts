import { useContext } from "react";
import translations from "../i18n";
import { SettingsContext } from "../context/SettingsContext";

// Function to handle dynamic keys (like category.economy, category.sports)
const getNestedTranslation = (obj: any, path: string) => {
  const keys = path.split('.');
  let current = obj;

  for (let key of keys) {
    current = current[key];
    if (!current) return null;  // Return null if the path doesn't exist
  }
  return current;
};

// Relaxed t() type to allow dynamic keys like category.*, country.*
export const useTranslation = () => {
  const { language } = useContext(SettingsContext);

  const t = (key: string) => {
    const translation = getNestedTranslation(translations[language], key);
    return translation || key;  // Fallback to the key if not found
  };

  return { t, language };
};

// Utility to translate dynamic keys, fallback if not found
export const translateDynamic = (
  t: (key: string) => string,
  key: string,
  fallback: string
): string => {
  console.log(`Translating key: ${key}`); // Debugging key translation
  const translated = t(key);
  if (translated === key || !translated) {
    console.log(`Key not found, falling back to: ${fallback}`);
    return fallback;
  }
  return translated;
};

export default useTranslation;
