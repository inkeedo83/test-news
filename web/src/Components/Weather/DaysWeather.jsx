import { useState, useEffect } from "react";
import axios from "axios";

export default function DaysWeather() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=c7e6edb50f2d41be802122547252004&q=brussels&days=7`
        );
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading)
    return <div className="text-center p-4">جاري تحميل بيانات الطقس...</div>;
  if (error)
    return <div className="text-center text-red-500 p-4">خطأ: {error}</div>;
  if (!data) return null;

  return (
    <div className="max-w-6xl mx-auto p-4 pt-72">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">
          توقعات الطقس لمدة 7 أيام - بروكسل
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {data.forecast.forecastday.map((day) => (
            <div
              key={day.date}
              className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center"
            >
              <div className="text-gray-600 dark:text-gray-300">
                {new Date(day.date).toLocaleDateString("ar-SA", {
                  weekday: "short",
                })}
              </div>
              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
                className="mx-auto w-16 h-16"
              />
              <div className="text-lg font-semibold dark:text-white">
                {Math.round(day.day.maxtemp_c)}°م
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round(day.day.mintemp_c)}°م
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {day.day.condition.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
