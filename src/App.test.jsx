import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import App from './App';
import { LINKS, PROJECTS, RESUMES, SECTION_IDS } from './data/portfolio';
import en from './i18n/en';
import pt from './i18n/pt';

vi.mock('./components/gallery/ModelCanvas', () => ({ default: () => null }));

const switchTo = async (user, label) => {
  const group = screen.getByRole('group', { name: en.nav.language });
  await user.click(within(group).getByRole('button', { name: label }));
};

describe('App', () => {
  it('renders one section for each navigation item', () => {
    const { container } = render(<App />);
    SECTION_IDS.forEach((id) => expect(container.querySelector(`#${id}`)).toBeInTheDocument());
  });

  it('points every navigation link at an existing section', () => {
    const { container } = render(<App />);
    const nav = within(screen.getByRole('navigation', { name: 'Main' }));

    SECTION_IDS.forEach((id) => {
      const link = nav.getByRole('link', { name: en.nav[id] });
      expect(link).toHaveAttribute('href', `#${id}`);
      expect(container.querySelector(link.getAttribute('href'))).toBeInTheDocument();
    });
  });

  it('offers both resumes as downloads', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: en.hero.resumes.backend })).toHaveAttribute('href', RESUMES.en.backend);
    expect(screen.getByRole('link', { name: en.hero.resumes.game })).toHaveAttribute('href', RESUMES.en.game);
  });

  it('renders every link of every project', () => {
    render(<App />);
    PROJECTS.forEach(({ id, links }) => {
      links.forEach(({ labelKey, url }) => {
        const name = `${en.projects.items[id].name}: ${en.projects.links[labelKey]}`;
        expect(screen.getByRole('link', { name })).toHaveAttribute('href', url);
      });
    });
  });

  it('shows only the kept projects', () => {
    render(<App />);
    ['Fiscal Audit Tools', 'Substation Semantic Vision', 'OpenGL Render Lab', 'Subway Runner', 'Cloud Infrastructure & Automation'].forEach(
      (name) => expect(screen.queryByRole('heading', { name })).not.toBeInTheDocument(),
    );
    ['UmbraCore-Engine', 'Capybara Zoo Break', 'GastoJá Desktop', 'Picscreen', 'Gaia Protector'].forEach((name) =>
      expect(screen.getByRole('heading', { name })).toBeInTheDocument(),
    );
  });

  it('links to Picscreen on the Chrome Web Store and states it is published', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: 'Picscreen: Chrome Web Store' })).toHaveAttribute('href', LINKS.picscreenStore);
    expect(screen.getByText('Published on the Chrome Web Store')).toBeInTheDocument();
  });

  it('highlights the scholarship and links to Gaia Protector', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Academic Merit Scholarship' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Play Gaia Protector' })).toHaveAttribute('href', LINKS.gaiaProtector);
  });

  it('offers LinkedIn in both the hero and the footer', () => {
    render(<App />);
    const links = screen.getAllByRole('link', { name: 'LinkedIn' });
    expect(links).toHaveLength(2);
    links.forEach((link) => expect(link).toHaveAttribute('href', LINKS.linkedin));
  });

  it('introduces Lucas in the About section, in both languages', async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.getByRole('heading', { name: en.about.title })).toBeInTheDocument();
    en.about.interests.forEach(({ description }) => expect(screen.getByText(description)).toBeInTheDocument());

    await switchTo(user, 'PT-BR');
    expect(screen.getByRole('heading', { name: 'Sobre Mim' })).toBeInTheDocument();
    expect(screen.getByText(pt.about.summary)).toBeInTheDocument();
  });

  it('offers phone and WhatsApp contact', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: LINKS.phoneDisplay })).toHaveAttribute('href', 'tel:+5515981782217');
    screen
      .getAllByRole('link', { name: 'WhatsApp' })
      .forEach((link) => expect(link).toHaveAttribute('href', 'https://wa.me/5515981782217'));
  });

  it('has no YouTube links anywhere', () => {
    const { container } = render(<App />);
    expect(container.innerHTML).not.toMatch(/youtube|skuller/i);
  });

  it('renders the atmospheric particles without exposing them to assistive tech', () => {
    render(<App />);
    const particles = screen.getByTestId('particles');
    expect(particles).toHaveAttribute('aria-hidden', 'true');
    expect(particles.children.length).toBeGreaterThan(10);
  });

  it('opens and closes the mobile menu', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');

    const mobileMenu = screen.getByRole('list', { name: 'Mobile menu' });
    await user.click(within(mobileMenu).getByRole('link', { name: 'Skills' }));
    expect(screen.queryByRole('list', { name: 'Mobile menu' })).not.toBeInTheDocument();
  });
});

describe('language toggle', () => {
  it('starts in English', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: en.experience.title })).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('en-US');
  });

  it('switches the whole interface to Portuguese instantly', async () => {
    const user = userEvent.setup();
    render(<App />);
    await switchTo(user, 'PT-BR');

    [pt.skills.title, pt.experience.title, pt.projects.title, pt.gallery.title, pt.education.title].forEach((name) =>
      expect(screen.getByRole('heading', { name })).toBeInTheDocument(),
    );
    expect(screen.getByText(pt.experience.jobs[0].highlights[0])).toBeInTheDocument();
    expect(screen.getByText(pt.projects.items.umbracore.description)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Bolsa de Mérito Acadêmico' })).toBeInTheDocument();
    expect(screen.queryByText(en.experience.title)).not.toBeInTheDocument();
    expect(document.documentElement.lang).toBe('pt-BR');
    expect(document.title).toBe(pt.meta.title);
  });

  it('serves the Portuguese resumes in Portuguese', async () => {
    const user = userEvent.setup();
    render(<App />);
    await switchTo(user, 'PT-BR');

    expect(screen.getByRole('link', { name: pt.hero.resumes.backend })).toHaveAttribute('href', RESUMES.pt.backend);
  });

  it('switches back to English', async () => {
    const user = userEvent.setup();
    render(<App />);
    await switchTo(user, 'PT-BR');

    const group = screen.getByRole('group', { name: pt.nav.language });
    await user.click(within(group).getByRole('button', { name: 'EN' }));

    expect(screen.getByRole('heading', { name: en.experience.title })).toBeInTheDocument();
  });

  it('remembers the choice for the next visit', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);
    await switchTo(user, 'PT-BR');
    unmount();

    render(<App />);
    expect(screen.getByRole('heading', { name: pt.experience.title })).toBeInTheDocument();
  });
});
