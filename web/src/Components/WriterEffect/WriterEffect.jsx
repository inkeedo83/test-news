import Typewriter from "typewriter-effect";

export function WriterEffect(props) {
  let arr = props.data;

  return (
    <div className="relative mt-56 mx-2 sm:mx-4 mb-6">
      <div className="relative overflow-hidden backdrop-blur-md bg-gradient-to-r from-red-950/90 via-zinc-950/90 to-red-950/90 rounded-2xl shadow-2xl">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-zinc-500/20 to-red-500/20 animate-pulse"></div>

        {/* Content container */}
        <div className="relative p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            <span className="text-white font-bold text-lg sm:text-2xl">
              اخر الاخبار
            </span>
          </div>

          {/* Typewriter effect */}
          <div className="text-slate-100 font-semibold text-base sm:text-xl leading-relaxed sm:leading-relaxed px-2">
            <Typewriter
              options={{
                strings: arr.map((item) => item.title),
                autoStart: true,
                loop: true,
                pauseFor: 2000,
                deleteSpeed: 15,
                delay: 50,
                cursor: "|",
              }}
            />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/20 to-transparent rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-red-500/20 to-transparent rounded-tr-full"></div>
      </div>
    </div>
  );
}
