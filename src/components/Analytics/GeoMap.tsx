import { Chart } from "react-google-charts";

export default function GeoMap({ countryStats }) {
  // Data example: [{ country: "US", clicks: 123 }, ...]
  const data = [
    ["Country", "Clicks"],
    ...countryStats.map(c => [c.country, c.clicks])
  ];
  return (
    <div>
      <h2>Geographic Distribution</h2>
      <Chart
        chartType="GeoChart"
        width="100%"
        height="260px"
        data={data}
        options={{
          colorAxis: { colors: ['#f59e0b', '#4f46e5'] },
          backgroundColor: "#f9fafb",
        }}
      />
    </div>
  );
}
