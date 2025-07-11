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

// Register Chart.js components
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

// Base line chart configuration
export const getBaseLineChartOptions = (customOptions = {}) => {
  return {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      ...customOptions.plugins,
    },
    scales: {
      x: {
        title: { display: true },
        grid: { display: false },
        ...customOptions.scales?.x,
      },
      y: {
        title: { display: true },
        beginAtZero: true,
        ...customOptions.scales?.y,
      },
    },
    layout: {
      padding: { left: -24 },
      ...customOptions.layout,
    },
    ...customOptions,
  };
};

// Base dataset configuration for smooth line charts without points
export const getBaseLineDataset = (label, data, color, customConfig = {}) => {
  return {
    label,
    data,
    fill: true,
    backgroundColor: color + "45",
    borderColor: color,
    tension: 0.4,
    pointRadius: 2, // Hide points/nodes
    ...customConfig,
  };
};

// Chart type configurations
export const CHART_CONFIGS = {
  currency: {
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const value = context.parsed.y ?? 0;
            return `$${value.toLocaleString(undefined, { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
    },
  },
  standard: {},
};

// Helper function to format labels based on granularity
export const formatChartLabels = (timeStats, granularity) => {
  return timeStats.map((item) => {
    if (granularity === "yearly") {
      return item.year; // e.g., "2025"
    } else if (granularity === "monthly") {
      const [year, month] = item.month.split("-");
      const date = new Date(year, month - 1); // month is 0-indexed
      return date.toLocaleString("default", { month: "short" }); // e.g., "Jan"
    } else if (granularity === "daily") {
      const date = new Date(item.period);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }); // e.g., "Jan 1"
    } else if (granularity === "hourly") {
      const date = new Date(item.period);
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }); // e.g., "12:00"
    }
    return item.period;
  });
};

// Helper function to get chart title based on metric and granularity
export const getChartTitle = (metric, granularity) => {
  const metricTitles = {
    sales: "Sales",
    rentals: "Rentals",
    impressions: "Impressions",
    impression_revenue: "Impression Revenue",
  };

  const granularityTitles = {
    daily: "Per Day",
    hourly: "Per Hour",
    monthly: "Per Month",
    yearly: "Per Year",
  };

  const metricTitle = metricTitles[metric] || metric;
  const granularityTitle = granularityTitles[granularity] || "Per Month";

  return `${metricTitle} ${granularityTitle}`;
};
