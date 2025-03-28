import { Link } from "react-router-dom";
import { CATEGORIES } from "../../assets/categories.constant";
import { useLocalization } from "../../hooks/useLocalization";

function Footer() {
  const {
    POLITIC,
    BRUSSELS,
    ANTWERP,
    FLANDERS,
    WALLONIA,
    LIEGE,
    GERMANOPHONE,
    ECONOMIC,
    LAW,
    ACCIDENT,
  } = CATEGORIES;

  const { getText, getLocalizedText } = useLocalization();

  return (
    <footer className="w-full bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              {getLocalizedText("FOOTER.ABOUT_US.TITLE")}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href=""
                  className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  {getLocalizedText("FOOTER.ABOUT_US.ABOUT")}
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  {getLocalizedText("FOOTER.ABOUT_US.TERMS")}
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  {getLocalizedText("FOOTER.ABOUT_US.PRIVACY")}
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              {getLocalizedText("FOOTER.QUICK_LINKS.TITLE")}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: BRUSSELS.ID, category: BRUSSELS },
                { id: ANTWERP.ID, category: ANTWERP },
                { id: LIEGE.ID, category: LIEGE },
                { id: FLANDERS.ID, category: FLANDERS },
                { id: WALLONIA.ID, category: WALLONIA },
                { id: GERMANOPHONE.ID, category: GERMANOPHONE },
                { id: POLITIC.ID, category: POLITIC },
                { id: LAW.ID, category: LAW },
                { id: ECONOMIC.ID, category: ECONOMIC },
                { id: ACCIDENT.ID, category: ACCIDENT },
              ].map((item) => (
                <Link
                  key={item.id}
                  to={`/categories/${item.id}`}
                  className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  {getText(item.category)}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              {getLocalizedText("FOOTER.CONTACT.TITLE")}
            </h3>
            <div className="flex flex-wrap gap-4">
              {[
                {
                  href: "http://facebook.com",
                  icon: "M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z",
                },
                {
                  href: "http://instagram.com",
                  icon: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z",
                },
                {
                  href: "http://tiktok.com",
                  icon: "M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-gray-600 dark:text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 448 512"
                  >
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            {getLocalizedText("BUTTONS.BACK_TO_TOP")}
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
