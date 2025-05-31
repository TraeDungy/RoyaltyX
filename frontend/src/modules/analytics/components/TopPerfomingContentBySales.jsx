import { useEffect, useState } from "react";
import { getTopPerformingProductsBySales } from "../../products/api/product";
import { toast } from "react-toastify";

export const TopPerfomingContentBySales = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTopPerformingProducts = async () => {
      try {
        const fetchedProducts = await getTopPerformingProductsBySales();
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
            <th>Revenue</th>
          </tr>
          {products.map((product, index) => {
            const totalSales = product.sales.reduce(
              (sum, sale) => sum + Number(sale.royalty_amount),
              0
            );
            return (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.title}</td>
                <td>${totalSales.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
