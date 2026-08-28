import { useState, useEffect } from 'react';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SacLogo from '@/components/SacLogo';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#menu', label: 'Menu' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
];

const languages = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'hi', label: 'हिन्दी', full: 'Hindi' },
  { code: 'mr', label: 'मराठी', full: 'Marathi' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentLang = i18n.language || 'en';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-spice py-2.5'
            : 'bg-gradient-to-b from-charcoal/90 via-charcoal/50 to-transparent py-4'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between">
            {/* Brand Logo with SAC Emblem */}
            <a href="#home" className="flex items-center">
              <SacLogo isScrolled={isScrolled} />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-all duration-300 hover:text-coral relative group ${
                    isScrolled ? 'text-charcoal' : 'text-white/95'
                  }`}
                >
                  {t(`nav.${link.label.toLowerCase()}`)}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-coral transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Language Switcher & Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Phone quick call */}
              <a
                href="tel:+918626015315"
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-300 ${
                  isScrolled
                    ? 'text-charcoal bg-gray-100 hover:bg-coral/10 hover:text-coral'
                    : 'text-white bg-white/10 hover:bg-white/20'
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-golden" />
                <span>+91 86260 15315</span>
              </a>

              {/* Language Selector Segmented Pills (Simple & 100% Selectable) */}
              <div
                className={`flex items-center p-1 rounded-full border transition-all duration-300 ${
                  isScrolled
                    ? 'bg-gray-100/90 border-gray-200 shadow-inner'
                    : 'bg-black/40 border-white/20 backdrop-blur-sm'
                }`}
              >
                <Globe className={`w-3.5 h-3.5 mx-1.5 ${isScrolled ? 'text-charcoal' : 'text-golden'}`} />
                {languages.map((lng) => {
                  const isActive = currentLang === lng.code;
                  return (
                    <button
                      key={lng.code}
                      onClick={() => changeLanguage(lng.code)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-300 ${
                        isActive
                          ? 'bg-coral text-white shadow-sm scale-105'
                          : isScrolled
                          ? 'text-charcoal hover:text-coral hover:bg-white/80'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                      title={lng.full}
                    >
                      {lng.label}
                    </button>
                  );
                })}
              </div>

              {/* Get Quote CTA */}
              <a
                href="#contact"
                className="px-5 py-2 bg-coral text-white text-xs sm:text-sm font-bold tracking-wide rounded-full transition-all duration-300 hover:bg-golden hover:shadow-golden transform hover:-translate-y-0.5"
              >
                {t('nav.getQuote')}
              </a>
            </div>

            {/* Mobile Menu & Language Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Compact Mobile Language Switcher */}
              <div className={`flex items-center p-0.5 rounded-full border ${
                isScrolled ? 'bg-gray-100 border-gray-200' : 'bg-black/40 border-white/20'
              }`}>
                {languages.map((lng) => {
                  const isActive = currentLang === lng.code;
                  return (
                    <button
                      key={lng.code}
                      onClick={() => changeLanguage(lng.code)}
                      className={`px-2 py-1 text-[11px] font-bold rounded-full transition-all ${
                        isActive
                          ? 'bg-coral text-white'
                          : isScrolled
                          ? 'text-charcoal'
                          : 'text-white/80'
                      }`}
                    >
                      {lng.label}
                    </button>
                  );
                })}
              </div>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-xl transition-colors duration-300 ${
                  isScrolled ? 'text-charcoal bg-gray-100' : 'text-white bg-white/10'
                }`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-white shadow-2xl transition-transform duration-500 flex flex-col justify-between p-6 pt-20 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            <div className="mb-6 pb-4 border-b border-gray-100">
              <SacLogo isScrolled={true} />
            </div>

            {/* Language Selector inside Drawer */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Language / भाषा / भाषा निवडा:
              </p>
              <div className="grid grid-cols-3 gap-2">
                {languages.map((lng) => {
                  const isActive = currentLang === lng.code;
                  return (
                    <button
                      key={lng.code}
                      onClick={() => {
                        changeLanguage(lng.code);
                      }}
                      className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all ${
                        isActive
                          ? 'bg-coral text-white border-coral shadow-sm'
                          : 'bg-cream text-charcoal border-gray-200 hover:border-coral'
                      }`}
                    >
                      {lng.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nav Links */}
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-semibold text-charcoal hover:text-coral transition-colors duration-200 py-2.5 px-3 rounded-lg hover:bg-cream"
                >
                  {t(`nav.${link.label.toLowerCase()}`)}
                </a>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-col gap-3">
            <a
              href="tel:+918626015315"
              className="flex items-center justify-center gap-2 py-3 bg-cream text-charcoal font-semibold rounded-xl text-sm"
            >
              <Phone className="w-4 h-4 text-coral" />
              +91 86260 15315
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center py-3.5 bg-coral text-white font-bold rounded-xl shadow-spice hover:bg-golden transition-colors"
            >
              {t('nav.getQuote')}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
