import { useNavigate } from "react-router-dom";
import { createEmailTemplate } from "../api/templates";
import { toast } from "react-toastify";
import EmailTemplateForm from "./EmailTemplateForm";

export default function CreateEmailTemplate() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    const res = await createEmailTemplate(data);
    if (res.id) {
      toast.success("Template created");
      navigate("/email-templates");
    } else {
      toast.error("Failed to create template");
    }
  };

  return <EmailTemplateForm onSubmit={handleCreate} buttonLabel="Create" />;
}
