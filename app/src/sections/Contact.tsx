import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Calendar as CalendarIcon, Sparkles, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 86260 15315',
    href: 'tel:+918626015315',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'bhushandhengle57@gmail.com',
    href: 'mailto:bhushandhengle57@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'Ghugus, Chandrapur District, Maharashtra, India',
    href: '#',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon-Sun: 8:00 AM - 10:00 PM',
    href: '#',
  },
];

// Curated Shubh Muhurat & Auspicious Dates for 2026-2027
const upcomingMuhurats = [
  { date: '2026-11-18', display: '18 Nov 2026', titleEn: 'Vivah Shubh Muhurat', titleHi: 'विवाह शुभ मुहूर्त', titleMr: 'विवाह शुभ मुहूर्त', status: 'available' },
  { date: '2026-11-22', display: '22 Nov 2026', titleEn: 'Tulsi Vivah & Wedding', titleHi: 'तुलसी विवाह व शुभ लग्न', titleMr: 'तुलसी विवाह व शुभ लग्न', status: 'fastFilling' },
  { date: '2026-11-29', display: '29 Nov 2026', titleEn: 'Grand Vivah Muhurat', titleHi: 'शुभ विवाह मुहूर्त', titleMr: 'शुभ विवाह मुहूर्त', status: 'available' },
  { date: '2026-12-04', display: '04 Dec 2026', titleEn: 'Winter Vivah Muhurat', titleHi: 'विवाह शुभ मुहूर्त', titleMr: 'विवाह शुभ मुहूर्त', status: 'fastFilling' },
  { date: '2026-12-11', display: '11 Dec 2026', titleEn: 'Auspicious Wedding Date', titleHi: 'शुभ विवाह लग्न तिथी', titleMr: 'शुभ विवाह लग्न तिथी', status: 'available' },
  { date: '2027-01-22', display: '22 Jan 2027', titleEn: 'Makar Sankranti Special', titleHi: 'मकर संक्रांति शुभ मुहूर्त', titleMr: 'मकर संक्रांत विशेष मुहूर्त', status: 'available' },
  { date: '2027-02-14', display: '14 Feb 2027', titleEn: 'Vasant Vivah Muhurat', titleHi: 'वसंत विवाह मुहूर्त', titleMr: 'वसंत विवाह मुहूर्त', status: 'fastFilling' },
  { date: '2027-02-21', display: '21 Feb 2027', titleEn: 'Auspicious Lagna Muhurat', titleHi: 'शुभ लग्न मुहूर्त', titleMr: 'शुभ लग्न मुहूर्त', status: 'available' },
];

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    message: '',
  });
  const sectionRef = useRef<HTMLElement>(null);
  const { t, i18n } = useTranslation();

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

  const handleSelectMuhurat = (dateStr: string) => {
    setFormData((prev) => ({
      ...prev,
      eventDate: dateStr,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Prepare email body & subject
    const subject = encodeURIComponent(`Catering Inquiry for ${formData.name} - ${formData.eventType || 'Event'}`);
    const body = encodeURIComponent(
      `Hello Santosh Achari Catering Team,\n\n` +
      `You have received a new catering inquiry from your website:\n\n` +
      `• Name: ${formData.name}\n` +
      `• Email: ${formData.email}\n` +
      `• Phone: ${formData.phone}\n` +
      `• Event Date: ${formData.eventDate}\n` +
      `• Event Type: ${formData.eventType}\n` +
      `• Message / Details: ${formData.message}\n\n` +
      `Target Recipient: bhushandhengle57@gmail.com\n` +
      `Sent via Santosh Achari Catering Web Portal.`
    );

    // Trigger direct mail client
    window.open(`mailto:bhushandhengle57@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(
      `*New Catering Inquiry - Santosh Achari Catering*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Email:* ${formData.email}\n` +
      `*Event Date:* ${formData.eventDate}\n` +
      `*Event Type:* ${formData.eventType}\n` +
      `*Message:* ${formData.message}\n\n` +
      `Please contact me with quote details.`
    );
    window.open(`https://wa.me/918626015315?text=${text}`, '_blank');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const currentLang = i18n.language || 'en';

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background with Diagonal Split */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-coral" style={{ clipPath: 'polygon(0 0, 55% 0, 45% 100%, 0 100%)' }} />
        <div className="absolute inset-0 bg-cream" style={{ clipPath: 'polygon(55% 0, 100% 0, 100% 100%, 45% 100%)' }} />
      </div>

      {/* Decorative Pattern on Left */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute top-0 left-0 w-1/2 h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="contact-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-pattern)" />
        </svg>
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Contact Info & Shubh Muhurat Date Picker */}
          <div className="text-white">
            <span
              className={`inline-block text-sm font-semibold tracking-widest uppercase text-golden mb-4 transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8'
              }`}
            >
              {t('contact.label')}
            </span>
            <h2
              className={`font-display text-4xl md:text-5xl lg:text-display-3 font-semibold transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              {t('contact.title')}
            </h2>
            <p
              className={`mt-4 text-white/80 max-w-md leading-relaxed transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {t('contact.desc')}
            </p>

            {/* Shubh Muhurat & Date Availability Widget */}
            <div
              className={`mt-8 p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '250ms' }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-golden/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-golden" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-white tracking-wide">
                      {t('contact.muhurat.title')}
                    </h4>
                    <p className="text-[11px] text-white/70">
                      {t('contact.muhurat.subtitle')}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-golden font-medium bg-golden/20 px-2 py-0.5 rounded-full">
                  2026 - 2027
                </span>
              </div>

              {/* Muhurat Quick Select Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                {upcomingMuhurats.map((m) => {
                  const isSelected = formData.eventDate === m.date;
                  const muhuratTitle = currentLang === 'mr' ? m.titleMr : currentLang === 'hi' ? m.titleHi : m.titleEn;
                  return (
                    <button
                      key={m.date}
                      type="button"
                      onClick={() => handleSelectMuhurat(m.date)}
                      className={`p-2.5 rounded-xl border text-left transition-all duration-200 group flex flex-col justify-between ${
                        isSelected
                          ? 'bg-golden text-charcoal border-golden shadow-md scale-105 font-bold ring-2 ring-white'
                          : 'bg-black/20 border-white/10 hover:border-golden hover:bg-black/30'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 w-full">
                        <span className={`text-[11px] font-bold ${isSelected ? 'text-charcoal' : 'text-white'}`}>
                          {m.display}
                        </span>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            m.status === 'available'
                              ? 'bg-green-400'
                              : 'bg-amber-400 animate-pulse'
                          }`}
                          title={m.status === 'available' ? t('contact.muhurat.available') : t('contact.muhurat.fastFilling')}
                        />
                      </div>
                      <span className={`text-[9px] mt-1 line-clamp-1 ${isSelected ? 'text-charcoal/80' : 'text-golden'}`}>
                        {muhuratTitle}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] text-white/60 mt-2 flex items-center gap-1.5">
                <CalendarIcon className="w-3 h-3 text-golden" />
                {t('contact.muhurat.clickToSelect')}
              </p>
            </div>

            {/* Contact Details */}
            <div
              className={`mt-8 space-y-4 transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              {contactInfo.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-start gap-3.5 group p-2 rounded-xl hover:bg-white/5 transition-all duration-300"
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-golden">
                    <item.icon className="w-4 h-4 text-golden group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-white/60 text-xs">{item.label}</div>
                    <div className="text-white text-sm font-medium group-hover:text-golden transition-colors">
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="bg-white rounded-3xl shadow-spice-lg p-6 sm:p-8 lg:p-10">
              {isSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl text-charcoal font-bold">
                    {t('contact.form.successTitle')}
                  </h3>
                  <p className="text-gray-dark text-sm max-w-md mx-auto">
                    {t('contact.form.successDesc')}
                  </p>
                  
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button
                      onClick={handleSendWhatsApp}
                      className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      {t('contact.form.sendViaWhatsApp')}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsSubmitted(false)}
                      className="w-full sm:w-auto border-gray-300 text-charcoal font-semibold py-3 px-6 rounded-xl"
                    >
                      Send Another Message
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
                    <h3 className="font-display text-2xl text-charcoal font-bold">
                      {t('contact.form.title')}
                    </h3>
                    <span className="text-xs text-coral font-semibold bg-coral/10 px-3 py-1 rounded-full">
                      SAC Direct Inquiry
                    </span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-charcoal font-semibold text-xs">
                          {t('contact.form.fullName')} *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder={t('contact.form.namePlaceholder')}
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="border-gray-200 focus:border-coral focus:ring-coral/20 rounded-xl"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-charcoal font-semibold text-xs">
                          {t('contact.form.email')} *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder={t('contact.form.emailPlaceholder')}
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="border-gray-200 focus:border-coral focus:ring-coral/20 rounded-xl"
                        />
                      </div>
                    </div>

                    {/* Phone & Event Date */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-charcoal font-semibold text-xs">
                          {t('contact.form.phone')} *
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder={t('contact.form.phonePlaceholder')}
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="border-gray-200 focus:border-coral focus:ring-coral/20 rounded-xl"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="eventDate" className="text-charcoal font-semibold text-xs flex items-center justify-between">
                          <span>{t('contact.form.eventDate')} *</span>
                          {formData.eventDate && (
                            <span className="text-[10px] text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded">
                              ✓ {formData.eventDate}
                            </span>
                          )}
                        </Label>
                        <Input
                          id="eventDate"
                          name="eventDate"
                          type="date"
                          value={formData.eventDate}
                          onChange={handleChange}
                          required
                          className="border-gray-200 focus:border-coral focus:ring-coral/20 rounded-xl"
                        />
                      </div>
                    </div>

                    {/* Event Type (Dropdown with localized options) */}
                    <div className="space-y-1.5">
                      <Label htmlFor="eventType" className="text-charcoal font-semibold text-xs">
                        {t('contact.form.eventType')} *
                      </Label>
                      <Select
                        value={formData.eventType}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, eventType: value }))
                        }
                      >
                        <SelectTrigger className="border-gray-200 focus:border-coral focus:ring-coral/20 rounded-xl">
                          <SelectValue placeholder={t('contact.form.selectEventType')} />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="wedding">{t('contact.form.types.wedding')}</SelectItem>
                          <SelectItem value="corporate">{t('contact.form.types.corporate')}</SelectItem>
                          <SelectItem value="private">{t('contact.form.types.private')}</SelectItem>
                          <SelectItem value="festival">{t('contact.form.types.festival')}</SelectItem>
                          <SelectItem value="other">{t('contact.form.types.other')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-charcoal font-semibold text-xs">
                        {t('contact.form.message')}
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder={t('contact.form.messagePlaceholder')}
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className="border-gray-200 focus:border-coral focus:ring-coral/20 resize-none rounded-xl"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full bg-coral hover:bg-golden text-white font-bold py-6 rounded-xl transition-all duration-300 hover:shadow-golden transform hover:-translate-y-0.5 text-base"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      {t('contact.form.submit')}
                    </Button>

                    <p className="text-center text-gray-500 text-[11px] leading-tight pt-1">
                      {t('contact.form.privacyNote')}
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
