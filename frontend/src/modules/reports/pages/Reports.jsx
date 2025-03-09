import { useEffect, useState } from "react";
import { getReports } from "../api/reports";
import { apiUrl } from "../../common/api/config";
import { Link } from "react-router-dom";

const Reports = () => {

  const [reports, setReports] = useState([]);

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
      <h4 className="bold mb-3">Reports</h4>

      <p className="mb-4">
        This is a page where you will be able to see reports specific to this
        product
      </p>

      <a href="/reports/create" className="btn btn-primary mb-3">Request a new report</a>

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
              <td>{report.created_by}</td>
              <td>{new Date(report.created_at).toLocaleString()}</td>
              <td>
                <Link
                  to={apiUrl + report.file}
                  className="btn btn-primary"
                  download
                >
                  Download
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Reports;
