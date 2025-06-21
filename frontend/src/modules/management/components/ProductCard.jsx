import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { ReactComponent as ProductThumbnailPlaceholder } from "../../common/assets/img/vectors/product-thumbnail-placeholder-lg.svg";
import { apiUrl } from "../../common/api/config";
import { useState } from "react";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import { useProduct } from "../../products/api/product";
import { toast } from "react-toastify";

const ProductCard = ({ product, handleEdit }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { removeProduct } = useProduct(product.id);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (product_id) => {
    try {
      const response = await removeProduct(product_id);

      if (response.success) {
        toast.success("Product successfully deleted");
      } else {
        throw new Error("Failed to delete the product");
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete the product");
    }
    finally {
      window.location.reload();
    }
  };


  return (
    <div className="col-md-4 pb-4" key={product.id}>
      <Card>
        {product.thumbnail ? (
          <CardMedia
            component="img"
            image={apiUrl + product.thumbnail}
            alt={product.title}
            sx={{ borderRadius: 1 }}
          />
        ) : (
          <div style={{ textAlign: "center", padding: "16px" }}>
            <ProductThumbnailPlaceholder />
          </div>
        )}
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Typography
              component={Link}
              to={"/products/" + product.id}
              variant="h6"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              {product.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {product.description}
            </Typography>
          </div>
          <div>
            <IconButton onClick={handleMenuOpen}>
              <ThreeDotsVertical />
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
                  handleEdit(product.id);
                  handleMenuClose();
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleDelete(product.id);
                  handleMenuClose();
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
