import { useState } from "react";
import axios from "axios";
import BeReporter from "../../assets/BeReporter.png";

export function AdminPanel() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageView, setImageView] = useState("");
  const [imageToDataBase, setImageToDataBase] = useState("");
  const [page, setPage] = useState();
  const [published, setPublished] = useState("");
  const [articalID, setArticalID] = useState("");
  const [msgId, setMsglId] = useState("");
  const [delId, setDelId] = useState("");
  const [idDeleted, setIdDeleted] = useState("");

  // here creat post
  const CreatArtical = (e) => {
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
      .then((response) => {
        setArticalID(response.data);
        console.log(articalID);
        setPublished("تم نشر الخبر");
      })
      .catch((err) => console.log(err));
  };

  const deletPost = (id) => {
    axios
      .delete(`https://app-test-i.ru/api/articles/${id}`)

      .then((response) => {
        setMsglId(response.data);
        console.log(msgId);
        setIdDeleted("تم حذف الخبر");
      })
      .catch((err) => console.log(err));

    console.log(delId);
  };

  return (
    <>
      <div className="  text-xl font-bold pt-32 mr-4">
        <h1 className="block text-red-800  text-center text-2xl font-bold ">
          {" "}
          واجهه الادمن
        </h1>{" "}
        <p className="block text-black mt-2 w-fit  p-4 bg-sky-400 text-2xl font-bold ">
          {" "}
          انشاء خبر{" "}
        </p>{" "}
        <form className="bg-orange-300" onSubmit={CreatArtical} name="da">
          <label className="block text-red-800  mb-1"> الفئات </label>
          <select
            className="   rounded-md inline-flex h-fit bg-slate-400 "
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
          <label className="block text-red-800 bg-gray-500 w-20  ">
            {" "}
            العنوان
          </label>
          <input
            className="   rounded-md block text-red-800   p-2 h-4  bg-slate-400 p-4 w-[600px]  "
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="block text-red-800  "> نص الخبر </label>
          <textarea
            className="   rounded-md block text-red-800  bg-slate-400 h-[200px]  p-4 w-[1000px] "
            type="text"
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
              className="mr-10"
              src={imageView !== "" ? imageView : BeReporter}
              style={{ width: "400px", height: "400px" }}
            />
            <p className="block text-red-800  ">الفئه:{category}</p>
            <p className="  text-red-800  ">{title}</p>
            <p>{content} </p>
          </div>
          <button className=" block  text-white rounded-xl bg-red-800 p-3 mt-10 mb-10 ">
            اضف الخبر{" "}
          </button>
          <p className="  text-red-800  text-4xl ">{published}</p>
          <pre className="text-blue-800">
            {JSON.stringify(articalID, null, 1).split(3, 3)}
          </pre>
          <hr className="p-4 bg-red-800 " />
          {/* deletpost  */}
          <p className="block text-black mt-2 w-fit  p-4 bg-sky-400 text-2xl font-bold ">
            {" "}
            حذف خبر{" "}
          </p>{" "}
          <label className="block text-red-800  ">
            {" "}
            ادخل الايدي لحذف الخبر{" "}
          </label>
          <input
            className="      rounded-md block text-red-800   p-2 h-4  bg-slate-400 p-4 w-[600px]  "
            type="text"
            value={delId}
            onChange={(e) => setDelId(e.target.value)}
          />
          <button
            onClick={() => deletPost(delId)}
            className=" block  text-white rounded-xl bg-red-800 p-3 mt-10 mb-10 "
          >
            {" "}
            احذف الخبر
          </button>
          <p className="block text-black  ">{idDeleted} </p>
          <hr className="p-4 bg-red-800 " />
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
