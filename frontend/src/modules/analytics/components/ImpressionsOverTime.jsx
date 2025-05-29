import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ImpressionsOverTime = ({ analytics }) => {
  if (!analytics || !analytics.monthly_stats) return <p>Loading...</p>;

  const impressionsData = analytics.monthly_stats;

  const labels = impressionsData.map((item) => {
    const [year, month] = item.month.split("-");
    const date = new Date(year, month - 1); // month is 0-indexed
    return date.toLocaleString("default", { month: "short", year: "numeric" }); // e.g., "Aug 2024"
  });

  const dataValues = impressionsData.map((item) => item.impressions);

  const data = {
    labels,
    datasets: [
      {
        label: "Impressions Per Month",
        data: dataValues,
        fill: true,
        backgroundColor: "rgba(0,158,253, 0.2)",
        borderColor: "rgb(0,158,253)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        title: { display: true },
        grid: { display: false },
      },
      y: {
        title: { display: true },
        beginAtZero: true,
      },
    },
    layout: {
      padding: { left: -24 },
    },
  };

  return (
    <div className="col-md-6">
      <div style={{ width: "100%", maxWidth: "1200px", margin: "auto" }}>
        <h5 className="bold mt-4 mb-4">Impressions Over Time</h5>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ImpressionsOverTime;
