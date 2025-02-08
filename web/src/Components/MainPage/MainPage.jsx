import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { OneArtical } from "../OneArtical/OneArtical";
import baseUrl from "../../assets/contants";
import MainPageCat from "../MainPageCat/MainPageCat";
import LatestNews from "../LatestNews/LatestNews";
import { CATEGORIES } from "../../assets/categories.constant";
import BeReporter from "../../assets/BeReporter.png";
import { WriterEffect } from "../WriterEffect/WriterEffect";
import { RiEyeFill } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";
const DateOptions = {
  weekday: "long",
  month: "short",
  day: "numeric",
};

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
const toTop = () => {
  window.scrollTo(0, 0);
};

export default function MainPageTest() {
  //screen render

  /*states*/
  const [isloading, setIsloading] = useState(true);
  const [data, setData] = useState([]);

  // fetch start here
  useEffect(() => {
    fetch(
      `${baseUrl}/public/articles?limit=12&offset=${Math.floor(
        Math.random() * 100
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
    toTop();
  }, []);
  const screen = window.screen.width > 500;

  return (
    <>
      {data === null ? (
        isloading && (
          <span className=" bg-red-900 bold text-xl h-30 ">is loading </span>
        )
      ) : (
        <>
          <div className="grid  ">
            <WriterEffect data={data} />
            <h3
              className="  relative sm:top-[46px] sm:mr-0 sm:ml-0  top-[40px] 
             mb-[1px] text-white sm:text-lg w-auto text-center rounded-md h-18 sm:w-fit p-3  sm:p-2 text-lg bg-red-900  sm:font-bold"
            >
              خبر عاجل
            </h3>
            <div className="  grid grid-cols-1  sm:grid-cols-2 grid-rows-1 sm:grid-rows-1 ">
              <OneArtical />

              <div>
                <div className=" text-white sm:text-sm sm:p-2  m-1 ">
                  <LatestNews />
                </div>
              </div>
            </div>
            <h3
              className="  relative sm:top-[40px] sm:mr-0 sm:ml-0  top-[10px] 
             mb-[1px] text-white sm:text-lg w-auto text-center rounded-md h-18 sm:w-fit p-3  sm:p-2 text-lg bg-red-900  sm:font-bold"
            >
              اخبار متـفرقـــه{" "}
            </h3>

            {/*  6 div  */}
            <div className=" grid grid-cols-2  justify-items-center border-2 border-red-900 grid-rows-6 sm:grid-cols-3 sm:grid-rows-4 sm:mt-10  ">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="mb-4 mt-4 mr-1 ml-1 bg-gray-900 text-sm sm:h-[550px]  
                   h-[580px] md:w-[30vw] sm:text-l rounded-xl"
                >
                  <h3 className=" absolute  opacity-80 text-white text-center sm:text-lg w-auto rounded-md h-18 sm:w-fit  p-2 mr-2 mt-2 mb-2 text-xs bg-red-900 sm:font-bold">
                    {CATEGORIES[item.category].AR}
                  </h3>{" "}
                  <Link to={`/articles/${item.id}`}>
                    <img
                      src={
                        item.image === "https://app-test-i.ru/api/image/null"
                          ? BeReporter
                          : item.image
                      }
                      className=" border-2  border-red-600  rounded-xl p-1 md:p-1 sm:p-3 w-[100vw] sm:w-[60vw] h-[32vh]  md:h-[40vh] "
                    />
                  </Link>
                  <div className=" bg-black opacity-40  text-white p-1 mt-2 mr-2 ml-2">
                    <FaPencil className="inline-flex  mr-2" />
                    <span className=" text-xs sm:text-md p-2">
                      {new Date(item.createdAt).toLocaleDateString(
                        "ar",
                        DateOptions
                      )}
                    </span>
                    <span className=" mr-2 ml-2">|</span>
                    <RiEyeFill className="inline-flex  mr-2" />

                    <span className="p-2 m-2"> {item.watchCount}</span>
                  </div>
                  <Link to={`/articles/${item.id}`}>
                    <h3 className="  bg-gradient-to-r from-red-900 to-zinc-700 opacity-90 mr-2 ml-2 p-2 border-white text-xs md:text-xs  md:text-lg min-h-3 font-bold text-white ">
                      {item.title}
                    </h3>
                  </Link>
                  <h5 className="   text-wrap indent-px opacity-60 bg-zinc-500 mr-2 ml-2 p-4 border-white text-xs  md:text-xs min-h-3 font-bold text-slate-300">
                    {item.shortContent}
                    <Link
                      to={`/articles/${item.id}`}
                      className=" inline-flex mr-2 ml-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-800  hover:bg-red-600   "
                    >
                      اقرأ المزيد
                    </Link>
                  </h5>
                </div>
              ))}
            </div>
          </div>

          <MainPageCat id={BRUSSELS.ID} cat={BRUSSELS.AR} />

          <MainPageCat id={ANTWERP.ID} cat={ANTWERP.AR} />

          <MainPageCat id={LIEGE.ID} cat={LIEGE.AR} />

          <MainPageCat id={FLANDERS.ID} cat={FLANDERS.AR} />

          <MainPageCat id={WALLONIA.ID} cat={WALLONIA.AR} />

          <MainPageCat id={GERMANOPHONE.ID} cat={GERMANOPHONE.AR} />

          <MainPageCat id={POLITIC.ID} cat={POLITIC.AR} />

          <MainPageCat id={LAW.ID} cat={LAW.AR} />

          <MainPageCat id={ECONOMIC.ID} cat={ECONOMIC.AR} />

          <MainPageCat id={ACCIDENT.ID} cat={ACCIDENT.AR} />

          <MainPageCat id={CULTURE.ID} cat={CULTURE.AR} />
        </>
      )}
    </>
  );
}
