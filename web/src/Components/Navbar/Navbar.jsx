import { CATEGORIES } from "../../assets/categories.constant";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import WeatherWidget from "../Weather/WeatherWidget";
import { useLocalization } from "../../hooks/useLocalization";
// import ThemeSwitcher from "../common/ThemeSwitcher";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { RiSunLine } from "react-icons/ri";
import { useDarkMode } from "../../hooks/useDarkMode";

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
  HEALTH,
  EDUCATION,
  LOCAL_EVENTS,
  ARAB_COMMUNITY_NEWS,
} = CATEGORIES;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [showWeather, setShowWeather] = useState(true);
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // Use DarkModeContext
  const [showRegions, setShowRegions] = useState(false); // Add this new state
  const [showMobileRegions, setShowMobileRegions] = useState(false); // Add new state for mobile regions menu
  const [showCities, setShowCities] = useState(false); // New state for desktop cities submenu
  const [showMobileCities, setShowMobileCities] = useState(false); // New state for mobile cities submenu

  const { getText, getLocalizedText } = useLocalization();

  const ToggleBtn = () => {
    setIsOpen(!isOpen);
  };

  const handleMobileMenuSwitch = () => {
    setShowMobileRegions(!showMobileRegions);
  };

  const handleMobileCitiesMenuSwitch = () => {
    setShowMobileCities(!showMobileCities);
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

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const screen = screenWidth > 960;

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <nav className="fixed bg-gradient-to-r from-rose-950 to-black  dark:from-slate-900 dark:to-black md:text-md w-full sm:w-screen z-10 sm:text-xl">
      <div className="container mx-auto">
        {/* Top Bar and Weather Section */}
        <div className="flex flex-col">
          <div className="flex justify-center py-2">
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
            <div className="flex justify-center items-center px-4 py-2">
              <WeatherWidget />
            </div>
          </div>
        </div>
        {!screen ? (
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={ToggleBtn}
              aria-label="Open mobile menu"
              className="relative bottom-5 focus:outline-none"
            >
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
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="h-12 w-12 rounded-lg p-1 focus:outline-none"
            >
              {isDarkMode ? (
                <RiSunLine className="text-yellow-400 hover:text-yellow-300 text-2xl" />
              ) : (
                <BsFillMoonStarsFill className="text-blue-100 hover:text-blue-500 text-xl" />
              )}
            </button>
          </div>
        ) : (
          <div>
            {/* Start desktop view */}
            <ul className="flex items-center justify-center">
              {[
                { id: MAIN.ID, label: MAIN.AR, link: "/" },
                { id: "weather", label: "الطقس", link: "/weather" },
              ].map((category) => (
                <li
                  key={category.id}
                  className="text-white rounded-sm p-2 hover:text-black hover:bg-white dark:hover:bg-slate-700 dark:hover:text-white"
                >
                  <Link to={category.link}>{category.label}</Link>
                </li>
              ))}
              {/* Region Submenu */}
              <div className="relative static">
                <button
                  onMouseEnter={() => setShowRegions(true)}
                  onMouseLeave={() => setShowRegions(false)}
                  className="text-white rounded-sm p-2 hover:text-black hover:bg-white dark:hover:bg-slate-700 dark:hover:text-white"
                >
                  اقاليم{" "}
                </button>
                <div
                  onMouseEnter={() => setShowRegions(true)}
                  onMouseLeave={() => setShowRegions(false)}
                  className={`absolute left-0 w-full bg-gradient-to-r from-red-900/90 to-black dark:from-slate-900 dark:to-black
                      transform transition-all duration-300 origin-top border-t border-red-800
                      ${
                        showRegions
                          ? "scale-y-100 opacity-100"
                          : "scale-y-0 opacity-0"
                      }`}
                  style={{
                    position: "fixed",
                    left: "0",
                    right: "0",
                  }}
                >
                  <div className="container mx-auto flex justify-center items-center gap-16 py-6">
                    {[
                      {
                        id: FLANDERS.ID,
                        label: FLANDERS.AR,
                        link: `/categories/${FLANDERS.ID}`,
                      },
                      {
                        id: WALLONIA.ID,
                        label: WALLONIA.AR,
                        link: `/categories/${WALLONIA.ID}`,
                      },
                      {
                        id: GERMANOPHONE.ID,
                        label: GERMANOPHONE.AR,
                        link: `/categories/${GERMANOPHONE.ID}`,
                      },
                    ].map((region) => (
                      <Link
                        key={region.id}
                        to={region.link}
                        className="text-white text-lg p-3 hover:bg-white hover:text-black dark:hover:bg-slate-700 dark:hover:text-white"
                      >
                        {region.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {/* Cities Submenu */}
              <div className="relative static">
                <button
                  onMouseEnter={() => setShowCities(true)}
                  onMouseLeave={() => setShowCities(false)}
                  className="text-white rounded-sm p-2 hover:text-black hover:bg-white dark:hover:bg-slate-700 dark:hover:text-white"
                >
                  مدن{" "}
                </button>
                <div
                  onMouseEnter={() => setShowCities(true)}
                  onMouseLeave={() => setShowCities(false)}
                  className={`absolute left-0 w-full bg-gradient-to-r from-red-900/90 to-black dark:from-slate-900 dark:to-black transform transition-all duration-300 origin-top border-t border-red-800 ${
                    showCities
                      ? "scale-y-100 opacity-100"
                      : "scale-y-0 opacity-0"
                  }`}
                  style={{
                    position: "fixed",
                    left: "0",
                    right: "0",
                  }}
                >
                  <div className="container mx-auto flex justify-center items-center gap-16 py-6">
                    {[
                      {
                        id: BRUSSELS.ID,
                        label: BRUSSELS.AR,
                        link: `/categories/${BRUSSELS.ID}`,
                      },
                      {
                        id: ANTWERP.ID,
                        label: ANTWERP.AR,
                        link: `/categories/${ANTWERP.ID}`,
                      },
                      {
                        id: LIEGE.ID,
                        label: LIEGE.AR,
                        link: `/categories/${LIEGE.ID}`,
                      },
                    ].map((city) => (
                      <Link
                        key={city.id}
                        to={city.link}
                        className="text-white text-lg p-3 hover:bg-white hover:text-black dark:hover:bg-slate-700 dark:hover:text-white"
                      >
                        {city.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {[
                {
                  id: POLITIC.ID,
                  label: POLITIC.AR,
                  link: `/categories/${POLITIC.ID}`,
                },
                { id: LAW.ID, label: LAW.AR, link: `/categories/${LAW.ID}` },
                {
                  id: ECONOMIC.ID,
                  label: ECONOMIC.AR,
                  link: `/categories/${ECONOMIC.ID}`,
                },
                {
                  id: ACCIDENT.ID,
                  label: ACCIDENT.AR,
                  link: `/categories/${ACCIDENT.ID}`,
                },
                {
                  id: CULTURE.ID,
                  label: CULTURE.AR,
                  link: `/categories/${CULTURE.ID}`,
                },
                {
                  id: HEALTH.ID,
                  label: HEALTH.AR,
                  link: `/categories/${HEALTH.ID}`,
                },
                {
                  id: EDUCATION.ID,
                  label: EDUCATION.AR,
                  link: `/categories/${EDUCATION.ID}`,
                },
                {
                  id: ARAB_COMMUNITY_NEWS.ID,

                  label: ARAB_COMMUNITY_NEWS.AR,

                  link: `/categories/ARAB_COMMUNITY_NEWS`,
                },

                {
                  id: LOCAL_EVENTS.ID,
                  label: LOCAL_EVENTS.AR,
                  link: `/categories/${LOCAL_EVENTS.ID}`,
                },
              ].map((category) => (
                <li
                  key={category.id}
                  className="text-white rounded-sm p-2 hover:text-black hover:bg-white dark:hover:bg-slate-700 dark:hover:text-white"
                >
                  <Link to={category.link}>{category.label}</Link>
                </li>
              ))}
              {/* searchbar start */}
              <div
                className={`flex rounded-xl border mb-1 border-white/40 overflow-hidden transition-all duration-300 mx-auto
                      ${
                        document.activeElement?.tagName === "INPUT"
                          ? "w-[500px]"
                          : "w-[200px]"
                      }`}
              >
                <input
                  onChange={(e) => setSearchData(e.target.value)}
                  type="text"
                  placeholder="ابحث هنا..."
                  className="w-full bg-white/10 text-white px-4 py-3 outline-none"
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
                    className="flex items-center justify-center sm:bg-red-950 sm:hover:bg-red-900 dark:sm:hover:bg-gray-900 px-6 py-4"
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
              <button onClick={toggleDarkMode} className="p-2 pr-0">
                {isDarkMode ? (
                  <RiSunLine className="text-yellow-400 hover:text-yellow-300 size-[30px]" />
                ) : (
                  <BsFillMoonStarsFill className="text-blue-100 hover:text-blue-500 size-[22px]" />
                )}
              </button>
            </ul>
            {/* searchbar end */}
          </div>
        )}
        {/* start mobile view */}
        {isOpen && (
          <div
            className="absolute left-0 top-[64px] w-screen min-h-screen z-50 text-center text-white bg-gradient-to-r from-rose-950 to-black dark:text-gray-200 dark:bg-gradient-to-r dark:from-gray-950 dark:via-zinc-950 dark:to-gray-950"
            ref={menuRef}
          >
            <div className="flex flex-col h-[calc(100vh-70px)] relative">
              {/* Close Button */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowMobileRegions(false);
                  setShowMobileCities(false);
                }}
                className="absolute top-4 right-4 size-10 border-4 rounded-full border-white text-white/90 transition-all hover:rotate-90 duration-300 z-50"
              >
                ×
              </button>
              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto px-4 pt-16 pb-4">
                {!showMobileRegions && !showMobileCities ? (
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: MAIN.ID, label: MAIN.AR, link: "/" },
                      { id: "weather", label: "الطقس", link: "/weather" },
                      {
                        id: "regions",
                        label: "اقاليم",
                        action: handleMobileMenuSwitch,
                      },
                      {
                        id: "cities",
                        label: "مدن",
                        action: handleMobileCitiesMenuSwitch,
                      },
                      {
                        id: POLITIC.ID,
                        label: POLITIC.AR,
                        link: `/categories/${POLITIC.ID}`,
                      },
                      {
                        id: LAW.ID,
                        label: LAW.AR,
                        link: `/categories/${LAW.ID}`,
                      },
                      {
                        id: ECONOMIC.ID,
                        label: ECONOMIC.AR,
                        link: `/categories/${ECONOMIC.ID}`,
                      },
                      {
                        id: ACCIDENT.ID,
                        label: ACCIDENT.AR,
                        link: `/categories/${ACCIDENT.ID}`,
                      },
                      {
                        id: CULTURE.ID,
                        label: CULTURE.AR,
                        link: `/categories/${CULTURE.ID}`,
                      },
                      {
                        id: HEALTH.ID,
                        label: HEALTH.AR,
                        link: `/categories/${HEALTH.ID}`,
                      },
                      {
                        id: EDUCATION.ID,
                        label: EDUCATION.AR,
                        link: `/categories/${EDUCATION.ID}`,
                      },
                      {
                        id: ARAB_COMMUNITY_NEWS.ID,

                        label: ARAB_COMMUNITY_NEWS.AR,

                        link: `/categories/ARAB_COMMUNITY_NEWS`,
                      },

                      {
                        id: LOCAL_EVENTS.ID,
                        label: LOCAL_EVENTS.AR,
                        link: `/categories/${LOCAL_EVENTS.ID}`,
                      },
                    ].map((item) => (
                      <div
                        key={item.id}
                        className="bg-white/10 hover:bg-white/30 rounded-xl transition-all duration-300"
                      >
                        {item.action ? (
                          <button
                            onClick={item.action}
                            className="block w-full p-4 text-white text-center"
                          >
                            {item.label}
                          </button>
                        ) : (
                          <Link
                            to={item.link}
                            onClick={ToggleBtn}
                            className="block w-full p-4 text-white"
                          >
                            {item.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                ) : showMobileRegions ? (
                  <div className="grid grid-cols-2 gap-2">
                    {/* Back Button */}
                    <div className="col-span-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 mb-4">
                      <button
                        onClick={() => setShowMobileRegions(false)}
                        className="block w-full p-4 text-white"
                      >
                        العودة الى القائمة السابقة
                      </button>
                    </div>
                    {[
                      {
                        id: FLANDERS.ID,
                        label: FLANDERS.AR,
                        link: `/categories/${FLANDERS.ID}`,
                      },
                      {
                        id: WALLONIA.ID,
                        label: WALLONIA.AR,
                        link: `/categories/${WALLONIA.ID}`,
                      },
                      {
                        id: GERMANOPHONE.ID,
                        label: GERMANOPHONE.AR,
                        link: `/categories/${GERMANOPHONE.ID}`,
                      },
                    ].map((region) => (
                      <div
                        key={region.id}
                        className="bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300"
                      >
                        <Link
                          to={region.link}
                          onClick={() => {
                            setShowMobileRegions(false);
                            setIsOpen(false);
                          }}
                          className="block w-full p-4 text-white"
                        >
                          {region.label}
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {/* Back Button */}
                    <div className="col-span-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 mb-4">
                      <button
                        onClick={() => setShowMobileCities(false)}
                        className="block w-full p-4 text-white"
                      >
                        العودة الى القائمة السابقة
                      </button>
                    </div>
                    {[
                      {
                        id: BRUSSELS.ID,
                        label: BRUSSELS.AR,
                        link: `/categories/${BRUSSELS.ID}`,
                      },
                      {
                        id: ANTWERP.ID,
                        label: ANTWERP.AR,
                        link: `/categories/${ANTWERP.ID}`,
                      },
                      {
                        id: LIEGE.ID,
                        label: LIEGE.AR,
                        link: `/categories/${LIEGE.ID}`,
                      },
                    ].map((city) => (
                      <div
                        key={city.id}
                        className="bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300"
                      >
                        <Link
                          to={city.link}
                          onClick={() => {
                            setShowMobileCities(false);
                            setIsOpen(false);
                          }}
                          className="block w-full p-4 text-white"
                        >
                          {city.label}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
                {/* Search Bar moved below categories */}
                <div className="mt-4"></div>
                <div
                  className={`flex rounded-xl border border-white/20 overflow-hidden transition-all duration-300 mx-auto
                            ${
                              document.activeElement?.tagName === "INPUT"
                                ? "w-[350px]"
                                : "w-[200px]"
                            }`}
                >
                  <input
                    onChange={(e) => setSearchData(e.target.value)}
                    type="text"
                    placeholder="ابحث هنا..."
                    className="w-full bg-white/10 text-white px-4 py-3 outline-none"
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
                        setIsOpen(false);
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
              </div>
            </div>
          </div>
        )}
        {/* searchbarend */}
      </div>
    </nav>
  );
}

export default Navbar;
