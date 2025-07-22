import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmailTemplate, updateEmailTemplate } from "../api/templates";
import { toast } from "react-toastify";
import EmailTemplateForm from "./EmailTemplateForm";

export default function EditEmailTemplate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await getEmailTemplate(id);
      setTemplate(data);
    };
    load();
  }, [id]);

  const handleUpdate = async (data) => {
    const res = await updateEmailTemplate(id, data);
    if (res.id) {
      toast.success("Updated");
      navigate("/email-templates");
    } else {
      toast.error("Failed to update");
    }
  };

  if (!template) return null;
  return <EmailTemplateForm initialData={template} onSubmit={handleUpdate} buttonLabel="Update" />;
}
