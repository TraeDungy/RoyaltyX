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

const SalesOverTime = ({ analytics }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { setShowSalesOverTime } = useSettings();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  if (!analytics || !analytics.monthly_stats) return <p>Loading...</p>;

  const salesData = analytics.monthly_stats;

  const labels = salesData.map((item) => {
    const [year, month] = item.month.split("-");
    const date = new Date(year, month - 1); // month is 0-indexed
    return date.toLocaleString("default", { month: "short" }); // e.g., "Jan"
  });

  const dataValues = salesData.map((item) => item.sales);

  const data = {
    labels,
    datasets: [
      {
        label: "Sales Per Month",
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
    <div className="col-md-6">
      <div style={{ width: "100%", maxWidth: "1200px", margin: "auto" }}>
        <div className="py-4 d-flex justify-content-between align-items-center">
          <h5 className="bold mb-0">Sales Over Time</h5>
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
                      setShowSalesOverTime(false);
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

export default SalesOverTime;
