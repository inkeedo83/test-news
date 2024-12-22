import { CATEGORIES } from "../../assets/categories.constant";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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
} = CATEGORIES;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchData, setSearchData] = useState("");
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
          <div className="  relative bottom-14 items-center justify-between p-6 h-4 ">
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
            <ul>
              <div className="flex flex-rows-1 items-center">
                <div className=" text-white rounded-sm   m-2 hover:text-black hover:bg-white">
                  <button>
                    <Link to={`/`} target="_blank">
                      {MAIN.AR}
                    </Link>
                  </button>
                </div>

                <div className=" text-white rounded-sm p-2 m-2 hover:text-black hover:bg-white">
                  <button>
                    <Link to={`/categories/${BRUSSELS.ID}`} target="_blank">
                      {BRUSSELS.AR}
                    </Link>
                  </button>
                </div>

                <div className=" text-white rounded-sm p-2  m-2 hover:text-black hover:bg-white">
                  <button>
                    <Link to={`/categories/${ANTWERP.ID}`} target="_blank">
                      {ANTWERP.AR}
                    </Link>
                  </button>
                </div>

                <div className=" text-white rounded-sm p-2  m-2 hover:text-black hover:bg-white">
                  <button>
                    <Link to={`/categories/${LIEGE.ID}`} target="_blank">
                      {LIEGE.AR}
                    </Link>
                  </button>
                </div>

                <div className=" text-white rounded-sm p-2 m-2 hover:text-black hover:bg-white">
                  <button>
                    <Link to={`/categories/${FLANDERS.ID}`} target="_blank">
                      {FLANDERS.AR}
                    </Link>
                  </button>
                </div>
                <div className=" text-white rounded-sm  p-2 m-2 hover:text-black hover:bg-white">
                  <button>
                    <Link to={`/categories/${WALLONIA.ID}`} target="_blank">
                      {WALLONIA.AR}
                    </Link>
                  </button>
                </div>
                <div className=" text-white rounded-sm p-2 m-2 hover:text-black hover:bg-white">
                  <button>
                    <Link to={`/categories/${GERMANOPHONE.ID}`} target="_blank">
                      {GERMANOPHONE.AR}
                    </Link>
                  </button>
                </div>
                <div className=" text-white rounded-sm p-2  m-2 hover:text-black hover:bg-white">
                  <button>
                    <Link to={`/categories/${POLITIC.ID}`} target="_blank">
                      {POLITIC.AR}
                    </Link>
                  </button>
                </div>
                <div className=" text-white rounded-sm p-2 m-2 hover:text-black hover:bg-white">
                  <button>
                    <Link to={`/categories/${LAW.ID}`} target="_blank">
                      {LAW.AR}
                    </Link>
                  </button>
                </div>
                <div className=" text-white rounded-sm p-2 m-2 hover:text-black hover:bg-white">
                  <button>
                    <Link to={`/categories/${ECONOMIC.ID}`} target="_blank">
                      {ECONOMIC.AR}
                    </Link>
                  </button>
                </div>
                <div className=" text-white rounded-sm p-2 m-2 hover:text-black hover:bg-white">
                  <button>
                    <Link to={`/categories/${ACCIDENT.ID}`} target="_blank">
                      {ACCIDENT.AR}
                    </Link>
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
                      }}
                      type="button"
                      className="flex items-center justify-center bg-red-950 hover:bg-red-800  sm:bg-red-900 sm:hover:bg-red-950 px-6 py-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 192.904 192.904"
                        width="22px"
                        className="fill-white"
                      >
                        <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                      </svg>
                    </button>
                  </Link>
                </div>
                {/* searchbarend*/}
              </div>
            </ul>
          </div>
        )}

        {isOpen ? (
          <div
            className=" absolute  top-18  min-h-screen  w-50 p-5 z-50 text-center bg-red-950  "
            ref={menuRef}
          >
            <ul className=" grid grid-cols-1 ">
              <div className=" text-white rounded-sm  hover:text-black hover:bg-white">
                <button onClick={ToggelBtn}>
                  <Link to={`/`} target="_blank">
                    {MAIN.AR}
                  </Link>
                </button>
              </div>
              <div className=" text-white rounded-sm  m-2 hover:text-black hover:bg-white">
                <button onClick={ToggelBtn}>
                  <Link to={`/categories/${BRUSSELS.ID}`} target="_blank">
                    {BRUSSELS.AR}
                  </Link>
                </button>
              </div>
              <div className=" text-white rounded-sm  m-2 hover:text-black hover:bg-white">
                <button onClick={ToggelBtn}>
                  <Link to={`/categories/${ANTWERP.ID}`} target="_blank">
                    {ANTWERP.AR}
                  </Link>
                </button>
              </div>
              <div className=" text-white rounded-sm  m-2 hover:text-black hover:bg-white">
                <button onClick={ToggelBtn}>
                  <Link to={`/categories/${LIEGE.ID}`} target="_blank">
                    {LIEGE.AR}
                  </Link>
                </button>
              </div>
              <div className=" text-white rounded-sm  m-2 hover:text-black hover:bg-white">
                <button onClick={ToggelBtn}>
                  <Link to={`/categories/${FLANDERS.ID}`} target="_blank">
                    {FLANDERS.AR}
                  </Link>
                </button>
              </div>
              <div className=" text-white rounded-sm  m-2 hover:text-black hover:bg-white">
                <button onClick={ToggelBtn}>
                  <Link to={`/categories/${WALLONIA.ID}`} target="_blank">
                    {WALLONIA.AR}
                  </Link>
                </button>
              </div>
              <div className=" text-white rounded-sm  m-2 hover:text-black hover:bg-white">
                <button onClick={ToggelBtn}>
                  <Link to={`/categories/${GERMANOPHONE.ID}`} target="_blank">
                    {GERMANOPHONE.AR}
                  </Link>
                </button>
              </div>
              <div className=" text-white rounded-sm  m-2 hover:text-black hover:bg-white">
                <button onClick={ToggelBtn}>
                  <Link to={`/categories/${POLITIC.ID}`} target="_blank">
                    {POLITIC.AR}
                  </Link>
                </button>
              </div>
              <div className=" text-white rounded-sm  m-2 hover:text-black hover:bg-white">
                <button onClick={ToggelBtn}>
                  <Link to={`/categories/${LAW.ID}`} target="_blank">
                    {LAW.AR}
                  </Link>
                </button>
              </div>
              <div className=" text-white rounded-sm  m-2 hover:text-black hover:bg-white">
                <button onClick={ToggelBtn}>
                  <Link to={`/categories/${ECONOMIC.ID}`} target="_blank">
                    {ECONOMIC.AR}
                  </Link>
                </button>
              </div>
              <div className=" text-white rounded-sm  m-2 hover:text-black hover:bg-white">
                <button onClick={ToggelBtn}>
                  <Link to={`/categories/${ACCIDENT.ID}`} target="_blank">
                    {ACCIDENT.AR}
                  </Link>
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
                    className="flex items-center justify-center bg-red-950 hover:bg-red-800  sm:bg-red-900 sm:hover:bg-red-950 px-6 py-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 192.904 192.904"
                      width="22px"
                      className="fill-white"
                    >
                      <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                    </svg>
                  </button>
                </Link>
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
