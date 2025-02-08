import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import baseUrl from "../../assets/contants";
import { CATEGORIES } from "../../assets/categories.constant";
import BeReporter from "../../assets/BeReporter.png";
import { RiEyeFill } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";

const DateOptions = {
  weekday: "long",

  month: "short",
  day: "numeric",
};
const toTop = () => {
  window.scrollTo(0, 0);
};
export function RelatedArticles() {
  const [data, setData] = useState([]);
  const http = `${baseUrl}/public/articles?limit=5&order=DESC&offset=${Math.floor(
    Math.random() * 80
  )}`;

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
    toTop();
  }, []);
  const screen = window.screen.width > 500;

  return (
    <>
      <h3 className="  mt-28 text-white sm:text-lg w-fit rounded-md h-18 sm:w-fit p-3   sm:p-1 text-xs bg-red-900  sm:font-bold">
        مواضيع ذات صله
      </h3>
      <div className="  bg-zinc-900 border-2 border-red-900 ">
        {data &&
          data.map((item) => (
            <div
              key={item.id}
              className=" grid grid-cols-5  gap-0 border border-2 border-red-900"
            >
              <div className="col-span-1 p-0">
                <Link className="p-0" to={`/articles/${item.id}`}>
                  <img
                    style={
                      screen
                        ? { height: "120px", width: "180px" }
                        : { height: "90px", width: "90px" }
                    }
                    src={
                      item.image === "https://app-test-i.ru/api/image/null"
                        ? BeReporter
                        : item.image
                    }
                    className=" border-2  border-red-600  rounded-xl p-1 md:p-1 sm:p-0 m-2 "
                  />
                </Link>
              </div>
              <div className=" text-xs col-span-4 mt-3 sm:mr-0 mr-4 text-white  text-red-900">
                <RiEyeFill className="inline-flex  ml-2 " />
                <p className="inline p-2">{item.watchCount} </p>
                <span className=" mr-2 ml-2">|</span>

                <FaPencil className="inline-flex  mr-2" />
                <p className="inline p-4  ">
                  {" "}
                  {new Date(item.createdAt).toLocaleDateString(
                    "ar",
                    DateOptions
                  )}
                </p>

                <Link to={`/articles/${item.id}`}>
                  <div className=" bg-gradient-to-r mt-1 sm:h-20 h-14  rounded-md from-red-900 to-zinc-700  ml-4">
                    <h4 className=" sm:text-lg text--sm dark:text-white  m-1 p-2 text-white    ">
                      {item.title}
                    </h4>
                  </div>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
