import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Alert,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Receipt,
  Download,
  MoreHorizontal,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Clock,
  CreditCard,
  Building,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function PaymentHistoryPage() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoiceDialog, setInvoiceDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock payment history data
  const paymentHistory = [
    {
      id: "INV-2024-001",
      date: "2024-01-15",
      amount: "$29.99",
      plan: "Pro Plan",
      status: "paid",
      paymentMethod: "Visa ****1234",
      description: "Monthly subscription - Pro Plan",
      downloadUrl: "#",
    },
    {
      id: "INV-2023-012",
      date: "2023-12-15",
      amount: "$29.99",
      plan: "Pro Plan",
      status: "paid",
      paymentMethod: "Visa ****1234",
      description: "Monthly subscription - Pro Plan",
      downloadUrl: "#",
    },
    {
      id: "INV-2023-011",
      date: "2023-11-15",
      amount: "$29.99",
      plan: "Pro Plan",
      status: "paid",
      paymentMethod: "Visa ****1234",
      description: "Monthly subscription - Pro Plan",
      downloadUrl: "#",
    },
    {
      id: "INV-2023-010",
      date: "2023-10-15",
      amount: "$29.99",
      plan: "Pro Plan",
      status: "failed",
      paymentMethod: "Visa ****1234",
      description: "Monthly subscription - Pro Plan",
      downloadUrl: null,
    },
    {
      id: "INV-2023-009",
      date: "2023-09-15",
      amount: "$29.99",
      plan: "Pro Plan",
      status: "paid",
      paymentMethod: "PayPal",
      description: "Monthly subscription - Pro Plan",
      downloadUrl: "#",
    },
    {
      id: "INV-2023-008",
      date: "2023-08-15",
      amount: "$0.00",
      plan: "Free Plan",
      status: "paid",
      paymentMethod: "N/A",
      description: "Free plan - No charge",
      downloadUrl: "#",
    },
  ];

  // Mock billing summary
  const billingSummary = {
    totalPaid: "$179.94",
    totalInvoices: 6,
    failedPayments: 1,
    nextPayment: {
      date: "2024-02-15",
      amount: "$29.99",
    },
  };

  const handleMenuClick = (event, invoice) => {
    setAnchorEl(event.currentTarget);
    setSelectedInvoice(invoice);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedInvoice(null);
  };

  const handleViewInvoice = () => {
    setInvoiceDialog(true);
    handleMenuClose();
  };

  const handleDownloadInvoice = () => {
    console.log("Downloading invoice:", selectedInvoice.id);
    handleMenuClose();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return <CheckCircle size={16} color="green" />;
      case "failed":
        return <AlertCircle size={16} color="red" />;
      case "pending":
        return <Clock size={16} color="orange" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "success";
      case "failed":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const getPaymentMethodIcon = (method) => {
    if (method.includes("Visa") || method.includes("****")) {
      return <CreditCard size={16} />;
    }
    if (method.includes("PayPal")) {
      return <Building size={16} />;
    }
    return null;
  };

  const filteredHistory = paymentHistory.filter((payment) => {
    const matchesSearch = payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || payment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Button
          onClick={() => navigate("/account")}
          sx={{ mr: 2, minWidth: "auto", p: 1 }}
        >
          ← Back
        </Button>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Payment History
        </Typography>
      </Box>

      {/* Billing Summary */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center", p: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, color: "primary.main" }}>
                {billingSummary.totalPaid}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Paid
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center", p: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, color: "success.main" }}>
                {billingSummary.totalInvoices}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Invoices
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center", p: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, color: "error.main" }}>
                {billingSummary.failedPayments}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Failed Payments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center", p: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, color: "warning.main" }}>
                {billingSummary.nextPayment.amount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Next Payment
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(billingSummary.nextPayment.date).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filter */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                label="Filter by Status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Filter size={16} />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="failed">Failed</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Download />}
                onClick={() => console.log("Export all invoices")}
              >
                Export
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Payment History Table */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Invoice ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredHistory.map((payment) => (
                  <TableRow key={payment.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {payment.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(payment.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {payment.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {payment.amount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {getPaymentMethodIcon(payment.paymentMethod)}
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {payment.paymentMethod}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(payment.status)}
                        label={payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        color={getStatusColor(payment.status)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={(e) => handleMenuClick(e, payment)}
                        size="small"
                      >
                        <MoreHorizontal size={16} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          {filteredHistory.length === 0 && (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Receipt sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No invoices found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {searchTerm || filterStatus !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "Your payment history will appear here"}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleViewInvoice}>
          <Receipt sx={{ mr: 1 }} fontSize="small" />
          View Invoice
        </MenuItem>
        {selectedInvoice?.downloadUrl && (
          <MenuItem onClick={handleDownloadInvoice}>
            <Download sx={{ mr: 1 }} fontSize="small" />
            Download PDF
          </MenuItem>
        )}
      </Menu>

      {/* Invoice Detail Dialog */}
      <Dialog
        open={invoiceDialog}
        onClose={() => setInvoiceDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Invoice Details - {selectedInvoice?.id}
        </DialogTitle>
        <DialogContent>
          {selectedInvoice && (
            <Box>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Invoice Date
                  </Typography>
                  <Typography variant="body1">
                    {new Date(selectedInvoice.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Status
                  </Typography>
                  <Chip
                    icon={getStatusIcon(selectedInvoice.status)}
                    label={selectedInvoice.status.charAt(0).toUpperCase() + selectedInvoice.status.slice(1)}
                    color={getStatusColor(selectedInvoice.status)}
                    size="small"
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" sx={{ mb: 2 }}>
                Billing Details
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Description
                </Typography>
                <Typography variant="body1">
                  {selectedInvoice.description}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Payment Method
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {getPaymentMethodIcon(selectedInvoice.paymentMethod)}
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {selectedInvoice.paymentMethod}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6">
                  Total Amount
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600, color: "primary.main" }}>
                  {selectedInvoice.amount}
                </Typography>
              </Box>

              {selectedInvoice.status === "failed" && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    This payment failed. Please update your payment method or contact support.
                  </Typography>
                </Alert>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInvoiceDialog(false)}>
            Close
          </Button>
          {selectedInvoice?.downloadUrl && (
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={() => {
                console.log("Downloading invoice:", selectedInvoice.id);
                setInvoiceDialog(false);
              }}
            >
              Download PDF
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PaymentHistoryPage;
