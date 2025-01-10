import Typewriter from "typewriter-effect";

export function WriterEffect(props) {
  let arr = props.data;

  return (
    <div className="text-slate-300  font-extrabold text-md sm:w-screen w-screen  sm:text-2xl sm:w-screen h-[116px] sm:h-[140px]  bg-gradient-to-b from-red-900 to-black mt-24 sm:mt-28 mb-0 sm:p-6 p-4 ">
      <div>اخر الاخبار</div>
      <Typewriter
        options={{
          strings: arr.map((item) => item.title),
          autoStart: true,
          loop: true,
          pauseFor: 1500,
          deleteSpeed: 10,
        }}
      />
    </div>
  );
}
