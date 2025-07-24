import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Onboarding from './Onboarding';

jest.mock('../../common/contexts/AuthContext', () => ({
  useAuth: () => ({ subscriptionPlan: 'free' })
}));

jest.mock('../../sources/api/sources', () => ({
  useSources: () => ({ sources: [] })
}));

describe('Onboarding', () => {
  test('renders onboarding steps', () => {
    render(
      <BrowserRouter>
        <Onboarding />
      </BrowserRouter>
    );
    expect(screen.getAllByText(/choose a plan/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/connect sources/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/explore analytics/i)[0]).toBeInTheDocument();
  });
});
