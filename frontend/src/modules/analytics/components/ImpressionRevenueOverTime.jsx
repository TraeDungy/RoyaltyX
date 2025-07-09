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
import { EyeSlash, Palette } from "react-bootstrap-icons";
import { useSettings } from "../../common/contexts/SettingsContext";
import { GraphColorPalette } from "./GraphColorPalette";
import { Typography, IconButton } from "@mui/material";
import { EllipsisVertical } from "lucide-react";

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

  if (!analytics || !analytics.time_stats) return <p>Loading...</p>;

  const granularity = analytics.granularity || 'monthly';
  const impressionRevenueData = analytics.time_stats;

  const labels = impressionRevenueData.map((item) => {
    if (granularity === 'yearly') {
      return item.year; // e.g., "2025"
    } else if (granularity === 'monthly') {
      const [year, month] = item.month.split("-");
      const date = new Date(year, month - 1); // month is 0-indexed
      return date.toLocaleString("default", { month: "short" }); // e.g., "Jan"
    } else if (granularity === 'daily') {
      const date = new Date(item.period);
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" }); // e.g., "Jan 1"
    } else if (granularity === 'hourly') {
      const date = new Date(item.period);
      return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }); // e.g., "12:00"
    }
    return item.period;
  });

  const dataValues = impressionRevenueData.map(
    (item) => item.impression_revenue
  );

   const getChartTitle = () => {
    switch (granularity) {
      case 'daily':
        return 'Impression Revenue Per Day';
      case 'hourly':
        return 'Impression Revenue Per Hour';
      default:
        return 'Impression Revenue Per Month';
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: getChartTitle(),
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
            <Typography variant="h4" fontWeight="bold">
              Revenue From Impressions
            </Typography>
            <div className="d-flex align-items-center">
              <div className="dropdown">
                <IconButton onClick={toggleDropdown}>
                  <EllipsisVertical size={20} color="var(--color-text)" />
                </IconButton>
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
