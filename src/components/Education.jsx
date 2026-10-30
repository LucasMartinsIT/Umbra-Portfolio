import { LINKS } from '../data/portfolio';
import { useLanguage } from '../i18n/useLanguage';
import { ExternalIcon } from './Icons';
import Section from './Section';

function Education() {
  const { t } = useLanguage();
  const { kicker, title, degree, school, period, status, award, languagesTitle, languages } = t.education;

  return (
    <Section id="education" kicker={kicker} title={title}>
      <div className="grid gap-12 md:grid-cols-3">
        <div className="md:col-span-2">
          <p className="font-label text-lg font-medium tracking-wider text-aqua uppercase">
            {period} · {status}
          </p>
          <h3 className="mt-1 font-display text-3xl tracking-wide uppercase">{degree}</h3>
          <p className="mt-1 font-label text-xl font-medium text-foam">{school}</p>

          <div className="glow-frame mt-8">
            <div className="clip-panel border border-edge bg-ocean p-6 md:p-8">
              <p className="font-label text-base font-bold tracking-widest text-aqua uppercase italic">{award.kicker}</p>
              <h3 className="mt-1 font-display text-3xl tracking-wide uppercase md:text-4xl">{award.title}</h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-mist">{award.description}</p>
              <a
                href={LINKS.gaiaProtector}
                target="_blank"
                rel="noreferrer"
                className="clip-slant mt-6 inline-flex items-center gap-2 bg-aqua px-6 py-2.5 font-label text-lg font-bold tracking-wide text-abyss uppercase transition-colors hover:bg-foam"
              >
                {award.link}
                <ExternalIcon className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 border-b-2 border-tide pb-2 font-label text-2xl font-bold tracking-wide text-aqua uppercase italic">
            {languagesTitle}
          </h3>
          <dl className="space-y-2">
            {languages.map((language) => (
              <div key={language.name} className="flex justify-between">
                <dt>{language.name}</dt>
                <dd className="text-mist">{language.level}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}

export default Education;
