import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const DateOptions = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};

export default function ReadArticleByCat() {
  const { cat } = useParams();
  //states
  const [isloading, setIsloading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5010/${cat}`)
      .then((res) => (console.log(res), setData(res.data.data)))
      .catch((err) => console.log(err));
  }, []);

  console.log(data, "render by catigory");

  return (
    <>
      {data === null
        ? isloading && (
            <span className=" text-red-600 bold text-xl h-30 ">
              is loading{" "}
            </span>
          )
        : data.map((item) => (
            <div
              key={item.id}
              className=" flex flex-col bg-white  border-b-0 m-1 space-x-2 screen"
            >
              <h5 className=" text-xs z-0 bold h-8  w-28 bg-red-600 text-white p-2 m-2  mb-0 ">
                {item.category.name}
              </h5>

              <Link to={`/ReadArticleByID/${item.id}`}>
                <img
                  src="src/assets/belgium.svg"
                  alt="People"
                  className="   cursor-pointer hover:translate-y-0.1  hover:border-4 hover:border-t-6 border-2 border-red-600 duration-500 w-screen  h-28 sm:h-48 md:h-64"
                />
              </Link>

              <div className="  bg-gray-300 z-1 p-4 md:p-6">
                <div className="text-sm flex items-center "></div>
                <span className=" text-red-600 leading-none z-1">
                  {new Date(item.createdAt).toLocaleDateString(
                    "ar-EG-u-nu-latn",
                    DateOptions
                  )}
                </span>

                <h3 className="font-semibold mb-2 text-xl leading-tight sm:leading-normal">
                  {item.title}
                </h3>
                <p className=" text-xs ">
                  {"..." + item.content.slice(0, 100)}
                </p>
                <Link
                  to={`/ReadArticleByID/${item.id}`}
                  className=" cursor-pointer bold text-l text-red-600"
                >
                  ..اقرأ المزيد
                </Link>
              </div>
            </div>
          ))}
    </>
  );
}
