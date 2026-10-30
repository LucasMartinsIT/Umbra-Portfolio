import { LINKS } from '../data/portfolio';
import { useInView } from '../hooks/useInView';
import { useLanguage } from '../i18n/useLanguage';
import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon, WhatsAppIcon } from './Icons';
import Section from './Section';

const OPTIONS = [
  { id: 'email', href: `mailto:${LINKS.email}`, value: LINKS.email, Icon: MailIcon },
  { id: 'phone', href: LINKS.phone, value: LINKS.phoneDisplay, Icon: PhoneIcon },
  { id: 'whatsapp', href: LINKS.whatsapp, Icon: WhatsAppIcon, external: true },
  { id: 'linkedin', href: LINKS.linkedin, value: 'in/lucas-martins0', Icon: LinkedInIcon, external: true },
  { id: 'github', href: LINKS.github, value: 'LucasMartinsIT', Icon: GitHubIcon, external: true },
];

function Backdrop({ title }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <div className="contact-band top-1/4 h-24 md:h-36" />
      <div className="contact-band bottom-1/4 h-12 [animation-direction:alternate-reverse] [animation-duration:8s] md:h-20" />
      <div className="absolute bottom-6 flex w-max animate-tide [animation-duration:45s]">
        {[0, 1, 2, 3].map((copy) => (
          <span key={copy} className="pr-12 font-display text-7xl whitespace-nowrap text-tide/40 uppercase italic md:text-9xl">
            {title}
          </span>
        ))}
      </div>
    </div>
  );
}

function Contact() {
  const { t } = useLanguage();
  const { kicker, title, message, optionsLabel, options, whatsappAction } = t.contact;
  const { ref, hasEntered } = useInView();

  return (
    <Section id="contact" kicker={kicker} title={title} tone="trench">
      <Backdrop title={title} />
      <div className="grid items-start gap-10 pb-16 lg:grid-cols-[2fr_3fr]">
        <p className="text-lg leading-relaxed text-foam">{message}</p>

        <ul ref={ref} aria-label={optionsLabel} className="space-y-3">
          {OPTIONS.map((option, index) => (
            <li
              key={option.id}
              style={{ '--option-index': index }}
              className={hasEntered ? 'contact-option-in' : 'opacity-0'}
            >
              <a
                href={option.href}
                {...(option.external && { target: '_blank', rel: 'noreferrer' })}
                className="menu-wipe clip-slant flex flex-wrap items-center gap-x-4 gap-y-1 px-6 py-3 text-foam transition-transform hover:translate-x-3 focus-visible:translate-x-3"
              >
                <option.Icon className="size-6 shrink-0" />
                <span className="font-label text-lg font-bold tracking-widest uppercase italic">{options[option.id]}</span>
                <span className="min-w-0 basis-full font-display text-xl tracking-wide break-all sm:ml-auto sm:basis-auto md:text-2xl">
                  {option.value ?? whatsappAction}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export default Contact;
