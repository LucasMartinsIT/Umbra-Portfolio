import { LINKS, RESUMES, SECTION_IDS } from '../data/portfolio';
import { useLanguage } from '../i18n/useLanguage';
import { DownloadIcon, GitHubIcon, LinkedInIcon, WhatsAppIcon } from './Icons';
import Particles from './Particles';

const SOCIALS = [
  { label: 'GitHub', href: LINKS.github, Icon: GitHubIcon },
  { label: 'LinkedIn', href: LINKS.linkedin, Icon: LinkedInIcon },
  { label: 'WhatsApp', href: LINKS.whatsapp, Icon: WhatsAppIcon },
];

const MENU_IDS = SECTION_IDS.filter((id) => id !== 'home');

const WAVE_PATH =
  'M0 40 C 150 0 250 80 400 40 S 650 0 800 40 S 1050 80 1200 40 S 1450 0 1600 40 V 120 H 0 Z';

function Waves() {
  return (
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 overflow-hidden">
      <svg viewBox="0 0 1600 120" preserveAspectRatio="none" className="absolute bottom-0 h-32 w-[200%] animate-tide fill-tide/30">
        <path d={WAVE_PATH} />
      </svg>
      <svg
        viewBox="0 0 1600 120"
        preserveAspectRatio="none"
        className="absolute -bottom-4 h-28 w-[200%] animate-tide fill-ocean/70 [animation-direction:reverse] [animation-duration:26s]"
      >
        <path d={WAVE_PATH} />
      </svg>
    </div>
  );
}

function Hero() {
  const { language, t } = useLanguage();
  const resumes = [
    { label: t.hero.resumes.backend, href: RESUMES[language].backend },
    { label: t.hero.resumes.game, href: RESUMES[language].game },
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden bg-[linear-gradient(170deg,var(--color-abyss)_10%,var(--color-ocean)_60%,var(--color-tide)_125%)] px-6 pt-28 pb-44"
    >
      <div aria-hidden="true" className="moon absolute top-[12%] right-[-6rem] size-72 rounded-full opacity-35 md:right-[6%] md:size-[26rem] md:opacity-100" />
      <Particles />
      <Waves />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[3fr_2fr]">
        <div>
          <p className="font-label text-lg font-bold tracking-[0.2em] text-aqua uppercase italic">
            {t.hero.availability}
          </p>
          <h1 className="title-slant mt-3 font-display text-7xl leading-none text-foam uppercase md:text-9xl">
            Lucas <span className="block text-aqua">Martins</span>
          </h1>
          <p className="mt-6 font-label text-2xl font-medium tracking-wide text-foam uppercase md:text-3xl">
            {t.hero.role}
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-mist">{t.hero.summary}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {resumes.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                download
                className="clip-slant inline-flex items-center gap-2 bg-aqua px-6 py-2.5 font-label text-lg font-bold tracking-wide text-abyss uppercase transition-colors hover:bg-foam"
              >
                <DownloadIcon className="size-4" />
                {label}
              </a>
            ))}
            <div className="ml-1 flex gap-1">
              {SOCIALS.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="p-2.5 text-mist transition-colors hover:text-aqua"
                >
                  <social.Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <nav aria-label={t.nav.sections} className="hidden lg:block">
          <ul className="origin-right -rotate-6 space-y-1 text-right font-display text-5xl uppercase xl:text-6xl">
            {MENU_IDS.map((id, position) => (
              <li key={id} style={{ marginRight: `${position * 0.9}rem` }}>
                <a href={`#${id}`} className="menu-wipe clip-slant inline-block px-6 py-0.5 text-foam">
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default Hero;
