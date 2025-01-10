import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { CATEGORIES } from "../../assets/categories.constant";
import baseUrl from "../../assets/contants";
import { IoHome } from "react-icons/io5";
import { RiEyeFill } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";
import BeReporter from "../../assets/BeReporter.png";
const DateOptions = {
  weekday: "long",
  month: "short",
  day: "numeric",
};
const { MAIN } = CATEGORIES;

export default function ReadArticleByCat() {
  const { id } = useParams();
  console.log(id);

  //states
  const [isloading, setIsloading] = useState(true);
  const [data, setData] = useState([]);
  const [count, setCount] = useState([]);
  const [page, setPage] = useState(12);
  console.log(page);
  const toTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/public/articles?limit=${page}&order=DESC&category=${id}`)
      .then(
        (res) => (
          console.log(count), setData(res.data.data), setCount(res.data.count)
        )
      )

      .catch((err) => console.log(err));
    toTop();
  }, [id, page]);

  console.log(data, "render by catigory");

  return (
    <>
      {data === null ? (
        isloading && (
          <span className=" text-red-600 bold text-xl h-30 ">is loading </span>
        )
      ) : (
        <>
          <div className=" flex pt-24 sm:pt-32 mr-4 text-md  sm:text-xl leading-loose  text-zinc-600">
            <Link
              className=" inline-flex  text-red-600 hover:text-zinc-400 ml-2"
              to={`/`}
            >
              <IoHome className="size-4 sm:size-6 mt-2 ml-2" />
              {MAIN.AR}
            </Link>

            <span className="text-red-600 ml-2 ">/</span>
            <span className="text-red-600 ml-2  ">الاخبار</span>
            <span className="text-red-600  ml-2 ">/</span>
            <a
              className="text-red-600 hover:text-zinc-400 ml-2 "
              href={`/categories/${id}`}
            >
              {CATEGORIES[id].AR}
            </a>
          </div>
          <div className=" sm:m-0  grid grid-cols-1 grid-rows-4 sm:grid-cols-3 sm:grid-rows-3 gap-1 sm:gap-1 ">
            {data.map((item) => (
              <div
                key={item.id}
                className="mt-10 mr-1 ml-1 bg-gray-900 text-sm md:w-[30vw] sm:text-l rounded-xl"
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
                    className=" border-2  border-red-600  rounded-xl p-1 md:p-1 sm:p-3 w-[100vw] sm:w-[60vw] h-[40vh]  md:h-[40vh] "
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
                  <h3 className="  bg-gradient-to-r from-red-900 to-zinc-700 opacity-90 mr-2 ml-2 p-2 border-white text-md  md:text-lg min-h-3 font-bold text-white ">
                    {item.title}
                  </h3>
                </Link>
                <h5 className="  opacity-60 bg-zinc-500 mr-2 ml-2 p-4 border-white text-md  md:text-lg min-h-3 font-bold text-slate-300">
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

          <div className="my-24 flex items-center before:h-px before:flex-1  before:bg-gray-300 before:content-[''] after:h-px after:flex-1 after:bg-gray-300  after:content-['']">
            <button
              onClick={() => {
                setPage(page + 12);
              }}
              type="button"
              className="flex items-center rounded-full border border-gray-300 bg-secondary-50 px-3 py-2 text-center text-sm font-medium text-zinc-400 hover:bg-red-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="mr-1 h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              عرض المزيد
            </button>
          </div>
        </>
      )}
    </>
  );
}
