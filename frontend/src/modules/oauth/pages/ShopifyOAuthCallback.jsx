import { useEffect } from "react";

export const ShopifyOAuthCallback = () => {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    const shop = searchParams.get("shop");

    if (code && shop && window.opener) {
      window.opener.postMessage(
        { source: "shopify-oauth", code, shop },
        window.location.origin
      );
      window.close();
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Processing Shopify OAuth Code...</h1>
    </div>
  );
};
