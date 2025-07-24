import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";

jest.mock("../../../common/contexts/AuthContext", () => ({
  useAuth: () => ({ login: jest.fn() }),
}));

jest.mock(
  "../../../admin_panel/page_customization/api/pageCustomization",
  () => ({
    usePageCustomization: () => ({
      data: { data: { title: "Sign in to your account" } },
    }),
  }),
);

jest.mock("../../components", () => ({
  GoogleLoginButton: () => <div data-testid="google-login-button" />,
}));

describe("Login Page", () => {
  test("renders login form", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    expect(
      screen.getByRole("heading", { name: /sign in to your account/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
    expect(screen.getByTestId("google-login-button")).toBeInTheDocument();
  });
});
