import { Typography, Box } from "@mui/material";
import { usePageCustomization } from "../../admin_panel/page_customization/api/pageCustomization";

export default function Landing() {
  const { data } = usePageCustomization("landing");
  const bg = data?.data?.backgroundColor || "#f5f5f5";
  const title = data?.data?.title || "Welcome";
  const subtitle = data?.data?.subtitle || "";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: bg,
      }}
    >
      <Typography variant="h3" mb={2}>
        {title}
      </Typography>
      <Typography variant="h5">{subtitle}</Typography>
    </Box>
  );
}
