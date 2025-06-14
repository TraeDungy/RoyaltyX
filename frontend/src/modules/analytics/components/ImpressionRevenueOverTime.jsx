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
import { EyeSlash, Palette, ThreeDotsVertical } from "react-bootstrap-icons";
import { useSettings } from "../../common/contexts/SettingsContext";
import { GraphColorPalette } from "./GraphColorPalette";

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

const ImpressionRevenueOverTime = ({ analytics }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { setShowImpressionRevenueOverTime } = useSettings();
  const [showGraphColorPalette, setShowGraphColorPalette] = useState(false);
  const {
    setImpressionRevenueOverTimeGraphColor,
    impressionRevenueOverTimeGraphColor,
  } = useSettings();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const onSelectColor = (color) => {
    setImpressionRevenueOverTimeGraphColor(color);
  };

  if (!analytics || !analytics.monthly_stats) return <p>Loading...</p>;

  const impressionRevenueData = analytics.monthly_stats;

  const labels = impressionRevenueData.map((item) => {
    const [year, month] = item.month.split("-");
    const date = new Date(year, month - 1); // month is 0-indexed
    return date.toLocaleString("default", { month: "short" }); // e.g., "Jan"
  });

  const dataValues = impressionRevenueData.map(
    (item) => item.impression_revenue,
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Impression Revenue",
        data: dataValues,
        fill: true,
        backgroundColor: impressionRevenueOverTimeGraphColor + "45",
        borderColor: impressionRevenueOverTimeGraphColor,
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
    <>
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
                      className="dropdown-item py-2"
                      onClick={() => {
                        setShowImpressionRevenueOverTime(false);
                        setDropdownVisible(false);
                      }}
                    >
                      Hide <EyeSlash className="ms-1" />
                    </button>
                    <button
                      className="dropdown-item py-2"
                      onClick={() => {
                        setShowGraphColorPalette(true);
                        setDropdownVisible(false);
                      }}
                    >
                      Customize color <Palette className="ms-2" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Line data={data} options={options} />
        </div>
      </div>

      <GraphColorPalette
        showGraphColorPalette={showGraphColorPalette}
        setShowGraphColorPalette={setShowGraphColorPalette}
        onSelectColor={onSelectColor}
      />
    </>
  );
};

export default ImpressionRevenueOverTime;
