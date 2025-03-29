import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import baseUrl from "../../assets/constants";
import { CATEGORIES } from "../../assets/categories.constant";
import BeReporterNew from "../../assets/BeReporterNew.jpg";
import { RiEyeFill } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";

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
const DateOptions = {
  month: "short",
  day: "numeric",
};

export default function LatestNews() {
  const [data, setData] = useState([]);
  const http = `${baseUrl}/public/articles?limit=5&order=DESC`;

  useEffect(() => {
    fetch(http)
      .then((res) => res.json())
      .then((resulte) => {
        setData(resulte.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="dark:bg-gray-900/70 bg-zink-600/70 backdrop-blur-md rounded-xl overflow-hidden animate-fadeIn">
      <h3 className=" backdrop-blur-md bg-gradient-to-r from-red-950/90 via-zinc-950/90 to-red-950/90 rounded-2xl shadow-2xl text-white  px-6 py-4 text-lg font-bold">
        احدث المقالات{" "}
      </h3>

      <div className="divide-y divide-red-900/30 dark:divide-red-700/30">
        {data?.map((item, index) => (
          <div
            key={item.id}
            className="group p-4 hover:bg-zinc-200 transition-colors animate-slideIn"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex space-x-4">
              <Link to={`/articles/${item.id}`} className="shrink-0">
                <div className="relative w-32 h-32 overflow-hidden rounded-lg">
                  <div className="absolute top-0 right-0 bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-tl-lg rounded-br-lg z-10 text-xl font-bold transform group-hover:scale-110 transition-transform">
                    {data.indexOf(item) + 1}
                  </div>
                  <img
                    src={
                      item.image === `${baseUrl}/image/null`
                        ? BeReporterNew
                        : item.image
                    }
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 dark:from-white/50 to-transparent"></div>
                  {item.category && (
                    <div className="absolute bottom-2 right-2 bg-red-600/80 text-white text-xs px-2 py-1 rounded-full">
                      {CATEGORIES[item.category].AR}
                    </div>
                  )}
                </div>
              </Link>

              <div className="flex-1 p-4 rounded-lg space-y-3">
                <div className="flex items-center  text-red-600 text-xs mr-4 mb-2">
                  <RiEyeFill className="mr-1 ml-2" />
                  <span>{item.watchCount}</span>
                  <span className="mx-2 ml-2">•</span>
                  <FaPencil className="mr-1 ml-2" />
                  <span>
                    {new Date(item.createdAt).toLocaleDateString(
                      "ar",
                      DateOptions
                    )}
                  </span>
                </div>

                <Link to={`/articles/${item.id}`}>
                  <h4 className="text-red-600 mr-4 font-semibold group-hover:text-red-500 dark:group-hover:text-red-700 transition-colors">
                    {item.title}
                  </h4>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
