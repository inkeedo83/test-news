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
export default function LatestNews() {
  const [data, setData] = useState([]);
  const http = `${baseUrl}/public/articles?limit=5&order=DESC&offset=${Math.floor(
    Math.random() * 100
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
      <div className="  rounded-md bg-zinc-300 h broder border-2  text-xs border-red-900">
        {data &&
          data.map((item) => (
            <div
              key={item.id}
              className=" grid grid-cols-3 border border-2 border-red-900"
            >
              <div className="col-span-1">
                <Link to={`/articles/${item.id}`}>
                  <img
                    src={
                      item.image === "https://app-test-i.ru/api/image/null"
                        ? BeReporter
                        : item.image
                    }
                    className=" border-2  border-red-600  rounded-xl p-1 md:p-1 sm:p-6 m-2 sm:h-[100px] sm:w-[150px] "
                  />
                </Link>
              </div>
              <div className="col-span-2 mt-3 sm:mr-0 mr-4 dark:text-white   text-red-900">
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
                  <div className=" bg-gradient-to-r mt-1 sm:h-16 h-10  rounded-md from-red-900 to-zinc-700  ml-4">
                    <h4 className=" sm:text-lg text--sm dark:text-white  m-1 p-1 text-white    ">
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
{
  //   <Link href={`/categories/${item.category}`}>
  //   <h3 className="text-white  hover:text-black text-center sm:text-sm w-auto rounded-md h-fit sm:w-fit  p-1 mr-2  mt-1 text-xs bg-red-900 sm:font-bold">
  //     {CATEGORIES[item.category].AR}
  //   </h3>
  // </Link>{" "}
  /* <div>
<div className="p-2 mr-2 ml-2  h-10  dark:text-white text-red-900">
                <span className="text-md p-2 m-2 dark:text-white text-red-900">
            

                <RiEyeFill className="inline-flex  mr-2" />

                <span className="p-2 m-2 dark:text-white text-red-900">
                  {item.watchCount}
                </span>
              </div>

              <Link to={`/articles/${item.id}`}>
                <h4 className=" mb-1 mr-2 ml-2 hover:text-red-900 dark:text-white text-red-900 sm:text-md w-fit text-justify  h-18 sm:w-auto sm:h-[40px] p-1  sm:font-bold ">
                  {item.title}
                </h4>
              </Link>
            </div> */
}
