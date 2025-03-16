import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import baseUrl from "../../assets/constants";
import { CATEGORIES } from "../../assets/categories.constant";
import BeReporterNew from "../../assets/BeReporterNew.jpg";

import { RiEyeFill } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";

export function OneArtical() {
  const [isloading, setIsloading] = useState(true);
  const [israndom, setIsrandom] = useState();
  const [data, setData] = useState([]);
  const http = `${baseUrl}/public/articles?limit=2&offset=${Math.floor(
    Math.random() * 50
  )}`;

  const DateOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
  };

  //screen render
  const screen = window.screen.width > 500;
  const PicStyle = screen
    ? { width: "800px", height: "600px" }
    : { width: "450px", height: "350px" };
  useEffect(() => {
    fetch(http)
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
    <div className="w-full flex flex-col gap-6">
      {data.map((item, index) => (
        <div
          key={item.id}
          className="w-full relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl transform hover:scale-[1.01] transition-all duration-300"
        >
          <div className="absolute top-4 right-4 z-10">
            <span className="px-4 py-2 bg-red-900/90 text-white text-sm font-semibold rounded-full">
              {CATEGORIES[item.category].AR}
            </span>
          </div>

          <div className="flex flex-row h-full">
            <div
              className={`${
                index % 2 === 0 ? "sm:order-2" : "sm:order-2"
              }  sm:w-1/2`}
            >
              <Link to={`/articles/${item.id}`}>
                <div className="relative h-[30vh] sm:h-[40vh]">
                  <img
                    src={
                      item.image === `${baseUrl}/image/null`
                        ? BeReporterNew
                        : item.image
                    }
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent sm:bg-gradient-to-r"></div>
                </div>
              </Link>
            </div>

            <div
              className={`${
                index % 2 === 0 ? "sm:order-1" : "sm:order-2"
              } w-full sm:w-1/2 p-4 sm:p-6`}
            >
              <div className="flex items-center justify-between text-gray-400 mb-3 sm:mb-4">
                <div className="flex items-center space-x-2">
                  <FaPencil className="h-4 w-4" />
                  <span className="text-sm ml-2">
                    {new Date(item.createdAt).toLocaleDateString(
                      "ar",
                      DateOptions
                    )}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <RiEyeFill className="h-4 w-4" />
                  <span className="ml-2">{item.watchCount}</span>
                </div>
              </div>

              <Link to={`/articles/${item.id}`}>
                <h3 className="text-lg sm:text-2xl font-bold text-white mb-3 sm:mb-4 hover:text-red-500 transition-colors">
                  {item.title}
                </h3>
              </Link>

              <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">
                {item.shortContent}
                <Link
                  to={`/articles/${item.id}`}
                  className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 mt-2 sm:mt-0 ml-4 bg-red-800 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                >
                  اقرأ المزيد
                </Link>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
