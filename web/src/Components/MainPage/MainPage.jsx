import { useState, useEffect } from "react";
import { ImgView } from "../ImgView/ImgView";
import { Link } from "react-router-dom";
import { OneArtical } from "../OneArtical/OneArtical";
import baseUrl from "../../assets/contants";
import MainPageCat from "../MainPageCat/MainpageCat";
import { tabs } from "../../assets/text.constant";
import LatestNews from "../LatestNews/LatestNews";

const { MAIN, PROVINCE, CITY, POLITICS, ECONOMICS, LAWS, ACCDENT, CULTURE } =
  tabs;

export default function MainPageTest() {
  //states
  const [isloading, setIsloading] = useState(true);
  const [data, setData] = useState([]);
  const render = data.map((item) => (
    <div key={item.id} className="m-2 relative max-w-xl mx-auto m-6 mx-1 ">
      <ImgView className="rounded-xl h-48 w-40 sm:h-96 sm:w-96" {...item} />

      <div className="absolute inset-0  bg-gray-700 opacity-20  rounded-md"></div>

      <div className="absolute sm:h-8 sm:w-auto top-1 opacity-90 flex  justify-center m-1 ">
        <Link to={`/ReadArticleByCat/${item.category.id}`}>
          <h3 className="text-white text-center sm:text-lg w-auto rounded-md h-18 sm:w-16  p-1 mr-1 mt-2 text-xs bg-red-600 sm:font-bold">
            {item.category.name}
          </h3>
        </Link>
      </div>
      <div className="absolute sm:bottom-3 bottom-1  sm:h-26 opacity-70 m-1 flex  justify-between ">
        <Link to={`/ReadArticleByID/${item.id}`}>
          <h2 className="hover:text-red-700 text-white sm:text-lg w-fit text-justify rounded-md h-18 sm:w-auto sm:h-34 p-4 bg-gray-900 sm:font-bold">
            {item.title}
          </h2>
        </Link>
      </div>
    </div>
  ));

  // fetch start here
  useEffect(() => {
    fetch(
      `${baseUrl}/public/articles?limit=9&offset=${Math.floor(
        Math.random() * 15
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
          <div
            className=" 
             grid grid-cols-6 justify-items-center"
          >
            <div className=" text-white  m-1 col-start-1 col-span-4 ">
              <h1 className=" sm:text-lg text-md w-fit p-2 bg-red-900 text-white  ">
                اخبار متنوعة
              </h1>
              <OneArtical any={{ height: 400, width: 610 }} />

              <div className="  border-2  bg-neutral-950 border-red-900 text-xs  justify-items-center grid grid-cols-2 grid-rows-4 gap-1 sm:grid-cols-3 sm:grid-rows-3  ">
                {render}
              </div>
            </div>

            <div className=" text-white sm:text-sm sm:p-2  m-1 col-start-5  col-end-7">
              <LatestNews />
            </div>
          </div>
        </>
      )}
      <MainPageCat id={POLITICS.ARID} cat={POLITICS.AR} />
      <span className="bg-white text-black">ads</span>
      <MainPageCat id={CITY.AR1ID} cat={CITY.AR1} />
    </>
  );
}
{
  /* 
  <span className="bg-white text-black">ads</span>
      <MainPageCat id={PROVINCE.AR1ID} cat={PROVINCE.AR1} />
      <span className="bg-white text-black">ads</span>
      <MainPageCat id={PROVINCE.AR2ID} cat={PROVINCE.AR2} />
      <span className="bg-white text-black">ads</span>
      <MainPageCat id={PROVINCE.AR3ID} cat={PROVINCE.AR3} />
      <span className="bg-white text-black">ads</span>
      <MainPageCat id={ECONOMICS.ARID} cat={ECONOMICS.AR} />
      <span className="bg-white text-black">ads</span>
      <MainPageCat id={LAWS.ARID} cat={LAWS.AR} />
      <span className="bg-white text-black">ads</span>
      <MainPageCat id={ACCDENT.ARID} cat={ACCDENT.AR} />
      <span className="bg-white text-black">ads</span>
      <MainPageCat id={CULTURE.ARID} cat={CULTURE.AR} />
      <span className="bg-white text-black">ads</span>
*/
}
