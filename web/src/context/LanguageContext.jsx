import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Всегда используем арабский язык
  const [language] = useState("AR");

  useEffect(() => {
    // Всегда устанавливаем арабский в localStorage
    localStorage.setItem("language", "AR");
    // Устанавливаем направление текста RTL для арабского
    document.documentElement.setAttribute("dir", "rtl");
  }, []);

  // Сохраняем функции для возможного использования в будущем
  const toggleLanguage = () => {
    // Функция отключена, но сохранена для будущего использования
    console.log("Language switching is disabled, only Arabic is available");
    return;
  };

  const setLanguagePreference = () => {
    // Функция отключена, но сохранена для будущего использования
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
