import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import pt from '../i18n/pt';
import { LanguageContext } from '../i18n/useLanguage';
import MoonHud from './MoonHud';

describe('MoonHud', () => {
  it('shows the date and the moon phase of that date', () => {
    render(<MoonHud date={new Date(2000, 0, 21, 12)} />);

    expect(screen.getByText('1/21 FRI')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Moon phase: Full Moon' })).toBeInTheDocument();
  });

  it('follows the selected language', () => {
    render(
      <LanguageContext.Provider value={{ language: 'pt', setLanguage: () => {}, t: pt }}>
        <MoonHud date={new Date(2000, 0, 21, 12)} />
      </LanguageContext.Provider>,
    );

    expect(screen.getByText('21/1 SEX')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Fase da lua: Lua Cheia' })).toBeInTheDocument();
  });
});
