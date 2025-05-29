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

const ImpressionRevenueOverTime = ({ analytics }) => {
  if (!analytics || !analytics.monthly_stats) return <p>Loading...</p>;

  const impressionRevenueData = analytics.monthly_stats;

  const labels = impressionRevenueData.map((item) => {
    const [year, month] = item.month.split("-");
    const date = new Date(year, month - 1); // month is 0-indexed
    return date.toLocaleString("default", { month: "short", year: "numeric" }); // e.g., "Aug 2024"
  });

  const dataValues = impressionRevenueData.map(
    (item) => item.impression_revenue
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Impression Revenue",
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
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const value = context.parsed.y ?? 0;
            return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true },
        grid: { display: false },
      },
      y: {
        title: { display: true },
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
    },
    layout: {
      padding: { left: -24 },
    },
  };

  return (
    <div className="col-md-6">
      <div style={{ width: "100%", maxWidth: "1200px", margin: "auto" }}>
        <h5 className="bold mt-4 mb-4">Revenue From Impressions</h5>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ImpressionRevenueOverTime;
