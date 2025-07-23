import { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { apiUrl } from "../../common/api/config";
import { ReactComponent as ProductThumbnailPlaceholder } from "../../common/assets/img/vectors/product-thumbnail-placeholder-lg.svg";
import { EyeSlash, Star } from "react-bootstrap-icons";
import { EllipsisVertical } from "lucide-react";
import { useSettings } from "../../common/contexts/SettingsContext";

const ProductImageCard = ({ product }) => {
  const { setShowProductImageCard } = useSettings();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Grid size={{ md: 4, xs: 12 }}>
      <Card
        variant="outlined"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          "&:hover .image-actions": { display: "flex" },
        }}
      >
        <Box
          className="image-actions"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "none",
            gap: 1,
            zIndex: 1,
          }}
        >
          <IconButton
            size="small"
            onClick={() => setShowProductImageCard(false)}
            sx={{ bgcolor: "background.paper", "&:hover": { bgcolor: "action.hover" } }}
          >
            <EyeSlash size={16} />
          </IconButton>
          <IconButton
            size="small"
            onClick={handleMenuOpen}
            sx={{ bgcolor: "background.paper", "&:hover": { bgcolor: "action.hover" } }}
          >
            <EllipsisVertical size={16} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleMenuClose} sx={{ py: 1 }}>
              <Star style={{ marginRight: 8 }} /> Feature
            </MenuItem>
          </Menu>
        </Box>
        <CardContent sx={{ flexGrow: 1 }}>
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
