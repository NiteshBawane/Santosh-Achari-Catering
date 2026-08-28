import { useEffect, useRef, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';


export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  const testimonials = [
    {
      name: t('testimonials.reviews.joshi.name'),
      role: t('testimonials.reviews.joshi.role'),
      avatar: '/avatar-joshi.jpg',
      quote: t('testimonials.reviews.joshi.quote'),
      rating: 5,
    },
    {
      name: t('testimonials.reviews.kulkarni.name'),
      role: t('testimonials.reviews.kulkarni.role'),
      avatar: '/avatar-priya.jpg',
      quote: t('testimonials.reviews.kulkarni.quote'),
      rating: 5,
    },
    {
      name: t('testimonials.reviews.deshmukh.name'),
      role: t('testimonials.reviews.deshmukh.role'),
      avatar: '/avatar-deshmukh.jpg',
      quote: t('testimonials.reviews.deshmukh.quote'),
      rating: 5,
    },
    {
      name: t('testimonials.reviews.patil.name'),
      role: t('testimonials.reviews.patil.role'),
      avatar: '/avatar-anand.jpg',
      quote: t('testimonials.reviews.patil.quote'),
      rating: 5,
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-cream overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="testimonial-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#e47a53" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#testimonial-pattern)" />
        </svg>
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
            {t('testimonials.label')}
          </span>
          <h2
            className={`font-display text-4xl md:text-5xl lg:text-display-3 text-charcoal font-semibold mt-4 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {t('testimonials.title')}
          </h2>
        </div>

        {/* Featured Testimonial */}
        <div
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="relative bg-white rounded-3xl shadow-spice-lg p-8 lg:p-12">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 bg-coral rounded-full flex items-center justify-center">
              <Quote className="w-6 h-6 text-white" />
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* Avatar & Info */}
              <div className="text-center lg:text-left">
                <div className="relative inline-block">
                  <img
                    src={testimonials[activeIndex].avatar}
                    alt={testimonials[activeIndex].name}
                    className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-coral/20"
                  />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-golden rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-white fill-white" />
                  </div>
                </div>
                <h4 className="mt-4 font-display text-xl text-charcoal font-semibold">
                  {testimonials[activeIndex].name}
                </h4>
                <p className="text-coral text-sm">{testimonials[activeIndex].role}</p>
                
                {/* Rating */}
                <div className="mt-2 flex justify-center lg:justify-start gap-1">
                  {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-golden fill-golden" />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="lg:col-span-2">
                <blockquote className="font-display text-2xl lg:text-3xl text-charcoal leading-relaxed italic">
                  &ldquo;{testimonials[activeIndex].quote}&rdquo;
                </blockquote>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'bg-coral w-8'
                        : 'bg-gray hover:bg-coral/50'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 border-2 border-coral/30 rounded-full flex items-center justify-center text-coral hover:bg-coral hover:text-white transition-all duration-300"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 border-2 border-coral/30 rounded-full flex items-center justify-center text-coral hover:bg-coral hover:text-white transition-all duration-300"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Client Logos / Trust Badges */}
        <div
          className={`mt-16 flex flex-wrap justify-center items-center gap-8 lg:gap-16 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="text-center">
            <div className="font-display text-4xl text-coral font-bold">5000+</div>
            <div className="text-gray-dark text-sm">{t('testimonials.stats.weddings')}</div>
          </div>
          <div className="w-px h-12 bg-gray hidden lg:block" />
          <div className="text-center">
            <div className="font-display text-4xl text-coral font-bold">1000+</div>
            <div className="text-gray-dark text-sm">{t('testimonials.stats.corporate')}</div>
          </div>
          <div className="w-px h-12 bg-gray hidden lg:block" />
          <div className="text-center">
            <div className="font-display text-4xl text-coral font-bold">1000+</div>
            <div className="text-gray-dark text-sm">{t('testimonials.stats.reviews')}</div>
          </div>
          <div className="w-px h-12 bg-gray hidden lg:block" />
          <div className="text-center">
            <div className="font-display text-4xl text-coral font-bold">35</div>
            <div className="text-gray-dark text-sm">{t('testimonials.stats.trust')}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
