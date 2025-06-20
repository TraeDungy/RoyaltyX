export const GoogleOAuthCallback = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get("code");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Google OAuth Callback {code}</h1>
    </div>
  );
};
