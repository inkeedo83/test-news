import React from "react";
import { Link } from "react-router-dom";
import DateOptions from "/src/assets/date.constant";

export function ListView(arr) {
  return (
    <div>
      {data.map((item) => (
        <>
          <div
            key={item.id}
            className="  bg-white  rid grid-rows-4 grid-flow-col gap-4"
          >
            <h5 className=" text-xs z-0 bold  w-28 bg-red-600 text-white p-2 ">
              {item.category.name}
            </h5>
            <ImgView key={item.id} {...item} />

            <div className="  bg-gray-300 z-1 p-4 md:p-1">
              <div className="text-sm flex items-center "></div>
              <p className=" text-red-600 leading-none z-1">
                {new Date(item.createdAt).toLocaleDateString(
                  "ar-EG-u-nu-latn",
                  DateOptions
                )}
              </p>
              <h5 className="mb-2  m-3 text-xl font-bold text-red-600 ">
                {item.title}
              </h5>
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
          </div>
        </>
      ))}
    </div>
  );
}
