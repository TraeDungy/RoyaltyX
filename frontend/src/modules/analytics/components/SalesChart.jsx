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
import {
  CHART_CONFIGS,
  getBaseLineChartOptions,
} from "../../common/config/chartConfig";

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

export const SalesChart = ({ analytics }) => {
  const { salesGraphColor } = useSettings();

  if (!analytics || !analytics.time_stats) return <p>Loading...</p>;

  const granularity = analytics.granularity || "monthly";
  const salesData = analytics.time_stats;

  const labels = salesData.map((item) => {
    if (granularity === "yearly") {
      return item.year; // e.g., "2025"
    } else if (granularity === "monthly") {
      const [year, month] = item.month.split("-");
      const date = new Date(year, month - 1); // month is 0-indexed
      return date.toLocaleString("default", { month: "short" }); // e.g., "Jan"
    } else if (granularity === "daily") {
      const date = new Date(item.period);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }); // e.g., "Jan 1"
    } else if (granularity === "hourly") {
      const date = new Date(item.period);
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }); // e.g., "12:00"
    }
    return item.period;
  });

  const dataValues = salesData.map((item) => item.sales);

  const getChartTitle = () => {
    switch (granularity) {
      case "daily":
        return "Sales Per Day";
      case "hourly":
        return "Sales Per Hour";
      default:
        return "Sales Per Month";
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: getChartTitle(),
        data: dataValues,
        fill: true,
        backgroundColor: salesGraphColor + "45",
        borderColor: salesGraphColor,
        tension: 0.4,
      },
    ],
  };

  const options = getBaseLineChartOptions(CHART_CONFIGS.scales);

  return (
    <div style={{ width: "100%", maxWidth: "700px", margin: "auto" }}>
      <Line data={data} options={options} />
    </div>
  );
};
