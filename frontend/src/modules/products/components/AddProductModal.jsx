import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Plus, X } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Button from "../../common/components/Button";
import { createProduct } from "../api/product";
import { useAuth } from "../../common/contexts/AuthContext";

function AddProductModal() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentlySelectedProjectId } = useAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    setLoading(true);

    const product = {
      title: title,
      description: description,
      project: currentlySelectedProjectId,
    };

    try {
      await createProduct(product);

      setTitle("");
      setDescription("");

      navigate("/");
      toast.success("Successfully added a new product!");
      handleClose();
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="pt-2">
        <button className="btn btn-basic w-100" onClick={handleShow}>
          <Plus className="h4 mb-0" />
        </button>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Body>
          <div className="p-4">
            <div className="d-flex mb-2 justify-content-between">
              <h4 className="bold">Add Product</h4>
              <button
                className="btn btn-hover txt-regular"
                onClick={handleClose}
              >
                <X className="h3 mb-0" />
              </button>
            </div>

            <span className="txt-lighter medium">
              Empower your projects with ease. Streamline creation and
              management effortlessly.
            </span>
            <br />
            <br />

            <label className="pb-2 mt-4">Name</label>
            <input
              type="text"
              className="form-control medium bg-gray-light py-3"
              placeholder="Name"
              value={title}
              autoComplete="new-password"
              onChange={(e) => setTitle(e.target.value)}
            />

            <label className="mt-4 mb-2">Description</label>
            <textarea
              type="text"
              className="form-control bg-gray-light py-2 medium"
              placeholder="Description"
              value={description}
              autoComplete="new-password"
              onChange={(e) => setDescription(e.target.value)}
              style={{ height: 130 }}
            />

            <div className="d-flex justify-content-end pt-4">
              <Button
                variant="primary"
                size="sm"
                onClick={handleSubmit}
                loading={loading}
              >
                Save
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddProductModal;
