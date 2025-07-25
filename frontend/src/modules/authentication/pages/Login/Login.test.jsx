import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

jest.mock('../../../common/contexts/AuthContext', () => ({
  useAuth: () => ({ login: jest.fn() })
}));


jest.mock('../../components', () => ({
  GoogleLoginButton: () => <div data-testid="google-login-button" />
}));

describe('Login Page', () => {
  test('renders login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('google-login-button')).toBeInTheDocument();
  });
});
