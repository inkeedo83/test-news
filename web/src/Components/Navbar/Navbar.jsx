import { tabs } from "../../assets/text.constant";
import { useState, useEffect, useRef } from "react";
import Weather from "../Weather/Weather";
import { Link } from "react-router-dom";

const { MAIN, PROVINCE, CITY, POLITICS, ECONOMICS, LAWS, ACCDENT } = tabs;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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
      <nav className=" bg-red-900 md:text-md h-fit sm:text-xl " ref={menuRef}>
        <div className=" flex items-center justify-between ">
          <div className="">
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className=" h-8 w-14 sm:w-24 "
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
          <Weather />
        </div>
        {isOpen ? (
          <div className=" absolute z-10 min-h-screen flex flex-col w-fit p-6 text-center bg-gray-800 ">
            <ul className=" flex flex-col m-1 z-10 ">
              <div className="flex flex-row items-top p-3 ">
                <Link
                  to={`/`}
                  className="links  items-center  gap-4 flex flex-row p-2 m-2"
                >
                  {MAIN.AR}
                </Link>
              </div>

              <div className="flex  flex-row items-top  p-3">
                <Link
                  to={`/ReadArticleByCat/${CITY.AR1ID}`}
                  className="links m-2"
                >
                  {CITY.AR1}
                </Link>
              </div>

              <div className="flex flex-row  items-top p-2 ">
                <Link
                  to={`/ReadArticleByCat/${CITY.AR2ID}`}
                  className="links m-2"
                >
                  {CITY.AR2}
                </Link>
              </div>

              <div className="flex flex-row items-top p-2">
                <Link
                  to={`/ReadArticleByCat/${CITY.AR3ID}`}
                  className="links m-2"
                >
                  {CITY.AR3}
                </Link>
              </div>

              <div className="flex flex-row items-top p-1 ">
                <Link
                  to={`/ReadArticleByCat/${PROVINCE.AR1ID}`}
                  className="links m-2"
                >
                  {PROVINCE.AR1}
                </Link>
              </div>
              <div className="flex flex-row items-top p-2">
                <Link
                  to={`/ReadArticleByCat/${PROVINCE.AR2ID}`}
                  className="links m-2"
                >
                  {PROVINCE.AR2}
                </Link>
              </div>
              <div className="flex flex-row items-top p-2">
                <Link
                  to={`/ReadArticleByCat/${PROVINCE.AR3ID}`}
                  className="links"
                >
                  {PROVINCE.AR3}
                </Link>
              </div>
              <div className="flex flex-row items-top p-3">
                <Link
                  to={`/ReadArticleByCat/${POLITICS.ARID}`}
                  className="links m-2"
                >
                  {POLITICS.AR}
                </Link>
              </div>
              <div className="flex flex-row items-top  p-3">
                <Link
                  to={`/ReadArticleByCat/${LAWS.ARID}`}
                  className="links m-2"
                >
                  {LAWS.AR}
                </Link>
              </div>
              <div className="flex flex-row items-top  p-3">
                <Link
                  href={`/ReadArticleByCat/${ECONOMICS.ARID}`}
                  className="links m-2"
                >
                  {ECONOMICS.AR}
                </Link>
              </div>
              <div className="flex flex-row items-top  p-3">
                <Link
                  href={`/ReadArticleByCat/${ACCDENT.ARID}`}
                  className="links align-top m-2"
                >
                  {ACCDENT.AR}
                </Link>
              </div>
            </ul>
          </div>
        ) : null}
      </nav>{" "}
    </>
  );
}

export default Navbar;
