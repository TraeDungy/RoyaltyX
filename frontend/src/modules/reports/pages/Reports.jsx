import { useEffect, useState } from "react";
import { getReports } from "../api/reports";
import { apiUrl } from "../../common/api/config";
import { useNavigate } from "react-router-dom";
import Button from "../../common/components/Button";
import { formatDistanceToNow } from "date-fns";
import PageHeader from "../../common/components/PageHeader";

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
    <div className="py-3">
      <PageHeader
        title="Reports"
        description="This is a page where you will be able to see reports specific to this
        product."
      />

      <div className="mb-3">
        <Button variant="primary" onClick={() => navigate("/reports/create")}>
          Request a new report
        </Button>
      </div>

      <table className="table table-bordered table-hover my-2">
        <thead>
          <tr>
            <th>Filename</th>
            <th>Period Start</th>
            <th>Period End</th>
            <th>Requested by</th>
            <th>Created at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.filename}</td>
              <td>{report.period_start}</td>
              <td>{report.period_end}</td>
              <td>{report?.created_by?.username}</td>
              <td>
                {formatDistanceToNow(new Date(report.created_at), {
                  addSuffix: true,
                })}
              </td>
              <td>
                <a
                  href={apiUrl + report.file}
                  className="btn btn-primary"
                  download
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
