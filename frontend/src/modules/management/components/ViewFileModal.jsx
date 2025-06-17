import { useState, useEffect } from "react";
import Papa from "papaparse";
import { toast } from "react-toastify";
import { uploadFile, deleteFile } from "../api/files";
import CsvViewer from "../../common/components/CsvViewer/CsvViewer";
import { Modal } from "react-bootstrap";
import { ReactComponent as GoogleSheetsIcon } from "../../common/assets/img/vectors/google_sheets_icon.svg";

const ViewFileModal = ({ csvData, selectedFile, handleCloseModal, setFiles }) => {
  const [editableData, setEditableData] = useState([]);

  useEffect(() => {
    if (csvData) {
      setEditableData(JSON.parse(JSON.stringify(csvData)));
    }
  }, [csvData]);

  const handleCellChange = (rowIndex, key, newValue) => {
    const updated = [...editableData];
    updated[rowIndex] = { ...updated[rowIndex], [key]: newValue };
    setEditableData(updated);
  };

  const handleSave = async () => {
    try {
      const csvString = Papa.unparse(editableData);
      
      // Convert CSV string into a Blob and File
      const blob = new Blob([csvString], { type: "text/csv" });
      const updatedFile = new File([blob], selectedFile.name, { type: "text/csv" });
      
      await deleteFile(selectedFile.id);
      const { file: newFile } = await uploadFile(updatedFile);

      setFiles((prevFiles) => [
        ...prevFiles.filter((f) => f.id !== selectedFile.id),
        newFile,]);
        
      toast.success("Successfully updated file!");
      handleCloseModal();
    } catch (err) {
      console.error(err);
      toast.error("Error: " + err.message);
    }
  };

  return (
    <Modal onHide={handleCloseModal} size="xl" centered show>
      <Modal.Header closeButton>
        <Modal.Title className="h6 d-flex align-items-center">
          <GoogleSheetsIcon className="me-2" /> {selectedFile?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0" style={{ overflow: "auto" }}>
        <CsvViewer data={editableData} onCellChange={handleCellChange}/>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-outline-secondary" onClick={handleCloseModal}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          Save changes
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewFileModal;
