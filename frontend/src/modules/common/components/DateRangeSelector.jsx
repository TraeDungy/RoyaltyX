import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@mui/material";

const DateRangeSelector = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const navigate = useNavigate();
  const location = useLocation();

  // Function to update URL params
  const updateURLParams = (start, end) => {
    const params = new URLSearchParams(location.search);

    if (start && end) {
      params.set("period_start", start.toLocaleDateString("en-CA"));
      params.set("period_end", end.toLocaleDateString("en-CA"));
    } else {
      params.delete("period_start");
      params.delete("period_end");
    }

    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleDateChange = (update) => {
    setDateRange(update);
    if (update[0] && update[1]) {
      updateURLParams(update[0], update[1]);
    }
  };

  const setThisMonth = () => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    setDateRange([firstDay, lastDay]);
    setTimeout(() => updateURLParams(firstDay, lastDay), 0);
  };

  const setLastYear = () => {
    const today = new Date();
    const lastYear = today.getFullYear() - 1;

    const firstDay = new Date(lastYear, 0, 1);
    const lastDay = new Date(lastYear, 11, 31);

    setDateRange([firstDay, lastDay]);
    setTimeout(() => updateURLParams(firstDay, lastDay), 0);
  };

  const clearDates = () => {
    setDateRange([null, null]);
    updateURLParams(null, null);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const start = params.get("period_start");
    const end = params.get("period_end");

    if (start && end) {
      setDateRange([new Date(start), new Date(end)]);
    }
  }, [location.search]);

  return (
    <div className="d-flex gap-3 align-items-center">
      <Button
        variant="outlined"
        onClick={setThisMonth}
        sx={{ color: "var(--text-lighter)" }}
      >
        This Month
      </Button>

      <Button
        variant="outlined"
        sx={{ color: "var(--text-lighter)" }}
        onClick={setLastYear}
      >
        Last Year
      </Button>

      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={handleDateChange}
        isClearable
        placeholderText="Select date range"
        className="form-control px-4 py-2"
      />

      {startDate && endDate && (
        <Button
          variant="outlined"
          onClick={clearDates}
          sx={{ color: "var(--text-lighter)" }}
        >
          Clear
        </Button>
      )}
    </div>
  );
};

export default DateRangeSelector;
