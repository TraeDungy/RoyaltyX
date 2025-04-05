import { useState, useEffect } from "react";
import Papa from "papaparse";
import { getUploadedFiles } from "../api/import";
import FileUploadInput from "../components/FileUploadInput";
import PageHeader from "../../common/components/PageHeader";
import { apiUrl } from "../../common/api/config";
import { Download } from "react-bootstrap-icons";
import ViewFileModal from "../components/ViewFileModal";
import { ReactComponent as GoogleSheetsIcon } from '../../common/assets/img/vectors/google_sheets_icon.svg'

const Import = () => {
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await getUploadedFiles();
        setFiles(response);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  const handleFileDownload = async (file) => {
    try {
      const response = await fetch(apiUrl + file.file);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      // Trigger file download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Clean up blob URL
      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
      }, 1000);

      // Open the CSV content in a modal after downloading
      handleOpenCsvViewer(file);
    } catch (error) {
      console.error("Error downloading the file:", error);
      alert("There was an error downloading the file. Please try again.");
    }
  };

  const handleOpenCsvViewer = async (file) => {
    try {
      const response = await fetch(apiUrl + file.file);
      const text = await response.text();
      const parsedData = Papa.parse(text, { header: true, dynamicTyping: true }).data;
      setCsvData(parsedData);
      setSelectedFile(file);
      setShowModal(true);
    } catch (error) {
      console.error("Error reading the CSV file:", error);
      alert("There was an error parsing the file.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCsvData([]);
  };

  return (
    <div className="py-3">
      <PageHeader
        title="Data Import"
        description="Manage your data sources and reports from different platforms all in one place."
      />

      <FileUploadInput />

      {files.length > 0 && (
        <div className="mt-5">
          <h5 className="pb-3">Uploaded Files</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Uploaded At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id}>
                  <td>{file.name}</td>
                  <td>{new Date(file.created_at).toLocaleString()}</td>
                  <td className="d-flex align-items-center">
                    <div className="px-1">
                      <button
                        onClick={() => handleFileDownload(file)}
                        className="btn btn-basic"
                      >
                        <GoogleSheetsIcon />
                      </button>
                    </div>
                    <div className="px-1">
                      <a href={apiUrl + file.file} className="btn btn-basic">
                        <Download />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal &&
        <ViewFileModal
          csvData={csvData}
          selectedFile={selectedFile}
          handleCloseModal={handleCloseModal}
        />
      }
    </div>
  );
};

export default Import;
