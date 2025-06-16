import { useState, useEffect } from "react";
import Papa from "papaparse";
import { getFiles } from "../../api/files";
import FileUploadInput from "../../components/FileUploadInput";
import PageHeader from "../../../common/components/PageHeader";
import { apiUrl } from "../../../common/api/config";
import { Download, Trash } from "react-bootstrap-icons";
import ViewFileModal from "../../components/ViewFileModal";
import { ReactComponent as GoogleSheetsIcon } from "../../../common/assets/img/vectors/google_sheets_icon.svg";
import { Link } from "react-router-dom";

const ImportData = () => {
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await getFiles();
        setFiles(response);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  const handleOpenCsvViewer = async (file) => {
    try {
      const response = await fetch(apiUrl + file.file);
      const text = await response.text();
      const parsedData = Papa.parse(text, {
        header: true,
        dynamicTyping: true,
      }).data;
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

      <FileUploadInput setFiles={setFiles} />

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
                        onClick={() => handleOpenCsvViewer(file)}
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
                    <div className="px-1">
                      <Link
                        to={`/management/data/${file.id}/delete`}
                        className="btn btn-basic"
                      >
                        <Trash className="text-danger" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <ViewFileModal
          csvData={csvData}
          selectedFile={selectedFile}
          handleCloseModal={handleCloseModal}
          setFiles={setFiles}
        />
      )}
    </div>
  );
};

export default ImportData;
