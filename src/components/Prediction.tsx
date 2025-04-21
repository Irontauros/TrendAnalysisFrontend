// src/components/Prediction.tsx
import React, { useState } from "react";
import {
  ResponsiveContainer, LineChart, Line, CartesianGrid,
  Tooltip, XAxis, YAxis, Legend, BarChart, Bar, PieChart,
  Pie, Cell
} from "recharts";
import translations from "../i18n";
import Shared from "./Shared";
import FutureData from "./futureData";
import { useTranslation } from "../hooks/useTranslation";

const Prediction = () => {
  const { t } = useTranslation();
  const { data, loading, error } = FutureData();
  const [selectedChart, setSelectedChart] = useState("line");

  const [chartData, setChartData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<{ name: string; value: number; fill: string }[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [colorsMap, setColorsMap] = useState<Record<string, string>>({});

  const handleChange = (
    filtered: any[],
    activeCats: string[],
    pie: any[],
    colorMap: Record<string, string>
  ) => {
    setChartData(filtered);
    setPieData(pie);
    setActiveCategories(activeCats);
    setColorsMap(colorMap);
  };

  if (loading) return <div className="text-white p-8">{t("loading")}</div>;
  if (error || !data) return <div className="text-red-500 p-8">{t("error")}: {error}</div>;

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
                  name={t(cat as keyof typeof translations["en"])}

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
                  name={t(cat as keyof typeof translations["en"])}

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
            <h2 className="graph-header">{t("categoryTotals")}</h2>
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
        dataHook={() => ({ data, loading, error })}
        selectedChart={selectedChart}
        setSelectedChart={setSelectedChart}
        onChange={handleChange}
      />
      <div className="graph-box">
        {renderChart()}
      </div>
    </div>
  );
};

export default Prediction;
