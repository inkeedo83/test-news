import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../../assets/constants";
import { RelatedArticles } from "../../Components/RelatedArticles/RelatedArticles";
import { CATEGORIES } from "../../assets/categories.constant";
import { IoHome } from "react-icons/io5";
import { RiEyeFill } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";
import BeReporterNew from "../../assets/BeReporterNew.jpg";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaTelegramPlane,
} from "react-icons/fa";

const { MAIN } = CATEGORIES;

const DateOptions = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};

export default function ReadArticleByID() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toTop = () => {
    window.scrollTo(0, 0);
  };

  const [isloading, setIsloading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get(`${baseUrl}/public/articles/${id}`)
      .then((res) => (console.log(res), setData(res.data)))
      .catch((err) => console.log(err));
    toTop();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto py-16 px-4">
        {data === null ? (
          isloading && (
            <div className="text-center">
              <span className="text-red-600 font-bold text-4xl tracking-widest leading-loose">
                Loading...
              </span>
            </div>
          )
        ) : (
          <>
            <div className="mt-56 flex items-center justify-start mb-4">
              <Link
                className="text-red-600 hover:text-red-800 dark:hover:text-red-400 ml-2"
                to="/"
              >
                <IoHome className="inline-block mr-1 align-middle size-6" />
                {MAIN.AR}
              </Link>
              <span className="text-red-600 mx-1">/</span>
              <span className="text-red-600">الاخبار</span>
              <span className="text-red-600 mx-1">/</span>
              <Link
                className="text-red-600 hover:text-red-800 dark:hover:text-red-400 mx-1"
                to={`/categories/${data.category}`}
              >
                {CATEGORIES[data.category].AR}
              </Link>
              <span className="text-red-600 mx-1">/</span>
              <span className="text-red-600 truncate">
                {data.title.substring(0, 50)}...
              </span>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 transition-all duration-300">
              <h1 className="text-4xl font-extrabold text-center mb-6 bg-clip-text text-red-900 dark:text-white">
                {data.title}
              </h1>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center">
                  <span className="ml-2">مراسل بلجيكا</span>
                  <FaPencil className="inline-block mx-1" />
                </div>
                <div>
                  {new Date(data.createdAt).toLocaleDateString(
                    "ar",
                    DateOptions
                  )}
                </div>
                <div className="flex items-center">
                  <RiEyeFill className="inline-block mx-1" />
                  <span>{data.watchCount}</span>
                </div>
              </div>
              <div className="flex justify-center mb-6">
                <img
                  src={
                    data.image === `${baseUrl}/image/null`
                      ? BeReporterNew
                      : data.image
                  }
                  alt={data.title}
                  className="rounded-2xl transition-transform duration-300 hover:scale-105 w-full object-cover max-h-[500px]"
                />
              </div>
              <div className="text-lg leading-relaxed mb-2 space-y-4">
                {data.content.split("\n\n").map((paragraph, index) => {
                  const lines = paragraph.split("\n");
                  return (
                    <p key={index} className="mb-1">
                      <span className="font-bold ">{lines[0]}</span>
                      {lines.slice(1).map((line, idx) => (
                        <span key={idx}>
                          <br />
                          {line}
                        </span>
                      ))}
                    </p>
                  );
                })}
              </div>
              <div className="mt-6">
                <h2 className="text-2xl font-semibold text-center mb-4">
                  شارك الخبر مع أصدقائك
                </h2>
                <div className="flex justify-center space-x-4">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookF
                      size={40}
                      className="transition-all duration-300 hover:scale-110"
                    />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      data.title
                    )}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter
                      size={40}
                      className="transition-all duration-300 hover:scale-110"
                    />
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      data.title + " " + window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp
                      size={40}
                      className="transition-all duration-300 hover:scale-110"
                    />
                  </a>
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(
                      window.location.href
                    )}&text=${encodeURIComponent(data.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTelegramPlane
                      size={40}
                      className="transition-all duration-300 hover:scale-110"
                    />
                  </a>
                </div>
              </div>
              <div className="mt-8 flex justify-center">
                <button
                  className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-lg"
                  onClick={() => navigate(-1)}
                >
                  الرجوع
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {data && data ? (
        <RelatedArticles category={data.category} id={data.id} />
      ) : null}
    </div>
  );
}
