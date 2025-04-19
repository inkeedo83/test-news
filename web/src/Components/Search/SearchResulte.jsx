import { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CATEGORIES } from "../../assets/categories.constant";
import baseUrl from "../../assets/constants";
import { IoHome } from "react-icons/io5";
import ArticleCard from "./ArticleCard";
import LoadingSkeleton from "../common/LoadingSkeleton";

const DateOptions = {
  weekday: "long",
  month: "short",
  day: "numeric",
};
const { MAIN } = CATEGORIES;

export default function SearchResulte() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  const toTop = () => {
    window.scrollTo(0, 0);
  };
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    axios
      .get(`${baseUrl}/public/articles?pattern=${id}`)
      .then((res) => {
        setData(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
    toTop();
  }, [id]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, page]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  if (isLoading) return <LoadingSkeleton count={6} />;
  if (error)
    return (
      <div className="text-red-500 text-center pt-72">حدث خطأ: {error}</div>
    );
  if (!data.length)
    return (
      <>
        <div className="text-gray-400 text-center pt-72">
          لا توجد نتائج للبحث
          <div>
            <button
              className=" mt-10 mb-10  text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-1 mb-1 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              onClick={() => navigate("/")}
            >
              عوده الى الرئيسية
            </button>
          </div>
        </div>
      </>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 px-3 sm:px-4 py-4 sm:py-8">
      <nav className="container mt-60 sm:mt-56 mx-auto max-w-7xl mb-4 sm:mb-8">
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-400">
          <Link
            className="flex items-center text-red-500 hover:text-red-400 transition-colors"
            to="/"
          >
            <IoHome className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
            <span className="hidden sm:inline">{MAIN.AR}</span>
          </Link>
          {["/", "نتائج البحث"].map((item, index) => (
            <span
              key={index}
              className="flex items-center text-gray-500 whitespace-nowrap"
            >
              <span>{item}</span>
            </span>
          ))}
        </div>
      </nav>

      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {paginatedData.map((item) => (
            <ArticleCard key={item.id} article={item} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 sm:mt-12 overflow-x-auto pb-4">
            <div className="inline-flex rounded-full bg-gray-800/50 backdrop-blur-md p-1 sm:p-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`
                    min-w-[2.5rem] px-2 sm:px-4 py-1 sm:py-2 mx-0.5 sm:mx-1 
                    text-sm rounded-full transition-all duration-200
                    ${
                      page === i + 1
                        ? "bg-red-600 text-white"
                        : "text-gray-400 hover:bg-gray-700/50"
                    }
                  `}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
        <div>
          <button
            className=" mt-10 mb-10 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-1 mb-1 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            onClick={() => navigate("/")}
          >
            عوده الى الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}
