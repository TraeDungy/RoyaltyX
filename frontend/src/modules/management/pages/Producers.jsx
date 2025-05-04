import { useState } from "react";
import { toast } from "react-toastify";
import PageHeader from "../../common/components/PageHeader";
import { useProducts } from "../../common/contexts/ProductsContext";
import { removeProducer, updateProducer } from "../api/producers";
import ProducerUploadInput from "../components/ProducerUploadInput";
import { PersonXFill, Wrench } from "react-bootstrap-icons";
import ModifyFeeModal from "../components/ModifyFeeModal";

const Producers = () => {
  const { products } = useProducts();
  const [showModifyFeeModal, setShowModifyFeeModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState();
  const [selectedProductId, setSelectedProductId] = useState();

  const handleOpenModifyFeeModal = (product_id, user_id) => {
    setSelectedUserId(user_id);
    setSelectedProductId(product_id);
    setShowModifyFeeModal(true);
  };

  const handleUnassignProducer = async (product_id, user_id) => {
    await removeProducer(product_id, user_id);
    toast.success("Successfully unassigned producer from the product.");
    window.location.reload();
  };

  const handleSaveFee = async (fee) => {
    const data = {
      product: selectedProductId,
      user: selectedUserId,
      producer_fee: fee,
    };

    const response = await updateProducer(
      data,
      selectedProductId,
      selectedUserId,
    );
    if (!response.success) {
      toast.error(response.message || "Something went wrong");
      return;
    }

    toast.success("Successfully updated producer fee.");
    window.location.reload();
  };

  return (
    <div className="py-3">
      <PageHeader
        title="Import Producers"
        description="Manage the product-producer relationship by importing a file listing all the producers and products they are working on."
      />

      <ProducerUploadInput />

      {products?.length > 0 && (
        <div className="mt-5">
          <h5 className="mb-3">Producer assignments</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Producer</th>
                <th>Product</th>
                <th>Producer Fee</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter((product) => product.users?.length > 0)
                .map((product) => (
                  <tr key={product.id}>
                    <td>{product?.users?.[0]?.user_details?.email}</td>
                    <td>{product.title}</td>
                    <td>{product?.users?.[0]?.producer_fee}%</td>
                    <td className="d-flex align-items-center">
                      <div className="px-1">
                        <button
                          onClick={() =>
                            handleOpenModifyFeeModal(
                              product.id,
                              product?.users?.[0].user_details.id,
                            )
                          }
                          className="btn btn-basic"
                        >
                          <Wrench className="me-2" /> Modify fee
                        </button>
                      </div>
                      <div className="px-1">
                        <button
                          onClick={() =>
                            handleUnassignProducer(
                              product.id,
                              product?.users?.[0].user_details.id,
                            )
                          }
                          className="btn btn-basic"
                        >
                          <PersonXFill className="text-danger me-2" /> Unassign
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <ModifyFeeModal
        showModifyFeeModal={showModifyFeeModal}
        handleClose={() => setShowModifyFeeModal(false)}
        handleSaveFee={handleSaveFee}
      />
    </div>
  );
};

export default Producers;
