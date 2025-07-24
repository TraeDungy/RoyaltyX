import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BillingHistoryPage from './BillingHistory';

jest.mock('../api/payments', () => ({
  getBillingHistory: jest.fn().mockResolvedValue([])
}));

describe('BillingHistoryPage', () => {
  test('renders heading', () => {
    render(
      <BrowserRouter>
        <BillingHistoryPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/Billing History/i)).toBeInTheDocument();
  });
});
