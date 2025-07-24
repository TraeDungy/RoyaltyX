import { Card, CardContent, Grid, Typography } from "@mui/material";

export const DynamicMetricCard = ({ metric, value, innerRef, draggableProps = {}, dragHandleProps = {} }) => (
  <Grid ref={innerRef} {...draggableProps} {...dragHandleProps} item md={4} xs={12}>
    <Card variant="outlined" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ textTransform: "uppercase", fontWeight: 500, mb: 2, color: "text.secondary" }}>
          {metric}
        </Typography>
        <Typography variant="h1" sx={{ fontWeight: "bold" }}>
          {typeof value === "number" ? value.toLocaleString() : String(value)}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default DynamicMetricCard;
