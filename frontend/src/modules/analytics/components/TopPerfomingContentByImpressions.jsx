import { useEffect, useState } from "react";
import { getTopPerformingProductsByImpressions } from "../../products/api/product";
import { toast } from "react-toastify";

export const TopPerfomingContentByImpressions = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTopPerformingProducts = async () => {
      try {
        const fetchedProducts = await getTopPerformingProductsByImpressions();
        setProducts(fetchedProducts);
      } catch (error) {
        toast.error(error.message || "Failed to fetch analytics");
      }
    };

    fetchTopPerformingProducts();
  }, []);

  return (
    <div className="table-responsive mb-5">
      <table className="table table-hover mb-0">
        <tbody>
          <tr>
            <th>Rank</th>
            <th>Title</th>
            <th>Impressions</th>
          </tr>
          {products.map((product, index) => {
            const totalImpressions = product.impressions.reduce(
              (sum, impression) => sum + impression.impressions,
              0
            );
            return (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.title}</td>
                <td>{totalImpressions.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
