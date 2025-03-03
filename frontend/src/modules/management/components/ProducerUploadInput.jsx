import { useState } from "react";
import { toast } from "react-toastify";
import { uploadProducers } from "../api/producers";
import { useDropzone } from "react-dropzone";
import { Spinner } from "react-bootstrap";

const ProducerUploadInput = () => {
    const [uploading, setUploading] = useState(false);

    const onDrop = async (acceptedFiles) => {
        if (acceptedFiles.length === 0) return;
        const file = acceptedFiles[0];

        setUploading(true);
        try {
            const response = await uploadProducers(file);
            if (response.status === "success") {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("Error: " + error.message);
        } finally {
            setUploading(false);
            window.location.reload();
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            "text/csv": [".csv"],
        }
    });

    return (
        <div className="mt-4">
            <div
                {...getRootProps()}
                className={`rounded p-5 text-center ${isDragActive ? "border-custom-primary" : "border-custom-regular"} bgc-primary-transparent`}
                style={{ cursor: "pointer" }}
            >
                <input {...getInputProps()} disabled={uploading} />
                {uploading ? (
                    <div>
                        <Spinner animation="border" variant="primary" />
                        <p className="mt-2 txt-primary fw-bold">Processing producers...</p>
                    </div>
                ) : (
                    <div>
                        <p className="fw-bold txt-lighter">
                            {isDragActive ? "Drop the file here..." : "Drag & Drop a file here or click to upload"}
                        </p>
                        <p className="small txt-lighter">Supported formats: CSV</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProducerUploadInput;
