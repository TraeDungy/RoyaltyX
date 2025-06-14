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
import { useSettings } from "../../common/contexts/SettingsContext";

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

export const RevenueInLastFourMonthsChart = ({ analytics }) => {
  const { revenueOverFourMonthsGraphColor } = useSettings();

  if (!analytics || !analytics.monthly_stats) return <p>Loading...</p>;

  const revenueData = analytics.monthly_stats.slice(-4);

  const labels = revenueData.map((item) => {
    const [year, month] = item.month.split("-");
    const date = new Date(year, month - 1);
    return date.toLocaleString("default", { month: "short", year: "numeric" });
  });

  const dataValues = revenueData.map((item) => item.royalty_revenue);

  const data = {
    labels,
    datasets: [
      {
        label: "Revenue Per Month",
        data: dataValues,
        fill: true,
        backgroundColor: revenueOverFourMonthsGraphColor + "45",
        borderColor: revenueOverFourMonthsGraphColor,
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
