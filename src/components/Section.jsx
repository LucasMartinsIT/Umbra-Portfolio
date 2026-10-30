function Section({ id, kicker, title, tone = 'abyss', children }) {
  const background = tone === 'trench' ? 'bg-trench' : 'bg-abyss';

  return (
    <section
      id={id}
      className={`${background} clip-diagonal relative -mt-[4vw] scroll-mt-12 px-6 pt-[calc(4vw+5rem)] pb-28 md:pb-36`}
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 md:mb-16">
          <p className="font-label text-lg font-bold tracking-[0.3em] text-aqua uppercase italic">{kicker}</p>
          <h2 className="title-slant mt-1 font-display text-5xl text-foam uppercase md:text-7xl">{title}</h2>
        </header>
        {children}
      </div>
    </section>
  );
}

export default Section;
