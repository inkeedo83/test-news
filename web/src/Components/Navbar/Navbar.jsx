import { tabs } from "../../assets/text.constant";
import { useState } from "react";
import Weather from "../Weather/Weather";

const { MAIN, PROVINCE, CITY, POLITICS, ECONOMICS, LAWS, ACCDENT } = tabs;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className=" bg-red-900 md:text-md h-fit sm:text-xl ">
        <div className=" flex items-center justify-between  ">
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

          <h1 className="text-white font-extrabold">العربي بلجيكا</h1>
          <Weather />
        </div>
        {isOpen ? (
          <div className=" absolute z-10 min-h-screen flex flex-col w-fit p-6 text-center bg-red-800 ">
            <ul className=" flex flex-col m-1 z-10 ">
              <div className="flex flex-row items-top p-3 ">
                <img
                  className="h-10 w-22 "
                  src="https://img.icons8.com/external-outline-wichaiwi/64/FFFFFF/external-belgium-european-cities-landmarks-outline-wichaiwi.png"
                  alt="main"
                />

                <a href={`/`} className="links m-2">
                  {MAIN.AR}
                </a>
              </div>

              <div className="flex  flex-row items-top  p-3">
                <img
                  className="h-10 w-22 "
                  src="https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/60/FFFFFF/external-atomium-wonder-of-the-world-vitaliy-gorbachev-fill-vitaly-gorbachev.png"
                  alt="brussel"
                />

                <a
                  href={`/ReadArticleByCat/${CITY.AR1ID}`}
                  className="links m-2"
                >
                  {CITY.AR1}
                </a>
              </div>
              <div className="flex flex-row  items-top p-2 ">
                <img
                  className="h-10 w-22 "
                  src="/src/assets/svg/Antwerpen.svg"
                  alt="Antwerpen"
                />
                <a href={`/ReadArticleByCat/${"SPORT"}`} className="links m-2">
                  {CITY.AR2}
                </a>
              </div>
              <div className="flex flex-row items-top p-2">
                <img
                  className="h-10 w-22 "
                  src="/src/assets/svg/Liege.svg"
                  alt="liege"
                />
                <a href={`/ReadArticleByCat/${"SPORT"}`} className="links m-2">
                  {CITY.AR3}
                </a>
              </div>

              <div className="flex flex-row items-top p-1 ">
                <img
                  className=" h-10 w-22"
                  src="/src/assets/svg/flanders.svg"
                  alt="Flanders"
                />
                <a
                  href={`/ReadArticleByCat/${PROVINCE.AR1ID}`}
                  className="links m-2"
                >
                  {PROVINCE.AR1}
                </a>
              </div>
              <div className="flex flex-row items-top p-2">
                <img
                  className="h-10 w-22 "
                  src="/src/assets/svg/walloni.svg"
                  alt="Walloni"
                />
                <a href={`/ReadArticleByCat/${"SPORT"}`} className="links m-2">
                  {PROVINCE.AR2}
                </a>
              </div>
              <div className="flex flex-row items-top p-2">
                <img
                  className="h-10 w-10 "
                  src="/src/assets/svg/germanophon.svg"
                  alt="Germanofon"
                />
                <a href={`/ReadArticleByCat/${"SPORT"}`} className="links">
                  {PROVINCE.AR3}
                </a>
              </div>
              <div className="flex flex-row items-top p-3">
                <img
                  className="h-10 w-22 "
                  src="/src/assets/svg/politics.svg"
                  alt="politics"
                />
                <a
                  href={`/ReadArticleByCat/${CITY.AR1ID}`}
                  className="links m-2"
                >
                  {POLITICS.AR}
                </a>
              </div>
              <div className="flex flex-row items-top  p-3">
                <img
                  className="h-10 w-22 "
                  src="/src/assets/svg/law.svg"
                  alt="law"
                />
                <a
                  href={`/ReadArticleByCat/${CITY.AR1ID}`}
                  className="links m-2"
                >
                  {LAWS.AR}
                </a>
              </div>
              <div className="flex flex-row items-top  p-3">
                <img
                  className="h-10 w-22 "
                  src="/src/assets/svg/ECONOMICS.svg"
                  alt="ECONOMICS"
                />
                <a
                  href={`/ReadArticleByCat/${CITY.AR1ID}`}
                  className="links m-2"
                >
                  {ECONOMICS.AR}
                </a>
              </div>
              <div className="flex flex-row items-top  p-3">
                <img
                  className="h-10 w-22 "
                  src="/src/assets/svg/crime.svg"
                  alt="Crime"
                />
                <a
                  href={`/ReadArticleByCat/${CITY.AR1ID}`}
                  className="links align-top m-2"
                >
                  {ACCDENT.AR}
                </a>
              </div>
            </ul>
          </div>
        ) : null}
      </nav>{" "}
    </>
  );
}

export default Navbar;
