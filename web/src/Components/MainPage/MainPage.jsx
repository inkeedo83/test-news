import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { OneArtical } from "../OneArtical/OneArtical";
import baseUrl from "../../assets/contants";
import MainPageCat from "../MainPageCat/MainPageCat";
import { tabs } from "../../assets/text.constant";
import LatestNews from "../LatestNews/LatestNews";

const { CITY, POLITICS, PROVINCE } = tabs;

export default function MainPageTest() {
  //screen render
  const screen = window.screen.width > 500;
  const width = screen ? (
    <div className=" text-white sm:text-sm sm:p-2  m-1 ">
      <LatestNews />
    </div>
  ) : null;

  /*states*/
  const [isloading, setIsloading] = useState(true);
  const [data, setData] = useState([]);
  const render = data.map((item) => (
    <div key={item.id} className="m-2 relative max-w-xl mx-auto m-6 mx-1 ">
      <div className="absolute inset-0  bg-gray-700 opacity-20  rounded-md"></div>

      <div className="absolute sm:h-8 sm:w-auto top-1 opacity-90 flex  justify-center m-1 ">
        <Link to={`/ReadArticleByCat/${item.category.id}`}>
          <h3 className="text-white text-center sm:text-lg w-auto rounded-md h-18 sm:w-fit  p-1 mr-2 mt-2 text-xs bg-red-900  sm:font-bold">
            {item.category.name}
          </h3>
        </Link>
      </div>
      <img
        src={item.image}
        className="border-4 bg-white border-red-900 p-3 w-[800px] h-[28vh] sm:h-[350px]"
      />
      <div className="absolute sm:bottom-3 bottom-1  sm:h-26 opacity-70 m-1 ">
        <Link to={`/ReadArticleByID/${item.id}`}>
          <h2 className=" hover:text-red-700 text-white text-xs sm:text-lg sm:w-[30.2vw] text-justify rounded-md h-[10vh] sm:w-auto sm:h-34 p-2 sm:p-4 sm:mr-4 bg-gray-900 sm:font-bold">
            {item.title}
          </h2>
        </Link>
      </div>
    </div>
  ));

  // fetch start here
  useEffect(() => {
    fetch(
      `${baseUrl}/public/articles?limit=12&offset=${Math.floor(
        Math.random() * 20
      )}`
    )
      .then((res) => {
        const resulte = res.json();
        return resulte;
      })
      .then((resulte) => {
        setData(resulte.data);
      })

      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {data === null ? (
        isloading && (
          <span className=" bg-red-900 bold text-xl h-30 ">is loading </span>
        )
      ) : (
        <>
          <div className="grid bg-white ">
            <div className=" mt-40 sm:mt-32 grid grid-cols-1 h-30 sm:grid-cols-2 grid-rows-1 sm:grid-rows-1 ">
              <div className="">
                <OneArtical />
              </div>
              <div>{width}</div>
            </div>
            <div className="  bg-white border-red-900 text-xs  justify-items-center grid grid-cols-2 grid-rows-4 gap-1 sm:grid-cols-3 sm:grid-rows-3  ">
              {render}
            </div>
          </div>

          <MainPageCat id={POLITICS.ARID} cat={POLITICS.AR} />
          <span className="bg-white border-2 border-red-900 text-black">
            ads
          </span>
          <MainPageCat id={CITY.AR1ID} cat={CITY.AR1} />
          <span className="bg-white border-2 border-red-900 text-black">
            ads
          </span>
          <MainPageCat id={CITY.AR2ID} cat={CITY.AR2} />
          <span className="bg-white border-2 border-red-900 text-black">
            ads
          </span>
          <MainPageCat id={PROVINCE.AR1ID} cat={PROVINCE.AR1} />
          <span className="bg-white border-2 border-red-900 text-black">
            ads
          </span>

          <MainPageCat id={PROVINCE.AR2ID} cat={PROVINCE.AR2} />
        </>
      )}
    </>
  );
}
