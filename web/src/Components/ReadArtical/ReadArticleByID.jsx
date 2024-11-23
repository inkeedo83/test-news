import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ImgView } from "../ImgView/ImgView";
import baseUrl from "../../assets/contants";
import { RelatedArticles } from "../../Components/RelatedArticles/RelatedArticles";
import { tabs } from "../../assets/text.constant";

const { MAIN, PROVINCE, CITY, POLITICS, ECONOMICS, LAWS, ACCDENT } = tabs;

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

  const [isloading, setIsloading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get(`${baseUrl}/public/articles/${id}`)
      .then((res) => (console.log(res), setData(res.data)))
      .catch((err) => console.log(err));
  }, []);

  console.log(data);
  return (
    <div className="bg-white  text-xl ">
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
              <a
                href={`/`}
                className="p-2  font-bold text-md  sm:text-l  text-red-600 "
              >
                {MAIN.AR}
              </a>
              <span className=" font-bold text-md  sm:text-l  text-red-600 p-2 ">
                /
              </span>
              <a
                href={`/ReadArticleByCat/${data.category.id}`}
                className=" font-bold text-md  sm:text-l  text-red-600 p-2 "
              >
                {data.category.name}
              </a>
              <span className="  font-bold text-md  sm:text-l  text-red-600 p-2  ">
                /
              </span>
              <span className=" font-bold text-md  sm:text-l  text-red-600 p-2  ">
                {data.title}...
              </span>

              <div className=" scroll-px-4  indent-2 text-right w-auto flex flex-col  min-h-screen items-center bg-slate-200 border-b-0 m-1 ">
                <h1 className="font-bold text-md  sm:text-3xl  text-red-600 p-2 m-0 mb-2 ">
                  {data.title}
                </h1>

                <div className="inline-block  bg-red-500  ">
                  <span className="  text-xs z-0 bold  text-white  text-center w-9   p-2 m-2  mb-0 ">
                    عدد القراءات : {data.watchCount}
                  </span>
                </div>
                <ImgView
                  style={{ height: 400, width: 550 }}
                  {...data}
                  className="rounded-lg "
                />
                <div className="w-fit  m-4 p-2">
                  <span className="  text-md  sm:text-3xl  leading-loose  text-red-900 text-slate-800 p-1 ">
                    {data.content.replace(/ .*/, "  ")}
                  </span>
                  <span className="  text-slate-800  text-md  sm:text-3xl leading-loose  ">
                    {data.content.substr(data.content.indexOf(" ") + 1)}
                  </span>
                </div>
                <div className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-1 mb-1 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
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
                      <FacebookIcon size={45} round={true} />
                    </FacebookShareButton>{" "}
                    <FacebookMessengerShareButton
                      className="m-2"
                      url={window.location.href}
                      htmlTitle={data.title}
                      hashtag="#العربي بلجيكا"
                    >
                      <FacebookMessengerIcon size={45} round={true} />
                    </FacebookMessengerShareButton>
                    <WhatsappShareButton
                      className="m-2"
                      url={window.location.href}
                      htmlTitle={data.title}
                      hashtag="#العربي بلجيكا"
                    >
                      <WhatsappIcon size={45} round={true} />
                    </WhatsappShareButton>
                    <TelegramShareButton
                      className="m-2"
                      url={window.location.href}
                      htmlTitle={data.title}
                      hashtag="#العربي بلجيكا"
                    >
                      <TelegramIcon size={45} round={true} />
                    </TelegramShareButton>
                    <TwitterShareButton
                      className="m-2"
                      url={window.location.href}
                      htmlTitle={data.title}
                      hashtag="#العربي بلجيكا"
                    >
                      <XIcon size={45} round={true} />
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
