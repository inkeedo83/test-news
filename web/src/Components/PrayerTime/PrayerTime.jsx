import React, { useEffect, useState } from "react";
import axios from "axios";

const PrayerTime = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coords, setCoords] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [apiData, setApiData] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(
    "جاري تحديد الموقع..."
  );

  const getLocationName = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = response.data;
      const city =
        data.address.city || data.address.town || data.address.village || "";
      const country = data.address.country || "";
      setCurrentLocation(`${city}, ${country}`);
    } catch (err) {
      setCurrentLocation("تعذر تحديد الموقع");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lon: longitude });
          getLocationName(latitude, longitude);
        },
        (err) => {
          setError("يرجى السماح بالوصول إلى موقعك");
          setCoords({ lat: "50.8503", lon: "4.3517" }); // Default to Brussels
          setCurrentLocation("بروكسل, بلجيكا");
        }
      );
    }
  }, []);

  useEffect(() => {
    if (!coords) return;

    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.aladhan.com/v1/timings?latitude=${coords.lat}&longitude=${coords.lon}&method=3`
        );
        const data = res.data.data;
        setPrayerTimes(data.timings);
        setDate(data.date.readable);
        setApiData(data);
        setError(null);
      } catch (err) {
        setError("حدث خطأ في جلب أوقات الصلاة");
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, [coords]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.aladhan.com/v1/timingsByCity?city=${searchInput}&country=belgium&method=3`
        );
        const data = res.data.data;
        setPrayerTimes(data.timings);
        setDate(data.date.readable);
        setApiData(data);
        setCurrentLocation(`${searchInput}, بلجيكا`);
        setError(null);
      } catch (err) {
        setError("لم يتم العثور على المدينة");
      } finally {
        setLoading(false);
        setSearchInput("");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-72">
      <div className="max-w-md w-full">
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
              جاري تحميل أوقات الصلاة...
            </div>
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-2xl shadow-xl">
            <div className="text-lg text-red-600 dark:text-red-400">
              {error}
            </div>
          </div>
        ) : prayerTimes ? (
          <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/90 rounded-2xl shadow-xl p-8 transform hover:scale-[1.02] transition-all duration-300">
            <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
              أوقات الصلاة
            </h2>
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-700 dark:text-gray-300">
              {searchInput ? `${searchInput}, بلجيكا` : currentLocation}
            </h2>
            <div className="text-center mb-6">
              <p className="text-lg text-gray-600 dark:text-gray-300">{date}</p>
              <p className="text-md text-blue-600 dark:text-blue-400">
                {apiData?.date?.hijri?.day} {apiData?.date?.hijri?.month?.ar}{" "}
                {apiData?.date?.hijri?.year}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(prayerTimes).map(([name, time]) => {
                const arabicNames = {
                  Fajr: "الفجر",
                  Sunrise: "الشروق",
                  Dhuhr: "الظهر",
                  Asr: "العصر",
                  Maghrib: "المغرب",
                  Isha: "العشاء",
                  Imsak: "الإمساك",
                  Midnight: "منتصف الليل",
                  Sunset: "الغروب",
                  Firstthird: "الثلث الأول",
                  Lastthird: "الثلث الأخير",
                };
                return (
                  <div
                    key={name}
                    className="flex justify-between items-center bg-blue-50 dark:bg-gray-700/50 p-4 rounded-xl hover:shadow-md transition-all duration-200"
                  >
                    <span className="font-medium text-blue-800 dark:text-blue-200">
                      {arabicNames[name] || name}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 font-mono">
                      {time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PrayerTime;
