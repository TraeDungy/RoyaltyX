import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  TextField,
  Link,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import icon from "../../../common/assets/img/brand/icon-2.webp";
import { register } from "../../api/auth";

export default function Register() {
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
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
      if (response.success) {
        toast.success("Successfully created an account!");
        navigate("/login");
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
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fff", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box sx={{ maxWidth: 470, width: "100%" }}>
        <Box
          component="img"
          src={icon}
          alt="Brand Icon"
          sx={{
            maxWidth: 60,
            display: "block",
            mb: 6, 
          }}
        />

        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontWeight: "700",
            fontSize: "2rem", 
            lineHeight: 1.2,
            mb: 1,
          }}
        >
          Sign up
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: "#6c757d", mb: 3 }}
        >
          Welcome! Please enter your details.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{mt:3}}>
          <Stack spacing={3}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              variant="outlined"
              margin="normal" 
              placeholder="Enter your name"
              disabled={loading}
              required
              error={hasFieldError('name')}
              helperText={getFieldError('name')}
              InputLabelProps={{
                sx: { fontWeight: 500 },
              }}
              inputProps={{
                sx: { fontSize: "1rem", lineHeight: 1.5 },
              }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Enter your email"
              disabled={loading}
              required
              error={hasFieldError('email')}
              helperText={getFieldError('email')}
              InputLabelProps={{
                sx: { fontWeight: 500 },
              }}
              inputProps={{
                sx: { fontSize: "1rem", lineHeight: 1.5 },
              }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="••••••••"
              disabled={loading}
              required
              error={hasFieldError('password')}
              helperText={getFieldError('password')}
              InputLabelProps={{
                sx: { fontWeight: 500 },
              }}
              inputProps={{
                sx: { fontSize: "1rem", lineHeight: 1.5 },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{ py: 1.5, mt: 3, fontWeight: 700, fontSize: "1rem" }}
            >
              {loading ? "Loading..." : "Sign Up"}
            </Button>
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 4,
            color: "#6c757d",
            fontWeight: 500,
            fontSize: "0.9rem",
          }}
        >
          <Typography component="span" sx={{ px: 1 }}>
            Already have an account?
          </Typography>
          <Link
            component={RouterLink}
            to="/login"
            underline="none"
            sx={{
              px: 1,
              fontWeight: 700,
              color: "primary.main",
              cursor: "pointer",
            }}
          >
            Log In
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
