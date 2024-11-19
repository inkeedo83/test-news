import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import baseUrl from "../../assets/contants";
import { ImgView } from "../ImgView/ImgView";

export function OneArtical({ any }) {
  const [isloading, setIsloading] = useState(true);
  const [israndom, setIsrandom] = useState();
  const [data, setData] = useState([]);
  const http = `${baseUrl}/public/articles?limit=1&offset=${Math.floor(
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
      <div className=" border-2 border-red-800">
        {data.map((item) => (
          <ul key={item.id}>
            <li>
              <ImgView {...item} style={any} />
            </li>
          </ul>
        ))}
      </div>
    </>
  );
}
