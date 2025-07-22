import { useState } from "react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { Spinner } from "react-bootstrap";
import { uploadProductImage } from "../api/images";

const ProductImageUploadInput = ({ onUploaded }) => {
  const [uploading, setUploading] = useState(false);

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    setUploading(true);
    try {
      await uploadProductImage(file);
      toast.success("Image uploaded");
      onUploaded && onUploaded();
    } catch (e) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
  });

  return (
    <div className="mt-4">
      <div
        {...getRootProps()}
        className={`rounded p-5 text-center ${
          isDragActive ? "border-custom-primary" : "border-custom-regular"
        } bgc-primary-transparent`}
        style={{ cursor: "pointer" }}
      >
        <input {...getInputProps()} disabled={uploading} />
        {uploading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <p className="fw-bold txt-lighter">
            {isDragActive ? "Drop the image here..." : "Drag & Drop or click"}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductImageUploadInput;

