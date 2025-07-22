import { useEffect } from "react";

export const SpotifyOAuthCallback = () => {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (code && window.opener) {
      window.opener.postMessage(
        { source: "spotify-oauth", code },
        window.location.origin
      );
      window.close();
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Processing Spotify OAuth Code...</h1>
    </div>
  );
};
