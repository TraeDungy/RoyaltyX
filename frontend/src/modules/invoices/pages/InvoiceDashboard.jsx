import { useInvoices } from "../api/invoices";
import { useEffect } from "react";
import { Table } from "react-bootstrap";

function InvoiceDashboard() {
  const { invoices, loading, refetch } = useInvoices();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <p>Loading...</p>;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Number</th>
          <th>Issue Date</th>
          <th>Total</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((inv) => (
          <tr key={inv.id}>
            <td>{inv.invoice_number}</td>
            <td>{inv.issue_date}</td>
            <td>{inv.total}</td>
            <td>{inv.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default InvoiceDashboard;
