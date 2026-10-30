import { useLanguage } from '../i18n/useLanguage';
import Section from './Section';

function Experience() {
  const { t } = useLanguage();

  return (
    <Section id="experience" kicker={t.experience.kicker} title={t.experience.title} tone="trench">
      <ol className="space-y-14 border-l-2 border-tide">
        {t.experience.jobs.map((job) => (
          <li key={job.company} className="relative pl-8 md:pl-12">
            <span className="absolute top-2 -left-[9px] size-4 rotate-45 bg-aqua" />
            <p className="font-label text-lg font-medium tracking-wider text-aqua uppercase">{job.period}</p>
            <h3 className="mt-1 font-display text-3xl tracking-wide uppercase">
              {job.role} <span className="text-aqua">@ {job.company}</span>
            </h3>
            <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-4 leading-relaxed text-mist marker:text-aqua">
              {job.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export default Experience;
