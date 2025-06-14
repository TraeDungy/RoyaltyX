import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import { useTheme } from "../../common/contexts/ThemeContext";

export const GraphColorPalette = ({
  showGraphColorPalette,
  setShowGraphColorPalette,
  onSelectColor,
}) => {
  const colors = [
    "#6CC3E0",
    "#009efd",
    "#0055CC",
    "#5E4DB2",
    "#9F8FEF",
    "#4BCE97",
    "#94C748",
    "#216E4E",
    "#E2B203",
    "#FEA362",
    "#Ff0000",
    "#Ff0168",
    "#F87168",
    "#AE2E24",
    "#E774BB",
  ];
  const { darkMode } = useTheme();

  return (
    <Modal
      show={showGraphColorPalette}
      onHide={() => setShowGraphColorPalette(false)}
      centered
      size="md"
      data-bs-theme={darkMode ? "dark" : undefined}
    >
      <Modal.Header className="mx-2" closeButton>
        <Modal.Title className="h3 bold">Pick color</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-3 pb-4">
        <div className="row">
          {colors.map((color) => (
            <div
              className="d-flex justify-content-center pb-3"
              style={{ width: "20%" }}
            >
              <div
                key={color}
                style={{
                  backgroundColor: color,
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  border: "1px solid var(--color-darker-gray)",
                  cursor: "pointer",
                }}
                onClick={() => {
                  onSelectColor(color);
                }}
              ></div>
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};
