import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { CATEGORIES } from "../../assets/categories.constant";
import baseUrl from "../../assets/contants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPenNib, faEye } from "@fortawesome/free-solid-svg-icons";
import BeReporter from "../../assets/BeReporter.png";

const DateOptions = {
  weekday: "long",
  month: "short",
  day: "numeric",
};
const { MAIN } = CATEGORIES;

export default function SearchResulte() {
  const { id } = useParams();
  console.log(id);

  //states
  const [isloading, setIsloading] = useState(true);
  const [data, setData] = useState([]);
  const [count, setCount] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/public/articles?pattern=${id}`)
      .then((res) => (console.log(res), setData(res.data.data)))

      .catch((err) => console.log(err));
  }, [id]);

  console.log(data, "render searchpage ");

  return (
    <>
      {data === null ? (
        isloading && (
          <span className=" text-red-600 bold text-xl h-30 ">is loading </span>
        )
      ) : (
        <>
          <div className=" flex pt-24 sm:pt-32 mr-4 text-md  sm:text-xl leading-loose  text-zink-600">
            <a
              className=" inline-flex  text-red-600 hover:text-black ml-2"
              href={`/`}
            >
              <FontAwesomeIcon
                icon={faHouse}
                className="size-4 sm:size-6 mt-2 ml-2"
              />

              {MAIN.AR}
            </a>

            <span className="text-red-600 ml-2 ">/</span>
            <span className="text-red-600 ml-2  ">الاخبار</span>
            <span className="text-red-600  ml-2 ">/</span>
            <span className="text-red-600 ml-2  ">نتائج البحث</span>
          </div>
          <div className=" sm:m-0 bg-white grid grid-cols-1 grid-rows-4 sm:grid-cols-3 sm:grid-rows-3 gap-1 sm:gap-1 ">
            {data.map((item) => (
              <div
                key={item.id}
                className="mt-10 mr-1 ml-1 bg-slate-900 text-sm md:w-[30vw] sm:text-l rounded-xl"
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
                    className=" border-2 bg-white border-red-600  rounded-xl p-1 md:p-1 sm:p-3 w-[100vw] sm:w-[60vw] h-[40vh]  md:h-[40vh] "
                  />
                </Link>
                <div className=" bg-black opacity-40  text-white p-1 mt-2 mr-2 ml-2">
                  <FontAwesomeIcon
                    className="text-white"
                    icon={faPenNib}
                    beat
                  />
                  <span className=" text-xs sm:text-md p-2">
                    {new Date(item.createdAt).toLocaleDateString(
                      "ar",
                      DateOptions
                    )}
                  </span>
                  <span className=" mr-2 ml-2">|</span>
                  <FontAwesomeIcon className="text-white" icon={faEye} beat />
                  <span className="p-2 m-2"> {item.watchCount}</span>
                </div>
                <Link to={`/articles/${item.id}`}>
                  <h3 className="  bg-gradient-to-r from-red-900 to-zinc-700 opacity-90 mr-2 ml-2 p-2 border-white text-md  md:text-lg min-h-3 font-bold text-white ">
                    {item.title}
                  </h3>
                </Link>
                <h5 className="  opacity-60 bg-zink-500 mr-2 ml-2 p-4 border-white text-md  md:text-lg min-h-3 font-bold text-slate-300">
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
        </>
      )}
    </>
  );
}
