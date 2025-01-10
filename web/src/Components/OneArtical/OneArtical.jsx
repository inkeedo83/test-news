import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import baseUrl from "../../assets/contants";
import { CATEGORIES } from "../../assets/categories.constant";
import BeReporter from "../../assets/BeReporter.png";
import { RiEyeFill } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";

export function OneArtical() {
  const [isloading, setIsloading] = useState(true);
  const [israndom, setIsrandom] = useState();
  const [data, setData] = useState([]);
  const http = `${baseUrl}/public/articles?limit=1&offset=${Math.floor(
    Math.random() * 50
  )}`;

  const DateOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
  };

  //screen render
  const screen = window.screen.width > 500;
  const PicStyle = screen
    ? { width: "800px", height: "600px" }
    : { width: "450px", height: "350px" };
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
  }, []);

  return (
    <div>
      {data.map((item) => (
        <div
          key={item.id}
          className="mt-10 mr-1 ml-1 bg-gray-900 text-sm md:w-[50vw] md:h-[610px] sm:text-l rounded-xl"
        >
          <h3 className=" absolute  opacity-80 text-white text-center sm:text-lg w-auto rounded-md h-18 sm:w-fit  p-2 mr-2 mt-2 mb-2 text-xs bg-red-900 sm:font-bold">
            {CATEGORIES[item.category].AR}
          </h3>{" "}
          <Link to={`/articles/${item.id}`}>
            <img
              src={
                item.image === "https://app-test-i.ru/api/image/null"
                  ? BeReporter
                  : item.image
              }
              className=" border-2  border-red-600  rounded-xl p-1 md:p-1 sm:p-3 w-[100vw] sm:w-[60vw] h-[40vh]  md:h-[55vh] "
            />
          </Link>
          <div className=" bg-black opacity-40  text-white p-1 mt-2 mr-2 ml-2">
            <FaPencil className="inline-flex  mr-2" />
            <span className=" text-xs sm:text-md p-2">
              {new Date(item.createdAt).toLocaleDateString("ar", DateOptions)}
            </span>
            <span className=" mr-2 ml-2">|</span>
            <RiEyeFill className="inline-flex  mr-2" />

            <span className="p-2 m-2"> {item.watchCount}</span>
          </div>
          <Link to={`/articles/${item.id}`}>
            <h3 className="  bg-gradient-to-r from-red-900 to-zinc-700 opacity-90 mr-2 ml-2 p-2 border-white text-md  md:text-lg min-h-3 font-bold text-white ">
              {item.title}
            </h3>
          </Link>
          <h5 className="  opacity-60 bg-zink-500 mr-2 ml-2 p-4 border-white text-md  md:text-lg min-h-3 font-bold text-slate-300">
            {item.shortContent}
            <Link
              to={`/articles/${item.id}`}
              className=" inline-flex mr-2 ml-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-800  hover:bg-red-600   "
            >
              اقرأ المزيد
            </Link>
          </h5>
        </div>
      ))}
    </div>
  );
}
