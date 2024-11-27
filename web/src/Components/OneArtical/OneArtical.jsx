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
  console.log(http);
  const DateOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
  };
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
    <div className="flex-row w-fit items-center">
      {data.map((item) => (
        <div className="h-fit w-fit" key={item.id}>
          <img
            src={item.image}
            className="   border-4 bg-zinc-300 border-red-900 p-3 w-[900px] h-[700px]"
          />

          <div>
            <Link className="relative w-80" to={`/ReadArticleByID/${item.id}`}>
              <h2 className=" opacity-80 pr-30 p-8 pl-30 m-1 absolute sm:right-8 sm:bottom-10 bottom-2  hover:text-red-700 text-white sm:text-[30px] rounded-md w-[800px] h-fit bg-gray-800 sm:font-bold">
                {item.title}
                &nbsp;....
              </h2>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
