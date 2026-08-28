import { useEffect, useRef, useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const galleryImages = [
  {
    src: '/gallery-1.jpg',
    alt: 'Indian Wedding Buffet',
    caption: 'Wedding Feast Setup',
  },
  {
    src: '/gallery-2.jpg',
    alt: 'Live Dosa Station',
    caption: 'Live Cooking Station',
  },
  {
    src: '/gallery-3.jpg',
    alt: 'Dessert Table',
    caption: 'Sweet Delights',
  },
  {
    src: '/gallery-4.jpg',
    alt: 'Appetizer Platter',
    caption: 'Appetizer Selection',
  },
  {
    src: '/service-wedding.jpg',
    alt: 'Wedding Reception',
    caption: 'Grand Celebration',
  },
  {
    src: '/service-festival.jpg',
    alt: 'Festival Event',
    caption: 'Festival Catering',
  },
  {
    src: '/menu-butter-chicken.jpg',
    alt: 'Butter Chicken',
    caption: 'Signature Dish',
  },
  {
    src: '/menu-biryani.jpg',
    alt: 'Biryani',
    caption: 'Aromatic Biryani',
  },
];

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
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

  // Generate random rotation for polaroid effect
  const getRotation = (index: number) => {
    const rotations = [-3, 2, -2, 3, -1, 2, -3, 1];
    return rotations[index] || 0;
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream/50 to-white" />

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
            {t('gallery.label')}
          </span>
          <h2
            className={`font-display text-4xl md:text-5xl lg:text-display-3 text-charcoal font-semibold mt-4 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {t('gallery.title')}
          </h2>
          <p
            className={`mt-4 text-gray-dark transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {t('gallery.desc')}
          </p>
        </div>

        {/* Gallery Grid - Polaroid Style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              className={`group cursor-pointer transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${300 + index * 100}ms`,
                transform: isVisible ? `rotate(${getRotation(index)}deg)` : 'rotate(0deg)',
              }}
              onClick={() => setSelectedImage(index)}
            >
              <div className="bg-white p-3 pb-12 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-0">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-coral/0 group-hover:bg-coral/30 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <p className="absolute bottom-3 left-0 right-0 text-center font-script text-xl text-charcoal">
                  {image.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div
            className="max-w-5xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="max-w-full max-h-[85vh] object-contain"
            />
            <p className="text-center text-white/80 mt-4 font-script text-2xl">
              {galleryImages[selectedImage].caption}
            </p>
          </div>

          {/* Navigation */}
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((prev) =>
                prev === null ? 0 : (prev - 1 + galleryImages.length) % galleryImages.length
              );
            }}
            aria-label="Previous image"
          >
            <span className="text-2xl">&larr;</span>
          </button>
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((prev) =>
                prev === null ? 0 : (prev + 1) % galleryImages.length
              );
            }}
            aria-label="Next image"
          >
            <span className="text-2xl">&rarr;</span>
          </button>
        </div>
      )}
    </section>
  );
}
