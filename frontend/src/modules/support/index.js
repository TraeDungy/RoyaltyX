import { Routes, Route } from "react-router-dom";
import CustomerSupport from "./pages/CustomerSupport";
import HelpChat from "./pages/HelpChat";

function SupportModule() {
  return (
    <Routes>
      <Route path="/" element={<CustomerSupport />} />
      <Route path="/tickets" element={<CustomerSupport />} />
      <Route path="/help" element={<HelpChat />} />
    </Routes>
  );
}

export default SupportModule;
