import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

const DateRangeSelector = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Max");

  const navigate = useNavigate();
  const location = useLocation();

  const periods = [
    { label: "1D", value: "1D" },
    { label: "5D", value: "5D" },
    { label: "1M", value: "1M" },
    { label: "6M", value: "6M" },
    { label: "1Y", value: "1Y" },
    { label: "5Y", value: "5Y" },
    { label: "Max", value: "Max" },
  ];

  // Function to update URL params
  const updateURLParams = (start, end, period) => {
    const params = new URLSearchParams(location.search);

    if (period === "Max") {
      params.delete("period_start");
      params.delete("period_end");
    } else if (start && end) {
      params.set("period_start", start.toLocaleDateString("en-CA"));
      params.set("period_end", end.toLocaleDateString("en-CA"));
    }

    navigate(`${location.pathname}?${params.toString()}`);
  };

  const calculateDateRange = (period) => {
    const today = new Date();
    let startDate, endDate = today;

    switch (period) {
      case "1D":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 1);
        break;
      case "5D":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 5);
        break;
      case "1M":
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 1);
        break;
      case "6M":
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 6);
        break;
      case "1Y":
        startDate = new Date(today);
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      case "5Y":
        startDate = new Date(today);
        startDate.setFullYear(today.getFullYear() - 5);
        break;
      case "Max":
        return [null, null];
      default:
        return [null, null];
    }

    return [startDate, endDate];
  };

  const handlePeriodClick = (period) => {
    setSelectedPeriod(period);
    const [start, end] = calculateDateRange(period);
    updateURLParams(start, end, period);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const start = params.get("period_start");
    const end = params.get("period_end");

    if (start && end) {
      // Try to determine which period this corresponds to
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 1) setSelectedPeriod("1D");
      else if (diffDays <= 5) setSelectedPeriod("5D");
      else if (diffDays <= 31) setSelectedPeriod("1M");
      else if (diffDays <= 186) setSelectedPeriod("6M");
      else if (diffDays <= 366) setSelectedPeriod("1Y");
      else if (diffDays <= 1830) setSelectedPeriod("5Y");
      else setSelectedPeriod("Max");
    } else {
      setSelectedPeriod("Max");
    }
  }, [location.search]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #dadce0",
        borderRadius: "4px",
        overflow: "hidden",
        backgroundColor: "#fff",
      }}
    >
      {periods.map((period, index) => (
        <Box key={period.value} sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component="button"
            onClick={() => handlePeriodClick(period.value)}
            sx={{
              border: "none",
              background: "none",
              padding: "8px 12px",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              color: selectedPeriod === period.value ? "#1976d2" : "#5f6368",
              backgroundColor: "transparent",
              transition: "color 0.2s ease",
              "&:hover": {
                color: selectedPeriod === period.value ? "#1976d2" : "#202124",
              },
              "&:focus": {
                outline: "none",
              },
            }}
          >
            {period.label}
          </Box>
          {index < periods.length - 1 && (
            <Box
              sx={{
                width: "1px",
                height: "20px",
                backgroundColor: "#dadce0",
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default DateRangeSelector;
