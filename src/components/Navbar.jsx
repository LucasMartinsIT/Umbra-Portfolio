import { useState } from 'react';
import { SECTION_IDS } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';
import { useLanguage } from '../i18n/useLanguage';
import { useDarkHour } from '../theme/useDarkHour';
import { ClockIcon, CloseIcon, MenuIcon } from './Icons';
import MoonHud from './MoonHud';

const LANGUAGES = [
  { id: 'en', label: 'EN' },
  { id: 'pt', label: 'PT-BR' },
];

function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div role="group" aria-label={t.nav.language} className="flex font-label text-sm font-bold tracking-wide">
      {LANGUAGES.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          aria-pressed={language === id}
          onClick={() => setLanguage(id)}
          className="clip-slant px-2.5 py-1 whitespace-nowrap text-mist transition-colors hover:text-aqua aria-pressed:bg-foam aria-pressed:text-abyss"
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function DarkHourButton() {
  const { active, toggle } = useDarkHour();
  const { t } = useLanguage();
  const label = active ? t.darkHour.leave : t.darkHour.enter;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={active}
      aria-label={label}
      title={label}
      className="clip-slant inline-flex items-center gap-1.5 px-2.5 py-1 font-label text-sm font-bold text-aqua transition-colors hover:text-foam aria-pressed:bg-aqua aria-pressed:text-abyss"
    >
      <ClockIcon className="size-4" />
      <span className="hidden sm:inline">00:00</span>
    </button>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const { t } = useLanguage();

  return (
    <nav aria-label={t.nav.main} className="fixed top-0 z-50 w-full border-b border-aqua/25 bg-abyss/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:px-6">
        <a href="#home" className="font-display text-2xl tracking-widest text-foam">
          UMBRA<span className="text-aqua">.</span>
        </a>

        <ul className="hidden gap-4 font-label text-base font-medium tracking-wider uppercase xl:flex">
          {SECTION_IDS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? 'true' : undefined}
                className={`transition-colors hover:text-aqua ${active === id ? 'text-aqua' : 'text-mist'}`}
              >
                {t.nav[id]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <MoonHud />
          <LanguageToggle />
          <DarkHourButton />
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            className="-mr-2 p-2 text-foam xl:hidden"
          >
            {menuOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <ul
          aria-label={t.nav.mobileMenu}
          className="border-t border-aqua/25 px-6 py-2 font-display text-2xl tracking-wide uppercase xl:hidden"
        >
          {SECTION_IDS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className={`block py-2 ${active === id ? 'text-aqua' : 'text-foam'}`}
              >
                {t.nav[id]}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
