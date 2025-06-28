import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";
import { Plus } from "lucide-react";

function CreateNewProjectCard() {
  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Card>
        <CardActionArea
          component={RouterLink}
          to="/projects/create"
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            px: 3,
            py: 5,
            textDecoration: "none",
          }}
        >
          <Box sx={{ color: "primary.main", mb: 1 }}>
            <Plus size={48} />
          </Box>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            textAlign="center"
            sx={{ userSelect: "none" }}
          >
            Add project
          </Typography>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default CreateNewProjectCard;
