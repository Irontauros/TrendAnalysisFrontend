// src/components/Graphs.tsx
import React, { useState } from "react";
import {
  ResponsiveContainer, LineChart, Line, CartesianGrid,
  Tooltip, XAxis, YAxis, Legend, BarChart, Bar, PieChart,
  Pie, Cell
} from "recharts";

import Data from "./Data";
import Shared from "./Shared";

const Graphs = () => {
  const { data, loading, error } = Data();
  const [selectedChart, setSelectedChart] = useState("line");

  const [compareCountries, setCompareCountries] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const [rawFilteredData, setRawFilteredData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<{ name: string; value: number; fill: string }[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [colorsMap, setColorsMap] = useState<Record<string, string>>({});

  if (loading) return <div className="text-white p-8">Loading...</div>;
  if (error || !data) return <div className="text-red-500 p-8">Error: {error}</div>;

  const countries = Array.from(new Set(data.groupedData.map((d: any) => d.country)));

  const handleChange = (
    filtered: any[],
    activeCats: string[],
    pie: any[],
    colorMap: Record<string, string>
  ) => {
    setActiveCategories(activeCats);
    setColorsMap(colorMap);
    setPieData(pie);
    setRawFilteredData(filtered);
  };

  const years = Array.from(new Set(rawFilteredData.map((d) => d.year))).sort((a, b) => a - b);

  const chartData = years.map((year) => {
    const row: any = { year };
    const yearData = rawFilteredData.filter(
      (d) => d.year === year && (!compareCountries || d.country === selectedCountry)
    );
    activeCategories.forEach((cat) => {
      row[cat] = yearData.reduce((sum, d) => sum + Number(d[cat] || 0), 0);
    });
    return row;
  });

  const renderChart = () => {
    switch (selectedChart) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: "#1E293B", border: "none", color: "#fff" }} />
              <Legend />
              <XAxis dataKey="year" stroke="#fff" />
              <YAxis stroke="#fff" />
              {activeCategories.map((cat) => (
                <Line
                  key={cat}
                  type="monotone"
                  dataKey={cat}
                  name={cat}
                  stroke={colorsMap[cat] || "#8884d8"}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="year" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip contentStyle={{ backgroundColor: "#1E293B", border: "none", color: "#fff" }} />
              <Legend />
              {activeCategories.map((cat) => (
                <Bar
                  key={cat}
                  dataKey={cat}
                  name={cat}
                  fill={colorsMap[cat] || "#8884d8"}
                  barSize={30}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <>
            <h2 className="graph-header">Category Totals</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label
                >
                  {pieData.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="graph-container">
      <Shared
        dataHook={Data}
        selectedChart={selectedChart}
        setSelectedChart={setSelectedChart}
        onChange={handleChange}
      />

      {/* Compare Countries */}
      <div className="button-row graphs-countries-row">
  <div className="button-left">
    <button
      onClick={() => {
        setCompareCountries(!compareCountries);
        setSelectedCountry(null);
      }}
      className={`compare-countries-btn ${compareCountries ? "active" : ""}`}
    >
      {compareCountries ? "Exit Compare Countries" : "Compare Countries"}
    </button>
    {compareCountries && countries.map((country) => (
      <button
        key={country}
        onClick={() => setSelectedCountry(country)}
        className={`country-btn ${selectedCountry === country ? "active" : ""}`}
      >
        {country}
      </button>
    ))}
  </div>
</div>

      {/* Graph Display */}
      <div className="graph-box">
        {renderChart()}
      </div>
    </div>
  );
};

export default Graphs;
