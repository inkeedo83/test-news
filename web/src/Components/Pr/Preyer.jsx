import { useState, useEffect } from "react";
import axios from "axios";

export function Preyer() {
  const [data, setData] = useState(null);

  // fetch start here
  useEffect(() => {
    axios
      .get(
        "https://muslimsalat.com/london.json?key=95a9cfaa2ce951e71902b811dc6788de"
      )

      .then((res) => {
        console.log(res), setData(res);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(data);

  return <></>;
}
