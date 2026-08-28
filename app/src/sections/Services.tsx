import { useEffect, useRef, useState } from 'react';
import { Heart, Briefcase, PartyPopper, Sparkles, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const serviceData = [
  {
    icon: Heart,
    titleKey: 'services.wedding.title',
    descKey: 'services.wedding.desc',
    image: '/service-wedding.jpg',
    color: 'from-coral/20 to-coral/5',
  },
  {
    icon: Briefcase,
    titleKey: 'services.corporate.title',
    descKey: 'services.corporate.desc',
    image: '/service-corporate.jpg',
    color: 'from-golden/20 to-golden/5',
  },
  {
    icon: PartyPopper,
    titleKey: 'services.private.title',
    descKey: 'services.private.desc',
    image: '/service-private.jpg',
    color: 'from-coral/20 to-coral/5',
  },
  {
    icon: Sparkles,
    titleKey: 'services.festival.title',
    descKey: 'services.festival.desc',
    image: '/service-festival.jpg',
    color: 'from-golden/20 to-golden/5',
  },
];

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-cream overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #e47a53 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className={`section-label inline-block transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            {t('services.label')}
          </span>
          <h2
            className={`font-display text-4xl md:text-5xl lg:text-display-3 text-charcoal font-semibold mt-4 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {t('services.title')}
          </h2>
          <p
            className={`mt-4 text-gray-dark transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {t('services.desc')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {serviceData.map((service, index) => (
            <div
              key={service.titleKey}
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-spice transition-all duration-500 hover:shadow-spice-lg hover:-translate-y-2 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${300 + index * 100}ms`,
                transform: hoveredIndex === index ? 'translateY(-8px) rotateY(0deg)' : undefined,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={t(service.titleKey)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-60`} />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                
                {/* Icon Badge */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-coral" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <h3 className="font-display text-2xl lg:text-3xl text-charcoal font-semibold">
                  {t(service.titleKey)}
                </h3>
                <p className="mt-3 text-gray-dark leading-relaxed">
                  {t(service.descKey)}
                </p>



                {/* CTA */}
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 text-coral font-semibold group/link"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-16 text-center transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          <p className="text-gray-dark mb-4">
            {t('services.ctaDesc')}
          </p>
          <a href="#menu" className="btn-primary inline-flex items-center gap-2">
            <span>{t('services.exploreMenu')}</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
