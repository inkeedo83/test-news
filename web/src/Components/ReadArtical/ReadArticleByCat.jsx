import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../assets/contants";
import { Pagination } from "../Pagination/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";

const DateOptions = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};

export default function ReadArticleByCat() {
  const { id } = useParams();
  console.log(id);
  //states
  const [isloading, setIsloading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5010/api/public/articles?categoryId=${id}`)
      .then((res) => (console.log(res), setData(res.data.data)))
      .catch((err) => console.log(err));
  }, [id]);

  console.log(data, "render by catigory");

  return (
    <>
      {data === null ? (
        isloading && (
          <span className=" text-red-600 bold text-xl h-30 ">is loading </span>
        )
      ) : (
        <>
          <div className=" bg-gray-800 border-4 grid grid-cols-3 grid-rows-3 gap-8 pt-24  ">
            {data.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 text-sm  sm:text-l rounded-xl"
              >
                <h3 className="text-white text-center sm:text-lg w-auto rounded-md h-18 sm:w-fit  p-2 mr-2 mt-2 mb-2 text-xs bg-red-900 sm:font-bold">
                  {item.category.name}
                </h3>{" "}
                <img
                  src={item.image}
                  className=" border-2 bg-white border-red-600  rounded-xl p-3 w-[700px] h-[400px]"
                />
                <div className="  bg-zinc-500 text-white p-2 mt-2 mr-2 ml-2">
                  <FontAwesomeIcon icon={faPenNib} beat />
                  <span className="text-md p-2 m-2">
                    {new Date(item.createdAt).toLocaleDateString(
                      "ar",
                      DateOptions
                    )}{" "}
                  </span>
                  <span className="p-2 mr-2 ml-2">|</span>
                  <FontAwesomeIcon icon={faEye} beat />
                  <span className="p-2 m-2"> {item.watchCount}</span>
                </div>
                <h5 className=" bg-zinc-600 mr-2 ml-2 p-4 border-white  min-h-3 font-bold text-white ">
                  {item.title}...
                </h5>
                <Link
                  to={`/ReadArticleByID/${item.id}`}
                  className="inline-flex mr-2 ml-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-900  hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300  "
                >
                  ..اقرأ المزيد
                  <svg
                    className="rtl:rotate-180   w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
      <Pagination />
    </>
  );
}
