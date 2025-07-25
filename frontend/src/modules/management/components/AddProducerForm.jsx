import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addProducer } from "../api/producers";
import { useProducts } from "../../products/api/products";
import { getProjectMembers } from "../../projects/api/project";

const AddProducerForm = () => {
  const { products } = useProducts();
  const [members, setMembers] = useState([]);
  const [productId, setProductId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [fee, setFee] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getProjectMembers();
        setMembers(data);
      } catch (error) {
        toast.error("Failed to load project members");
      }
    };
    fetchMembers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productId || !memberId || !fee) {
      toast.error("Please fill in all fields");
      return;
    }

    const payload = {
      product: Number(productId),
      user: Number(memberId),
      producer_fee: Number(fee),
    };
    setLoading(true);
    try {
      const response = await addProducer(payload);
      if (!response.success) {
        toast.error(response.message || "Something went wrong");
      } else {
        toast.success("Successfully assigned producer");
        window.location.reload();
      }
    } catch (err) {
      toast.error(err.message || "Error assigning producer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h5 className="mb-3">Add Producer Manually</h5>
      <div className="row g-2">
        <div className="col-md-4">
          <select
            className="form-control"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            <option value="">Select product</option>
            {products?.map((product) => (
              <option key={product.id} value={product.id}>
                {product.title}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
          >
            <option value="">Select member</option>
            {members?.map((member) => (
              <option
                key={member.id}
                value={member.user_details?.id || member.user_id}
              >
                {member.user_details?.email}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <input
            type="number"
            min={1}
            max={100}
            className="form-control"
            placeholder="Fee %"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddProducerForm;
