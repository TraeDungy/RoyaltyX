import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  getSharpLineDataset,
  getBaseBarDataset,
  formatChartLabels,
  getChartTitle,
} from "../../common/config/chartConfig";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const SalesChart = ({ analytics }) => {
  const { salesGraphColor, salesGraphType } = useSettings();

  if (!analytics || !analytics.time_stats) return <p>Loading...</p>;

  const granularity = analytics.granularity || "monthly";
  const salesData = analytics.time_stats;

  const labels = formatChartLabels(salesData, granularity);
  const dataValues = salesData.map((item) => item.sales);
  const chartTitle = getChartTitle("sales", granularity);

  const datasetFn =
    salesGraphType === "sharp"
      ? getSharpLineDataset
      : salesGraphType === "bar"
      ? getBaseBarDataset
      : getBaseLineDataset;

  const data = {
    labels,
    datasets: [datasetFn(chartTitle, dataValues, salesGraphColor)],
  };

  const options = getBaseLineChartOptions(CHART_CONFIGS.standard);
  const ChartComponent = salesGraphType === "bar" ? Bar : Line;

  return (
    <div style={{ width: "100%", maxWidth: "700px", margin: "auto" }}>
      <ChartComponent data={data} options={options} />
    </div>
  );
};
