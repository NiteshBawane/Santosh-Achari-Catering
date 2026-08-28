import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Floating spice particle component
const SpiceParticle = ({ delay, size, color, left, top }: { 
  delay: number; 
  size: number; 
  color: string; 
  left: string; 
  top: string;
}) => (
  <div
    className="absolute rounded-full animate-pulse-glow pointer-events-none"
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      left,
      top,
      animationDelay: `${delay}s`,
      animationDuration: `${3 + Math.random() * 2}s`,
    }}
  />
);

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    // Trigger entrance animations
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Generate random spice particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: Math.random() * 3,
    size: 4 + Math.random() * 6,
    color: i % 3 === 0 ? '#eeba10' : i % 3 === 1 ? '#e47a53' : '#f19c7c',
    left: `${10 + Math.random() * 40}%`,
    top: `${20 + Math.random() * 60}%`,
  }));

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-charcoal"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-thali.jpg"
          alt="Indian Thali"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/30" />
      </div>

      {/* Decorative Mandala Pattern */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] opacity-5 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow">
          <defs>
            <pattern id="mandala" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2" fill="#e47a53" />
              <path d="M10 0 Q15 5 10 10 Q5 5 10 0" fill="#eeba10" />
            </pattern>
          </defs>
          <circle cx="100" cy="100" r="80" fill="url(#mandala)" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="#e47a53" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="#eeba10" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Floating Spice Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <SpiceParticle key={p.id} {...p} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-32">
          <div className="max-w-3xl">
            {/* Script Label */}
            <div
              className={`transition-all duration-700 ${
                isLoaded
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <span className="font-script text-4xl md:text-5xl text-golden">
                {t('hero.authentic')}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-2">
              <span
                className={`block font-display text-6xl md:text-7xl lg:text-8xl text-white font-semibold transition-all duration-700 ${
                  isLoaded
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                {t('hero.indian')}
              </span>
              <span
                className={`block font-display text-6xl md:text-7xl lg:text-8xl text-white font-semibold transition-all duration-700 relative ${
                  isLoaded
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '800ms' }}
              >
                {t('hero.catering')}
                {/* Underline SVG */}
                <svg
                  className="absolute -bottom-2 left-0 w-48 md:w-64 h-3"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 6 Q50 0 100 6 T200 6"
                    fill="none"
                    stroke="#e47a53"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className={`transition-all duration-700 ${
                      isLoaded ? 'stroke-dashoffset-0' : ''
                    }`}
                    style={{
                      strokeDasharray: 200,
                      strokeDashoffset: isLoaded ? 0 : 200,
                      transitionDelay: '1200ms',
                    }}
                  />
                </svg>
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className={`mt-8 text-lg md:text-xl text-white/80 max-w-xl leading-relaxed transition-all duration-700 ${
                isLoaded
                  ? 'opacity-100 translate-y-0 blur-0'
                  : 'opacity-0 translate-y-4 blur-sm'
              }`}
              style={{ transitionDelay: '1000ms' }}
            >
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div
              className={`mt-10 flex flex-wrap gap-4 transition-all duration-700 ${
                isLoaded
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-4 scale-95'
              }`}
              style={{ transitionDelay: '1200ms' }}
            >
              <a
                href="#menu"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-coral text-white font-semibold rounded-full transition-all duration-300 hover:bg-golden hover:shadow-golden hover:scale-105"
              >
                <span>{t('hero.exploreMenu')}</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/50"
              >
                <Sparkles className="w-5 h-5" />
                <span>{t('hero.getQuote')}</span>
              </a>
            </div>

            {/* Stats */}
            <div
              className={`mt-16 flex flex-wrap gap-8 md:gap-12 transition-all duration-700 ${
                isLoaded
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '1400ms' }}
            >
              <div>
                <div className="font-display text-4xl md:text-5xl text-golden font-semibold">
                  35+
                </div>
                <div className="text-white/60 text-sm mt-1">{t('hero.yearsExperience')}</div>
              </div>
              <div>
                <div className="font-display text-4xl md:text-5xl text-golden font-semibold">
                  5000+
                </div>
                <div className="text-white/60 text-sm mt-1">{t('hero.eventsCatered')}</div>
              </div>
              <div>
                <div className="font-display text-4xl md:text-5xl text-golden font-semibold">
                  50+
                </div>
                <div className="text-white/60 text-sm mt-1">{t('hero.signatureDishes')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
