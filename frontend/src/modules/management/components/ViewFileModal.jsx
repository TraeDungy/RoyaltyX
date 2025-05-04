import CsvViewer from "../../common/components/CsvViewer/CsvViewer";
import { Modal } from "react-bootstrap";
import { ReactComponent as GoogleSheetsIcon } from "../../common/assets/img/vectors/google_sheets_icon.svg";

const ViewFileModal = ({ csvData, selectedFile, handleCloseModal }) => {
  return (
    <Modal onHide={handleCloseModal} size="xl" centered show>
      <Modal.Header closeButton>
        <Modal.Title className="h6 d-flex align-items-center">
          <GoogleSheetsIcon className="me-2" /> {selectedFile?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0" style={{ overflow: "auto" }}>
        <CsvViewer data={csvData} />
      </Modal.Body>
    </Modal>
  );
};

export default ViewFileModal;
