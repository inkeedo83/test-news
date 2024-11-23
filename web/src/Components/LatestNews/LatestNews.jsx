import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import baseUrl from "../../assets/contants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";

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
      <h3 className="text-white text-center sm:text-lg w-auto rounded-sm h-18 sm:w-fit  p-3 sm:p-4 mt-2 text-xs bg-red-600 sm:font-bold">
        اخر الاخبار
      </h3>
      <div className="   mb-4  flex flex-col rounded-md border-1 bg-neutral-600 border-red-900">
        {data &&
          data.map((item) => (
            <div key={item.id} className=" border-2 border-red-700 ">
              <a href={`/ReadArticleByCat/${item.category.id}`}>
                <h3 className="text-white text-center sm:text-lg w-auto rounded-md h-18 sm:w-fit  p-1 mr-2 mt-2 text-xs bg-red-600 sm:font-bold">
                  {item.category.name}
                </h3>
              </a>
              <div className="p-2 mt-2 mr-2 ml-2">
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
              <Link to={`/ReadArticleByID/${item.id}`}>
                <h4 className=" hover:text-red-900 text-white  sm:text-lg w-fit text-justify bg-neutral-700 rounded-md h-18 sm:w-auto sm:h-34 p-4  sm:font-bold ">
                  {item.title}
                </h4>
              </Link>
            </div>
          ))}
      </div>
      <span className="bg-white text-black">ads</span>
    </>
  );
}
