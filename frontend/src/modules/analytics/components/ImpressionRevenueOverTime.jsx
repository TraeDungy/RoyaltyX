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
import { useState } from "react";
import { EyeSlash, ThreeDotsVertical } from "react-bootstrap-icons";
import { useSettings } from "../../common/contexts/SettingsContext";

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
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { setShowImpressionRevenueOverTime } = useSettings();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  if (!analytics || !analytics.monthly_stats) return <p>Loading...</p>;

  const impressionRevenueData = analytics.monthly_stats;

  const labels = impressionRevenueData.map((item) => {
    const [year, month] = item.month.split("-");
    const date = new Date(year, month - 1); // month is 0-indexed
    return date.toLocaleString("default", { month: "short" }); // e.g., "Jan"
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
        <div className="py-4 d-flex justify-content-between align-items-center">
          <h5 className="bold mb-0">Revenue From Impressions</h5>
          <div className="d-flex align-items-center">
            <div className="dropdown">
              <button className="btn btn-basic" onClick={toggleDropdown}>
                <ThreeDotsVertical className="txt-regular" />
              </button>
              {dropdownVisible && (
                <div className="dropdown-menu shadow-sm dropdown-menu-end show">
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setShowImpressionRevenueOverTime(false);
                      setDropdownVisible(false);
                    }}
                  >
                    Hide <EyeSlash className="ms-1" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ImpressionRevenueOverTime;
