import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../common/contexts/AuthContext";
import styles from "./Login.module.css";
import icon from "../../../common/assets/img/brand/icon.webp";
import TextField from "@mui/material/TextField";
import Button from "../../../common/components/Button";
import { Typography } from "@mui/material";

export default function Login() {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData(e.target);
    const user = Object.fromEntries(data.entries());

    const response = await login(user);
    if (response.success) {
      toast.success("Successfully logged in!");
    } else {
      setError(response.message);
    }

    setLoading(false);
  };

  return (
    <div className={styles.loginPageWrapper}>
      <div style={{ maxWidth: 470 }} className="w-100">
        <img
          src={icon}
          style={{ maxWidth: 60 }}
          className="mb-4"
          alt="Brand Icon"
        />
        <Typography variant="h2" className="mb-4 bold">
          Log In
        </Typography>
        {error && <span className="text-danger small">{error}</span>}
        <form onSubmit={handleSubmit}>
          <div className="py-2">
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder="Enter your email"
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
            />
          </div>

          <div className="py-2 mt-3">
            <Button variant="primary" size="lg" type="submit" loading={loading}>
              Log In
            </Button>
          </div>

          <div className="d-flex justify-content-center align-items-center py-4">
            <Typography variant="body1" className="px-1 txt-lighter">
              Don't have an account?
            </Typography>
            <Link to="/register" className="px-1 fw-500 text-decoration-none">
              <Typography variant="body1" color="primary">
                Sign Up
              </Typography>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
