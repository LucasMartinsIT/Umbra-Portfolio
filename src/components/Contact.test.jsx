import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LINKS } from '../data/portfolio';
import en from '../i18n/en';
import LanguageProvider from '../i18n/LanguageProvider';
import Contact from './Contact';

const renderContact = () => {
  render(
    <LanguageProvider>
      <Contact />
    </LanguageProvider>,
  );
  return within(screen.getByRole('list', { name: en.contact.optionsLabel }));
};

describe('Contact', () => {
  it('shows the email and phone in plain text with working links', () => {
    const list = renderContact();

    expect(list.getByText(LINKS.email).closest('a')).toHaveAttribute('href', `mailto:${LINKS.email}`);
    expect(list.getByText(LINKS.phoneDisplay).closest('a')).toHaveAttribute('href', LINKS.phone);
  });

  it('opens external profiles in a new tab', () => {
    const list = renderContact();

    [LINKS.whatsapp, LINKS.linkedin, LINKS.github].forEach((href) => {
      const link = list.getAllByRole('link').find((item) => item.getAttribute('href') === href);
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  it('keeps the moving title away from screen readers', () => {
    renderContact();

    expect(screen.getAllByRole('heading', { name: en.contact.title })).toHaveLength(1);
  });
});
