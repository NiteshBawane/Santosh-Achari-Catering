import { useEffect, useRef, useState } from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Heart, ArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SacLogo from '@/components/SacLogo';

const quickLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Us' },
  { href: '#menu', label: 'Our Menu' },
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
];

const services = [
  { href: '#services', label: 'Wedding Catering' },
  { href: '#services', label: 'Corporate Events' },
  { href: '#services', label: 'Private Parties' },
  { href: '#services', label: 'Festival Catering' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
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

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="relative bg-charcoal overflow-hidden">
      {/* Decorative Top Line */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-coral via-golden to-coral transition-all duration-1000 ${
          isVisible ? 'scale-x-100' : 'scale-x-0'
        }`}
        style={{ transformOrigin: 'left' }}
      />

      {/* Main Footer Content */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div
            className={`lg:col-span-1 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <a href="#home" className="inline-block">
              <SacLogo variant="dark" />
            </a>
            <p className="mt-4 text-white/60 leading-relaxed">
              {t('footer.desc')}
            </p>
            
            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:bg-coral hover:border-coral hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-6"
                  style={{ transitionDelay: `${index * 50}ms` }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <h4 className="font-display text-xl text-white font-semibold mb-6">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-coral transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h4 className="font-display text-xl text-white font-semibold mb-6">
              {t('footer.services')}
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    className="text-white/60 hover:text-coral transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <h4 className="font-display text-xl text-white font-semibold mb-6">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-coral mt-1">📍</span>
                <span className="text-white/60">
                  Ghugus, Chandrapur District
                  <br />
                  Maharashtra, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-coral">📞</span>
                <a
                  href="tel:+918626015315"
                  className="text-white/60 hover:text-coral transition-colors"
                >
                  +91 86260 15315
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-coral">✉️</span>
                <a
                  href="mailto:bhushandhengle57@gmail.com"
                  className="text-white/60 hover:text-coral transition-colors"
                >
                  bhushandhengle57@gmail.com
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-white/60 text-sm mb-3">
                {t('footer.subscribe')}
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-coral"
                />
                <button className="px-4 py-2 bg-coral text-white rounded-lg hover:bg-golden transition-colors">
                  {t('footer.subscribeBtn')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} {t('footer.rights')}
            </p>
            <p className="text-white/40 text-sm flex items-center gap-1">
              {t('footer.madeWith')} <Heart className="w-4 h-4 text-coral fill-coral" /> {t('footer.forFoodLovers')}
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-white/40 text-sm hover:text-coral transition-colors"
              >
                {t('footer.privacy')}
              </a>
              <a
                href="#"
                className="text-white/40 text-sm hover:text-coral transition-colors"
              >
                {t('footer.terms')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-coral text-white rounded-full shadow-lg flex items-center justify-center hover:bg-golden transition-all duration-300 hover:scale-110 z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
