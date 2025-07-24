import { render, screen, fireEvent } from "@testing-library/react";
import TemplateBuilder from "./TemplateBuilder";

beforeEach(() => {
  localStorage.clear();
});

describe("TemplateBuilder", () => {
  test("saves template and activates it", () => {
    render(<TemplateBuilder />);
    const nameField = screen.getByLabelText(/template name/i);
    fireEvent.change(nameField, { target: { value: "My Template" } });
    fireEvent.click(screen.getByTestId("save-btn"));

    const activeId = localStorage.getItem("activeTemplateId");
    const templates = JSON.parse(localStorage.getItem("pdfTemplates"));
    const saved = templates.find((t) => t.id === activeId);

    expect(saved.name).toBe("My Template");
    expect(screen.getByTestId(`active-${activeId}`)).toBeInTheDocument();
  });

  test("activate button switches active template", () => {
    const templates = [
      {
        id: "one",
        name: "One",
        colors: { primary: "#000" },
      },
      {
        id: "two",
        name: "Two",
        colors: { primary: "#111" },
      },
    ];
    localStorage.setItem("pdfTemplates", JSON.stringify(templates));
    localStorage.setItem("activeTemplateId", "two");
    render(<TemplateBuilder />);

    fireEvent.click(screen.getAllByText("Activate")[0]);

    expect(localStorage.getItem("activeTemplateId")).toBe("one");
    expect(screen.getByTestId("active-one")).toBeInTheDocument();
  });
});
