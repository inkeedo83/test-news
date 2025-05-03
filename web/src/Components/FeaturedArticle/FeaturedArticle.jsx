import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BeReporterNew from "../../assets/BeReporterNew.jpg";
import baseUrl from "../../assets/constants";
import { CATEGORIES } from "../../assets/categories.constant";

export default function FeaturedArticle() {
  const [article, setArticle] = useState(null);
  const http = `${baseUrl}/public/articles?order=DESC&isVeryImportant=true`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(http);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setArticle(result.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!article) return null;

  return (
    <div className="mb-4 sm:mb-8">
      <div className="relative h-[300px] sm:h-[500px] rounded-xl overflow-hidden">
        <Link to={`/articles/${article.id}`}>
          <img
            loading="lazy"
            src={
              article.image === `${baseUrl}/image/null`
                ? BeReporterNew
                : article.image
            }
            className="w-full h-full object-cover"
            alt={article.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
            <div className="absolute bottom-0 p-4 sm:p-8">
              <span className="px-3 py-1 sm:px-4 sm:py-2 bg-red-500 text-white rounded-full mb-2 sm:mb-4 inline-block text-sm sm:text-base">
                {CATEGORIES[article.category].AR}
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-4">
                {article.title}
              </h2>
              <p className="text-base sm:text-lg text-zinc-200 mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-none">
                {article.shortContent}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
