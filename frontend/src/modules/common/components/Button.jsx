import PropTypes from "prop-types";
import { Button as MUIButton, CircularProgress } from "@mui/material";

// Map Bootstrap-style variant to MUI variant and color
const getVariantAndColor = (variant) => {
  switch (variant) {
    case "primary":
      return { variant: "contained", color: "primary" };
    case "secondary":
      return { variant: "contained", color: "secondary" };
    case "danger":
      return { variant: "contained", color: "error" };
    case "outlined":
      return { variant: "outlined", color: "primary" };
    default:
      return { variant: "contained", color: "primary" };
  }
};

// Map Bootstrap-style size to MUI size
const mapSize = (size) => {
  switch (size) {
    case "lg":
      return "large";
    case "sm":
      return "small";
    default:
      return "medium";
  }
};

const Button = ({
  variant,
  size,
  children,
  onClick,
  disabled,
  type,
  loading,
  ...props
}) => {
  const { variant: muiVariant, color: muiColor } = getVariantAndColor(variant);
  const muiSize = mapSize(size);

  return (
    <MUIButton
      variant={muiVariant}
      color={muiColor}
      size={muiSize}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      sx={size === "lg" ? { width: "100%", fontWeight: 600, py: 1.5 } : {}}
      {...props}
    >
      {loading && (
        <CircularProgress
          size={20}
          color="inherit"
          style={{ marginRight: 8 }}
        />
      )}
      {children}
    </MUIButton>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  variant: "primary",
  size: "medium",
  onClick: () => {},
  disabled: false,
  type: "button",
  loading: false,
};

export default Button;
