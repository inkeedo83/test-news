import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import baseUrl from "../../assets/contants";
import { CATEGORIES } from "../../assets/categories.constant";

const DateOptions = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};

export default function MainPageCat({ id, cat }) {
  //states
  const [isloading, setIsloading] = useState(true);
  const [data, setData] = useState([]);
  const ID = id;
  const Cat = cat;

  useEffect(() => {
    axios
      .get(`${baseUrl}/public/articles?limit=6&order=DESC&category=${ID}`)
      .then((res) => setData(res.data.data), console.log(data))
      .catch((err) => console.log(err));
  }, []);

  const render = data.map((item) => (
    <div key={item.id} className="m-2 relative max-w-xl mx-auto mx-1 ">
      <div className="absolute inset-0  bg-gray-700 opacity-20  rounded-md"></div>
      <div className="absolute sm:h-8 sm:w-auto top-1 opacity-90 flex  justify-center m-1 ">
        <Link to={`/categories/${item.category}`}>
          <h2 className="text-white text-center sm:text-lg w-auto rounded-sm h-18 sm:w-fit  p-1 mt-2 text-xs bg-red-900 sm:font-bold">
            {CATEGORIES[item.category].AR}
          </h2>
        </Link>
      </div>

      <img
        alt={cat}
        src={item.image}
        className=" border-2 bg-white border-red-600  rounded-xl p-3 w-[450px] h-[300px]"
      />
      <div className="absolute sm:bottom-3 bottom-1  sm:h-26 opacity-70  mb-4 flex  justify-between ">
        <Link to={`/articles/${item.id}`}>
          <h2 className=" hover:text-red-700  text-center text-white sm:text-lg w-fit text-justify rounded-md h-18 sm:w-auto sm:h-24 sm:p-3 p-2 bg-gray-900 sm:font-bold">
            {item.title}
          </h2>
        </Link>
      </div>
    </div>
  ));

  return (
    <>
      {data === null ? (
        isloading && (
          <span className=" text-red-600 bold text-xl h-30 ">is loading </span>
        )
      ) : (
        <>
          <div
            className=" 
             grid grid-cols-4 justify-items-center "
          >
            <div className=" text-white  m-1 col-start-1 col-span-4 mt-32">
              <h1 className="text-white text-center sm:text-lg w-auto rounded-md h-18 sm:w-fit  p-3 sm:p-5 mt-2 text-xs bg-red-900 sm:font-bold">
                اخبار {Cat}
              </h1>

              <div className="  border-2  bg-white border-red-900 text-xs  justify-items-center grid grid-cols-2  grid-rows-3 sm:grid-cols-3 sm:grid-rows-2 gap-2 sm:gap-1 sm:h-fit  ">
                {render}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
