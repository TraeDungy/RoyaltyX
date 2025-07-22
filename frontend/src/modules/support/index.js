import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

const CustomerSupport = lazy(() => import("./pages/CustomerSupport"));

function SupportModule() {
  return (
    <Routes>
      <Route path="/" element={<CustomerSupport />} />
      <Route path="/tickets" element={<CustomerSupport />} />
    </Routes>
  );
}

export default SupportModule;
