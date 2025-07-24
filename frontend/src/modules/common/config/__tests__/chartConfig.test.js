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
});
