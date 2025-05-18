import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import WeatherTable from './WeatherTable';
import "react-datepicker/dist/react-datepicker.css";

const WeatherDashboard = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const start = startDate.toISOString().split('T')[0];
      const end = endDate.toISOString().split('T')[0];

      const response = await fetch(
        `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${start}&end_date=${end}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,apparent_temperature_max,apparent_temperature_min,apparent_temperature_mean&timezone=auto`
      );
      const result = await response.json();

      if (result.daily) {
        setData(result.daily);
        setError('');
      } else {
        setError('No weather data available for the given location and date range.');
      }
    } catch (err) {
      setError('Error fetching weather data.');
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!latitude || !longitude || !startDate || !endDate) {
      setError('Please fill all fields');
      return;
    }
    fetchWeatherData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-xl p-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-6">Weather History Dashboard</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Latitude"
            className="border border-gray-300 p-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Longitude"
            className="border border-gray-300 p-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            placeholderText="Start Date"
            className="border border-gray-300 p-3 rounded shadow-sm w-full"
          />
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            placeholderText="End Date"
            className="border border-gray-300 p-3 rounded shadow-sm w-full"
          />
          <button
            type="submit"
            className="md:col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Fetch Weather
          </button>
        </form>

        {loading && (
          <div className="text-center text-lg font-medium text-gray-700">
            Loading...
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 font-semibold">{error}</div>
        )}

        {data && (
          <div className="overflow-x-auto mt-6">
            <WeatherTable data={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;
