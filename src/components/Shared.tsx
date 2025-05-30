// src/components/Shared.tsx
import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "../hooks/useTranslation";

interface SharedProps {
  dataHook: () => {
    data: any;
    loading: boolean;
    error: string | null;
  };
  selectedChart: string;
  setSelectedChart: React.Dispatch<React.SetStateAction<string>>;
  onChange: (
    filteredData: any[],
    activeCategories: string[],
    pieData: any[],
    colorsMap: Record<string, string>
  ) => void;
  hideChartToggle?: boolean;
}

const Shared = ({
  dataHook,
  selectedChart,
  setSelectedChart,
  onChange,
  hideChartToggle = false,
}: SharedProps) => {
  const { t } = useTranslation();
  const { data, loading, error } = dataHook();

  const [compareMode, setCompareMode] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [startYear, setStartYear] = useState<number>(0);
  const [endYear, setEndYear] = useState<number>(0);
  const [initialized, setInitialized] = useState(false);

  const groupedData = data?.groupedData || [];
  const availableFields = data?.availableFields || [];
  const colorsMap = data?.colorsMap || {};

  useEffect(() => {
    if (data && !initialized) {
      const years = Array.from(new Set<number>(groupedData.map((d: any) => d.year))).sort((a, b) => a - b);
      setStartYear(years[0]);
      setEndYear(years[years.length - 1]);
      setSelectedCategories([availableFields[0]]);
      setInitialized(true);
    }
  }, [data, initialized]);

  const filteredData = useMemo(
    () => groupedData.filter((item: any) => item.year >= startYear && item.year <= endYear),
    [groupedData, startYear, endYear]
  );

  const activeCategories = useMemo(() => {
    return compareMode && selectedCategories.length > 0
      ? selectedCategories
      : [availableFields[0]];
  }, [compareMode, selectedCategories, availableFields]);

  const pieData = useMemo(
    () =>
      activeCategories.map((cat) => ({
        name: cat,
        value: filteredData.reduce((sum: number, d: any) => sum + Number(d[cat] || 0), 0),
        fill: colorsMap[cat] || "#8884d8",
      })),
    [filteredData, activeCategories, colorsMap]
  );

  useEffect(() => {
    if (initialized && data) {
      onChange(filteredData, activeCategories, pieData, colorsMap);
    }
  }, [filteredData, activeCategories, pieData, colorsMap, initialized]);

  const toggleCategory = (cat: string) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  const resetToDefault = () => {
    const years = Array.from(new Set<number>(groupedData.map((d: any) => d.year))).sort((a, b) => a - b);
    setCompareMode(false);
    setSelectedCategories([availableFields[0]]);
    setStartYear(years[0]);
    setEndYear(years[years.length - 1]);
  };

  if (loading) return <div className="text-white p-8">{t("loading")}</div>;
  if (error || !data) return <div className="text-red-500 p-8">{t("error")}: {error}</div>;

  return (
    <>
      <div className="top-controls-aligned">
        <div className="top-controls-left">
          <input
            type="number"
            className="years-input"
            value={startYear}
            onChange={(e) => setStartYear(Number(e.target.value))}
          />
          <span className="year-arrow">→</span>
          <input
            type="number"
            className="years-input"
            value={endYear}
            onChange={(e) => setEndYear(Number(e.target.value))}
          />
        </div>
        <div className="top-controls-right">
          <button className="reset-btn" onClick={resetToDefault}>
            {t("reset")}
          </button>
          <button className="reset-btn">{t("downloadCSV")}</button>
          <button className="reset-btn">{t("downloadPDF")}</button>
        </div>
      </div>

      <div className="button-row">
        <div className="button-left">
          <button
            className={`compare-categories-btn btn ${compareMode ? "active" : ""}`}
            onClick={() => setCompareMode(!compareMode)}
          >
            {compareMode ? t("exitCompareCategories") : t("compareCategories")}
          </button>

          {compareMode &&
            availableFields.map((cat) => {
              const isActive = selectedCategories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className="category-btn"
                  style={
                    isActive
                      ? {
                          backgroundColor: colorsMap[cat],
                          borderColor: colorsMap[cat],
                          color: "white",
                        }
                      : {}
                  }
                >
                  {t(cat)}
                </button>
              );
            })}
        </div>

        {!hideChartToggle && (
          <div className="chart-toggle-wrapper">
            <button
              onClick={() => setSelectedChart("line")}
              className={`chart-toggle-btn ${selectedChart === "line" ? "chart-toggle-line-active" : ""}`}
            >
              📈 {t("lineChart")}
            </button>
            <button
              onClick={() => setSelectedChart("bar")}
              className={`chart-toggle-btn ${selectedChart === "bar" ? "chart-toggle-bar-active" : ""}`}
            >
              📊 {t("barChart")}
            </button>
            <button
              onClick={() => setSelectedChart("pie")}
              className={`chart-toggle-btn ${selectedChart === "pie" ? "chart-toggle-pie-active" : ""}`}
            >
              🥧 {t("pieChart")}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Shared;
