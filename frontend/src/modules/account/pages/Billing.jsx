import { useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import { createBillingPortalSession } from "../api/payments";

function BillingPage() {
  const [loading, setLoading] = useState(false);

  const openPortal = async () => {
    setLoading(true);
    try {
      const response = await createBillingPortalSession();
      window.location.href = response.url;
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 600 }}>
        Billing
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Manage your payment methods and view invoices through our secure billing
        portal.
      </Typography>
      <Button variant="contained" onClick={openPortal} disabled={loading}>
        {loading ? "Loading..." : "Open Billing Portal"}
      </Button>
    </Container>
  );
}

export default BillingPage;
