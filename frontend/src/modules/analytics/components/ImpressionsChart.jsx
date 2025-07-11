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
  getChartTitle 
} from "../../common/config/chartConfig";

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

export const ImpressionsChart = ({ analytics }) => {
  const { impressionsGraphColor } = useSettings();
  if (!analytics ||  !analytics.time_stats) return <p>Loading...</p>;

  const granularity = analytics.granularity || 'monthly';
  const impressionsData = analytics.time_stats;

  const labels = formatChartLabels(impressionsData, granularity);
  const dataValues = impressionsData.map((item) => item.impressions);
  const chartTitle = getChartTitle("impressions", granularity);

  const data = {
    labels,
    datasets: [
      getBaseLineDataset(chartTitle, dataValues, impressionsGraphColor),
    ],
  };

  const options = getBaseLineChartOptions(CHART_CONFIGS.standard);

  return (
    <div style={{ width: "100%", maxWidth: "700px", margin: "auto" }}>
      <Line data={data} options={options} />
    </div>
  );
};
