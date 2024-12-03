import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import baseUrl from "../../assets/contants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import { CATEGORIES } from "../../assets/categories.constant";

const DateOptions = {
  weekday: "long",
  month: "short",
  day: "numeric",
};
export default function LatestNews() {
  const [data, setData] = useState([]);
  const http = `${baseUrl}/public/articles?limit=5&order=DESC&offset=${Math.floor(
    Math.random() * 15
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
  }, []);

  return (
    <>
      <h3 className="  text-white sm:text-lg w-fit rounded-md h-18 sm:w-fit p-3   sm:p-1 text-xs bg-red-900  sm:font-bold">
        اخر الاخبار
      </h3>
      <div className="  flex flex-col rounded-md border-1 bg-zinc-500 border-red-900">
        {data &&
          data.map((item) => (
            <div
              key={item.id}
              className=" bg-zinc-300 border-2 h-fit border-red-900 "
            >
              <a href={`/categories/${item.category}`}>
                <h3 className="text-white text-center sm:text-sm w-auto rounded-md h-fit sm:w-fit  p-1 mr-2  mt-1 text-xs bg-red-900 sm:font-bold">
                  {CATEGORIES[item.category].AR}
                </h3>
              </a>
              <div className="p-2 mr-2 ml-2 bg-zinc-500">
                <FontAwesomeIcon icon={faPenNib} beat />
                <span className="text-md p-2 m-2">
                  {new Date(item.createdAt).toLocaleDateString(
                    "ar",
                    DateOptions
                  )}{" "}
                </span>
                <span className="p-2 mr-2 ml-2">|</span>
                <FontAwesomeIcon icon={faEye} beat />
                <span className="p-2 m-2"> {item.watchCount}</span>
              </div>
              <Link to={`/articles/${item.id}`}>
                <h4 className=" mb-1 mr-2 ml-2 hover:text-red-900 text-white  sm:text-md w-fit text-justify bg-zinc-600 h-18 sm:w-auto sm:h-34 p-1  sm:font-bold ">
                  {item.title}
                </h4>
              </Link>
            </div>
          ))}
      </div>
      <span className="bg-white text-black">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </span>
    </>
  );
}
