import { toast } from "react-toastify";
import PageHeader from "../../common/components/PageHeader";
import { useProducts } from "../../common/contexts/ProductsContext";
import { removeProducer } from "../api/producers";
import ProducerUploadInput from "../components/ProducerUploadInput";
import { PersonXFill, Wrench } from 'react-bootstrap-icons'

const Producers = () => {

    const { products } = useProducts();

    const handleUnassignProducer = async (product_id, user_id) => {
        await removeProducer(product_id, user_id);
        toast.success("Successfully unassigned producer from the product.");
        window.location.reload();
    }

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
                                                    className="btn btn-basic"
                                                >
                                                    <Wrench className="me-2" />  Modify fee
                                                </button>
                                            </div>
                                            <div className="px-1">
                                                <button
                                                    onClick={() => handleUnassignProducer(product.id, product?.users?.[0].user_details.id)}
                                                    className="btn btn-basic"
                                                >
                                                    <PersonXFill className="text-danger me-2" />  Unassign
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
};

export default Producers;
