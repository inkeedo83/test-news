import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import baseUrl from "../../assets/contants";
import { CATEGORIES } from "../../assets/categories.constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import BeReporter from "../../assets/BeReporter.png";

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
        <div className=" sm:h-[636px] h-[369px] static" key={item.id}>
          <Link to={`/categories/${item.category}`}>
            <h3 className="  relative  sm:top-20 top-12 text-white hover:text-black text-center sm:text-lg w-20 sm:w-28 rounded-md h-18   p-1  mt-2 text-xs bg-red-900  sm:font-bold">
              {CATEGORIES[item.category].AR}
            </h3>
          </Link>
          <Link to={`/articles/${item.id}`}>
            <img
              style={PicStyle}
              src={
                item.image === "https://app-test-i.ru/api/image/null"
                  ? BeReporter
                  : item.image
              }
              className="   border-2 border-b-0 bg-gray-900 p-4 border-red-900  "
            />
          </Link>
          <div className="relative  sm:bottom-36 bottom-36 p-4 sm:p-4  h-2 sm:h-8 m-1 ">
            <Link to={`/articles/${item.id}`}>
              <h2 className="  opacity-90  hover:bg-black   text-white  text-center  text-xl  sm:text-lg  rounded-md p-8 sm:p-6 sm:mr-4 bg-red-900 sm:font-bold   sm:w-auto sm:h-34  h-[100px]  ">
                {item.title}
              </h2>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
