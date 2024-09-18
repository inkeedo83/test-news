import { useState, useEffect } from "react";
import { ImgView } from "../ImgView/ImgView";

import { Link } from "react-router-dom";
import { Trinding } from "../Trinding/Trinding";
import { PublicArtical } from "../PublicArtical/PublicArtical";

export default function MainPageTest() {
  //states
  const [isloading, setIsloading] = useState(true);
  const [data, setData] = useState([]);

  // fetch start here
  useEffect(() => {
    fetch("http://127.0.0.1:5010/public/articles?order=ASC")
      .then((res) => {
        const resulte = res.json();
        return resulte;
      })
      .then((resulte) => {
        setData(resulte.data);
      })

      .catch((err) => console.log(err));
  }, []);
  console.log(data);

  return (
    <>
      {data === null ? (
        isloading && (
          <span className=" bg-red-900 bold text-xl h-30 ">is loading </span>
        )
      ) : (
        <>
          <div
            className=" 
             grid grid-cols-6 justify-items-center"
          >
            <div className=" text-white  m-1 col-start-1 col-span-4 ">
              <h1 className=" sm:text-lg text-md w-fit p-2 bg-red-900 text-white  ">
                اخبار متنوعة
              </h1>

              <div className="  border-2  bg-neutral-950 border-red-900 text-xs  justify-items-center grid grid-cols-2 grid-rows-4 gap-1 sm:grid-cols-3 sm:grid-rows-3  ">
                {data.map((item) => (
                  <div
                    key={item.id}
                    className="m-2 relative max-w-xl mx-auto m-6 mx-1 "
                  >
                    <ImgView
                      className="rounded-xl h-48 w-40 sm:h-96 sm:w-96"
                      {...item}
                    />

                    <div className="absolute inset-0  bg-gray-700 opacity-20  rounded-md"></div>

                    <div className="absolute sm:h-8 sm:w-auto top-1 opacity-90 flex  justify-center m-1 ">
                      <h3 className="text-white sm:text-lg w-auto rounded-md h-18 sm:w-auto  p-1 text-xs bg-red-900 sm:font-bold">
                        {item.category.name}
                      </h3>
                    </div>
                    <div className="absolute sm:bottom-3 bottom-1  sm:h-26 opacity-70 m-1 flex  justify-between ">
                      <Link to={`/ReadArticleByID/${item.id}`}>
                        <h2 className="text-white sm:text-lg w-fit text-justify rounded-md h-18 sm:w-auto sm:h-34 p-4 bg-gray-900 sm:font-bold">
                          {item.title}
                        </h2>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className=" text-white sm:text-sm sm:p-2 border-2 border-red-900  m-1 col-start-5  col-end-7">
              <PublicArtical />
            </div>
          </div>
          <Trinding />
        </>
      )}
    </>
  );
}
