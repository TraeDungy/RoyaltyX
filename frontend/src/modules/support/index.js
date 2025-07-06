import { Routes, Route } from "react-router-dom";
import CustomerSupport from "./pages/CustomerSupport";

function SupportModule() {
  return (
    <Routes>
      <Route path="/" element={<CustomerSupport />} />
      <Route path="/tickets" element={<CustomerSupport />} />
    </Routes>
  );
}

export default SupportModule;
