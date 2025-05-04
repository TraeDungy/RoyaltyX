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
  Filler,
);

export const SalesInLastFourMonthsChart = ({ analytics }) => {
  if (!analytics || !analytics.monthly_stats) return <p>Loading...</p>;

  const salesData = analytics.monthly_stats.slice(-4);

  const labels = salesData.map((item) => {
    const [year, month] = item.month.split("-");
    const date = new Date(year, month - 1);
    return date.toLocaleString("default", { month: "short", year: "numeric" });
  });

  const dataValues = salesData.map((item) => item.sales);

  const data = {
    labels,
    datasets: [
      {
        label: "Sales Per Month",
        data: dataValues,
        fill: true,
        backgroundColor: "#f43f0f45",
        borderColor: "#f43f0f",
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
    <div style={{ width: "100%", maxWidth: "700px", margin: "auto" }}>
      <Line data={data} options={options} />
    </div>
  );
};
