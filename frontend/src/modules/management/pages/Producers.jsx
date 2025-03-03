import { useProducts } from "../../common/contexts/ProductsContext";
import ProducerUploadInput from "../components/ProducerUploadInput";

const Producers = () => {

    const { products } = useProducts();

    return (
        <div className="py-3">
            <h4 className="bold mb-3">Import Producers</h4>
            <p className="mb-4">
                Manage the product-producer relationship by importing a file listing all the producers and products they are working on.
            </p>

            <ProducerUploadInput />

            {products?.length > 0 && (
                <div className="mt-5">
                    <h4 className="bold mb-3">Producer assignments</h4>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Producer</th>
                                <th>Product</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products
                                .filter((product) => product.users?.length > 0)
                                .map((product) => (
                                    <tr key={product.id}>
                                        <td>{product?.users?.[0]?.user_details?.email}</td>
                                        <td>{product.title}</td>
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
