import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import './Chart.css';

const data = [
  { date: '01 Jan', views: 34, duration: 44 },
  { date: '02 Jan', views: 45, duration: 51 },
  { date: '03 Jan', views: 60, duration: 40 },
  { date: '04 Jan', views: 42, duration: 23 },
  { date: '05 Jan', views: 19, duration: 31 },
  { date: '06 Jan', views: 25, duration: 28 },
  { date: '07 Jan', views: 30, duration: 25 },
  { date: '08 Jan', views: 38, duration: 20 },
  { date: '09 Jan', views: 37, duration: 12 },
  { date: '10 Jan', views: 50, duration: 14 },
  { date: '11 Jan', views: 36, duration: 18 },
  { date: '12 Jan', views: 39, duration: 15 },
];

export default function Chart() {
  return (
    <div className="chart-section">
      <h3>Unique Visitors</h3>
      <LineChart width={900} height={300} data={data}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="duration" stroke="#8884d8" name="Session Duration" />
        <Line type="monotone" dataKey="views" stroke="#82ca9d" name="Page Views" />
      </LineChart>
    </div>
  );
}
