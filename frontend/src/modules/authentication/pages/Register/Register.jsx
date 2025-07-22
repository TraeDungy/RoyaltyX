import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, Typography, Divider, Box, TextField, MenuItem } from "@mui/material";
import icon from "../../../common/assets/img/brand/icon-3.png";
import { register } from "../../api/auth";
import { GoogleLoginButton } from "../../components";
import { useAuth } from "../../../common/contexts/AuthContext";
import Button from "../../../common/components/Button";
import styles from "./Register.module.css";

export default function Register() {
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});

    const data = new FormData(e.target);
    const user = Object.fromEntries(data.entries());

    try {
      const response = await register(user);
      if (response.success && response.access) {
        // Store the access token
        localStorage.setItem("accessToken", response.access);
        
        // Automatically log in the user with the new token
        const loginResult = await login({
          access_token: response.access,
          auto_login: true
        });
        
        if (loginResult.success) {
          toast.success("Account created successfully! Welcome to RoyaltyX!");
          // Navigate directly to theme selection for new users
          navigate("/theme-selection");
        } else {
          // Fallback: redirect to login if auto-login fails
          toast.success("Account created successfully! Please log in to continue.");
          navigate("/login");
        }
      } else {
        // Handle field-specific errors
        if (response.errors && typeof response.errors === 'object') {
          setFieldErrors(response.errors);
          setError(response.message || "Please fix the errors below");
        } else {
          // Handle general errors
          setError(response.message || "Registration failed. Please try again.");
        }
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    }

    setLoading(false);
  };

  const getFieldError = (fieldName) => {
    if (fieldErrors[fieldName]) {
      return Array.isArray(fieldErrors[fieldName]) 
        ? fieldErrors[fieldName][0] 
        : fieldErrors[fieldName];
    }
    return "";
  };

  const hasFieldError = (fieldName) => {
    return fieldErrors[fieldName] && fieldErrors[fieldName].length > 0;
  };

  return (
    <div className={styles.registerPageWrapper}>
      {/* Animated background shapes */}
      <div className={styles.backgroundShapes}>
        <div className={`${styles.shape} ${styles.shape1}`}></div>
        <div className={`${styles.shape} ${styles.shape2}`}></div>
        <div className={`${styles.shape} ${styles.shape3}`}></div>
        <div className={`${styles.shape} ${styles.shape4}`}></div>
        <div className={`${styles.shape} ${styles.shape5}`}></div>
      </div>

      <Card 
        style={{ maxWidth: 520 }} 
        sx={{ 
          p: 4, 
          boxShadow: 3,
          width: "100%", 
          zIndex: 10,
          position: "relative",
        }}
      >
        <img
          src={icon}
          style={{ maxWidth: 70 }}
          className="mb-3 mx-auto d-block"
          alt="Brand Icon"
        />
        <Typography variant="h3" sx={{ mb: 5, textAlign: "center", fontWeight: 600 }}>
          Create your account
        </Typography>
        
        {/* Google Login Button */}
        <Box sx={{ mb: 3 }}>
          <GoogleLoginButton disabled={loading} />
        </Box>

        {/* Divider */}
        <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
          <Divider sx={{ flex: 1 }} />
          <Typography variant="body2" sx={{ px: 2, color: "text.secondary" }}>
            or
          </Typography>
          <Divider sx={{ flex: 1 }} />
        </Box>

        {error && <span className="text-danger small">{error}</span>}
        <form onSubmit={handleSubmit}>
          <div className="py-2">
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder="Enter your name"
              error={hasFieldError('name')}
              helperText={getFieldError('name')}
            />
          </div>
          <div className="py-2">
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder="Enter your email"
              error={hasFieldError('email')}
              helperText={getFieldError('email')}
            />
          </div>
          <div className="py-2">
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="••••••••"
            error={hasFieldError('password')}
            helperText={getFieldError('password')}
          />
          </div>
          <div className="py-2">
            <TextField
              select
              label="Role"
              name="role"
              variant="outlined"
              fullWidth
              margin="normal"
              defaultValue="user"
              error={hasFieldError('role')}
              helperText={getFieldError('role')}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
          </div>

          <div className="py-2 mt-3">

          <div className="py-2 mt-3">
            <Button variant="primary" size="lg" type="submit" loading={loading}>
              Sign Up
            </Button>
          </div>
        </form>

        {/* Sign in link */}
        <div className="d-flex justify-content-center align-items-center py-4">
          <Typography variant="body1" className="px-1 txt-lighter">
            Already have an account?
          </Typography>
          <Link to="/login" className="px-1 fw-500 text-decoration-none">
            <Typography variant="body1" color="primary">
              Log In
            </Typography>
          </Link>
        </div>
      </Card>
    </div>
  );
}
