import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { getBillingHistory } from "../api/payments";

function BillingHistoryPage() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await getBillingHistory();
        setInvoices(data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInvoices();
  }, []);

  const formatDate = (ts) => {
    return new Date(ts * 1000).toLocaleDateString();
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Billing History
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell>{formatDate(inv.created)}</TableCell>
                <TableCell>{inv.amount_paid / 100}</TableCell>
                <TableCell>{inv.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default BillingHistoryPage;
