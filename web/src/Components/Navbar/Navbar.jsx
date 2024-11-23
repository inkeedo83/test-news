import { tabs } from "../../assets/text.constant";
import { useState, useEffect, useRef } from "react";
import Weather from "../Weather/Weather";
import { Link } from "react-router-dom";

const { MAIN, PROVINCE, CITY, POLITICS, ECONOMICS, LAWS, ACCDENT } = tabs;

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
        console.log(menuRef.current);
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
        <div className=" flex items-center justify-between m-10 h-2 ">
          <div className="">
            <button onClick={ToggelBtn}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className=" h-8 w-10 sm:w-24 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />{" "}
              </svg>
            </button>
          </div>

          <h1 className="NewsTitle">مــراســل بـلـجـيـكـا</h1>
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
                      to={`/ReadArticleByCat/${CITY.AR1ID}`}
                      className="links m-2"
                    >
                      {CITY.AR1}
                    </Link>
                  </button>
                </div>

                <div className="flex flex-row  items-top p-2 ">
                  <button onClick={ToggelBtn}>
                    <Link
                      to={`/ReadArticleByCat/${CITY.AR2ID}`}
                      className="links m-2"
                    >
                      {CITY.AR2}
                    </Link>
                  </button>
                </div>

                <div className="flex flex-row items-top p-2">
                  <button onClick={ToggelBtn}>
                    <Link
                      to={`/ReadArticleByCat/${CITY.AR3ID}`}
                      className="links m-2"
                    >
                      {CITY.AR3}
                    </Link>
                  </button>
                </div>

                <div className="flex flex-row items-top p-1 ">
                  <button onClick={ToggelBtn}>
                    <Link
                      to={`/ReadArticleByCat/${PROVINCE.AR1ID}`}
                      className="links m-2"
                    >
                      {PROVINCE.AR1}
                    </Link>
                  </button>
                </div>
                <div className="flex flex-row items-top p-2">
                  <button onClick={ToggelBtn}>
                    <Link
                      to={`/ReadArticleByCat/${PROVINCE.AR2ID}`}
                      className="links m-2"
                    >
                      {PROVINCE.AR2}
                    </Link>
                  </button>
                </div>
                <div className="flex flex-row items-top p-2">
                  <button onClick={ToggelBtn}>
                    <Link
                      to={`/ReadArticleByCat/${PROVINCE.AR3ID}`}
                      className="links"
                    >
                      {PROVINCE.AR3}
                    </Link>
                  </button>
                </div>
                <div className="flex flex-row items-top p-3">
                  <button onClick={ToggelBtn}>
                    <Link
                      to={`/ReadArticleByCat/${POLITICS.ARID}`}
                      className="links m-2"
                    >
                      {POLITICS.AR}
                    </Link>
                  </button>
                </div>
                <div className="flex flex-row items-top  p-3">
                  <button onClick={ToggelBtn}>
                    <Link
                      to={`/ReadArticleByCat/${LAWS.ARID}`}
                      className="links m-2"
                    >
                      {LAWS.AR}
                    </Link>
                  </button>
                </div>
                <div className="flex flex-row items-top  p-3">
                  <button onClick={ToggelBtn}>
                    <Link
                      href={`/ReadArticleByCat/${ECONOMICS.ARID}`}
                      className="links m-2"
                    >
                      {ECONOMICS.AR}
                    </Link>
                  </button>
                </div>
                <div className="flex flex-row items-top  p-3">
                  <button onClick={ToggelBtn}>
                    <Link
                      href={`/ReadArticleByCat/${ACCDENT.ARID}`}
                      className="links align-top m-2"
                    >
                      {ACCDENT.AR}
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
