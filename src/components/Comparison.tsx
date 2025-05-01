import React, { useState } from "react";
import Shared from "./Shared";
import Data from "./data";
import { useTranslation, translateDynamic } from "../hooks/useTranslation";
import "../styles/Comparison.css";

const Comparison = () => {
  const { t } = useTranslation();
  const { data, loading, error } = Data();

  const [selectedChart, setSelectedChart] = useState("line");
  const [tableData, setTableData] = useState<any[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  const handleChange = (
    filtered: any[],
    activeCats: string[],
    _pie: any[],
    _colorsMap: Record<string, string>
  ) => {
    setTableData(filtered);
    setActiveCategories(activeCats);
  };

  const renderComparisonTable = () => {
    const years = Array.from(new Set(tableData.map((d) => d.year))).sort();

    const getCategoryDataByYear = (year: number, category: string) => {
      const match = tableData.find((d) => d.year === year);
      return match ? Number(match[category] ?? 0) : null;
    };

    const getTotalForYear = (year: number) =>
      activeCategories.reduce((sum, cat) => {
        const val = getCategoryDataByYear(year, cat);
        return sum + (val ?? 0);
      }, 0);

    return (
      <div className="comparison-table-wrapper">
        <div className="comparison-table-scroll">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>{t("year")}</th>
                {activeCategories.map((cat) => (
                  <th key={cat} colSpan={2}>
                    {translateDynamic(t, `category.${cat.toLowerCase()}`, cat)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {years.map((year) => {
                const total = getTotalForYear(year);
                return (
                  <tr key={year}>
                    <td>{year}</td>
                    {activeCategories.map((cat) => {
                      const catKey = cat.toLowerCase();
                      const val = getCategoryDataByYear(year, catKey);
                      const percentage = total > 0 ? ((val || 0) / total) * 100 : 0;
                      return (
                        <React.Fragment key={cat}>
                          <td>{val !== null ? Math.round(val) : "-"}</td>
                          <td>{percentage.toFixed(1)}</td>
                        </React.Fragment>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (loading) return <div className="text-white p-8">{t("loading")}</div>;
  if (error || !data) return <div className="text-red-500 p-8">{t("error")}: {error}</div>;

  return (
    <div className="comparison-container">
      <Shared
        dataHook={Data}
        selectedChart={selectedChart}
        setSelectedChart={setSelectedChart}
        onChange={handleChange}
        hideChartToggle
      />
      {renderComparisonTable()}
    </div>
  );
};

export default Comparison;
