import { ReactComponent as ProductThumbnailPlaceholder } from "../../common/assets/img/vectors/product-thumbnail-placeholder-lg.svg";
import { apiUrl } from "../../common/api/config";
import { useNavigate } from "react-router";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
} from "@mui/material";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Card
        sx={{ backgroundColor: "transparent" }}
        onClick={() => navigate("/products/" + product.id)}
      >
        <CardActionArea>
          {product.thumbnail ? (
            <CardMedia
              component="img"
              image={apiUrl + product.thumbnail}
              alt={product.title}
              sx={{ borderRadius: 1 }}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 140,
                backgroundColor: "#f0f0f0",
                borderRadius: 1,
              }}
            >
              <ProductThumbnailPlaceholder />
            </Box>
          )}
          <CardContent>
            <Typography variant="h5" component="div">
              {product.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              {product.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
