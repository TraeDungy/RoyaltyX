import { Routes, Route } from "react-router-dom";
import WhiteLabel from "./pages/WhiteLabel";

function WhiteLabelModule() {
  return (
    <Routes>
      <Route path="/" element={<WhiteLabel />} />
    </Routes>
  );
}

export default WhiteLabelModule;
