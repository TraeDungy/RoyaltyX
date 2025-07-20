import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useAuth } from "../../../common/contexts/AuthContext";
import { apiUrl, googleClientId } from "../../../common/api/config";

const GoogleLoginButton = ({ disabled = false }) => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
    setLoading(true);
    
    try {
      // Google OAuth configuration
      const redirectUri = `${window.location.origin}/google-oauth-callback`;
      const scope = "openid email profile";
      
      if (!googleClientId) {
        toast.error("Google OAuth is not configured");
        setLoading(false);
        return;
      }

      // Build Google OAuth URL
      const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
      googleAuthUrl.searchParams.set("client_id", googleClientId);
      googleAuthUrl.searchParams.set("redirect_uri", redirectUri);
      googleAuthUrl.searchParams.set("response_type", "code");
      googleAuthUrl.searchParams.set("scope", scope);
      googleAuthUrl.searchParams.set("access_type", "offline");
      googleAuthUrl.searchParams.set("prompt", "consent");

      // Open popup window for OAuth
      const popup = window.open(
        googleAuthUrl.toString(),
        "google-oauth",
        "width=500,height=600,scrollbars=yes,resizable=yes"
      );

      // Listen for OAuth callback
      const handleMessage = async (event) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.source === "google-oauth" && event.data.code) {
          window.removeEventListener("message", handleMessage);
          
          try {
            // Exchange code for tokens
            const response = await fetch(`${apiUrl}/oauth/google/exchange/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ code: event.data.code }),
            });

            if (response.ok) {
              const tokenData = await response.json();
              
              // Authenticate with our backend using the Google access token
              const authResponse = await fetch(`${apiUrl}/authentication/google-auth/`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ access_token: tokenData.access_token }),
              });

              if (authResponse.ok) {
                const authData = await authResponse.json();
                
                // Store the JWT token and update auth context
                localStorage.setItem("accessToken", authData.access);
                
                // Check if this is a new user
                const isNewUser = authData.user_created;
                
                // Manually trigger auth context update by calling login with the token data
                const loginResponse = await login({ 
                  access_token: authData.access,
                  google_auth: true,
                  is_new_user: isNewUser
                });

                if (loginResponse.success) {
                  if (isNewUser) {
                    toast.success("Welcome to RoyaltyX! Let's personalize your experience.");
                  } else {
                    toast.success("Successfully logged in with Google!");
                  }
                } else {
                  // If login context fails, try manual navigation
                  if (isNewUser) {
                    window.location.href = "/theme-selection";
                  } else {
                    window.location.href = "/my-projects";
                  }
                }
              } else {
                const errorData = await authResponse.json();
                toast.error(errorData.error || "Failed to authenticate with Google");
              }
            } else {
              toast.error("Failed to exchange Google authorization code");
            }
          } catch (error) {
            console.error("Google OAuth error:", error);
            toast.error("An error occurred during Google authentication");
          }
        }
        
        setLoading(false);
      };

      window.addEventListener("message", handleMessage);

      // Check if popup was closed without completing OAuth
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          window.removeEventListener("message", handleMessage);
          setLoading(false);
        }
      }, 1000);

    } catch (error) {
      console.error("Google OAuth error:", error);
      toast.error("An error occurred during Google authentication");
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outlined"
      fullWidth
      onClick={handleGoogleLogin}
      disabled={disabled || loading}
      sx={{
        py: 1.5,
        color: "#202124",
        borderColor: "#dadada",
        backgroundColor: "#ffffff",
        textTransform: "none",
        fontWeight: 500,
        fontSize: "14px",
        "&:disabled": {
          borderColor: "#dadce0",
          color: "#9aa0a6",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <Typography>{loading ? "Signing in..." : "Continue with Google"}</Typography>
      </Box>
    </Button>
  );
};

export default GoogleLoginButton;
