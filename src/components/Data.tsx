import { useEffect, useState } from "react";

// Type representing a single raw row from the /api/data endpoint
type RawEntry = {
  article_count: number;
  category: string;
  country: string;
  year: number;
};

// After we process raw entries, each will be grouped by year+country
// with dynamic keys for categories (e.g., "Politics", "Economics")
export type ProcessedEntry = {
  year: number;
  country: string;
  [key: string]: number | string; // Dynamic keys for each category
};

// Type for the final structured object returned by the hook
type BData = {
  groupedData: ProcessedEntry[];         // Array of grouped entries (by year and country)
  availableFields: string[];             // List of all categories found in the data
  colorsMap: { [key: string]: string };  // Maps each category to a consistent color
};

// Generates a color from a predefined palette based on index
const generateColor = (index: number): string => {
  const palette = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8dd1e1",
    "#a4de6c", "#d0ed57", "#d88884", "#bfa1fc", "#ffa07a"
  ];
  return palette[index % palette.length]; // Wraps around if more categories than colors
};

// Main hook to fetch and prepare the historical article data
const Data = () => {
  // State variables for data, loading status, and error message
  const [data, setData] = useState<BData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Async function to fetch and process data
    const fetchData = async () => {
      try {
        // Make HTTP request to API
        const response = await fetch("https://trendanalysis-457309.nw.r.appspot.com/api/data");
        if (!response.ok) throw new Error("Failed to fetch data");

        // Parse raw data from JSON
        const raw: RawEntry[] = await response.json();

        const grouped: { [key: string]: ProcessedEntry } = {};
        const allFields = new Set<string>(); // To collect unique category names

        // Loop through each raw entry
        for (const entry of raw) {
          const key = `${entry.year}_${entry.country}`; // Use year_country as grouping key

          // Initialize if not yet present
          if (!grouped[key]) {
            grouped[key] = {
              year: entry.year,
              country: entry.country,
            };
          }

          // Keep track of all seen category fields
          allFields.add(entry.category);

          // Add or accumulate count for this category
          grouped[key][entry.category] =
            (Number(grouped[key][entry.category]) || 0) + entry.article_count;
        }

        // Sort and extract available categories
        const availableFields = Array.from(allFields).sort();

        // Assign a color to each category
        const colorsMap: { [key: string]: string } = {};
        availableFields.forEach((field, index) => {
          colorsMap[field] = generateColor(index);
        });

        // Final processed data
        const bdata: BData = {
          groupedData: Object.values(grouped), // Convert from keyed object to array
          availableFields,
          colorsMap,
        };

        setData(bdata);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false); // Always stop loading at the end
      }
    };

    fetchData(); // Run on component mount
  }, []);

  // Return hook output for components to use
  return { data, loading, error };
};

export default Data;
