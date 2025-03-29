import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Always use Arabic language
  const [language] = useState("AR");

  useEffect(() => {
    // Always set Arabic in localStorage
    localStorage.setItem("language", "AR");
    // Set text direction to RTL for Arabic
    document.documentElement.setAttribute("dir", "rtl");
  }, []);

  // Save functions for possible future use
  const toggleLanguage = () => {
    // Function is disabled but kept for future use
    console.log("Language switching is disabled, only Arabic is available");
    return;
  };

  const setLanguagePreference = () => {
    // Function is disabled but kept for future use
    console.log("Language switching is disabled, only Arabic is available");
    return;
  };

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, setLanguagePreference }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
