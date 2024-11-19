import { useState, useEffect } from "react";
import { ImgView } from "../ImgView/ImgView";

export function CatsRender({ data }) {
  const arr = data;
  console.log(data);

  return (
    <>
      {arr &&
        arr.map((arr) => (
          <div key={arr.id}>
            <h1 className=" bg-red-900 bold text-xl h-30 ">{arr.title}</h1>
          </div>
        ))}
    </>
  );
}
