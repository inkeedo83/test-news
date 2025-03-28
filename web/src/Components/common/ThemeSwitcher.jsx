import { useDarkMode } from "../../hooks/useDarkMode";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { RiSunLine } from "react-icons/ri";
import PropTypes from "prop-types";

/**
 * Component for switching between dark/light theme
 * @param {Object} props - Component properties
 * @param {String} props.className - Additional style classes
 * @returns {React.ReactElement} Theme switcher component
 */
export default function ThemeSwitcher({ className = "" }) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className={`flex items-center justify-center rounded-lg p-1 ${className}`}
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <RiSunLine className="text-yellow-400 hover:text-yellow-300 size-[30px]" />
      ) : (
        <BsFillMoonStarsFill className="text-blue-500/100 hover:text-blue-500 size-[22px]" />
      )}
    </button>
  );
}

ThemeSwitcher.propTypes = {
  className: PropTypes.string,
};
