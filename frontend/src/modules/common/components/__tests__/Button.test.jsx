import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button component', () => {
  test('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('MuiButton-root');
  });

  test('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Action</Button>);
    fireEvent.click(screen.getByRole('button', { name: /action/i }));
    expect(onClick).toHaveBeenCalled();
  });

  test('shows loading spinner when loading', () => {
    render(<Button loading>Load</Button>);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
