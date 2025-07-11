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

const ImpressionsOverTime = ({ analytics }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { setShowImpressionsOverTime } = useSettings();
  const [showGraphColorPalette, setShowGraphColorPalette] = useState(false);
  const { setImpressionsOverTimeGraphColor, impressionsOverTimeGraphColor } =
    useSettings();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const onSelectColor = (color) => {
    setImpressionsOverTimeGraphColor(color);
  };
  if (!analytics ||  !analytics.time_stats) return <p>Loading...</p>;

  const granularity = analytics.granularity || 'monthly';
  const impressionsData = analytics.time_stats;

  const labels = impressionsData.map((item) => {
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

  const dataValues = impressionsData.map((item) => item.impressions);

  const getChartTitle = () => {
    switch (granularity) {
      case 'daily':
        return 'Impressions Per Day';
      case 'hourly':
        return 'Impressions Per Hour';
      default:
        return 'Impressions Per Month';
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: getChartTitle(),
        data: dataValues,
        fill: true,
        backgroundColor: impressionsOverTimeGraphColor + "45",
        borderColor: impressionsOverTimeGraphColor,
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
    <>
      <div className="col-md-6">
        <div style={{ width: "100%", maxWidth: "1200px", margin: "auto" }}>
          <div className="py-4 d-flex justify-content-between align-items-center">
            <Typography variant="h5">
              Impressions Over Time
            </Typography>
            <div className="d-flex align-items-center">
              <div className="dropdown">
                <IconButton onClick={toggleDropdown}>
                  <EllipsisVertical size={20} color="var(--color-text)" />
                </IconButton>
                {dropdownVisible && (
                  <div className="dropdown-menu shadow-sm show">
                    <button
                      className="dropdown-item py-2"
                      onClick={() => {
                        setShowImpressionsOverTime(false);
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

export default ImpressionsOverTime;
