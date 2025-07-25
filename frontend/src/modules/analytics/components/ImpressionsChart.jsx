import { Line, Bar, Pie } from "react-chartjs-2";
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
  getBasePieDataset,
  formatChartLabels,
  getChartTitle
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
  Filler,
);

export const ImpressionsChart = ({ analytics }) => {
  const { impressionsGraphColor, impressionsGraphType } = useSettings();
  if (!analytics ||  !analytics.time_stats) return <p>Loading...</p>;

  const granularity = analytics.granularity || 'monthly';
  const impressionsData = analytics.time_stats;

  const labels = formatChartLabels(impressionsData, granularity);
  const dataValues = impressionsData.map((item) => item.impressions);
  const chartTitle = getChartTitle("impressions", granularity);

  const datasetFn =
    impressionsGraphType === "sharp"
      ? getSharpLineDataset
      : impressionsGraphType === "bar"
      ? getBaseBarDataset
      : impressionsGraphType === "pie"
      ? (label, data) =>
          getBasePieDataset(label, data, data.map(() => impressionsGraphColor))
      : getBaseLineDataset;

  const data = {
    labels,
    datasets: [datasetFn(chartTitle, dataValues, impressionsGraphColor)],
  };

  const options = getBaseLineChartOptions(CHART_CONFIGS.standard);

  const ChartComponent =
    impressionsGraphType === "bar"
      ? Bar
      : impressionsGraphType === "pie"
      ? Pie
      : Line;

  return (
    <div style={{ width: "100%", maxWidth: "700px", margin: "auto" }}>
      <ChartComponent data={data} options={options} />
    </div>
  );
};
