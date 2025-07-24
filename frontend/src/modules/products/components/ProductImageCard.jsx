import { Grid, Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { apiUrl } from "../../common/api/config";
import { ReactComponent as ProductThumbnailPlaceholder } from "../../common/assets/img/vectors/product-thumbnail-placeholder-lg.svg";

const ProductImageCard = ({ product }) => {
  return (
    <Grid item md={4} xs={12}>
      <Card variant="outlined" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flexGrow: 1 }}>
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
            Product Image
          </Typography>
          {product?.thumbnail ? (
            <CardMedia
              component="img"
              image={(() => {
                const url = product.thumbnail.replace("/media/", "");
                if (url.startsWith("https")) {
                  return decodeURIComponent(url).replace("https", "http");
                }
                return apiUrl + product.thumbnail;
              })()}
              alt={product.title}
              sx={{ width: "100%", height: "auto", borderRadius: 1 }}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                minHeight: 200,
                backgroundColor: "#f0f0f0",
                borderRadius: 1,
              }}
            >
              <ProductThumbnailPlaceholder />
            </Box>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductImageCard;
