import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Onboarding from './Onboarding';

jest.mock('../../sources/api/sources', () => ({
  useSources: () => ({ createSource: jest.fn() })
}));

jest.mock('../../sources/components/AddSourceModal', () => ({
  AddSourceModal: () => <div data-testid="add-source-modal" />
}));

describe('Onboarding page', () => {
  test('renders step labels', () => {
    render(
      <BrowserRouter>
        <Onboarding />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading', { name: /get started/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view plans/i })).toBeInTheDocument();
  });
});
