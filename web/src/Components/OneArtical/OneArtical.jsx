import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import baseUrl from "../../assets/contants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";

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
        console.log(data);
      })

      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h3 className=" mt-1  mb-[1px] text-white sm:text-lg w-fit rounded-md h-18 sm:w-fit p-3  sm:p-2 text-xs bg-red-900  sm:font-bold">
        اخبار متنوعه
      </h3>
      {data.map((item) => (
        <div className=" static" key={item.id}>
          <img
            style={PicStyle}
            src={item.image}
            className="   border-4 bg-zinc-300 border-red-900 p-3 "
          />

          <div className="relative  sm:bottom-36 bottom-36 p-4 sm:p-4  h-2 sm:h-8 opacity-70 m-1 ">
            <Link to={`/ReadArticleByID/${item.id}`}>
              <h2 className=" hover:text-red-700 text-white text-lg sm:text-lg sm:w-[30.2vw] text-center rounded-md h-[100px] sm:w-auto sm:h-34 p-8 sm:p-6 sm:mr-4 bg-gray-900 sm:font-bold">
                {item.title}
              </h2>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
