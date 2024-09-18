import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ImgView } from "../ImgView/ImgView";
import axios from "axios";

const DateOptions = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};

export default function ReadArticleByCat() {
  const { cat } = useParams();
  //states
  const [isloading, setIsloading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5010/articles?order=ASC&categoryId=${cat}`)
      .then((res) => (console.log(res), setData(res.data.data)))
      .catch((err) => console.log(err));
  }, []);

  console.log(data, "render by catigory");

  return (
    <>
      {data === null ? (
        isloading && (
          <span className=" text-red-600 bold text-xl h-30 ">is loading </span>
        )
      ) : (
        <>
          <div className=" bg-gray-800 border-4 grid grid-cols-3 grid-rows-3 gap-8  ">
            {data.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 text-sm  sm:text-l rounded-xl"
              >
                <h5 className=" text-xs z-0 bold  w-28 bg-red-800 text-white p-2 mb-0 ">
                  {item.category.name}
                </h5>{" "}
                <ImgView style={{ height: 150, width: 200 }} {...item} />
                <p className=" text-white m-1 ">
                  {new Date(item.createdAt).toLocaleDateString(
                    "ar-EG-u-nu-latn",
                    DateOptions
                  )}
                </p>
                <h5 className="mb-4 pt-4 border-white min-h-3 m-3  font-bold text-white ">
                  {item.title}
                </h5>
                <Link
                  to={`/ReadArticleByID/${item.id}`}
                  className="inline-flex  items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
    </>
  );
}
