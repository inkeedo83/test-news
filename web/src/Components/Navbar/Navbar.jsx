import { tabs } from "../../assets/text.constant";
import { useState } from "react";
import Weather from "../Weather/Weather";
import { Preyer } from "../Pr/preyer";

const {
  MAIN,
  BELGUIM,
  PROVINCE,
  CITY,
  POLITICS,
  ECONOMICS,
  LAWS,
  HEALTH,
  CULTURE,
  SHOPPING,
  WEATHER,
} = tabs;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className=" bg-red-700 text-xl ">
        <div className=" flex items-center justify-between">
          <div className="md:hidden">
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
          {/*  desktop view */}
          <Weather />
          <ul className=" hidden md:flex  m-1 z-1 space-x-2 p-2 ps-4">
            <a href={`/ReadArticleByCat/${"SPORT"}`} className="links">
              {CITY.AR3}
            </a>
            <a href={`/ReadArticleByCat/${"SPORT"}`} className="links">
              {CITY.AR2}
            </a>
            <a href={`/ReadArticleByCat/${"بروكسل"}`} className="links">
              {CITY.AR1}
            </a>

            <a href={`/`} className="links">
              {MAIN.AR}
            </a>
          </ul>
          <div className=" logo  "> العربي بلجيكا </div>
        </div>
        {/*mobile view */}
        {isOpen ? (
          <div className=" absolute z-10 h-screen  flex flex-col w-content p-6 text-left md:hidden bg-red-700 ">
            <ul className=" flex flex-col m-1 z-10 space-x-2 p-2 ps-4">
              <a href={`/`} className="links">
                {MAIN.AR}
              </a>
              <a href={`/ReadArticleByCat/${"SPORT"}`} className="links">
                {BELGUIM.AR}
              </a>
              <a href={`/ReadArticleByCat/${"SPORT"}`} className="links">
                {PROVINCE.AR1}
              </a>
              <a href={`/ReadArticleByCat/${"SPORT"}`} className="links">
                {PROVINCE.AR2}
              </a>
              <a href={`/ReadArticleByCat/${"SPORT"}`} className="links">
                {CITY.AR1}
              </a>
              <a href={`/ReadArticleByCat/${"SPORT"}`} className="links">
                {CITY.AR2}
              </a>
              <a href={`/ReadArticleByCat/${"SPORT"}`} className="links">
                {CITY.AR3}
              </a>
            </ul>
          </div>
        ) : null}
      </nav>{" "}
    </>
  );
}

export default Navbar;
