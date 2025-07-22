import { useState } from "react";
import Button from "../../common/components/Button";
import { createDashboardTemplate } from "../api/dashboard-templates";

const initialLayout = [
  "impressions",
  "sales",
  "revenue",
  "linked_accounts",
  "products",
];

function DashboardTemplateBuilder() {
  const [layout, setLayout] = useState(initialLayout);
  const [name, setName] = useState("");

  const handleDragStart = (index) => (e) => {
    e.dataTransfer.setData("dragIndex", index);
  };

  const handleDrop = (index) => (e) => {
    e.preventDefault();
    const dragIndex = e.dataTransfer.getData("dragIndex");
    if (dragIndex === "" || dragIndex === index.toString()) return;
    const newLayout = [...layout];
    const [moved] = newLayout.splice(dragIndex, 1);
    newLayout.splice(index, 0, moved);
    setLayout(newLayout);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSave = async () => {
    await createDashboardTemplate({ name, layout_json: layout });
    setName("");
  };

  return (
    <div className="p-4">
      <h3>Create Dashboard Template</h3>
      <input
        className="form-control mb-3"
        placeholder="Template name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>
        {layout.map((widget, index) => (
          <div
            key={widget}
            draggable
            onDragStart={handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={handleDrop(index)}
            className="border p-2 mb-2 bg-light"
          >
            {widget}
          </div>
        ))}
      </div>
      <Button variant="primary" className="mt-3" onClick={handleSave}>
        Save Template
      </Button>
    </div>
  );
}

export default DashboardTemplateBuilder;
