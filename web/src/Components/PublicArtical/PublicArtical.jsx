import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export function PublicArtical() {
  const [isloading, setIsloading] = useState(true);
  const [data, setData] = useState([]);
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

  return (
    <div>
      <h3 className="font-bold w-fit p-2 mb-10 bg-red-900">اخر الاخبار</h3>
      {data &&
        data.map((item) => (
          <ol key={item.id}>
            <Link to={`/ReadArticleByID/${item.id}`}>
              <li className="sm:h-12 border-b-2  list-disc m-4 border-dotted border-slate-100 ">
                {item.title}
              </li>
            </Link>
          </ol>
        ))}
      <span className="bg-white text-black">ads</span>
      <div className="h-fit bg-red-600 w-fit ">
        ipsum dolor sit amet consectetur, adipisicing elit. Quisquam,
        voluptates. Nostrum deleniti aut officiis cupiditate, dicta accusamus
        quos repellendus, explicabo iure porro excepturi quibusdam possimus
        quasi eveniet velit eaque harum!
      </div>
    </div>
  );
}
