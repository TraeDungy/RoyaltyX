import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BillingPage from "./Billing";

jest.mock("../api/payments", () => ({
  createBillingPortalSession: jest.fn(),
}));

describe("BillingPage", () => {
  test("renders billing heading", () => {
    render(
      <BrowserRouter>
        <BillingPage />
      </BrowserRouter>,
    );
    expect(screen.getByText(/Billing/i)).toBeInTheDocument();
  });
});
