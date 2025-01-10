import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BeReporter from "../../assets/BeReporter.png";
import axios from "axios";
import baseUrl from "../../assets/contants";
import { CATEGORIES } from "../../assets/categories.constant";
import { RiEyeFill } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";

const DateOptions = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};

export default function MainPageCat({ id, cat }) {
  //states
  const [isloading, setIsloading] = useState(true);
  const [data, setData] = useState([]);
  const ID = id;
  const Cat = cat;

  useEffect(() => {
    axios
      .get(`${baseUrl}/public/articles?limit=6&order=DESC&category=${ID}`)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {data === null ? (
        isloading && (
          <span className=" text-red-600 bold text-xl h-30 ">is loading </span>
        )
      ) : (
        <>
          <div
            className=" 
             grid grid-cols-4 justify-items-center "
          >
            <div className=" text-white  m-1 col-start-1 col-span-4  mt-32">
              <Link to={`/categories/${ID}`}>
                <h2 className="text-white text-center sm:text-lg w-auto rounded-md h-18 sm:w-fit  p-3 sm:p-5 mt-2 text-xs bg-red-900 sm:font-bold">
                  اخبار {Cat}
                </h2>
              </Link>

              <div className="  border-2  border-red-900 text-xs  justify-items-center grid grid-cols-2  grid-rows-3 sm:grid-cols-3 sm:grid-rows-2 gap-1 sm:gap-1 sm:h-fit  ">
                {data.map((item) => (
                  <div
                    key={item.id}
                    className="m-2 relative max-w-xl mx-auto mx-1 "
                  >
                    <div
                      key={item.id}
                      className="mt-10 mr-1 ml-1 bg-gray-900 text-sm sm:h-[550px] h-[530px] md:w-[30vw] sm:text-l rounded-xl"
                    >
                      <h3 className=" absolute  opacity-80 text-white text-center sm:text-lg w-auto rounded-md h-18 sm:w-fit  p-2 mr-2 mt-2 mb-2 text-xs bg-red-900 sm:font-bold">
                        {CATEGORIES[item.category].AR}
                      </h3>{" "}
                      <Link to={`/articles/${item.id}`}>
                        <img
                          src={
                            item.image ===
                            "https://app-test-i.ru/api/image/null"
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
                        <h3 className="  bg-gradient-to-r from-red-900 to-zinc-700 opacity-90 mr-2 ml-2 p-2 border-white text-xs md:text-lg min-h-3 font-bold text-white ">
                          {item.title}
                        </h3>
                      </Link>
                      <h5 className="  text-wrap indent-px opacity-60 bg-zinc-500 mr-2 ml-2 p-4 border-white text-xs md:text-lg min-h-3 font-bold text-slate-300">
                        {item.shortContent}
                        <Link
                          to={`/articles/${item.id}`}
                          className=" inline-flex mr-2 ml-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-800  hover:bg-red-600   "
                        >
                          اقرأ المزيد
                        </Link>
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
