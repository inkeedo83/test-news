import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

/**
 * Hook for accessing dark mode state and toggling functionality
 * @returns {Object} Object with dark mode state and toggle function
 */
export const useDarkMode = () => useContext(DarkModeContext);
