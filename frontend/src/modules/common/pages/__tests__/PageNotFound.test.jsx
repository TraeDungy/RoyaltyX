import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';
import PageNotFound from '../PageNotFound';

describe('PageNotFound localization', () => {
  test('renders Spanish text when language is set to es', () => {
    i18n.changeLanguage('es');
    render(
      <I18nextProvider i18n={i18n}>
        <PageNotFound />
      </I18nextProvider>
    );
    expect(screen.getByRole('button', { name: /volver al inicio/i })).toBeInTheDocument();
  });
});
