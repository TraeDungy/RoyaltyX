import { useState, useEffect } from "react";
import { getUploadedFiles } from "../api/import";
import FileUploadInput from "../components/FileUploadInput";

const Import = () => {
  const [files, setFiles] = useState([]);

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

  return (
    <div className="py-3">
      <h4 className="bold mb-3">Data Import</h4>
      <p className="mb-4">
        Manage your data sources and reports from different platforms all in one place.
      </p>

      <FileUploadInput />

      {files.length > 0 && (
        <div className="mt-5">
          <h5 className="pb-3">Uploaded Files</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Uploaded At</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id}>
                  <td>{file.name}</td>
                  <td>{new Date(file.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Import;
