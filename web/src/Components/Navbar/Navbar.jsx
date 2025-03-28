import { CATEGORIES } from "../../assets/categories.constant";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Weather from "../Weather/Weather";
import { useLocalization } from "../../hooks/useLocalization";
import LanguageSwitcher from "../common/LanguageSwitcher";
import ThemeSwitcher from "../common/ThemeSwitcher";

const {
  MAIN,
  FLANDERS,
  WALLONIA,
  BRUSSELS,
  ANTWERP,
  LIEGE,
  GERMANOPHONE,
  POLITIC,
  LAW,
  ECONOMIC,
  ACCIDENT,
  CULTURE,
} = CATEGORIES;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [showWeather, setShowWeather] = useState(true);
  const { getText, getLocalizedText } = useLocalization();

  const ToggelBtn = () => {
    setIsOpen(!isOpen);
  };

  let menuRef = useRef();
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const screen = window.screen.width > 960;

  useEffect(() => {
    const controlWeather = () => {
      if (window.scrollY > 0) {
        setShowWeather(false);
      } else {
        setShowWeather(true);
      }
    };

    window.addEventListener("scroll", controlWeather);
    return () => window.removeEventListener("scroll", controlWeather);
  }, []);

  return (
    <>
      <nav className="fixed bg-gradient-to-r from-red-900/90 to-black dark:from-slate-900 dark:to-black md:text-md w-full sm:w-screen z-10 sm:text-xl">
        <div className="container mx-auto">
          {/* Top Bar */}
          <div className="flex place-content-center py-2">
            <span className="logo animate-wave text-2xl mt-2 text-white font-extrabold">
              {getLocalizedText("SITE_NAME")}
            </span>
          </div>
          <div
            className={`
                overflow-hidden transition-all duration-300
                ${showWeather ? "h-28 opacity-100" : "h-0 opacity-0"}
                `}
          >
            <div className="flex justify-center px-4 py-2">
              <Weather />
            </div>
          </div>

          {!screen ? (
            <div className="flex justify-between items-center">
              <button className="relative bottom-5 " onClick={ToggelBtn}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="white"
                  className="h-10 w-10 sm:w-24 mt-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                  />
                </svg>
              </button>
              <div className="flex items-center">
                <LanguageSwitcher className="mr-2" />
                <ThemeSwitcher />
              </div>
            </div>
          ) : (
            <div>
              {/*  start desktop view */}
              <ul className="flex items-center justify-center space-x-4">
                {[
                  { id: MAIN.ID, label: getText(MAIN), link: "/" },
                  {
                    id: BRUSSELS.ID,
                    label: getText(BRUSSELS),
                    link: `/categories/${BRUSSELS.ID}`,
                  },
                  {
                    id: ANTWERP.ID,
                    label: getText(ANTWERP),
                    link: `/categories/${ANTWERP.ID}`,
                  },
                  {
                    id: LIEGE.ID,
                    label: getText(LIEGE),
                    link: `/categories/${LIEGE.ID}`,
                  },
                  {
                    id: FLANDERS.ID,
                    label: getText(FLANDERS),
                    link: `/categories/${FLANDERS.ID}`,
                  },
                  {
                    id: WALLONIA.ID,
                    label: getText(WALLONIA),
                    link: `/categories/${WALLONIA.ID}`,
                  },
                  {
                    id: GERMANOPHONE.ID,
                    label: getText(GERMANOPHONE),
                    link: `/categories/${GERMANOPHONE.ID}`,
                  },
                  {
                    id: POLITIC.ID,
                    label: getText(POLITIC),
                    link: `/categories/${POLITIC.ID}`,
                  },
                  {
                    id: LAW.ID,
                    label: getText(LAW),
                    link: `/categories/${LAW.ID}`,
                  },
                  {
                    id: ECONOMIC.ID,
                    label: getText(ECONOMIC),
                    link: `/categories/${ECONOMIC.ID}`,
                  },
                  {
                    id: ACCIDENT.ID,
                    label: getText(ACCIDENT),
                    link: `/categories/${ACCIDENT.ID}`,
                  },
                  {
                    id: CULTURE.ID,
                    label: getText(CULTURE),
                    link: `/categories/${CULTURE.ID}`,
                  },
                ].map((category) => (
                  <li
                    key={category.id}
                    className="text-white rounded-sm p-2 m-2 hover:text-black hover:bg-white dark:hover:bg-slate-700 dark:hover:text-white"
                  >
                    <Link to={category.link}>{category.label}</Link>
                  </li>
                ))}
                {/* searchbarstart */}
                <div className="flex rounded-full border-2 border-white dark:border-slate-600 overflow-hidden max-w-md mx-auto font-[sans-serif]">
                  <input
                    onChange={(e) => setSearchData(e.target.value)}
                    type="text"
                    placeholder={getLocalizedText("SEARCH.PLACEHOLDER")}
                    className="w-full outline-none bg-white dark:bg-slate-800 dark:text-white text-sm px-3 sm:px-5 py-1 sm:py-3"
                  />
                  <Link
                    to={
                      searchData === ""
                        ? `/articles/pattern/??`
                        : `/articles/pattern/${searchData}`
                    }
                  >
                    <button
                      onClick={() => {
                        searchData;
                      }}
                      type="button"
                      className="flex items-center justify-center sm:bg-red-900 sm:hover:bg-red-950 px-6 py-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 192.904 192.904"
                        width="20px"
                        className="fill-white"
                      >
                        <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                      </svg>
                    </button>
                  </Link>
                </div>
                <div className="flex items-center">
                  <LanguageSwitcher className="pr-2" />
                  <ThemeSwitcher />
                </div>
              </ul>
              {/* searchbarend */}
            </div>
          )}
          {/*  start mobile view */}
          {isOpen ? (
            <div
              className="absolute  left-0 top-[70px] w-screen min-h-screen  p-28 z-50 text-center text-black bg-white dark:bg-slate-900 dark:text-white"
              ref={menuRef}
            >
              <ul className="grid grid-cols-1 space-y-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-1 left-1 size-10 border-2 rounded-md dark:border-white border-red-700 text-black dark:text-white"
                >
                  {getLocalizedText("BUTTONS.CLOSE")}
                </button>
                {[
                  { id: MAIN.ID, label: getText(MAIN), link: "/" },
                  {
                    id: BRUSSELS.ID,
                    label: getText(BRUSSELS),
                    link: `/categories/${BRUSSELS.ID}`,
                  },
                  {
                    id: ANTWERP.ID,
                    label: getText(ANTWERP),
                    link: `/categories/${ANTWERP.ID}`,
                  },
                  {
                    id: LIEGE.ID,
                    label: getText(LIEGE),
                    link: `/categories/${LIEGE.ID}`,
                  },
                  {
                    id: FLANDERS.ID,
                    label: getText(FLANDERS),
                    link: `/categories/${FLANDERS.ID}`,
                  },
                  {
                    id: WALLONIA.ID,
                    label: getText(WALLONIA),
                    link: `/categories/${WALLONIA.ID}`,
                  },
                  {
                    id: GERMANOPHONE.ID,
                    label: getText(GERMANOPHONE),
                    link: `/categories/${GERMANOPHONE.ID}`,
                  },
                  {
                    id: POLITIC.ID,
                    label: getText(POLITIC),
                    link: `/categories/${POLITIC.ID}`,
                  },
                  {
                    id: LAW.ID,
                    label: getText(LAW),
                    link: `/categories/${LAW.ID}`,
                  },
                  {
                    id: ECONOMIC.ID,
                    label: getText(ECONOMIC),
                    link: `/categories/${ECONOMIC.ID}`,
                  },
                  {
                    id: ACCIDENT.ID,
                    label: getText(ACCIDENT),
                    link: `/categories/${ACCIDENT.ID}`,
                  },
                  {
                    id: CULTURE.ID,
                    label: getText(CULTURE),
                    link: `/categories/${CULTURE.ID}`,
                  },
                ].map((category) => (
                  <li
                    key={category.id}
                    className="list-none m-4 hover:text-red-700 text-xl
                    hover:bg-slate-100 dark:hover:bg-white/5 dark:hover:text-white/80 rounded-md"
                  >
                    <Link onClick={() => setIsOpen(false)} to={category.link}>
                      {category.label}
                    </Link>
                  </li>
                ))}
                {/* Mobile searchbar */}
                <div className="flex rounded-full mt-4 border border-red-700 dark:border-white overflow-hidden mx-auto font-[sans-serif] w-full max-w-md">
                  <input
                    onChange={(e) => setSearchData(e.target.value)}
                    type="text"
                    placeholder={getLocalizedText("SEARCH.PLACEHOLDER")}
                    className="w-full outline-none bg-white dark:bg-slate-800 text-black dark:text-white px-3 py-2"
                  />
                  <Link
                    to={
                      searchData === ""
                        ? `/articles/pattern/??`
                        : `/articles/pattern/${searchData}`
                    }
                  >
                    <button
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      type="button"
                      className="flex items-center justify-center bg-red-700 hover:bg-red-800 dark:bg-slate-700 dark:hover:bg-slate-600 px-4 py-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 192.904 192.904"
                        width="20px"
                        className="fill-white"
                      >
                        <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                      </svg>
                    </button>
                  </Link>
                </div>
              </ul>
            </div>
          ) : null}
        </div>
      </nav>
      <div className="h-[150px]"></div>
    </>
  );
}

export default Navbar;
