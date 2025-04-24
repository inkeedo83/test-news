import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TwoArticals from "../TwoArticals/TwoArticals";
import baseUrl from "../../assets/constants";
import MainPageCat from "../MainPageCat/MainPageCat";
import LatestNews from "../LatestNews/LatestNews";
import { CATEGORIES } from "../../assets/categories.constant";
import BeReporterNew from "../../assets/BeReporterNew.jpg";
import NewsletterSubscribe from "../NewsletterSubscribe/NewsletterSubscribe";
import { WriterEffect } from "../WriterEffect/WriterEffect";
import { RiEyeFill } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";
import { IoArrowUpCircle } from "react-icons/io5";

const DateOptions = {
  weekday: "long",
  month: "short",
  day: "numeric",
};

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
const toTop = () => {
  window.scrollTo(0, 0);
};

export default function MainPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isloading, setIsloading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // fetch start here
  useEffect(() => {
    fetch(`${baseUrl}/public/articles?limit=12&order=DESC`)
      .then((res) => {
        const resulte = res.json();
        return resulte;
      })
      .then((resulte) => {
        setData(resulte.data);

        setIsloading(false);
      })

      .catch((err) => console.log(err));
    toTop();
  }, []);
  // fetch end here

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-4">
      <div className="h-64 bg-zinc-800 rounded-xl"></div>
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-zinc-800 rounded-xl"></div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 sm:pt-72 overflow-hidden w-screen m-0 text-white relative">
      {isloading ? (
        <LoadingSkeleton />
      ) : (
        <div className="container mx-auto px-2 sm:px-4 py-0">
          <div className="space-y-4">
            {" "}
            {/* Changed from space-y-0 to space-y-4 */}
            <NewsletterSubscribe />
            <WriterEffect data={data} />
          </div>

          {/* Featured Article */}
          {data.length > 0 && data.find((article) => article.isRelated) && (
            <div className="mb-4 sm:mb-8">
              <div className="relative h-[300px] sm:h-[500px] rounded-xl overflow-hidden">
                <Link
                  to={`/articles/${
                    data.find((article) => article.isRelated).id
                  }`}
                >
                  <img
                    loading="lazy"
                    src={
                      data.find((article) => article.isRelated).image ===
                      `${baseUrl}/image/null`
                        ? BeReporterNew
                        : data.find((article) => article.isRelated).image
                    }
                    className="w-full h-full object-cover"
                    alt={data.find((article) => article.isRelated).title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="absolute bottom-0 p-4 sm:p-8">
                      <span className="px-3 py-1 sm:px-4 sm:py-2 bg-red-500 text-white rounded-full mb-2 sm:mb-4 inline-block text-sm sm:text-base">
                        {
                          CATEGORIES[
                            data.find((article) => article.isRelated).category
                          ].AR
                        }
                      </span>
                      <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-4">
                        {data.find((article) => article.isRelated).title}
                      </h2>
                      <p className="text-base sm:text-lg text-zinc-200 mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                        {data.find((article) => article.isRelated).shortContent}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          )}

          {/* Breaking News Section */}
          <div className="mb-4 sm:mb-8">
            <h3 className="inline-block bg-gradient-to-r from-red-950 to-zinc-900 text-white px-3 py-1 sm:px-4 sm:py-2 mt-2 mb-2 rounded-lg shadow-lg transform transition-all text-lg sm:text-xl font-bold">
              مقالات تهمك{" "}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
              <div className="lg:col-span-2 bg-zinc-900/80 backdrop-blur-sm rounded-xl p-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <TwoArticals />
              </div>
              <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl p-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <LatestNews />
              </div>
            </div>
          </div>

          {/* News Grid Section */}
          <div className="mb-4 sm:mb-8">
            <h3 className="inline-block bg-gradient-to-r from-red-950 to-zinc-900 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all text-lg sm:text-xl font-bold">
              اخبار متـفرقـــه
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {data
                .filter((item) => !item.isImportant)
                .map((item) => (
                  <div
                    key={item.id}
                    className="group relative bg-stone-900 dark:bg-gray-950 rounded-xl overflow-hidden transform transition-all duration-300  border border-zinc-800"
                  >
                    <div className="relative">
                      <Link to={`/articles/${item.id}`}>
                        <img
                          loading="lazy"
                          src={
                            item.image === `${baseUrl}/image/null`
                              ? BeReporterNew
                              : item.image
                          }
                          className="  w-full h-48 sm:h-56 object-fill  transition-transform duration-300 group-hover:scale-105"
                          alt={item.title}
                        />
                        <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                          <span className="px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-red-500 to-zinc-900 text-white text-xs sm:text-sm rounded-full">
                            {CATEGORIES[item.category].AR}
                          </span>
                        </div>
                      </Link>
                    </div>

                    <div className="p-4 sm:p-6">
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
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-zinc-900 text-white text-sm rounded-lg hover:from-red-900 hover:to-zinc-800 transition-all duration-300"
                      >
                        اقرأ المزيد
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Category Sections */}
          <div className="space-y-1">
            {[
              BRUSSELS,
              ANTWERP,
              LIEGE,
              FLANDERS,
              WALLONIA,
              GERMANOPHONE,
              POLITIC,
              LAW,
              ECONOMIC,
              ACCIDENT,
              CULTURE,
            ].map((category) => (
              <div
                key={category.ID}
                className="bg-zinc-900/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-zinc-800"
              >
                <MainPageCat id={category.ID} cat={category.AR} />
              </div>
            ))}
          </div>

          {/* Back to Top Button */}
          {showBackToTop && (
            <button
              onClick={toTop}
              className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-red-500 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 z-50"
            >
              <IoArrowUpCircle size={20} className="sm:w-6 sm:h-6" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
