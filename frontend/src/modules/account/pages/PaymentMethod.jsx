import { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, Grid, TextField, MenuItem, Button, Alert, Snackbar } from "@mui/material";
import { getPaymentMethod, updatePaymentMethod } from "../api/user";

const methods = [
  { value: "paypal", label: "PayPal" },
  { value: "zelle", label: "Zelle" },
  { value: "cashapp", label: "Cash App" },
  { value: "echeck", label: "eCheck" },
  { value: "wire", label: "Wire Transfer" },
];

function PaymentMethodPage() {
  const [form, setForm] = useState({ preferred_payment_method: "paypal" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    getPaymentMethod().then((data) => {
      setForm({
        preferred_payment_method: data.preferred_payment_method || "paypal",
        paypal_email: data.paypal_email || "",
        zelle_email: data.zelle_email || "",
        cash_app_tag: data.cash_app_tag || "",
        echeck_account_number: data.echeck_account_number || "",
        echeck_routing_number: data.echeck_routing_number || "",
        wire_bank_name: data.wire_bank_name || "",
        wire_account_number: data.wire_account_number || "",
        wire_routing_number: data.wire_routing_number || "",
      });
    });
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const res = await updatePaymentMethod(form);
    setSnackbar({ open: true, message: res.message || "Updated", severity: "success" });
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Payment Method
      </Typography>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField select fullWidth label="Preferred Method" value={form.preferred_payment_method} onChange={(e) => handleChange("preferred_payment_method", e.target.value)}>
                {methods.map((method) => (
                  <MenuItem key={method.value} value={method.value}>
                    {method.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {form.preferred_payment_method === "paypal" && (
              <Grid item xs={12}>
                <TextField fullWidth label="PayPal Email" value={form.paypal_email} onChange={(e) => handleChange("paypal_email", e.target.value)} />
              </Grid>
            )}
            {form.preferred_payment_method === "zelle" && (
              <Grid item xs={12}>
                <TextField fullWidth label="Zelle Email" value={form.zelle_email} onChange={(e) => handleChange("zelle_email", e.target.value)} />
              </Grid>
            )}
            {form.preferred_payment_method === "cashapp" && (
              <Grid item xs={12}>
                <TextField fullWidth label="Cash App Tag" value={form.cash_app_tag} onChange={(e) => handleChange("cash_app_tag", e.target.value)} />
              </Grid>
            )}
            {form.preferred_payment_method === "echeck" && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Account Number" value={form.echeck_account_number} onChange={(e) => handleChange("echeck_account_number", e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Routing Number" value={form.echeck_routing_number} onChange={(e) => handleChange("echeck_routing_number", e.target.value)} />
                </Grid>
              </>
            )}
            {form.preferred_payment_method === "wire" && (
              <>
                <Grid item xs={12}>
                  <TextField fullWidth label="Bank Name" value={form.wire_bank_name} onChange={(e) => handleChange("wire_bank_name", e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Account Number" value={form.wire_account_number} onChange={(e) => handleChange("wire_account_number", e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Routing Number" value={form.wire_routing_number} onChange={(e) => handleChange("wire_routing_number", e.target.value)} />
                </Grid>
              </>
            )}
          </Grid>
          <Box sx={{ mt: 3, textAlign: "right" }}>
            <Button variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}

export default PaymentMethodPage;
