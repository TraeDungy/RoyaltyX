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

export const RevenueChart = ({ analytics }) => {
  const { revenueGraphColor, revenueGraphType } = useSettings();

  if (!analytics || !analytics.time_stats) return <p>Loading...</p>;

  const granularity = analytics.granularity || "monthly";
  const revenueData = analytics.time_stats;

  const labels = formatChartLabels(revenueData, granularity);
  const dataValues = revenueData.map((item) => item.royalty_revenue);
  const chartTitle = getChartTitle("impression_revenue", granularity);

  const datasetFn =
    revenueGraphType === "sharp"
      ? getSharpLineDataset
      : revenueGraphType === "bar"
      ? getBaseBarDataset
      : getBaseLineDataset;

  const data = {
    labels,
    datasets: [datasetFn(chartTitle, dataValues, revenueGraphColor)],
  };

  const options = getBaseLineChartOptions(CHART_CONFIGS.standard);
  const ChartComponent = revenueGraphType === "bar" ? Bar : Line;

  return (
    <div style={{ width: "100%", maxWidth: "700px", margin: "auto" }}>
      <ChartComponent data={data} options={options} />
    </div>
  );
};
