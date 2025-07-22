import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs';

describe('Breadcrumbs component', () => {
  test('renders dashboard link and path parts', () => {
    render(
      <MemoryRouter initialEntries={["/reports/sales"]}>
        <Breadcrumbs />
      </MemoryRouter>
    );
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/reports/i)).toBeInTheDocument();
    expect(screen.getByText(/sales/i)).toBeInTheDocument();
  });
});
