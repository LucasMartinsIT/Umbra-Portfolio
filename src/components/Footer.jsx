import { LINKS } from '../data/portfolio';
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from './Icons';

const SOCIALS = [
  { label: 'GitHub', href: LINKS.github, Icon: GitHubIcon },
  { label: 'LinkedIn', href: LINKS.linkedin, Icon: LinkedInIcon },
  { label: 'WhatsApp', href: LINKS.whatsapp, Icon: WhatsAppIcon },
];

function Footer() {
  return (
    <footer className="border-t border-aqua/25 bg-abyss px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-sm text-mist">
        <p>© {new Date().getFullYear()} Lucas Martins</p>
        <div className="flex flex-wrap items-center gap-4">
          <a href={`mailto:${LINKS.email}`} className="transition-colors hover:text-aqua">
            {LINKS.email}
          </a>
          <a href={LINKS.phone} className="transition-colors hover:text-aqua">
            {LINKS.phoneDisplay}
          </a>
          {SOCIALS.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              title={social.label}
              className="transition-colors hover:text-aqua"
            >
              <social.Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
