import { render, screen } from '@testing-library/react';
import { ClockCard } from '../ClockCard';
import { SettingsProvider } from '../../../common/contexts/SettingsContext';
import React from 'react';

const renderWithProvider = () =>
  render(
    <SettingsProvider>
      <ClockCard />
    </SettingsProvider>
  );

describe('ClockCard', () => {
  test('displays countdown', () => {
    jest.useFakeTimers().setSystemTime(new Date('2025-01-01T00:00:00Z'));
    const target = new Date('2025-01-01T01:00:00Z');
    localStorage.setItem('countdownTargetTime', target.toISOString());
    localStorage.setItem('countdownValue', '1');
    localStorage.setItem('countdownUnit', 'hours');
    renderWithProvider();
    expect(screen.getByText(/CLOCK/i)).toBeInTheDocument();
    expect(screen.getByTestId('countdown')).toHaveTextContent('01:00:00');
    jest.useRealTimers();
  });
});
