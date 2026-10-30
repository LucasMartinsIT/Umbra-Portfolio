import { useLanguage } from '../i18n/useLanguage';
import Section from './Section';

function About() {
  const { t } = useLanguage();
  const { kicker, title, role, summary, portraitAlt, interests } = t.about;

  return (
    <Section id="about" kicker={kicker} title={title} tone="trench">
      <div className="grid items-start gap-10 md:grid-cols-[16rem_1fr] lg:gap-14">
        <div className="clip-portrait mx-auto w-52 bg-aqua p-1 md:mx-0 md:w-full">
          <img
            src="/lucas-suit.png"
            alt={portraitAlt}
            loading="lazy"
            className="clip-portrait aspect-[3/4] w-full object-cover object-top"
          />
        </div>

        <div>
          <p className="font-label text-2xl font-medium tracking-wide text-aqua uppercase">{role}</p>
          <p className="mt-3 max-w-3xl leading-relaxed text-mist md:text-lg">{summary}</p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {interests.map((interest) => (
              <li key={interest.title} className="glow-frame">
                <div className="clip-panel h-full border border-edge bg-ocean p-5">
                  <h3 className="font-label text-xl font-bold tracking-wide text-aqua uppercase italic">
                    <span aria-hidden="true">{interest.icon} </span>
                    {interest.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{interest.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export default About;
