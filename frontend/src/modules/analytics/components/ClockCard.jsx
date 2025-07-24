import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { useSettings } from "../../common/contexts/SettingsContext";

export const ClockCard = () => {
  const { countdownTargetTime } = useSettings();
  const [time, setTime] = useState(new Date());
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    const tick = () => setTime(new Date());
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateRemaining = () => {
      if (!countdownTargetTime) return setRemaining("");
      const diff = countdownTargetTime - new Date();
      if (diff <= 0) {
        setRemaining("00:00:00");
        return;
      }
      const seconds = Math.floor(diff / 1000) % 60;
      const minutes = Math.floor(diff / (1000 * 60)) % 60;
      const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hms =
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");
      setRemaining((days > 0 ? days + "d " : "") + hms);
    };

    updateRemaining();
    const interval = setInterval(updateRemaining, 1000);
    return () => clearInterval(interval);
  }, [countdownTargetTime]);

  return (
    <Grid size={{ md: 4, xs: 12 }}>
      <Card
        variant="outlined"
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <CardContent sx={{ flexGrow: 1, pb: '12px !important' }}>
          <Typography
            variant="h6"
            sx={{
              textTransform: "uppercase",
              fontWeight: 500,
              fontSize: "0.875rem",
              color: "text.secondary",
              mb: 2,
            }}
          >
            CLOCK
          </Typography>
          <Typography variant="h1" sx={{ fontWeight: "bold", mb: 1, pl: 1 }}>
            {time.toLocaleTimeString()}
          </Typography>
          {remaining && (
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, color: "text.secondary" }}
              data-testid="countdown"
            >
              {remaining}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};
