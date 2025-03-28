import { createContext, useState, useEffect, useContext } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get language settings from localStorage if they exist
    const storedPreference = localStorage.getItem("language");
    // Default to Arabic as it's the original language of the application
    return storedPreference ? storedPreference : "AR";
  });

  useEffect(() => {
    // Update localStorage when language changes
    localStorage.setItem("language", language);
    // Also add attribute to html to indicate text direction
    if (language === "AR") {
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "AR" ? "EN" : "AR"));
  };

  const setLanguagePreference = (lang) => {
    if (lang === "AR" || lang === "EN") {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, setLanguagePreference }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
