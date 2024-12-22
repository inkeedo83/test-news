import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { OneArtical } from "../OneArtical/OneArtical";
import baseUrl from "../../assets/contants";
import MainPageCat from "../MainPageCat/MainPageCat";
import LatestNews from "../LatestNews/LatestNews";
import { CATEGORIES } from "../../assets/categories.constant";
import BeReporter from "../../assets/BeReporter.png";

const {
  POLITIC,
  BRUSSELS,
  ANTWERP,
  FLANDERS,
  WALLONIA,
  LIEGE,
  GERMANOPHONE,
  ECONOMIC,
  LAW,
  CULTURE,
  ACCIDENT,
} = CATEGORIES;

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

  // fetch start here
  useEffect(() => {
    fetch(
      `${baseUrl}/public/articles?limit=12&offset=${Math.floor(
        Math.random() * 2
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
            <h3 className=" mt-24 relative sm:top-[46px] sm:mr-0 sm:ml-0  top-[33px] mt-1  mb-[1px] text-white sm:text-lg w-auto text-center rounded-sm h-18 sm:w-fit p-3  sm:p-2 text-xs bg-red-900  sm:font-bold">
              اخبار متنوعه
            </h3>
            <div className="  grid grid-cols-1  sm:grid-cols-2 grid-rows-1 sm:grid-rows-1 ">
              <OneArtical />

              <div>{width}</div>
            </div>
            {/*  6 div  */}
            <div className=" grid grid-cols-2   grid-rows-6 sm:grid-cols-3 sm:grid-rows-4 ">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="m-2 relative max-w-xl mx-auto mx-1 "
                >
                  <div className="absolute inset-0  bg-gray-700 opacity-20  rounded-md"></div>
                  <div className="absolute sm:h-fit sm:w-auto top-1 opacity-90 flex  justify-center m-1 ">
                    <Link to={`/categories/${item.category}`}>
                      <h2 className=" hover:text-black text-white text-center sm:text-lg w-auto rounded-sm h-18 sm:w-fit  p-1 mt-2 text-xs bg-red-900 sm:font-bold">
                        {CATEGORIES[item.category].AR}
                      </h2>
                    </Link>
                  </div>

                  <img
                    src={
                      item.image === "https://app-test-i.ru/api/image/null"
                        ? BeReporter
                        : item.image
                    }
                    className=" border-2 bg-gray-900 border-red-600  rounded-xl sm:p-4 p-3 w-[450px] sm:h-[330px] h-[200px]"
                  />
                  <div className="absolute sm:bottom-3 bottom-1  sm:h-26 opacity-70  mb-4 ">
                    <Link to={`/articles/${item.id}`}>
                      <h2 className="  hover:bg-black  text-center text-white sm:text-lg w-fit text-justify rounded-md h-18 sm:w-auto sm:h-24 sm:p-3 p-2 bg-red-900 sm:font-bold">
                        {item.title}
                      </h2>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <MainPageCat id={BRUSSELS.ID} cat={BRUSSELS.AR} />
          <span className="bg-white border-2  border-red-900 text-black">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </span>
          <MainPageCat id={ANTWERP.ID} cat={ANTWERP.AR} />
          <span className="bg-white border-2   border-red-900 text-black">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </span>
          <MainPageCat id={LIEGE.ID} cat={LIEGE.AR} />
          <span className="bg-white border-2 border-red-900 text-black">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </span>
          <MainPageCat id={FLANDERS.ID} cat={FLANDERS.AR} />
          <span className="bg-white border-2 border-red-900 text-black">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </span>
          <MainPageCat id={WALLONIA.ID} cat={WALLONIA.AR} />
          <span className="bg-white border- border-red-900 text-black">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </span>
          <MainPageCat id={GERMANOPHONE.ID} cat={GERMANOPHONE.AR} />
          <span className="bg-white border-2   border-red-900 text-black">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </span>
          <MainPageCat id={POLITIC.ID} cat={POLITIC.AR} />
          <span className="bg-white border-2  border-red-900 text-black">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </span>
          <MainPageCat id={LAW.ID} cat={LAW.AR} />
          <span className="bg-white border-2  border-red-900 text-black">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </span>
          <MainPageCat id={ECONOMIC.ID} cat={ECONOMIC.AR} />
          <span className="bg-white border-2   border-red-900 text-black">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </span>
          <MainPageCat id={ACCIDENT.ID} cat={ACCIDENT.AR} />
          <span className="bg-white border-2  border-red-900 text-black">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </span>
          <MainPageCat id={CULTURE.ID} cat={CULTURE.AR} />
          <span className="bg-white border-2 border-red-900 text-black">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </span>
        </>
      )}
    </>
  );
}

/**
 
<div className="  bg-white   text-xs h-88  grid grid-cols-2 grid-rows-4 gap-1 sm:gap-1 sm:grid-cols-3 sm:grid-rows-2  ">
              
                <div key={item.id} className=" relative max-w-xl  ">
                  <div className="absolute inset-0  bg-white opacity-0  rounded-md"></div>

                  <div className="absolute sm:h-8 sm:w-auto top-1 opacity-90 flex  justify-center m-1 ">
                    <Link to={`/categories/${item.category.id}`}>
                      <h3 className="text-white text-center sm:text-lg w-auto rounded-md h-18 sm:w-fit  p-1 mr-2 mt-2 text-xs bg-red-900  sm:font-bold">
                        {CATEGORIES[item.category].AR}
                      </h3>
                    </Link>
                  </div>
                  <img
                    src={
                      item.image === "https://app-test-i.ru/api/image/null"
                        ? BeReporter
                        : item.image
                    }
                    className="border-2 bg-slate-900 border-red-900  rounded-xl p-4 w-[800px] h-[28vh] sm:h-[350px]"
                  />
                  <div className="">
                    <Link to={`/articles/${item.id}`}>
                      <h2 className="   justify-items-center  opacity-90 hover:text-black text-white text-sm font-bold sm:text-lg  text-center rounded-md h-[10vh] w-auto sm:w-auto sm:h-34 p-2 sm:p-4 sm:mr-4 bg-red-900 sm:font-bold">
                        {item.title}
                      </h2>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
 */
