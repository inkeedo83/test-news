import { Link } from "react-router-dom";
import { CATEGORIES } from "../../assets/categories.constant";
function Footer() {
  const {
    POLITIC,
    BRUSSELS,
    ANTWERP,
    FLANDERS,
    WALLONIA,
    LIEGE,
    GERMANOPHONE,
    ECONOMIC,
    LAW,
    CULTURE,
    ACCIDENT,
  } = CATEGORIES;

  return (
    <footer className="grid grid-cols-1 sm:grid-cols-3  grid-rows-1 w-full h-fit  bg-red-900 ">
      <div className="grid self-center mt-2 sm:mr-10 ">
        <span className=" font-black text-white text-md  sm:text-2xl mr-3 mt-1 mb-8">
          من نحن
        </span>

        <div className="grid grid-cols-1  text-md sm:text-2xl text-slate-100 mr-4    mb-6 sm:mb-20  ">
          <div className=" hover:text-black">
            <a href="">من نحن</a>
          </div>
          <div className=" hover:text-black">
            {" "}
            <a href=""> الاحكام و الشروط</a>
          </div>
          <div className=" hover:text-black">
            <a href=""> سياسه الخصوصيه</a>
          </div>
        </div>
      </div>

      <div className=" grid self-center ">
        <span className=" font-black text-white text-md  sm:text-2xl mr-2 mt-4 mb-8">
          روابط سريعه
        </span>
        <div className="grid grid-cols-2  text-md sm:text-2xl  text-slate-100 mr-4 sm:mr-2  ">
          <div className=" hover:text-black">
            <Link to={`/categories/${CATEGORIES.BRUSSELS.ID}`}> بروكسل</Link>
          </div>
          <div className=" hover:text-black">
            {" "}
            <Link to={`/categories/${CATEGORIES.ANTWERP.ID}`}> انتورب</Link>
          </div>
          <div className=" hover:text-black">
            <Link to={`/categories/${CATEGORIES.LIEGE.ID}`}> لباج</Link>
          </div>
          <div className=" hover:text-black">
            <Link to={`/categories/${CATEGORIES.FLANDERS.ID}`}> فلاندرز</Link>
          </div>
          <div className=" hover:text-black">
            <Link to={`/categories/${CATEGORIES.WALLONIA.ID}`}> والونيا</Link>
          </div>
          <div className=" hover:text-black">
            <Link to={`/categories/${CATEGORIES.GERMANOPHONE.ID}`}>
              {" "}
              جرمانوفون
            </Link>
          </div>

          <div className=" hover:text-black">
            {" "}
            <Link to={`/categories/${CATEGORIES.POLITIC.ID}`}> سياسه</Link>
          </div>
          <div className=" hover:text-black">
            {" "}
            <Link to={`/categories/${CATEGORIES.LAW.ID}`}> قوانين</Link>
          </div>
          <div className=" hover:text-black">
            {" "}
            <Link to={`/categories/${CATEGORIES.ECONOMIC.ID}`}> اقتصاد</Link>
          </div>
          <div className=" hover:text-black">
            {" "}
            <Link to={`/categories/${CATEGORIES.ACCIDENT.ID}`}> حوادث</Link>
          </div>
        </div>
      </div>

      <div className=" grid grid-cols-1 self-center grid-rows-2 text-white ">
        <span className=" font-black text-white  text-md sm:text-2xl mr-2 mt-10 ">
          تواصل معنا{" "}
        </span>
        {/* facebook */}

        <div className=" mr-2 sm:mr-2  ">
          <button className=" group pt-8 pb-8 sm:pt-10 sm:pb-10 pl-16 pr-16 md:pl-10 md:pr-10 sm:pl-14 sm:pr-14 bg-red-950 rounded-xl hover:bg-white ">
            <a
              href="http://facebook.com"
              className="w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center  group transition-all duration-300"
            >
              <svg
                className="transition-all duration-300  group-hover:bg-red-900 group-hover:scale-110"
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                viewBox="0 0 320 512"
              >
                <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
              </svg>
            </a>
          </button>

          {/* tiktok */}

          <button className=" group pt-8 pb-8 sm:pt-10 sm:pb-10 pl-16 pr-16  md:pl-10 md:pr-10 sm:pl-20 sm:pr-20 bg-red-950 rounded-xl hover:bg-white ">
            <a
              href="http://tiktok.com"
              className="w-5 h-5 sm:w-8 sm:h-8  flex items-center justify-center group transition-all duration-300"
            >
              <svg
                className="transition-all duration-300  group-hover:bg-red-900 group-hover:scale-110"
                width="28"
                height="28"
                viewBox="0 0 448 512"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M43.4589 27.5892C46.5241 29.7857 50.2019 30.9638 53.9729 30.9571V25.0166C51.8243 24.5623 49.8726 23.4452 48.3927 21.8226C47.1372 21.0414 46.0601 20.0048 45.2315 18.78C44.4029 17.5553 43.8412 16.1699 43.5831 14.7139H38.09V44.8018C38.0849 46.1336 37.6629 47.4304 36.8831 48.51C36.1034 49.5897 35.0051 50.3981 33.7425 50.8217C32.4798 51.2453 31.1162 51.2629 29.8431 50.872C28.57 50.4811 27.4512 49.7012 26.6439 48.642C25.3645 47.9965 24.3399 46.9387 23.7354 45.6394C23.1309 44.3401 22.9818 42.875 23.3121 41.4805C23.6424 40.0861 24.4329 38.8435 25.556 37.9535C26.6791 37.0634 28.0693 36.5776 29.5023 36.5745C30.1599 36.5766 30.8134 36.6772 31.4411 36.8728V30.8826C28.7288 30.9477 26.0946 31.8033 23.8617 33.3444C21.6289 34.8855 19.8946 37.0451 18.8717 39.5579C17.8489 42.0708 17.5821 44.8276 18.1039 47.49C18.6258 50.1524 19.9137 52.6045 21.8095 54.5453C23.9073 55.9459 26.3458 56.7512 28.8651 56.8755C31.3845 56.9997 33.8904 56.4383 36.1158 55.2509C38.3413 54.0636 40.2031 52.2948 41.5027 50.133C42.8024 47.9712 43.4913 45.4973 43.4962 42.9749L43.4589 27.5892Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M53.9736 25.0161V23.4129C52.0005 23.4213 50.0655 22.8696 48.3934 21.8221C49.8695 23.4493 51.8229 24.5674 53.9736 25.0161ZM43.5838 14.7134C43.5838 14.4275 43.4968 14.1292 43.4596 13.8434V12.874H35.8785V42.9744C35.872 44.6598 35.197 46.2738 34.0017 47.4621C32.8064 48.6504 31.1885 49.3159 29.503 49.3126C28.5106 49.3176 27.5311 49.0876 26.6446 48.6415C27.4519 49.7007 28.5707 50.4805 29.8438 50.8715C31.1169 51.2624 32.4805 51.2448 33.7432 50.8212C35.0058 50.3976 36.1041 49.5892 36.8838 48.5095C37.6636 47.4298 38.0856 46.1331 38.0907 44.8013V14.7134H43.5838ZM31.4418 30.8696V29.167C28.3222 28.7432 25.1511 29.3885 22.4453 30.9977C19.7394 32.6069 17.6584 35.0851 16.5413 38.0284C15.4242 40.9718 15.337 44.2067 16.2938 47.206C17.2506 50.2053 19.195 52.792 21.8102 54.5448C19.9287 52.5995 18.6545 50.1484 18.1433 47.4908C17.6321 44.8333 17.906 42.0844 18.9315 39.5799C19.957 37.0755 21.6897 34.924 23.918 33.3882C26.1463 31.8524 28.7736 30.9988 31.4791 30.9318L31.4418 30.8696Z"
                  fill="#69C9D0"
                />
              </svg>
            </a>
          </button>
        </div>

        <div className="mr-2 sm:mr-2 ">
          {/* instagram */}
          <button className=" group  pt-8 pb-8 sm:pt-10 sm:pb-10 pl-16 pr-16 md:pl-10 md:pr-10  sm:pl-20 sm:pr-20 bg-red-950 rounded-xl hover:bg-white ">
            <a
              href="https://www.instagram.com/"
              className="w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center  group transition-all duration-300"
            >
              <svg
                className="transition-all duration-300  group-hover:bg-red-900 group-hover:scale-110"
                width="28"
                height="28"
                fill="currentColor"
                viewBox="0 0 448 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.4456 35.7808C27.4456 31.1786 31.1776 27.4468 35.7826 27.4468C40.3875 27.4468 44.1216 31.1786 44.1216 35.7808C44.1216 40.383 40.3875 44.1148 35.7826 44.1148C31.1776 44.1148 27.4456 40.383 27.4456 35.7808ZM22.9377 35.7808C22.9377 42.8708 28.6883 48.618 35.7826 48.618C42.8768 48.618 48.6275 42.8708 48.6275 35.7808C48.6275 28.6908 42.8768 22.9436 35.7826 22.9436C28.6883 22.9436 22.9377 28.6908 22.9377 35.7808ZM46.1342 22.4346C46.1339 23.0279 46.3098 23.608 46.6394 24.1015C46.9691 24.595 47.4377 24.9797 47.9861 25.2069C48.5346 25.4342 49.1381 25.4939 49.7204 25.3784C50.3028 25.2628 50.8378 24.9773 51.2577 24.5579C51.6777 24.1385 51.9638 23.6041 52.0799 23.0222C52.1959 22.4403 52.1367 21.8371 51.9097 21.2888C51.6828 20.7406 51.2982 20.2719 50.8047 19.942C50.3112 19.6122 49.7309 19.436 49.1372 19.4358H49.136C48.3402 19.4361 47.5771 19.7522 47.0142 20.3144C46.4514 20.8767 46.1349 21.6392 46.1342 22.4346ZM25.6765 56.1302C23.2377 56.0192 21.9121 55.6132 21.0311 55.2702C19.8632 54.8158 19.0299 54.2746 18.1538 53.4002C17.2777 52.5258 16.7354 51.6938 16.2827 50.5266C15.9393 49.6466 15.533 48.3214 15.4222 45.884C15.3009 43.2488 15.2767 42.4572 15.2767 35.781C15.2767 29.1048 15.3029 28.3154 15.4222 25.678C15.5332 23.2406 15.9425 21.918 16.2827 21.0354C16.7374 19.8682 17.2789 19.0354 18.1538 18.1598C19.0287 17.2842 19.8612 16.7422 21.0311 16.2898C21.9117 15.9466 23.2377 15.5406 25.6765 15.4298C28.3133 15.3086 29.1054 15.2844 35.7826 15.2844C42.4598 15.2844 43.2527 15.3106 45.8916 15.4298C48.3305 15.5408 49.6539 15.9498 50.537 16.2898C51.7049 16.7422 52.5382 17.2854 53.4144 18.1598C54.2905 19.0342 54.8308 19.8682 55.2855 21.0354C55.6289 21.9154 56.0351 23.2406 56.146 25.678C56.2673 28.3154 56.2915 29.1048 56.2915 35.781C56.2915 42.4572 56.2673 43.2466 56.146 45.884C56.0349 48.3214 55.6267 49.6462 55.2855 50.5266C54.8308 51.6938 54.2893 52.5266 53.4144 53.4002C52.5394 54.2738 51.7049 54.8158 50.537 55.2702C49.6565 55.6134 48.3305 56.0194 45.8916 56.1302C43.2549 56.2514 42.4628 56.2756 35.7826 56.2756C29.1024 56.2756 28.3125 56.2514 25.6765 56.1302ZM25.4694 10.9322C22.8064 11.0534 20.9867 11.4754 19.3976 12.0934C17.7518 12.7316 16.3585 13.5878 14.9663 14.977C13.5741 16.3662 12.7195 17.7608 12.081 19.4056C11.4626 20.9948 11.0403 22.8124 10.9191 25.4738C10.7958 28.1394 10.7676 28.9916 10.7676 35.7808C10.7676 42.57 10.7958 43.4222 10.9191 46.0878C11.0403 48.7494 11.4626 50.5668 12.081 52.156C12.7195 53.7998 13.5743 55.196 14.9663 56.5846C16.3583 57.9732 17.7518 58.8282 19.3976 59.4682C20.9897 60.0862 22.8064 60.5082 25.4694 60.6294C28.138 60.7506 28.9893 60.7808 35.7826 60.7808C42.5759 60.7808 43.4286 60.7526 46.0958 60.6294C48.759 60.5082 50.5774 60.0862 52.1676 59.4682C53.8124 58.8282 55.2066 57.9738 56.5989 56.5846C57.9911 55.1954 58.8438 53.7998 59.4842 52.156C60.1026 50.5668 60.5268 48.7492 60.6461 46.0878C60.7674 43.4202 60.7956 42.57 60.7956 35.7808C60.7956 28.9916 60.7674 28.1394 60.6461 25.4738C60.5248 22.8122 60.1026 20.9938 59.4842 19.4056C58.8438 17.7618 57.9889 16.3684 56.5989 14.977C55.2088 13.5856 53.8124 12.7316 52.1696 12.0934C50.5775 11.4754 48.7588 11.0514 46.0978 10.9322C43.4306 10.811 42.5779 10.7808 35.7846 10.7808C28.9913 10.7808 28.138 10.809 25.4694 10.9322Z"
                  fill="url(#paint0_radial_7092_54471)"
                />
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />

                <defs>
                  <radialGradient
                    id="paint0_radial_7092_54471"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(17.4144 61.017) scale(65.31 65.2708)"
                  >
                    <stop offset="0.09" stopColor="#FA8F21" />
                    <stop offset="0.78" stopColor="#D82D7E" />
                  </radialGradient>
                </defs>
                <radialGradient
                  id="paint1_radial_7092_54471"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(41.1086 63.257) scale(51.4733 51.4424)"
                >
                  <stop offset="0.64" stopColor="#8C3AAA" stopOpacity="0" />
                  <stop offset="1" stopColor="#8C3AAA" />
                </radialGradient>
              </svg>
            </a>
          </button>

          {/* gmail */}
          <button className="group  pt-8 pb-8 sm:pt-10 sm:pb-10 pl-16 pr-16 md:pl-10 md:pr-10 sm:pl-20 sm:pr-20 mb-8 bg-red-950 rounded-xl hover:bg-white  ">
            <a
              href="http://gmail.com"
              className=" w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center  transition-all duration-300"
            >
              <svg
                className="transition-all duration-300  group-hover:bg-red-900 group-hover:scale-110"
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </button>
        </div>
      </div>
      <hr className="w-screen " />

      <span className="text-center text-white ">
        <button
          className="hover:text-black"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ^^
        </button>
      </span>
    </footer>
  );
}

export default Footer;
