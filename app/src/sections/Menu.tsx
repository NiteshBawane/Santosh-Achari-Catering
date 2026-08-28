import { useEffect, useRef, useState } from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const menuItems = [
  {
    id: 'palakPatwadi',
    image: '/menu-palak-patwadi.jpg',
    featured: true,
    rating: 4.9,
  },
  {
    id: 'cornPalak',
    image: '/menu-corn-palak.jpg',
    featured: false,
    rating: 4.8,
  },
  {
    id: 'tawaSabji',
    image: '/menu-tawa-sabji.jpg',
    featured: false,
    rating: 4.7,
  },
  {
    id: 'paneerHyderabadi',
    image: '/menu-paneer-hyderabadi.jpg',
    featured: true,
    rating: 4.9,
  },
  {
    id: 'chickenBiryani',
    image: '/menu-biryani.jpg',
    featured: true,
    rating: 4.8,
  },
  {
    id: 'muttonCurry',
    image: '/menu-mutton-curry.jpg',
    featured: false,
    rating: 4.9,
  },
  {
    id: 'chineseFood',
    image: '/menu-chinese-food.jpg',
    featured: false,
    rating: 4.6,
  },
  {
    id: 'gulabJamun',
    image: '/menu-gulab-jamun.jpg',
    featured: false,
    rating: 4.9,
  },
];

export default function Menu() {
  const [isVisible, setIsVisible] = useState(false);
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
      id="menu"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-coral/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-golden/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <span
              className={`section-label inline-block transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              {t('menu.label')}
            </span>
            <h2
              className={`font-display text-4xl md:text-5xl lg:text-display-3 text-charcoal font-semibold mt-4 transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              {t('menu.title')}
            </h2>
            <p
              className={`mt-4 text-gray-dark max-w-lg transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {t('menu.desc')}
            </p>
          </div>
          <a
            href="#contact"
            className={`btn-primary inline-flex items-center gap-2 self-start lg:self-auto transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <span>{t('menu.viewFull')}</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Menu Grid - Masonry Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-spice transition-all duration-500 hover:shadow-spice-lg ${
                item.featured ? 'md:row-span-2' : ''
              } ${
                isVisible
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              {/* Image */}
              <div className={`relative overflow-hidden ${item.featured ? 'h-80' : 'h-56'}`}>
                <img
                  src={item.image}
                  alt={t(`menu.items.${item.id}.name`)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                
                {/* Featured Badge */}
                {item.featured && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-golden text-charcoal text-xs font-bold rounded-full">
                    {t('menu.chefsPick')}
                  </div>
                )}

                {/* Rating */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-white/90 rounded-full">
                  <Star className="w-3 h-3 text-golden fill-golden" />
                  <span className="text-xs font-semibold text-charcoal">
                    {item.rating}
                  </span>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl text-white font-semibold">
                    {t(`menu.items.${item.id}.name`)}
                  </h3>
                  <p className="mt-1 text-white/80 text-sm">
                    {t(`menu.items.${item.id}.desc`)}
                  </p>
                  <div className="mt-3 flex items-center justify-end">
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-coral">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Menu Categories */}
        <div
          className={`mt-16 flex flex-wrap justify-center gap-4 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          {['appetizers', 'mainCourse', 'rice', 'desserts', 'beverages'].map(
            (categoryKey) => (
              <span
                key={categoryKey}
                className="px-6 py-3 bg-cream text-charcoal rounded-full text-sm font-medium hover:bg-coral hover:text-white transition-all duration-300 cursor-pointer"
              >
                {t(`menu.categories.${categoryKey}`)}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
