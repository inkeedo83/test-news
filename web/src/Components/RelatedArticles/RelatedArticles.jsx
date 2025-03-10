import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import baseUrl from "../../assets/contants";
import { CATEGORIES } from "../../assets/categories.constant";
import BeReporterNew from "../../assets/BeReporterNew.jpg";
import { RiEyeFill } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";

const DateOptions = {
  weekday: "long",
  month: "short",
  day: "numeric",
};
const toTop = () => {
  window.scrollTo(0, 0);
};
export function RelatedArticles() {
  const [data, setData] = useState([]);
  const http = `${baseUrl}/public/articles?limit=5&order=DESC&offset=${Math.floor(
    Math.random() * 100
  )}`;

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
    toTop();
  }, []);
  const screen = window.screen.width > 500;

  return (
    <div className="w-full p-4">
      <h3 className="text-xl font-bold mb-6 dark:text-white text-zinc-800">
        مواضيع ذات صله
      </h3>
      <div className="grid gap-4">
        {data &&
          data.map((item) => (
            <Link
              key={item.id}
              to={`/articles/${item.id}`}
              className="group bg-gray-500 hover:bg-gray-600  dark:hover:bg-zinc-400 transition-all duration-300 rounded-lg border border-zinc-200 dark:border-zinc-700"
            >
              <div className="flex flex-row-reverse gap-4 p-3">
                <div className="flex-shrink-0">
                  <img
                    src={
                      item.image === "https://app-test-i.ru/api/image/null"
                        ? BeReporterNew
                        : item.image
                    }
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg "
                    alt={item.title}
                  />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <h4 className="text-sm sm:text-xl  sm:text-base font-semibold mb-2 text-white  line-clamp-2">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-4 text-xs text-white ">
                    <span className="flex items-center gap-1">
                      <RiEyeFill />
                      {item.watchCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaPencil />
                      {new Date(item.createdAt).toLocaleDateString(
                        "ar",
                        DateOptions
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
