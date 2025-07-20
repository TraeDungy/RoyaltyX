import { useEffect, useState } from "react";
import { getReports } from "../api/reports";
import { apiUrl } from "../../common/api/config";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import PageHeader from "../../common/components/PageHeader";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getReports();
        setReports(response);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  return (
    <Box>
      <PageHeader
        title="Reports"
        description="This is a page where you will be able to see reports specific to this
        product."
      />

      <div className="mb-3">
        <Button variant="contained" onClick={() => navigate("/reports/create")}>
          Request a new report
        </Button>
      </div>

      <TableContainer sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="reports table">
          <TableHead>
            <TableRow>
              <TableCell>Filename</TableCell>
              <TableCell>Period Start</TableCell>
              <TableCell>Period End</TableCell>
              <TableCell>Requested by</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow
                key={report.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {report.filename}
                </TableCell>
                <TableCell>{report.period_start}</TableCell>
                <TableCell>{report.period_end}</TableCell>
                <TableCell>{report?.created_by?.username}</TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(report.created_at), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => {
                      window.location.href = apiUrl + report.file;
                    }}
                    download
                  >
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Reports;
