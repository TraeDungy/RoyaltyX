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
  getBaseLineDataset,
  formatChartLabels,
  getChartTitle,
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

  const labels = formatChartLabels(salesData, granularity);
  const dataValues = salesData.map((item) => item.sales);
  const chartTitle = getChartTitle("sales", granularity);

  const data = {
    labels,
    datasets: [
      getBaseLineDataset(chartTitle, dataValues, salesGraphColor),
    ],
  };

  const options = getBaseLineChartOptions(CHART_CONFIGS.standard);

  return (
    <div style={{ width: "100%", maxWidth: "700px", margin: "auto" }}>
      <Line data={data} options={options} />
    </div>
  );
};
