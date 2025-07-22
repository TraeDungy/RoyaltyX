import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MembershipPage from './Membership';

jest.mock('../../common/contexts/AuthContext', () => ({
  useAuth: () => ({ subscriptionPlan: 'free', setSubscriptionPlan: jest.fn() })
}));

jest.mock('../api/subscription', () => ({
  changeSubscriptionPlan: jest.fn()
}));

jest.mock('../api/payments', () => ({
  createCheckoutSession: jest.fn(),
  verifySession: jest.fn()
}));

describe('MembershipPage', () => {
  test('renders available plans', () => {
    render(
      <BrowserRouter>
        <MembershipPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/Available Plans/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Discovery/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Professional/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Premium/i).length).toBeGreaterThan(0);
  });
});
