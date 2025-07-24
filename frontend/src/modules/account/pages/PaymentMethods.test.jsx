import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PaymentMethodsPage from './PaymentMethods';

jest.mock('../api/payments', () => ({
  getPaymentMethods: jest.fn().mockResolvedValue([]),
  removePaymentMethod: jest.fn(),
  setDefaultPaymentMethod: jest.fn()
}));

describe('PaymentMethodsPage', () => {
  test('renders heading', () => {
    render(
      <BrowserRouter>
        <PaymentMethodsPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/Payment Methods/i)).toBeInTheDocument();
  });
});
