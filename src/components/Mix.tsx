import React, { useState, useEffect } from "react";
import Data from "./data";
import "../styles/mix.css";
import { useTranslation, translateDynamic } from "../hooks/useTranslation";

const Mix = () => {
  const { t } = useTranslation();
  const { data, loading, error } = Data();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [percentage, setPercentage] = useState<number | null>(null);
  const [showError, setShowError] = useState(false);
  const [compareCountries, setCompareCountries] = useState(false);

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

  if (loading) return <div className="mix-loading">{t("loading")}</div>;
  if (error || !data) return <div className="mix-error">{t("error")}: {error}</div>;

  const { groupedData, availableFields } = data;
  const countries = Array.from(new Set(groupedData.map((d) => d.country)));
  const availableYears = Array.from(new Set(groupedData.map((d) => d.year))).sort();

  const handleCalculation = () => {
    console.log("Starting calculation...");
    if (!selectedCategory) {
      setShowError(true);
      console.log("No category selected");
      return;
    }

    setShowError(false);

    const filteredData = groupedData.filter((item) => {
      const yearMatch = selectedYear ? item.year === selectedYear : true;
      const countryMatch = selectedCountry ? item.country === selectedCountry : true;
      console.log(`Year match: ${yearMatch}, Country match: ${countryMatch}`);
      return yearMatch && countryMatch;
    });

    console.log(`Filtered data: ${JSON.stringify(filteredData)}`);

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

    console.log(`Result: ${total}, Percentage: ${calculatedPercentage}`);
  };

  return (
    <div className="mix-container">
      {showError && <div className="mix-error-message">{t("categoryRequired")}</div>}

      <div className="mix-content-box">
        <div className="mix-controls">
          {/* Category */}
          <div className="mix-dropdown">
            <select
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              value={selectedCategory || ""}
            >
              <option value="">{t("selectCategory")}</option>
              {availableFields.map((cat) => (
                <option key={cat} value={cat}>
                  {translateDynamic(t, `category.${cat.toLowerCase()}`, cat)} {/* Translated category */}
                </option>
              ))}
            </select>
            <span className="plus-sign">+</span>
          </div>

          {/* Year */}
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

          {/* Country */}
          <div className="mix-dropdown">
            <select
              onChange={(e) => {
                const country = e.target.value || null;
                setSelectedCountry(country);
                console.log(`Selected Country: ${country}`);
              }}
              value={selectedCountry || ""}
            >
              <option value="">{t("selectCountry")}</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {translateDynamic(t, `country.${country}`, country)}
                </option>
              ))}
            </select>
            <span className="equal-sign">=</span>
          </div>

          {/* Result */}
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
