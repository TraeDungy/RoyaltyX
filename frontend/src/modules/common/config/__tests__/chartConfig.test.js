import { formatChartLabels } from '../chartConfig';

describe('formatChartLabels', () => {
  test('uses period field for monthly data', () => {
    const stats = [
      { period: '2024-01' },
      { period: '2024-02' },
    ];
    const labels = formatChartLabels(stats, 'monthly');
    expect(labels).toEqual(['Jan', 'Feb']);
  });

  test('falls back to year/month fields', () => {
    const stats = [
      { year: '2024', month: '01' },
      { year: '2024', month: '02' },
    ];
    const labels = formatChartLabels(stats, 'monthly');
    expect(labels).toEqual(['Jan', 'Feb']);
  });
});
