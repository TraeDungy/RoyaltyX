import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getStockPrices } from "../api/stocks";
import { getBaseLineChartOptions, getBaseLineDataset } from "../../common/config/chartConfig";

export const StockPriceChart = ({ symbol }) => {
  const [prices, setPrices] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStockPrices(symbol);
        setPrices(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [symbol]);

  if (!prices) return <p>Loading...</p>;

  const labels = prices.map((p) => p.date);
  const dataValues = prices.map((p) => parseFloat(p.close));
  const data = {
    labels,
    datasets: [getBaseLineDataset(`${symbol} Close`, dataValues, "#2196f3")],
  };

  const options = getBaseLineChartOptions();

  return <Line data={data} options={options} />;
};
