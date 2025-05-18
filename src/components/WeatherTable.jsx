// src/components/WeatherTable.js
import React from 'react';

const WeatherTable = ({ data }) => {
  if (!data || !data.time) return null;

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border text-sm">
        <thead>
          <tr>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Max Temp</th>
            <th className="border px-2 py-1">Min Temp</th>
            <th className="border px-2 py-1">Mean Temp</th>
            <th className="border px-2 py-1">Apparent Max</th>
            <th className="border px-2 py-1">Apparent Min</th>
            <th className="border px-2 py-1">Apparent Mean</th>
          </tr>
        </thead>
        <tbody>
          {data.time.map((_, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1">{data.time[idx]}</td>
              <td className="border px-2 py-1">{data.temperature_2m_max[idx]}</td>
              <td className="border px-2 py-1">{data.temperature_2m_min[idx]}</td>
              <td className="border px-2 py-1">{data.temperature_2m_mean[idx]}</td>
              <td className="border px-2 py-1">{data.apparent_temperature_max[idx]}</td>
              <td className="border px-2 py-1">{data.apparent_temperature_min[idx]}</td>
              <td className="border px-2 py-1">{data.apparent_temperature_mean[idx]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherTable;
