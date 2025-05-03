import Typewriter from "typewriter-effect";
import baseUrl from "../../assets/constants";
import { useEffect, useState } from "react";

export function WriterEffect() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/public/articles?limit=12&order=DESC`
        );
        const data = await response.json();

        // Handle both array and object response formats
        const articleArray = Array.isArray(data) ? data : data.data || [];
        setArticles(articleArray);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles([]); // Set empty array on error
      }
    };

    fetchArticles();
  }, []);

  const titles =
    articles?.length > 0
      ? articles.map((item) => item?.title || item?.Title || "")
      : ["جاري التحميل..."];

  return (
    <div className="relative mt-0 mx-2 sm:mx-4 mb-6">
      <div className="relative overflow-hidden backdrop-blur-md bg-gradient-to-r from-red-950/90 via-zinc-950/90 h-40  mb-10 to-red-950/90 rounded-2xl shadow-2xl">
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
                strings: titles,
                autoStart: true,
                loop: true,
                pauseFor: 2000,
                deleteSpeed: 8,
                delay: 50,
                cursor: "|",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
