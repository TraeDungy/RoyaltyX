import { getMuiTheme } from './theme';

describe('getMuiTheme', () => {
  test('matrix theme sets dark palette mode', () => {
    const theme = getMuiTheme('matrix');
    expect(theme.palette.mode).toBe('dark');
    expect(theme.palette.primary.main).toBe('#00ff41');
  });

  test('desert theme sets light palette mode', () => {
    const theme = getMuiTheme('desert');
    expect(theme.palette.mode).toBe('light');
    expect(theme.palette.primary.main).toBe('#c19a6b');
  });
});
