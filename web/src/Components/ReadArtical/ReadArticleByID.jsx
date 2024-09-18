import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ImgView } from "../ImgView/ImgView";

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
      .get(`http://127.0.0.1:5010/public/articles/${id}`)
      .then((res) => (console.log(res), setData(res.data)))
      .catch((err) => console.log(err));
  }, []);

  console.log(data);

  return (
    <>
      {data === null ? (
        isloading && (
          <span className=" text-red-600 bold text-xl h-30 ">is loading </span>
        )
      ) : (
        <div className=" scroll-px-4 w-fit  indent-2 text-right flex flex-col  items-center bg-slate-200 border-b-0 m-1 ">
          <h1 className="font-semibold  text-red-600 p-2 m-0 mb-2 text-xl leading-tight sm:leading-normal">
            {data.title}
          </h1>

          <div className="inline-block  bg-red-500  ">
            <span className="  text-xs z-0 bold  text-white  text-center w-9   p-2 m-2  mb-0 ">
              عدد القراءات : {data.watchCount}
            </span>
          </div>
          <ImgView style={{ height: 150, width: 200 }} {...data} />

          <div className="w-2/3">
            <span className="  select-all font-semibold text-slate-800 p-1 ">
              {data.content.replace(/ .*/, " ")}
            </span>
            <span className="  mr-4 text-slate-600 font-light ">
              {data.content.substr(data.content.indexOf(" ") + 1)}
            </span>
          </div>
          <button
            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-1 mb-1 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            onClick={() => navigate(-1)}
          >
            الرجوع
          </button>

          <div className="p-2">
            <FacebookShareButton
              url={window.location.href}
              htmlTitle={data.title}
              hashtag="#العربي بلجيكا"
            >
              <FacebookIcon size={30} round={true} />
            </FacebookShareButton>{" "}
            <FacebookMessengerShareButton
              url={window.location.href}
              htmlTitle={data.title}
              hashtag="#العربي بلجيكا"
            >
              <FacebookMessengerIcon size={30} round={true} />
            </FacebookMessengerShareButton>
            <WhatsappShareButton
              url={window.location.href}
              htmlTitle={data.title}
              hashtag="#العربي بلجيكا"
            >
              <WhatsappIcon size={30} round={true} />
            </WhatsappShareButton>
            <TelegramShareButton
              url={window.location.href}
              htmlTitle={data.title}
              hashtag="#العربي بلجيكا"
            >
              <TelegramIcon size={30} round={true} />
            </TelegramShareButton>
            <TwitterShareButton
              url={window.location.href}
              htmlTitle={data.title}
              hashtag="#العربي بلجيكا"
            >
              <XIcon size={30} round={true} />
            </TwitterShareButton>
          </div>
        </div>
      )}
    </>
  );
}
