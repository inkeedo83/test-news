import { useNavigate } from "react-router-dom";
export default function SearchInvalidResulte() {
  const navigate = useNavigate();
  return (
    <div className="   flex flex-col  items-center  h-fit p-24 ">
      {" "}
      <h1
        className="text-xl text-red-500 mt-72 text-center 
       font-bold"
      >
        عذرا النتائج التي طلبتها غير متوفره
      </h1>
      <button
        className="text-red-700 hover:text-white mt-20 border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-1 mb-1 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        onClick={() => navigate("/")}
      >
        عوده الى الرئيسية
      </button>
    </div>
  );
}
