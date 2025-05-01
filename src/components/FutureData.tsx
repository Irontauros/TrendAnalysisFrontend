import { useEffect, useState } from "react";

// Type from /api/future endpoint
type RawFutureEntry = {
  predicted_total: number;
  category: string;
  year: number;
};

// No country here — just year and dynamic categories
export type FutureProcessedEntry = {
  year: number;
  [key: string]: number | string;
};

// Final output structure for components that use future data
type FutureBData = {
  groupedData: FutureProcessedEntry[];
  availableFields: string[];
  colorsMap: { [key: string]: string };
};

// Same color logic as in Data
const generateColor = (index: number): string => {
  const palette = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8dd1e1",
    "#a4de6c", "#d0ed57", "#d88884", "#bfa1fc", "#ffa07a"
  ];
  return palette[index % palette.length];
};

// Custom hook to fetch and prepare future (predicted) data
const FutureData = () => {
  const [data, setData] = useState<FutureBData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://flask-api-327910309669.europe-southwest1.run.app/api/future");
        if (!response.ok) throw new Error("Failed to fetch future data");

        const raw: RawFutureEntry[] = await response.json();

        // Grouping entries only by year (no country in future data)
        const grouped: { [key: number]: FutureProcessedEntry } = {};
        const allFields = new Set<string>();

        for (const entry of raw) {
          // Initialize group by year if not yet present
          if (!grouped[entry.year]) {
            grouped[entry.year] = {
              year: entry.year
            };
          }

          // Track all distinct categories
          allFields.add(entry.category);

          // Accumulate predicted totals for each category
          grouped[entry.year][entry.category] =
            (Number(grouped[entry.year][entry.category]) || 0) + entry.predicted_total;
        }

        // Prepare field list and color mapping
        const availableFields = Array.from(allFields).sort();
        const colorsMap: { [key: string]: string } = {};
        availableFields.forEach((field, index) => {
          colorsMap[field] = generateColor(index);
        });

        // Build final object
        const bdata: FutureBData = {
          groupedData: Object.values(grouped),
          availableFields,
          colorsMap,
        };

        setData(bdata);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false); // Whether success or failure, stop loading
      }
    };

    fetchData(); // Run once on mount
  }, []);

  return { data, loading, error };
};

export default FutureData;
