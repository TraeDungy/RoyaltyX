import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { ReactComponent as ProductThumbnailPlaceholder } from "../../common/assets/img/vectors/product-thumbnail-placeholder-lg.svg";
import { apiUrl } from "../../common/api/config";
import { useState } from "react";
import { EllipsisVertical } from "lucide-react";

const ProductCard = ({ product }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  // const { removeProduct } = useProduct(product.id);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // const handleDelete = async (product_id) => {
  //   try {
  //     const response = await removeProduct(product_id);

  //     if (response.success) {
  //       toast.success("Product successfully deleted");
  //     } else {
  //       throw new Error("Failed to delete the product");
  //     }
  //   } catch (error) {
  //     toast.error(error.message || "Failed to delete the product");
  //   } finally {
  //     window.location.reload();
  //   }
  // };

  return (
    <div className="col-md-4 pb-4" key={product.id}>
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        {product.thumbnail ? (
          <CardMedia
            component="img"
            image={(() => {
              const url = product.thumbnail.replace("/media/", "");
              if (url.startsWith("https")) {
                return decodeURIComponent(url);
              } else {
                return apiUrl + product.thumbnail;
              }
            })()}
            alt={product.title}
            sx={{ borderRadius: 1, height: 180, objectFit: "cover" }}
          />
        ) : (
          <div style={{ textAlign: "center", padding: "16px" }}>
            <ProductThumbnailPlaceholder />
          </div>
        )}
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              component={Link}
              to={"/products/" + product.id}
              variant="h6"
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "bold",
                mb: 2,
              }}
            >
              {product.title}
            </Typography>

            <div>
              <IconButton
                sx={{
                  margin: 0,
                  padding: 0,
                  py: 2,
                  ml: 2,
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
                onClick={handleMenuOpen}
              >
                <EllipsisVertical size={20} color="var(--color-text)" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem
                  onClick={() => {
                    navigate(`/products/${product.id}/edit`);
                    handleMenuClose();
                  }}
                >
                  Edit
                </MenuItem>
              </Menu>
            </div>
          </Box>

          <Typography variant="body2" color="textSecondary">
            {product.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
