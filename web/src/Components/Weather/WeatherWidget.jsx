import { useState, useEffect } from "react";
import axios from "axios";
import { useLanguage } from "../../hooks/useLanguage";
import { useLocalization } from "../../hooks/useLocalization";
import BASE_URL from "../../utils/baseUrl";

export default function WeatherWidget({ isMainPage = false }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { language } = useLanguage();
  const { getLocalizedText } = useLocalization();

  useEffect(() => {
    if (!isMainPage) return;

    const fetchWeatherData = async () => {
      try {
        setLoading(true);

        // Fetch the API key from the endpoint
        const keyResponse = await axios.get(`${BASE_URL}/key`);
        const KEY = keyResponse.data;

        const apiLang = language === "AR" ? "ar" : "en";
        const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=brussels&lang=${apiLang}&days=3`;

        const response = await axios.get(apiUrl);
        setData(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching weather data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [language, isMainPage]);

  if (!isMainPage) return null;
  if (loading) return <div className="text-center p-2">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 p-2">Error: {error}</div>;
  if (!data) return <div className="text-center p-2">No data available</div>;

  const getDayLabel = (index) => {
    if (index === 0) return getLocalizedText("WEATHER.TODAY");
    if (index === 1) return language === "AR" ? "غداً" : "Tomorrow";
    return language === "AR" ? "بعد غد" : "Day after";
  };

  return (
    <div
      className="weather-widget h-21 w-screen  
         bg-gradient-to-r dark:from-gray-800/90 dark:to-gray-700/90
           from-red-900/90 to-blue-800/90 p-1 mr-1 ml-1 rounded-md shadow-lg backdrop-blur-sm flex items-center justify-between"
    >
      <div className="text-center text-white mb-2">
        <div className="sm:text-lg text-md">
          {language === "AR" ? "بروكسل" : "Brussels"}
        </div>
      </div>
      {data ? (
        <div className="flex items-center justify-between gap-0 text-white relative w-full">
          {data.forecast.forecastday.map((day, index) => (
            <div
              key={day.date}
              className="flex-1 flex flex-col items-center p-1 ml-6 sm:m-0 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <span className="text-md sm:text-lg font-medium mb-1">
                {getDayLabel(index)}
              </span>

              <div className="flex items-center gap-0">
                <img
                  loading="lazy"
                  src={day.day.condition.icon}
                  alt={day.day.condition.text}
                  className="w-4 h-4"
                />
                <span className="sm:text-xl text-md font-bold">
                  {day.day.maxtemp_c.toFixed(0)}°
                </span>
                <span className="sm:text-md text-xs dark:text-red-700 text-white m-1 font-bold">
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
