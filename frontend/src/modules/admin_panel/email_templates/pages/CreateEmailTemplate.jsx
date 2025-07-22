import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createEmailTemplate } from "../../api/emailTemplates";
import EmailTemplateForm from "./EmailTemplateForm";

export default function CreateEmailTemplate() {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      await createEmailTemplate(data);
      toast.success("Template created");
      navigate("/admin/email-templates");
    } catch (err) {
      toast.error("Failed to create template");
      throw err;
    }
  };

  return <EmailTemplateForm onSubmit={handleCreate} />;
}
