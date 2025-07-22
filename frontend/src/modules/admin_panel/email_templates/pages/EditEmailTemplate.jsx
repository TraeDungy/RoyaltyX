import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getEmailTemplateById, updateEmailTemplate } from "../../api/emailTemplates";
import EmailTemplateForm from "./EmailTemplateForm";

export default function EditEmailTemplate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    getEmailTemplateById(id).then(setInitialData).catch(() => {
      toast.error("Failed to load template");
      navigate("/admin/email-templates");
    });
  }, [id, navigate]);

  const handleUpdate = async (data) => {
    try {
      await updateEmailTemplate(id, data);
      toast.success("Template updated");
      navigate("/admin/email-templates");
    } catch (err) {
      toast.error("Failed to update template");
      throw err;
    }
  };

  if (!initialData) return <div>Loading...</div>;
  return <EmailTemplateForm initialData={initialData} onSubmit={handleUpdate} buttonLabel="Update" />;
}
