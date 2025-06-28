import { useEffect, useState } from "react";
import { getReportTemplates } from "../../api/report-templates";
import { Pencil, Trash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import PageHeader from "../../../common/components/PageHeader";

const ReportTemplates = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await getReportTemplates();
        setTemplates(response);
      } catch (error) {
        console.error("Error fetching report templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <div className="py-3">
      <PageHeader
        title="Report Templates"
        description="This is a page where you will be able to create, read, update and delete report templates specific to this
        product."
      />

      <div className="mb-3">
        <Link className="btn btn-primary" to={"/report-templates/create"}>
          Create new Template
        </Link>
      </div>

      <table className="table table-bordered table-hover my-2">
        <thead>
          <tr>
            <th>Template name</th>
            <th>Created by</th>
            <th>Created at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id}>
              <td>{template.template_name}</td>
              <td>{template?.created_by?.email}</td>
              <td>
                {formatDistanceToNow(new Date(template.created_at), {
                  addSuffix: true,
                })}
              </td>
              <td className="d-flex align-items-center gap-2 justify-content-start">
                <Link  className="btn btn-basic" to={`/report-templates/${template.id}/edit`}>
                  <Pencil className="text-primary" />
                </Link >
                <Link  className="btn btn-basic" to={`/report-templates/${template.id}/delete`}>
                  <Trash className="text-danger" />
                </Link >
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTemplates;
