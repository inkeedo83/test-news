import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BeReporterNew from "../../assets/BeReporterNew.jpg";
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
    <div className="relative py-2">
      <div className="relative bg-gradient-to-r from-red-950 via-zinc-950 to-red-950 dark:from-zinc-900 dark:via-red-950 dark:to-zinc-900 container mx-auto px-2">
        <Link to={`/categories/${ID}`}>
          <h2 className="inline-block px-4 py-2 bg-gradient-to-r from-red-700 to-zinc-900 text-xl font-bold text-white rounded-lg shadow-lg transform hover:scale-105 transition-all mb-4">
            اخبار {Cat}
          </h2>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="group relative bg-zinc-900/80 backdrop-blur-sm rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-zinc-800"
            >
              <div className="relative">
                <Link to={`/articles/${item.id}`}>
                  <img
                    src={
                      item.image === "https://app-test-i.ru/api/image/null"
                        ? BeReporterNew
                        : item.image
                    }
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                    alt={item.title}
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-4 py-2 bg-gradient-to-r from-red-700 to-zinc-900 text-white text-sm rounded-full">
                      {CATEGORIES[item.category].AR}
                    </span>
                  </div>
                </Link>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center text-zinc-400 mb-4">
                  <div className="flex items-center gap-2">
                    <FaPencil className="text-red-500" />
                    <span className="text-sm">
                      {new Date(item.createdAt).toLocaleDateString(
                        "ar",
                        DateOptions
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RiEyeFill className="text-red-500" />
                    <span>{item.watchCount}</span>
                  </div>
                </div>

                <Link to={`/articles/${item.id}`}>
                  <h3 className="text-lg font-bold text-white mb-4 line-clamp-2 hover:text-red-500 transition-colors">
                    {item.title}
                  </h3>
                </Link>

                <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
                  {item.shortContent}
                </p>

                <Link
                  to={`/articles/${item.id}`}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-700 to-zinc-900 text-white text-sm rounded-lg hover:from-red-900 hover:to-zinc-800 transition-all duration-300"
                >
                  اقرأ المزيد
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
