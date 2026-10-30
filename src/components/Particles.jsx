const PARTICLE_COUNT = 22;

// Spread with fixed steps instead of randomness so every render stays identical.
const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
  left: `${(index * 37) % 100}%`,
  size: 2 + (index % 3),
  duration: `${14 + ((index * 7) % 13)}s`,
  delay: `-${(index * 5) % 17}s`,
}));

function Particles() {
  return (
    <div aria-hidden="true" data-testid="particles" className="absolute inset-0 overflow-hidden">
      {PARTICLES.map(({ left, size, duration, delay }) => (
        <span
          key={left}
          className="particle"
          style={{ left, width: size, height: size, animationDuration: duration, animationDelay: delay }}
        />
      ))}
    </div>
  );
}

export default Particles;
