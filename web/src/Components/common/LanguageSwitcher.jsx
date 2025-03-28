import { useLanguage } from "../../hooks/useLanguage";
import { MdLanguage } from "react-icons/md";
import PropTypes from "prop-types";

/**
 * Component for switching language
 * @param {Object} props - Component properties
 * @param {String} props.className - Additional style classes
 * @returns {React.ReactElement} Language switcher component
 */
export default function LanguageSwitcher({ className = "" }) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`flex flex-col items-center justify-center rounded-lg p-1 ${className}`}
      aria-label="Toggle language"
    >
      <MdLanguage className="text-white hover:text-gray-200 size-[24px]" />
      <span className="text-xs text-white">{language}</span>
    </button>
  );
}

LanguageSwitcher.propTypes = {
  className: PropTypes.string,
};
