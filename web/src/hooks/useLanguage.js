import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

/**
 * Hook for accessing language state and language-related functions
 * @returns {Object} Object with language state and language control functions
 */
export const useLanguage = () => useContext(LanguageContext);
