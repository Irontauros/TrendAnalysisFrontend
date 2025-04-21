// /src/components/Mix.tsx
import React, { useState, useEffect } from "react";
import Data from "./data";
import "../styles/mix.css";
import { useTranslation } from "../hooks/useTranslation";
import { SettingsContext } from "../context/SettingsContext";

const Mix = () => {
  const { data, loading, error } = Data();
  const { t } = useTranslation();

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [percentage, setPercentage] = useState<number | null>(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    document.body.classList.add("no-scroll-body");
    return () => {
      document.body.classList.remove("no-scroll-body");
    };
  }, []);

  useEffect(() => {
    if (selectedCategory && selectedYear && selectedCountry) {
      handleCalculation();
    }
  }, [selectedYear, selectedCategory, selectedCountry]);

  if (loading) return <div className="mix-loading">{t("loading")}...</div>;
  if (error || !data) return <div className="mix-error">{t("error")}: {error}</div>;

  const { groupedData, availableFields } = data;
  const countries = Array.from(new Set(groupedData.map((d) => d.country)));
  const availableYears = Array.from(new Set(groupedData.map((d) => d.year))).sort();

  const handleCalculation = () => {
    if (!selectedCategory) {
      setShowError(true);
      return;
    }

    setShowError(false);

    let filteredData = groupedData.filter((item) => {
      const yearMatch = selectedYear ? item.year === selectedYear : true;
      const countryMatch = selectedCountry ? item.country === selectedCountry : true;
      return yearMatch && countryMatch;
    });

    const total = filteredData.reduce((acc, item) => {
      const value = item[selectedCategory];
      return value ? acc + Number(value) : acc;
    }, 0);

    const grandTotal = groupedData.reduce((acc, item) => {
      const value = item[selectedCategory];
      return value ? acc + Number(value) : acc;
    }, 0);

    const calculatedPercentage = grandTotal > 0 ? (total / grandTotal) * 100 : 0;

    setResult(total);
    setPercentage(calculatedPercentage);
  };

  return (
    <div className="mix-container">
      {showError && (
        <div className="mix-error-message">{t("categoryRequired")}</div>
      )}

      <div className="mix-content-box">
        <div className="mix-controls">
          <div className="mix-dropdown">
            <select
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              value={selectedCategory || ""}
            >
              <option value="">{t("selectCategory")}</option>
              {availableFields.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <span className="plus-sign">+</span>
          </div>

          <div className="mix-dropdown">
            <select
              onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : null)}
              value={selectedYear || ""}
            >
              <option value="">{t("selectYear")}</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <span className="plus-sign">+</span>
          </div>

          <div className="mix-dropdown">
            <select
              onChange={(e) => setSelectedCountry(e.target.value || null)}
              value={selectedCountry || ""}
            >
              <option value="">{t("selectCountry")}</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <span className="equal-sign">=</span>
          </div>

          <div className="mix-result-box">
            {result !== null ? (
              <div>
                {result} ({percentage !== null ? percentage.toFixed(2) : "0.00"}%)
              </div>
            ) : (
              <div className="placeholder">{t("result")}</div>
            )}
          </div>
        </div>
      </div>

      <div className="mix-calculate-btn-wrapper">
        <button className="mix-calculate-btn" onClick={handleCalculation}>
          {t("calculate")}
        </button>
      </div>
    </div>
  );
};

export default Mix;
