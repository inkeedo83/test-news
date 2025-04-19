import { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { RiEyeFill } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";
import { CATEGORIES } from "../../assets/categories.constant";
import BeReporterNew from "../../assets/BeReporterNew.jpg";
import baseUrl from "../../assets/constants";

const DateOptions = {
  weekday: "long",
  month: "short",
  day: "numeric",
};

const ArticleCard = memo(({ article }) => {
  return (
    <div className="group backdrop-blur-md bg-gray-800/30 rounded-xl sm:rounded-2xl p-3 sm:p-6 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl border border-gray-700/50">
      <div className="relative overflow-hidden rounded-lg sm:rounded-xl">
        <h3 className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white bg-red-600/80 backdrop-blur-md rounded-full shadow-lg">
          {CATEGORIES[article.category].AR}
        </h3>
        <Link to={`/articles/${article.id}`}>
          <div className="relative overflow-hidden rounded-xl aspect-video sm:aspect-[4/3]">
            <img
              src={
                article.image === `${baseUrl}/image/null`
                  ? BeReporterNew
                  : article.image
              }
              alt={article.title}
              className="w-full h-full object-fill transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 mt-3 sm:mt-4 text-xs sm:text-sm text-gray-400">
        <div className="flex items-center">
          <FaPencil className="w-4 h-4 mr-2" />
          <span>
            {new Date(article.createdAt).toLocaleDateString("ar", DateOptions)}
          </span>
        </div>
        <div className="flex items-center">
          <RiEyeFill className="w-4 h-4 mr-2" />
          <span>{article.watchCount}</span>
        </div>
      </div>

      <Link to={`/articles/${article.id}`}>
        <h3 className="mt-2 sm:mt-4 text-base sm:text-xl font-bold text-white hover:text-red-500 transition-colors duration-200 line-clamp-2">
          {article.title}
        </h3>
      </Link>

      <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-400 line-clamp-2 sm:line-clamp-3">
        {article.shortContent}
      </p>

      <Link
        to={`/articles/${article.id}`}
        className="inline-flex items-center mt-3 sm:mt-4 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors duration-200"
      >
        اقرأ المزيد
      </Link>
    </div>
  );
});

ArticleCard.propTypes = {
  article: PropTypes.shape({
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    watchCount: PropTypes.number.isRequired,
    shortContent: PropTypes.string.isRequired,
  }).isRequired,
};

ArticleCard.displayName = "ArticleCard";

export default ArticleCard;
