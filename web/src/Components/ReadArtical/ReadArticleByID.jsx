import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../../assets/contants";
import { RelatedArticles } from "../../Components/RelatedArticles/RelatedArticles";
import { CATEGORIES } from "../../assets/categories.constant";
import { IoHome } from "react-icons/io5";
import { RiEyeFill } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";
import BeReporter from "../../assets/BeReporter.png";
import { Link } from "react-router-dom";

const { MAIN } = CATEGORIES;

import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterShareButton,
  XIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
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

  console.log(data);
  return (
    <div className=" text-md sm:text-xl ">
      <div className="grid grid-cols-1 pt-24  ">
        <div>
          {data === null ? (
            isloading && (
              <span className=" text-red-600 bold text-4xl tracking-widest leading-loose h-30 ">
                is loading{" "}
              </span>
            )
          ) : (
            <>
              <div className=" flex  pt-10 mr-4 text-md  sm:text-xl leading-loose  ">
                <Link
                  className=" inline-flex  text-red-600 hover:text-zinc-400 ml-2"
                  to={`/`}
                >
                  <IoHome className="size-4 sm:size-6 mt-2 ml-2" />

                  {MAIN.AR}
                </Link>

                <span className="text-red-600 ml-2 ">/</span>
                <span className="text-red-600 ml-2  ">الاخبار</span>
                <span className="text-red-600  ml-2 ">/</span>
                <Link
                  className="text-red-600 hover:text-zinc-400  ml-2 "
                  to={`/categories/${data.category}`}
                >
                  {CATEGORIES[data.category].AR}
                </Link>
                <span className="text-red-600  ml-2">/</span>
                <span className=" text-red-600  ml-2  truncate ...">
                  {" "}
                  {data.title}...
                </span>
              </div>
              <hr className="h-2 mr-4 ml-4 bg-red-600" />

              <div className=" scroll-px-4  indent-2 text-right w-auto flex flex-col  min-h-screen items-center  border-b-0 m-1 ">
                <h1 className="  text-red-900 text-black text-center font-bold text-lg sm:mb-14 sm:mt-10   sm:text-3xl  p-2 m-0 mb-2 ">
                  {data.title}
                </h1>

                <div className="inline-block text-white text-xs sm:text-lg bg-red-500  ">
                  <span className=" mr-2 sm:mr-24 bold p-2 ml-6    ">
                    مراسل بلجيكا
                  </span>
                  <FaPencil className="inline-flex  mr-2" />
                  <span className="  sm:m-2">
                    {new Date(data.createdAt).toLocaleDateString(
                      "ar",
                      DateOptions
                    )}{" "}
                  </span>
                  <span className="p-2 ">
                    {" "}
                    عدد القراءات : {data.watchCount}{" "}
                    <RiEyeFill className="inline-flex  mr-2" />
                  </span>
                  <img
                    src={
                      data.image === "https://app-test-i.ru/api/image/null"
                        ? BeReporter
                        : data.image
                    }
                    className=" border-2 bg-white border-red-600  rounded-xl p-3 w-[800px] h-[500px]"
                  />
                </div>

                <div className="w-fit  m-4 p-2">
                  <span className="  text-md font-bold text-gray-600 sm:text-3xl  leading-loose   p-1 ">
                    {data.content}
                  </span>
                </div>
                <div className="  text-red-600 border border-red-600  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-1 mb-1 ">
                  <h1 className="font-semibold text-xl ">
                    ارسل الخبر الى صديق{" "}
                  </h1>
                  <div className="p-2">
                    <FacebookShareButton
                      className="m-2"
                      url={window.location.href}
                      htmlTitle={data.title}
                      hashtag="#العربي بلجيكا"
                    >
                      <FacebookIcon
                        className=" sm:size-10 size-8"
                        round={true}
                      />
                    </FacebookShareButton>{" "}
                    <FacebookMessengerShareButton
                      className="m-2"
                      url={window.location.href}
                      htmlTitle={data.title}
                      hashtag="#العربي بلجيكا"
                    >
                      <FacebookMessengerIcon
                        className=" sm:size-10  size-8"
                        round={true}
                      />
                    </FacebookMessengerShareButton>
                    <WhatsappShareButton
                      className="m-2"
                      url={window.location.href}
                      htmlTitle={data.title}
                      hashtag="#العربي بلجيكا"
                    >
                      <WhatsappIcon
                        className=" sm:size-10  size-8"
                        round={true}
                      />
                    </WhatsappShareButton>
                    <TelegramShareButton
                      className="m-2"
                      url={window.location.href}
                      htmlTitle={data.title}
                      hashtag="#العربي بلجيكا"
                    >
                      <TelegramIcon
                        className=" sm:size-10  size-8"
                        round={true}
                      />
                    </TelegramShareButton>
                    <TwitterShareButton
                      className="m-2"
                      url={window.location.href}
                      htmlTitle={data.title}
                      hashtag="#العربي بلجيكا"
                    >
                      <XIcon className=" sm:size-10 size-8" round={true} />
                    </TwitterShareButton>
                  </div>
                </div>
                <button
                  className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-1 mb-1 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  onClick={() => navigate(-1)}
                >
                  الرجوع
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        <RelatedArticles />
      </div>
    </div>
  );
}
