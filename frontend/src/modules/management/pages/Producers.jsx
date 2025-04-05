import PageHeader from "../../common/components/PageHeader";
import { useProducts } from "../../common/contexts/ProductsContext";
import ProducerUploadInput from "../components/ProducerUploadInput";

const Producers = () => {

    const { products } = useProducts();

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
