import { CATEGORIES } from "../../assets/categories.constant";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Weather from "../Weather/Weather";

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

  return (
    <>
      <nav className="   fixed bg-red-900 md:text-md w-full sm:w-screen z-10 sm:text-xl ">
        <h1 className="NewsTitle relative right-28 p-1 sm:right-[42vw]">
          مــراســل بـلـجـيـكـا
        </h1>

        <div className=" flex items-center justify-between p-10 h-4 ">
          <div className="">
            <button onClick={ToggelBtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className=" h-10 w-10 sm:w-24 "
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

        {isOpen ? (
          <div
            className=" absolute  min-h-screen flex flex-col w-fit p-6 text-center bg-slate-800 "
            ref={menuRef}
          >
            <ul className=" flex flex-col m-1 z-10 ">
              <div>
                <div className="flex flex-row items-top p-3 ">
                  <button onClick={ToggelBtn}>
                    <Link to={`/`} className="links m-2">
                      {MAIN.AR}
                    </Link>
                  </button>
                </div>

                <div className="flex  flex-row items-top  p-3">
                  <button onClick={ToggelBtn}>
                    <Link
                      to={`/categories/${BRUSSELS.ID}`}
                      className="links m-2"
                    >
                      {BRUSSELS.AR}
                    </Link>
                  </button>
                </div>

                <div className="flex flex-row  items-top p-2 ">
                  <button onClick={ToggelBtn}>
                    <Link
                      to={`/categories/${ANTWERP.ID}`}
                      className="links m-2"
                    >
                      {ANTWERP.AR}
                    </Link>
                  </button>
                </div>

                <div className="flex flex-row items-top p-2">
                  <button onClick={ToggelBtn}>
                    <Link to={`/categories/${LIEGE.ID}`} className="links m-2">
                      {LIEGE.AR}
                    </Link>
                  </button>
                </div>

                <div className="flex flex-row items-top p-1 ">
                  <button onClick={ToggelBtn}>
                    <Link
                      to={`/categories/${FLANDERS.ID}`}
                      className="links m-2"
                    >
                      {FLANDERS.AR}
                    </Link>
                  </button>
                </div>
                <div className="flex flex-row items-top p-2">
                  <button onClick={ToggelBtn}>
                    <Link
                      to={`/categories/${WALLONIA.ID}`}
                      className="links m-2"
                    >
                      {WALLONIA.AR}
                    </Link>
                  </button>
                </div>
                <div className="flex flex-row items-top p-2">
                  <button onClick={ToggelBtn}>
                    <Link
                      to={`/categories/${GERMANOPHONE.ID}`}
                      className="links"
                    >
                      {GERMANOPHONE.AR}
                    </Link>
                  </button>
                </div>
                <div className="flex flex-row items-top p-3">
                  <button onClick={ToggelBtn}>
                    <Link
                      to={`/categories/${POLITIC.ID}`}
                      className="links m-2"
                    >
                      {POLITIC.AR}
                    </Link>
                  </button>
                </div>
                <div className="flex flex-row items-top  p-3">
                  <button onClick={ToggelBtn}>
                    <Link to={`/categories/${LAW.ID}`} className="links m-2">
                      {LAW.AR}
                    </Link>
                  </button>
                </div>
                <div className="flex flex-row items-top  p-3">
                  <button onClick={ToggelBtn}>
                    <Link
                      href={`/categories/${ECONOMIC.ID}`}
                      className="links m-2"
                    >
                      {ECONOMIC.AR}
                    </Link>
                  </button>
                </div>
                <div className="flex flex-row items-top  p-3">
                  <button onClick={ToggelBtn}>
                    <Link
                      href={`/categories/${ACCIDENT.ID}`}
                      className="links align-top m-2"
                    >
                      {ACCIDENT.AR}
                    </Link>
                  </button>
                </div>
              </div>
            </ul>
          </div>
        ) : null}
      </nav>{" "}
    </>
  );
}

export default Navbar;
