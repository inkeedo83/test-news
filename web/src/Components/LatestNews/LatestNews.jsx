import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import baseUrl from "../../assets/contants";

const DateOptions = {
  weekday: "long",
  year: "numeric",
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
      <h3 className="sm:text-lg text-md w-fit p-1 bg-red-900 text-white  ">
        اخر الاخبار
      </h3>
      <div className="  divide-y divide-dashed divide-inherit divide-y-2 border-2 border-red-900">
        {data &&
          data.map((item) => (
            <div key={item.id} className="  ">
              <a href={`/ReadArticleByCat/${item.category.id}`}>
                <h3 className="text-white text-center sm:text-lg w-auto rounded-md h-18 sm:w-16  p-1 mr-2 mt-2 text-xs bg-red-600 sm:font-bold">
                  {item.category.name}
                </h3>
              </a>

              <Link to={`/ReadArticleByID/${item.id}`}>
                <h4 className=" hover:text-red-700 text-white sm:text-lg w-fit text-justify rounded-md h-18 sm:w-auto sm:h-34 p-4 bg-gray-900 sm:font-bold ">
                  {item.title}
                </h4>
              </Link>
              <div className="m-4">
                <span className="p-2 m-2">
                  تاريخ الانشاء
                  {new Date(item.createdAt).toLocaleDateString(
                    "ar-EG-u-nu-latn",
                    DateOptions
                  )}{" "}
                </span>
                <span className="p-2 m-2">|</span>
                <span>
                  {" "}
                  {new Date().toLocaleDateString(
                    "ar-EG-u-nu-latn",
                    DateOptions
                  )}{" "}
                </span>
                <span className="p-2 m-2 ">|</span>
                <span className="p-2 m-2">
                  {" "}
                  عدد القراءات : {item.watchCount}
                </span>
              </div>
            </div>
          ))}
      </div>
      <span className="bg-white text-black">ads</span>
    </>
  );
}