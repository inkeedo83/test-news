import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Weather() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(
    () =>
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const DateOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);

        const KEY = "02424f83edf54e8bba6130631251103";
        const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=brussels&lang=AR&days=3`;
        const response = await axios.get(apiUrl);
        setData(response.data);
        console.log("Weather data:", data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching weather data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);
  if (loading) return <div className="text-center p-2">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 p-2">Error: {error}</div>;
  if (!data) return <div className="text-center p-2">No data available</div>;
  return (
    <div
      className=" weather-widget h-21 w-screen  
         bg-gradient-to-r dark:from-gray-800/90 dark:to-gray-700/90
           from-red-900/90 to-blue-800/90 p-1 mr-1 ml-1 rounded-md shadow-lg backdrop-blur-sm flex items-center justify-between"
    >
      <div className="text-center text-white mb-2">
        <div className="sm:text-lg text-md ">بروكسل</div>
      </div>
      {data ? (
        <div className="flex items-center justify-between gap-0 text-white relative w-full">
          {data.forecast.forecastday.map((day, index) => (
            <div
              key={day.date}
              className="flex-1 flex flex-col items-center p-1 ml-6 sm:m-0 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <span className="text-md sm:text-lg font-medium mb-1">
                {index === 0 ? "اليوم" : index === 1 ? "غداً" : "بعد غد"}
              </span>

              <div className="flex items-center gap-0">
                <img
                  src={day.day.condition.icon}
                  alt={day.day.condition.text}
                  className="w-4 h-4"
                />
                <span className="sm:text-xl text-md font-bold">
                  {day.day.maxtemp_c.toFixed(0)}°
                </span>
                <span className="sm:text-md text-xs  dark:text-red-700 text-white m-1 font-bold">
                  {day.day.mintemp_c.toFixed(0)}°
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
