import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardTemplates } from "../api/dashboard-templates";
import Button from "../../common/components/Button";
import { useAuth } from "../../common/contexts/AuthContext";

function TemplateSelection() {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();
  const { selectDashboardTemplate } = useAuth();

  useEffect(() => {
    const fetchTemplates = async () => {
      const data = await getDashboardTemplates();
      setTemplates(data);
    };
    fetchTemplates();
  }, []);

  const handleSelect = (template) => {
    selectDashboardTemplate(template);
    navigate("/dashboard");
  };

  return (
    <div className="p-4">
      <h3>Select Dashboard Template</h3>
      <ul className="list-group my-3">
        {templates.map((tpl) => (
          <li key={tpl.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{tpl.name}</span>
            <Button variant="primary" onClick={() => handleSelect(tpl)}>
              Select
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TemplateSelection;
