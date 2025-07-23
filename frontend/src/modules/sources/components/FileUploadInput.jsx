import { useState } from "react";
import { toast } from "react-toastify";
import { uploadFile } from "../../management/api/files";
import { getDataset, updateDataset } from "../../management/api/datasets";
import { useDropzone } from "react-dropzone";
import { Spinner } from "react-bootstrap";
import { useProducts } from "../../products/api/products";

const FileUploadInput = ({ setFiles }) => {
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const { refetchProducts } = useProducts();

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];

    setUploading(true);
    try {
      const response = await uploadFile(file);
      if (response.dataset) {
        pollDataset(response.dataset.id);
      }
      if (response.report.status === "success") {
        toast.success(response.report.message);
        setFiles((prevFiles) => [response.file, ...prevFiles]);
        refetchProducts();
      } else {
        toast.error(response.report.message);
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const pollDataset = async (id) => {
    setProcessing(true);
    let status = "processing";
    while (status === "processing") {
      await new Promise((r) => setTimeout(r, 2000));
      try {
        const data = await getDataset(id);
        status = data.status;
        if (status === "processing") {
          setStatusMessage("Processing file...");
        } else if (status === "completed") {
          setStatusMessage("Processing complete");
          if (data.month === 1 && data.year === 1900) {
            const month = window.prompt("Enter month number (1-12)");
            const year = window.prompt("Enter year (e.g. 2024)");
            if (month && year) {
              try {
                await updateDataset(id, { month: parseInt(month), year: parseInt(year) });
              } catch (err) {
                toast.error("Failed to set period");
              }
            }
          }
        } else if (status === "error") {
          setStatusMessage(data.error_message || "Processing failed");
          const mappingInput = window.prompt(
            "Column mapping JSON (e.g. {\"Title Name\": \"Title\"})",
            ""
          );
          if (mappingInput) {
            try {
              const mapping = JSON.parse(mappingInput);
              status = "processing";
              setStatusMessage("Reprocessing...");
              await updateDataset(id, { column_mapping: mapping });
            } catch (err) {
              toast.error("Invalid mapping JSON");
            }
          }
        }
      } catch (e) {
        status = "error";
        setStatusMessage("Processing failed");
      }
    }
    setProcessing(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "text/csv": [".csv"],
    },
  });

  return (
    <div className="mt-4">
      <div
        {...getRootProps()}
        className={`rounded p-5 text-center ${isDragActive ? "border-custom-primary" : "border-custom-regular"} bgc-primary-transparent`}
        style={{ cursor: "pointer" }}
      >
        <input {...getInputProps()} disabled={uploading} />
        {uploading || processing ? (
          <div>
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 txt-primary fw-bold">
              {statusMessage || "Uploading..."}
            </p>
          </div>
        ) : (
          <div>
            <p className="fw-bold txt-lighter">
              {isDragActive
                ? "Drop the file here..."
                : "Drag & Drop a file here or click to upload"}
            </p>
            <p className="small txt-lighter">Supported formats: CSV</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadInput;
