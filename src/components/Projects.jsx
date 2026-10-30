import { PROJECTS } from '../data/portfolio';
import { useLanguage } from '../i18n/useLanguage';
import { ExternalIcon } from './Icons';
import ProjectMedia from './ProjectMedia';
import Section from './Section';

function ProjectCard({ project }) {
  const { t } = useLanguage();
  const { id, tags, links, media, featured } = project;
  const { name, label, description, mediaAlt } = t.projects.items[id];

  return (
    <div className={`glow-frame ${featured ? 'md:col-span-2' : ''}`}>
      <article className="group clip-panel flex h-full flex-col border border-edge bg-ocean transition-colors duration-150 hover:bg-foam hover:text-abyss">
        <ProjectMedia media={media} name={name} alt={mediaAlt} />

        <div className="flex flex-1 flex-col p-6 md:p-8">
          <p className="font-label text-base font-bold tracking-widest text-aqua uppercase italic group-hover:text-tide">
            {label}
          </p>
          <h3 className={`mt-1 font-display tracking-wide uppercase ${featured ? 'text-4xl md:text-5xl' : 'text-3xl'}`}>
            {name}
          </h3>
          <p className={`mt-3 mb-6 leading-relaxed text-mist group-hover:text-abyss ${featured ? 'max-w-3xl' : ''}`}>
            {description}
          </p>

          <div className="mt-auto space-y-4">
            <ul className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="clip-slant bg-abyss px-4 py-1 font-label text-sm font-medium text-foam group-hover:bg-ocean"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${name}: ${t.projects.links[link.labelKey]}`}
                    className="inline-flex items-center gap-1 font-label text-lg font-bold tracking-wide text-aqua uppercase group-hover:text-tide"
                  >
                    {t.projects.links[link.labelKey]}
                    <ExternalIcon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </div>
  );
}

function Projects() {
  const { t } = useLanguage();

  return (
    <Section id="projects" kicker={t.projects.kicker} title={t.projects.title}>
      <div className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}

export default Projects;
