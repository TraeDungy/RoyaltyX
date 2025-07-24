import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Select, MenuItem } from "@mui/material";

const OPTIONS = [
  { label: "Hourly", value: "hourly" },
  { label: "Daily", value: "daily" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

const GranularitySelector = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [granularity, setGranularity] = useState(
    params.get("granularity") || "monthly",
  );

  useEffect(() => {
    setGranularity(params.get("granularity") || "monthly");
  }, [location.search]);

  const handleChange = (e) => {
    const value = e.target.value;
    setGranularity(value);
    if (value) {
      params.set("granularity", value);
    } else {
      params.delete("granularity");
    }
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <Select size="small" value={granularity} onChange={handleChange}>
      {OPTIONS.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default GranularitySelector;
