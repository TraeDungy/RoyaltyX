import { useEffect, useState } from "react";
import { getReports } from "../api/reports";
import { apiUrl } from "../../common/api/config";
import { useNavigate, useLocation } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import PageHeader from "../../common/components/PageHeader";
import CustomDateSelector from "../../common/components/CustomDateSelector";
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
  const location = useLocation();

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

  const params = new URLSearchParams(location.search);
  const periodStart = params.get("period_start");
  const periodEnd = params.get("period_end");

  const filteredReports = reports.filter((report) => {
    if (periodStart && new Date(report.period_start) < new Date(periodStart)) {
      return false;
    }
    if (periodEnd && new Date(report.period_end) > new Date(periodEnd)) {
      return false;
    }
    return true;
  });

  return (
    <Box>
      <PageHeader
        title="Reports"
        description="This is a page where you will be able to see reports specific to this
        product."
        action={<CustomDateSelector />}
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
            {filteredReports.map((report) => (
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
