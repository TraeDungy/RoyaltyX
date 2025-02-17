import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getUploadedFiles, uploadFile } from "../api/import";

const Import = () => {
  const [uploading, setUploading] = useState(false);
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

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const uploadedFile = await uploadFile(file);
      setFiles((prevFiles) => [uploadedFile, ...prevFiles]);
      toast.success("File uploaded successfully!");
    } catch (error) {
      toast.error("Error: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container px-5 py-3">
      <h4 className="bold mb-3">Data Import</h4>
      <p>
        This is a page where you will be able to import the data for analysis
        and creation of reports for multiple products and also a general
        overview of all the products in a project.
      </p>

      <input
        type="file"
        className="form-control mt-3"
        onChange={handleFileChange}
        disabled={uploading}
      />

      {files.length > 0 && (
        <div className="mt-4">
          <h5>Uploaded Files</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>File Name</th>
                <th>Uploaded At</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={file.id}>
                  <td>{index + 1}</td>
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
