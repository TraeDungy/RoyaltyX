import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";

const CustomDateSelector = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    setStart(params.get("period_start") || "");
    setEnd(params.get("period_end") || "");
  }, [location.search]);

  const applyDates = () => {
    if (start) {
      params.set("period_start", start);
    } else {
      params.delete("period_start");
    }
    if (end) {
      params.set("period_end", end);
    } else {
      params.delete("period_end");
    }
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "4px",
        p: 0.5,
        backgroundColor: "transparent",
      }}
    >
      <TextField
        type="date"
        size="small"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        sx={{ mr: 1 }}
      />
      <TextField
        type="date"
        size="small"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        sx={{ mr: 1 }}
      />
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={applyDates}
        sx={{ textTransform: "none" }}
      >
        Apply
      </Button>
    </Box>
  );
};

export default CustomDateSelector;
