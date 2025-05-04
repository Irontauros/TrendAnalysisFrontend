// src/components/Shared.tsx
import React, { useState, useEffect, useMemo, useContext } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { SettingsContext } from "../context/SettingsContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
  const { language } = useContext(SettingsContext);
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
    [filteredData, activeCategories, colorsMap, language]
  );

  useEffect(() => {
    if (initialized && data) {
      onChange(filteredData, activeCategories, pieData, colorsMap);
    }
  }, [filteredData, activeCategories, pieData, colorsMap, initialized, language]);

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

  const getTranslatedFilename = () => {
    const rawPage = window.location.pathname.split("/").filter(Boolean).at(-1) || "dashboard";
    const key = rawPage.charAt(0).toUpperCase() + rawPage.slice(1);
    const translated = t(`download_filename.${key}`);
    return typeof translated === "string" && translated !== `download_filename.${key}`
      ? translated
      : "report";
  };

  const handleDownloadPDF = async () => {
    const original = document.querySelector(".main-content") as HTMLElement;
    if (!original) {
      alert("Main content not found.");
      return;
    }

    const clone = original.cloneNode(true) as HTMLElement;

    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100vw";
    container.style.height = "100vh";
    container.style.zIndex = "9999";
    container.style.pointerEvents = "none";
    container.style.backgroundColor = "#0f172a";
    container.style.overflow = "hidden";
    container.style.cursor = "none";
    container.appendChild(clone);

    const unwanted = clone.querySelectorAll(".top-controls-aligned, .button-row");
    unwanted.forEach((el) => (el as HTMLElement).style.display = "none");

    document.body.appendChild(container);

    await new Promise((r) => setTimeout(r, 100));

    try {
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0f172a",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

      const now = new Date();
      const formattedDate = now.toISOString().split("T")[0];
      const fileName = `${getTranslatedFilename()}-${formattedDate}.pdf`;

      pdf.save(fileName);
    } catch (err) {
      console.error("PDF export error:", err);
      alert("PDF download failed.");
    } finally {
      document.body.removeChild(container);
    }
  };

  const handleDownloadCSV = () => {
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0];
    const fileName = `${getTranslatedFilename()}-${formattedDate}.csv`;

    if (!filteredData.length) {
      alert("No data to export.");
      return;
    }

    const headers = Object.keys(filteredData[0]);
    const csvRows = [
      headers.join(","),
      ...filteredData.map(row =>
        headers.map(field => JSON.stringify(row[field] ?? "")).join(",")
      ),
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
            🔄 {t("reset")}
          </button>
          <button className="downloadPDF-btn" onClick={handleDownloadPDF}>
            📥 {t("downloadPDF")}
          </button>
          <button className="downloadCSV-btn" onClick={handleDownloadCSV}>
            📄 {t("downloadCSV")}
          </button>
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
              const translatedCategory = t(`category.${cat.toLowerCase()}`);
              return (
                <button
                  key={`${cat}-${language}`}
                  onClick={() => toggleCategory(cat)}
                  className="category-btn"
                  style={
                    isActive
                      ? {
                          backgroundColor: colorsMap[cat],
                          borderColor: colorsMap[cat],
                          color: "black",
                        }
                      : {}
                  }
                >
                  {translatedCategory || cat}
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
