import React from "react";
import { useState } from "react";
import { CATEGORIES } from "../../assets/categories.constant";
import axios from "axios";

export function AdminPanel() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageView, setImageView] = useState("");
  const [imageToDataBase, setImageToDataBase] = useState("");
  const [page, setPage] = useState();
  const [published, setPublished] = useState("");
  const SubmitHandlr = (e) => {
    e.preventDefault();
    const artical = { title, content, category, imageToDataBase };
    console.log(artical);

    axios
      .post(
        "https://app-test-i.ru/api/articles",
        {
          content: content,
          title: title,
          category: category,
          image: imageToDataBase,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then(function (response) {
        console.log(response);
        setPublished("تم نشر الخبر");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="  text-xl font-bold pt-32 mr-10">
        <p className="block text-red-800 text-2xl font-bold "> واجهه الادمن</p>{" "}
        <form onSubmit={SubmitHandlr} name="da">
          <label className="block text-red-800  mt-5 mb-5"> الفئات </label>
          <select
            className="  inline-flex h-fit bg-slate-400 "
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value=""></option>
            <option value="BRUSSELS">بروكسل</option>
            <option value="ANTWERP">انتورب</option>
            <option value="LIEGE">لياج</option>
            <option value="FLANDERS">فلاندرز</option>
            <option value="WALLONIA">والونيا</option>
            <option value="GERMANOPHONE">جرمانوفون</option>
            <option value="LAW">قوانين</option>
            <option value="ECONOMIC">اقتصاد و مال</option>
            <option value="ACCIDENT">حوادث و جريمه</option>
            <option value="CULTURE">ثقافه</option>
          </select>
          <label className="block text-red-800  "> العنوان</label>
          <input
            className="  block text-red-800   p-2 h-4  bg-slate-400 p-4 w-[600px]  "
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="block text-red-800  "> نص الخبر </label>
          <textarea
            className="  block  bg-slate-400 h-[200px]  p-4 w-[1000px] "
            type="text"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <input
            className="  block  text-white rounded-xl bg-red-800 p-3 mt-10 mb-10  "
            type="file"
            value={""}
            onChange={(e) => {
              const file = e.target.files?.[0];
              setImageView(file ? URL.createObjectURL(file) : undefined);
              setImageToDataBase(file);
            }}
          />

          <div className=" block bg-slate-600 w-[800px] text-white text-center  ">
            <p className="block text-black  ">معاينه الخبر قبل النشر</p>
            <img
              src={`${imageView}`}
              style={{ width: "400px", height: "400px" }}
            />
            <p className="block text-red-800  ">الفئه:{category}</p>
            <p className="  text-red-800  ">{title}</p>
            <p>{content}</p>
          </div>

          <button className=" block  text-white rounded-xl bg-red-800 p-3 mt-10 mb-10 ">
            اضافه الخبر الى الموقع{" "}
          </button>
          <p className="  text-red-800  text-4xl ">{published}</p>

          <button
            onClick={() => {
              console.log(imageView, imageToDataBase);
            }}
            className=" block  text-white rounded-xl bg-red-800 p-3 mt-10 mb-10 "
          >
            check
          </button>

          <button
            className=" block  text-white rounded-xl bg-red-800 p-3 mt-10 mb-10 "
            onClick={() => {
              setPage(location.reload(true));
            }}
          >
            تحديث الصفحه
          </button>
        </form>
      </div>
    </>
  );
}