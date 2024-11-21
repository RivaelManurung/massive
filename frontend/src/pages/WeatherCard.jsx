import React, { useState, useEffect } from "react";
import Papa from "papaparse"; // CSV parsing library
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WeatherCard = () => {
  const [areas, setAreas] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchAreaData = async () => {
      try {
        const response = await fetch("/assets/base.csv");
        const csvData = await response.text();
        const parsedData = await Papa.parse(csvData, {
          header: false,
          skipEmptyLines: true,
        });
        const structuredData = {};
        parsedData.data.forEach(([areaCode, areaName]) => {
          const provinceCode = areaCode.split(".")[0];
          if (!structuredData[provinceCode]) {
            structuredData[provinceCode] = { name: areaName, cities: [] };
          }
          if (areaCode.split(".").length > 1) {
            structuredData[provinceCode].cities.push({
              code: areaCode,
              name: areaName,
            });
          }
        });
        setAreas(structuredData);
      } catch (error) {
        console.error("Error fetching and parsing CSV data:", error);
      }
    };
    fetchAreaData();
  }, []);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const areaCode = `${selectedCity}`;
      const response = await fetch(
        `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${areaCode}`
      );
      if (!response.ok) throw new Error("Weather data not found or API issue");

      const data = await response.json();
      const weather = data.data[0]?.cuaca[0];
      if (weather) {
        setWeatherData([weather]);  // Preserve the array structure

        const chartData = {
          labels: ["Suhu (°C)", "Kelembapan (%)", "Kecepatan Angin (km/jam)"],
          datasets: [
            {
              label: `Data Cuaca - ${selectedCity}`,
              data: [weather.t ?? 0, weather.hu ?? 0, weather.ws ?? 0],
              backgroundColor: ["#4CAF50", "#FF9800", "#2196F3"],
            },
          ],
        };
        setChartData(chartData);
      } else {
        setError("Data cuaca tidak ditemukan.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoading(false);
      setError("Failed to fetch weather data. Please try again.");
    }
  };

  const handleSearch = () => {
    if (selectedProvince && selectedCity) {
      fetchWeatherData();
    } else {
      setError("Please select both province and city.");
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg shadow-xl max-w-4xl">
      <h1 className="text-5xl font-extrabold text-center mb-6">Cek Cuaca</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-2 font-semibold text-lg">Pilih Provinsi</label>
          <select
            className="select select-bordered w-full rounded-lg p-3 bg-white text-black shadow-md"
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
          >
            <option value="">-- Pilih Provinsi --</option>
            {Object.keys(areas).map((provinceCode) => (
              <option key={provinceCode} value={provinceCode}>
                {areas[provinceCode].name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 font-semibold text-lg">Pilih Kabupaten/Kota</label>
          <select
            className="select select-bordered w-full rounded-lg p-3 bg-white text-black shadow-md"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedProvince}
          >
            <option value="">-- Pilih Kabupaten/Kota --</option>
            {selectedProvince &&
              areas[selectedProvince]?.cities.map((city) => (
                <option key={city.code} value={city.code}>
                  {city.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="btn w-full md:w-auto bg-blue-700 hover:bg-blue-900 text-white font-semibold rounded-lg p-3 transition duration-300"
        disabled={!selectedProvince || !selectedCity}
      >
        Cari Data Cuaca
      </button>

      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      {loading && <div className="text-center mt-6">Loading...</div>}

      {Array.isArray(weatherData) &&
        weatherData.map((weather, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Waktu: {new Date(weather.datetime).toLocaleString()}
            </h3>
            <ul className="space-y-1 text-gray-700">
              <li>
                <span className="font-medium">Suhu:</span> {weather.t}°C
              </li>
              <li>
                <span className="font-medium">Kelembapan:</span> {weather.hu}%
              </li>
              <li>
                <span className="font-medium">Kondisi Cuaca:</span>{" "}
                {weather.weather_desc}
              </li>
              <li>
                <span className="font-medium">Kecepatan Angin:</span>{" "}
                {weather.ws} km/jam
              </li>
            </ul>
          </div>
        ))}

      {chartData && (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Visualisasi Data Cuaca
          </h2>
          <Bar data={chartData} options={{ responsive: true }} />
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
