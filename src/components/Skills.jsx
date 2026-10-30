import { useLanguage } from '../i18n/useLanguage';
import Section from './Section';

function Skills() {
  const { t } = useLanguage();

  return (
    <Section id="skills" kicker={t.skills.kicker} title={t.skills.title}>
      <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
        {t.skills.groups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-4 border-b-2 border-tide pb-2 font-label text-2xl font-bold tracking-wide text-aqua uppercase italic">
              {group.title}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item.name} className="clip-slant bg-ocean px-5 py-1.5 font-label text-lg font-medium text-foam">
                  {item.name}
                  {item.detail && <span className="block font-sans text-xs text-mist">{item.detail}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default Skills;
