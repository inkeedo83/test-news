import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const DateOptions = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};

export function SideList() {
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5010/articles")
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const [data, setData] = useState([]);
  const LocalFliter = data.filter((item) => item.category.name === "بروكسل");

  return (
    <>
      <p className=" text-lg w-40 bg-red-600 text-white p-4 ml-0 mb-0 mt-4">
        الأكثر قراءة الان
      </p>
      <hr className="h-2 mb-2 bg-red-600 border-0 "></hr>

      <div className="flex flex-no-wrap w-screen overflow-x-scroll overflow-visible snap-mandatory snap-x scrolling-touch items-start mb-8  ">
        {LocalFliter.map((item) => (
          <div
            key={item.id}
            className="flex-none w-1/2 md:w-1/5 mr-8 md:pb-4 border rounded-lg"
          >
            <h5 className=" text-xs z-0 bold  w-28 bg-red-600 text-white p-2 m-2  mb-0 ">
              {item.category.name}
            </h5>{" "}
            <Link to={`/ReadArticleByID/${item.id}`}>
              <img
                className="rounded-t-lg snap-normal snap-center  "
                src={"/src/assets/national_day.jpg"}
                alt=""
              />
            </Link>
            <Link to={`/ReadArticleByID/${item.id}`}>
              <h5 className="mb-2  m-3 text-xl font-bold text-red-600 ">
                {item.title}
              </h5>
            </Link>
            <p className=" ml-2 text-red-600 m-3 z-1">
              {new Date(item.createdAt).toLocaleDateString(
                "ar-EG-u-nu-latn",
                DateOptions
              )}
            </p>
            <p className="mb-3 font-normal text-black ">
              {item.content.slice(0, 100) + "..."}
            </p>
            <Link
              to={`/ReadArticleByID/${item.id}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              ..اقرأ المزيد
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
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
  );
}
