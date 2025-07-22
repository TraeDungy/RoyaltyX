import { useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import { StockPriceChart } from "../components/StockPriceChart";

const Stocks = () => {
  const [symbol, setSymbol] = useState("AAPL");
  const [current, setCurrent] = useState("AAPL");

  return (
    <Container sx={{ mt: 3 }}>
      <h2>Stock Tracker</h2>
      <div style={{ marginBottom: "16px" }}>
        <TextField value={symbol} onChange={(e) => setSymbol(e.target.value)} label="Symbol" />
        <Button onClick={() => setCurrent(symbol)} sx={{ ml: 2 }} variant="outlined">
          Load
        </Button>
      </div>
      <StockPriceChart symbol={current} />
    </Container>
  );
};

export default Stocks;
