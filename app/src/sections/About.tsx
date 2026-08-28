import { useEffect, useRef, useState } from 'react';
import { Award, Users, ChefHat, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  const features = [
    {
      icon: ChefHat,
      title: t('about.expertChefs'),
      description: t('about.expertChefsDesc'),
    },
    {
      icon: Heart,
      title: t('about.madeWithLove'),
      description: t('about.madeWithLoveDesc'),
    },
    {
      icon: Award,
      title: t('about.premiumQuality'),
      description: t('about.premiumQualityDesc'),
    },
    {
      icon: Users,
      title: t('about.fullService'),
      description: t('about.fullServiceDesc'),
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-coral/5 rounded-full blur-2xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-golden/5 rounded-full blur-3xl" />

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-spice-lg">
                <img
                  src="/catering-about.png"
                  alt="Authentic Indian Catering"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
              </div>

              {/* Floating Experience Card */}
              <div
                className={`absolute -bottom-6 -right-6 lg:-right-12 bg-white rounded-xl shadow-spice-lg p-6 transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-coral/10 rounded-full flex items-center justify-center">
                    <span className="font-display text-3xl text-coral font-bold">
                      35
                    </span>
                  </div>
                  <div>
                    <div className="font-display text-xl font-semibold text-charcoal">
                      {t('about.yearsOfExcellence').split(' ')[0]} {t('about.yearsOfExcellence').split(' ')[1]}
                    </div>
                    <div className="text-gray-dark">{t('about.yearsOfExcellence').split(' ').slice(2).join(' ') || t('about.yearsOfExcellence')}</div>
                  </div>
                </div>
              </div>

              {/* Decorative Spice Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-coral/20 rounded-full" />
              <div className="absolute -bottom-8 left-1/4 w-16 h-16 bg-golden/20 rounded-full blur-xl" />
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:pl-8">
            {/* Section Label */}
            <div
              className={`transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <span className="section-label">{t('about.label')}</span>
            </div>

            {/* Headline */}
            <h2
              className={`font-display text-4xl md:text-5xl lg:text-display-3 text-charcoal font-semibold mt-4 transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              {t('about.title')}
            </h2>

            {/* Body Text */}
            <div
              className={`mt-6 space-y-4 transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <p className="text-gray-dark leading-relaxed">
                {t('about.p1')}
              </p>
              <p className="text-gray-dark leading-relaxed">
                {t('about.p2')}
              </p>
            </div>

            {/* Features Grid */}
            <div
              className={`mt-10 grid grid-cols-2 gap-6 transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group flex items-start gap-3"
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="w-10 h-10 bg-coral/10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-coral group-hover:scale-110">
                    <feature.icon className="w-5 h-5 text-coral transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal text-sm">
                      {feature.title}
                    </h4>
                    <p className="text-gray text-xs mt-0.5">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div
              className={`mt-10 transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-4 scale-95'
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              <a href="#services" className="btn-secondary inline-flex items-center gap-2">
                <span>{t('about.ourServices')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
