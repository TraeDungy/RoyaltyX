import { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Container,
} from "@mui/material";
import {
  createBillingPortalSession,
  getInvoiceHistory,
} from "../api/payments";

function BillingPage() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    getInvoiceHistory()
      .then((data) => setInvoices(data.invoices || []))
      .catch(() => {});
  }, []);

  const handleManageBilling = async () => {
    try {
      const data = await createBillingPortalSession();
      window.location.href = data.url;
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Billing
      </Typography>
      <Button variant="contained" onClick={handleManageBilling} sx={{ mb: 3 }}>
        Manage Billing
      </Button>
      <Typography variant="h6">Invoices</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Amount Paid</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell>{inv.id}</TableCell>
              <TableCell>{inv.status}</TableCell>
              <TableCell>{(inv.amount_paid / 100).toFixed(2)}</TableCell>
              <TableCell>
                {new Date(inv.created * 1000).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default BillingPage;
