import { useLanguage } from "../context/LanguageContext";
import { LOCALIZATION } from "../assets/localization";
import { CATEGORIES } from "../assets/categories.constant";

/**
 * Hook for getting localized text
 * @returns {Object} Object with functions for getting localized text
 */
export const useLocalization = () => {
  const { language } = useLanguage();

  /**
   * Gets localized text from a localization object
   * @param {Object} textObj - Object with localized strings (AR, EN)
   * @returns {String} Localized text
   */
  const getText = (textObj) => {
    if (!textObj) return "";
    return textObj[language] || textObj["AR"] || "";
  };

  /**
   * Gets localized text by path in the LOCALIZATION object
   * @param {String} path - Path to text in the LOCALIZATION object (e.g., "SEARCH.PLACEHOLDER")
   * @returns {String} Localized text
   */
  const getLocalizedText = (path) => {
    if (!path) return "";

    const keys = path.split(".");
    let textObj = LOCALIZATION;

    for (const key of keys) {
      if (!textObj[key]) return "";
      textObj = textObj[key];
    }

    return getText(textObj);
  };

  /**
   * Gets localized category name
   * @param {String} categoryId - Category ID
   * @returns {String} Localized category name
   */
  const getCategoryName = (categoryId) => {
    if (!categoryId) return "";

    const category = Object.values(CATEGORIES).find(
      (cat) => cat.ID === categoryId
    );

    if (!category) return categoryId;
    return category[language] || category.AR || categoryId;
  };

  return {
    language,
    getText,
    getLocalizedText,
    getCategoryName,
  };
};
