import { Typography, Box } from "@mui/material";
import ExpandableCard from "./ExpandableCard";

const ExpandableExampleCard = ({ analytics }) => {
  return (
    <ExpandableCard title="Sample Data" initialSize="small">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="body2">
          Impressions: {analytics?.total_impressions?.toLocaleString() || 0}
        </Typography>
        <Typography variant="body2">
          Sales: {analytics?.total_sales_count?.toLocaleString() || 0}
        </Typography>
      </Box>
    </ExpandableCard>
  );
};

export default ExpandableExampleCard;
