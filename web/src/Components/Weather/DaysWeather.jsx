import { useState, useEffect } from "react";
import axios from "axios";

export default function DaysWeather() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coords, setCoords] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setError(null);
        },
        (err) => {
          setError("يرجى السماح بالوصول إلى موقعك");
          setCoords({ lat: "50.8503", lon: "4.3517" }); // Default to Brussels
        }
      );
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      try {
        setLoading(true);
        setError(null);

        // Fetch the API key from the endpoint
        const keyResponse = await axios.get("https://app-test-i.ru/api/key");
        const key = keyResponse.data.key;

        const response = await axios.get(
          `https://api.weatherapi.com/v1/search.json?key=${key}&q=${searchInput}`
        );
        if (response.data.length > 0) {
          setCoords({ lat: response.data[0].lat, lon: response.data[0].lon });
        } else {
          setError("لم يتم العثور على الموقع");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        setSearchInput("");
      }
    }
  };

  useEffect(() => {
    if (!coords) return;

    const fetchWeatherData = async () => {
      try {
        setLoading(true);

        // Fetch the API key from the endpoint
        const keyResponse = await axios.get("https://app-test-i.ru/api/key");
        const key = keyResponse.data.key;

        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${coords.lat},${coords.lon}&days=14&lang=ar`
        );
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [coords]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-72">
      <div className="max-w-6xl w-full">
        <form
          onSubmit={handleSearch}
          className="mb-6 flex justify-center gap-2"
        >
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="ادخل اسم المدينة"
            className="flex-1 max-w-[200px] p-3 border border-blue-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transform hover:scale-105 transition-all duration-200 shadow-md"
          >
            بحث
          </button>
        </form>

        {loading ? (
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl animate-pulse">
            <div className="text-lg text-blue-600 dark:text-blue-400">
              جاري تحميل بيانات الطقس...
            </div>
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-2xl shadow-xl">
            <div className="text-lg text-red-600 dark:text-red-400">
              {error}
            </div>
          </div>
        ) : data ? (
          <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/90 rounded-2xl shadow-xl p-8 transform hover:scale-[1.02] transition-all duration-300">
            <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
              توقعات الطقس لمدة 3 أيام - {data.location.name}
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              {new Date().toLocaleDateString()}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {data.forecast.forecastday.map((day) => (
                <div
                  key={day.date}
                  className="bg-blue-50 dark:bg-gray-700/50 p-6 rounded-xl hover:shadow-lg transition-all duration-200"
                >
                  <div className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-1">
                    {new Date(day.date).toLocaleDateString("ar-SA", {
                      weekday: "long",
                    })}
                  </div>

                  <div className="flex items-center justify-center mb-4">
                    <img
                      loading="lazy"
                      src={day.day.condition.icon}
                      alt={day.day.condition.text}
                      className="w-20 h-20 transform hover:scale-110 transition-transform duration-200"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                      {Math.round(day.day.maxtemp_c)}°م
                    </div>
                    <div className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                      {Math.round(day.day.mintemp_c)}°م
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      {day.day.condition.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
