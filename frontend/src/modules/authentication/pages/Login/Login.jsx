import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../common/contexts/AuthContext";
import styles from "./Login.css";
import icon from "../../../common/assets/img/brand/icon-3.png";
import TextField from "@mui/material/TextField";
import Button from "../../../common/components/Button";
import { Card, Typography, Divider, Box } from "@mui/material";
import { GoogleLoginButton } from "../../components";
import { useTranslation } from "react-i18next";

export default function Login() {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

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
        <Typography
          component="h1"
          variant="h3"
          sx={{ mb: 5, textAlign: "center", fontWeight: 600 }}
        >
          {t('sign_in_to_your_account')}
        </Typography>
        
        {/* Google Login Button */}
        <Box sx={{ mb: 3 }}>
          <GoogleLoginButton disabled={loading} />
        </Box>

        {/* Divider */}
        <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
          <Divider sx={{ flex: 1 }} />
          <Typography variant="body2" sx={{ px: 2, color: "text.secondary" }}>
            {t('or')}
          </Typography>
          <Divider sx={{ flex: 1 }} />
        </Box>

        {error && <span className="text-danger small">{error}</span>}
        <form onSubmit={handleSubmit}>
          <div className="py-2">
            <TextField
              label={t('email')}
              name="email"
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder={t('enter_email')}
            />
          </div>
          <div className="py-2">
            <TextField
              label={t('password')}
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
              {t('log_in')}
            </Button>
          </div>
        </form>

        {/* Sign up link */}
        <div className="d-flex justify-content-center align-items-center py-4">
          <Typography variant="body1" className="px-1 txt-lighter">
            {t('dont_have_account')}
          </Typography>
          <Link to="/register" className="px-1 fw-500 text-decoration-none">
            <Typography variant="body1" color="primary">
              {t('sign_up')}
            </Typography>
          </Link>
        </div>
      </Card>
    </div>
  );
}
