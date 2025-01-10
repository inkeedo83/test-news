import { CATEGORIES } from "../../assets/categories.constant";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaSun } from "react-icons/fa6";
import { BsFillMoonStarsFill } from "react-icons/bs";

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

function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchData, setSearchData] = useState("");

  const DarkMode = props.DarkTheme;
  const ChangeDarkMode = props.changeDarkTheme;

  const ToggelBtn = () => {
    setIsOpen(!isOpen);
  };

  let menuRef = useRef();
  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const screen = window.screen.width > 960;

  return (
    <>
      <nav className="   fixed bg-red-900 md:text-md w-full sm:w-screen z-10 sm:text-xl ">
        <h1 className="NewsTitle text-md sm:text-2xl  p-2 text-white relative right-28 sm:right-[42vw]">
          مــراســل بـلـجـيـكـا
        </h1>

        {!screen ? (
          <div className="  relative bottom-[66px] md:right-[700px] start-72 items-center justify-between p-6 h-4 ">
            <div className="">
              <button onClick={ToggelBtn}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="white"
                  className=" h-10 w-10 sm:w-24  mt-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                  />{" "}
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/*  start desktop view */}
            <ul>
              <div className="flex flex-rows-1 items-center">
                <div className=" text-white rounded-sm   m-2 hover:text-black hover:bg-white">
                  {/* horizantal btn */}
                  <button>
                    <Link to={`/`} target="_blank">
                      {MAIN.AR}
                    </Link>
                  </button>
                </div>

                <div className=" text-white rounded-sm p-2 m-2 hover:text-black hover:bg-white">
                  <button>
                    <Link to={`/categories/${BRUSSELS.ID}`}>{BRUSSELS.AR}</Link>
                  </button>
                </div>

                <div className=" text-white rounded-sm p-2  m-2 hover:text-black hover:bg-white">
                  <button>
                    <Link to={`/categories/${ANTWERP.ID}`}>{ANTWERP.AR}</Link>
                  </button>
                </div>

                <div className=" text-white rounded-sm p-2  m-2 hover:text-black hover:bg-white">
                  <button>
                    <Link to={`/categories/${LIEGE.ID}`}>{LIEGE.AR}</Link>
                  </button>
                </div>

                <div className=" text-white rounded-sm p-2 m-2 hover:text-black hover:bg-white">
                  <button>
                    <Link to={`/categories/${FLANDERS.ID}`}>{FLANDERS.AR}</Link>
                  </button>
                </div>
                <div className=" text-white rounded-sm  p-2 m-2 hover:text-black hover:bg-white">
                  <button>
                    <Link to={`/categories/${WALLONIA.ID}`}>{WALLONIA.AR}</Link>
                  </button>
                </div>
                <div className=" text-white rounded-sm p-2 m-2 hover:text-black hover:bg-white">
                  <button>
                    <Link to={`/categories/${GERMANOPHONE.ID}`}>
                      {GERMANOPHONE.AR}
                    </Link>
                  </button>
                </div>
                <div className=" text-white rounded-sm p-2  m-2 hover:text-black hover:bg-white">
                  <button>
                    <Link to={`/categories/${POLITIC.ID}`}>{POLITIC.AR}</Link>
                  </button>
                </div>
                <div className=" text-white rounded-sm p-2 m-2 hover:text-black hover:bg-white">
                  <button>
                    <Link to={`/categories/${LAW.ID}`}>{LAW.AR}</Link>
                  </button>
                </div>
                <div className=" text-white rounded-sm p-2 m-2 hover:text-black hover:bg-white">
                  <button>
                    <Link to={`/categories/${ECONOMIC.ID}`}>{ECONOMIC.AR}</Link>
                  </button>
                </div>
                <div className=" text-white rounded-sm p-2 m-2 hover:text-black hover:bg-white">
                  <button>
                    <Link to={`/categories/${ACCIDENT.ID}`}>{ACCIDENT.AR}</Link>
                  </button>
                </div>
                <div className=" text-white rounded-sm p-2 m-2 hover:text-black hover:bg-white">
                  <button>
                    <Link to={`/categories/${CULTURE.ID}`}>{CULTURE.AR}</Link>
                  </button>
                </div>
                {/*  start change to dark or light theme
                 */}

                {/*  end change to dark or light theme
                 */}

                {/* searchbarstart */}

                <div className="flex rounded-full border-2    border-white overflow-hidden max-w-md mx-auto font-[sans-serif]">
                  <input
                    onChange={(e) => setSearchData(e.target.value)}
                    type="text"
                    placeholder="ابحث هنا..."
                    className="w-full outline-none bg-white text-sm px-3 sm:px-5 py-1 sm:py-3"
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
                      className="flex items-center justify-center sm:bg-red-900 sm:bg-red-900 sm:hover:bg-red-950 px-6 py-4"
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
                  <div className="h-[50px] w-[70px]  flex justify-center items-center ">
                    <button
                      onClick={() => ChangeDarkMode(!DarkMode)}
                      className="size-10  "
                    >
                      <BsFillMoonStarsFill className="fill-gray-950  mt-[1px]   hover:size-[25px] size-[23px] rounded-xl block dark:hidden mr-1" />
                      <FaSun className="fill-yellow-300  hover:fill-yellow-200 hover:size-[25px] size-[23px] hidden dark:block mr-1" />
                    </button>
                  </div>
                </div>
                {/* searchbarend*/}
              </div>
            </ul>
            {/*  end desktop view */}
          </div>
        )}
        {/*  start mobile view */}
        {isOpen ? (
          <div
            className=" absolute  opacity-90  top-[40px]  min-h-screen  w-screen p-5 z-50 text-center bg-black   "
            ref={menuRef}
          >
            <ul className=" grid grid-cols-1 ">
              <div className=" text-white rounded-sm  hover:text-black hover:bg-white">
                <button className="hover:h-14" onClick={ToggelBtn}>
                  <Link to={`/`}>{MAIN.AR}</Link>
                </button>
              </div>
              <div className=" text-white rounded-sm  m-2 hover:text-black hover:bg-white">
                <button className="hover:h-14" onClick={ToggelBtn}>
                  <Link to={`/categories/${BRUSSELS.ID}`}>{BRUSSELS.AR}</Link>
                </button>
              </div>
              <div className=" text-white rounded-sm  m-2 hover:text-black hover:bg-white">
                <button className="hover:h-14" onClick={ToggelBtn}>
                  <Link to={`/categories/${ANTWERP.ID}`}>{ANTWERP.AR}</Link>
                </button>
              </div>
              <div className=" text-white rounded-sm  m-2 hover:text-black hover:bg-white">
                <button className="hover:h-14" onClick={ToggelBtn}>
                  <Link to={`/categories/${LIEGE.ID}`}>{LIEGE.AR}</Link>
                </button>
              </div>
              <div className=" text-white rounded-sm  m-2 hover:text-black hover:bg-white">
                <button className="hover:h-14" onClick={ToggelBtn}>
                  <Link to={`/categories/${FLANDERS.ID}`}>{FLANDERS.AR}</Link>
                </button>
              </div>
              <div className=" text-white rounded-sm  m-2 hover:text-black hover:bg-white">
                <button className="hover:h-14" onClick={ToggelBtn}>
                  <Link to={`/categories/${WALLONIA.ID}`}>{WALLONIA.AR}</Link>
                </button>
              </div>
              <div className=" text-white rounded-sm  m-2 hover:text-black hover:bg-white">
                <button className="hover:h-14" onClick={ToggelBtn}>
                  <Link to={`/categories/${GERMANOPHONE.ID}`}>
                    {GERMANOPHONE.AR}
                  </Link>
                </button>
              </div>
              <div className=" text-white rounded-sm  m-2 hover:text-black hover:bg-white">
                <button className="hover:h-14" onClick={ToggelBtn}>
                  <Link to={`/categories/${POLITIC.ID}`}>{POLITIC.AR}</Link>
                </button>
              </div>
              <div className=" text-white rounded-sm  m-2 hover:text-black hover:bg-white">
                <button className="hover:h-14" onClick={ToggelBtn}>
                  <Link to={`/categories/${LAW.ID}`}>{LAW.AR}</Link>
                </button>
              </div>
              <div className=" text-white rounded-sm  m-2 hover:text-black hover:bg-white">
                <button className="hover:h-14" onClick={ToggelBtn}>
                  <Link to={`/categories/${ECONOMIC.ID}`}>{ECONOMIC.AR}</Link>
                </button>
              </div>
              <div className=" text-white rounded-sm  m-2 hover:text-black hover:bg-white">
                <button className="hover:h-14" onClick={ToggelBtn}>
                  <Link to={`/categories/${ACCIDENT.ID}`}>{ACCIDENT.AR}</Link>
                </button>
              </div>

              {/* searchbarstart */}

              <div className="flex rounded-full border-2 border-white overflow-hidden max-w-md mx-auto font-[sans-serif]">
                <input
                  onChange={(e) => setSearchData(e.target.value)}
                  type="text"
                  placeholder="ابحث هنا..."
                  className="w-full outline-none bg-white text-sm px-3 sm:px-5 py-1 sm:py-3"
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
                    className="flex items-center justify-center bg-black  px-6 py-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 192.904 192.904"
                      width="22px"
                      className="fill-white "
                    >
                      <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                    </svg>
                  </button>
                </Link>
                <div>
                  <button
                    onClick={() => ChangeDarkMode(!DarkMode)}
                    className="h-12 w-12 rounded-lg p-1 mt-1 "
                  >
                    <BsFillMoonStarsFill className="fill-sky-900 hover:fill-sky-500 hover:size-8 size-6 rounded-xl block dark:hidden" />
                    <FaSun className="fill-yellow-500  hover:fill-yellow-400 hover:size-8 size-6 hidden dark:block" />
                  </button>
                </div>
              </div>

              {/* searchbarend*/}
            </ul>
          </div>
        ) : null}
      </nav>
    </>
  );
}

export default Navbar;
