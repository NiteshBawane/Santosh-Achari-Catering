import { MessageCircle } from 'lucide-react';

export default function WhatsAppWidget() {
  const phoneNumber = '+918626015315'; // Using the phone number found in the contact section
  const message = 'Hello Santosh Achari Catering, I would like to inquire about your services.';
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-8 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_15px_rgba(37,211,102,0.4)] flex items-center justify-center hover:bg-[#128C7E] transition-all duration-300 hover:scale-110 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      {/* Tooltip */}
      <span className="absolute right-16 bg-white text-gray-800 text-sm px-3 py-1.5 rounded-lg shadow-md opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap font-medium">
        Chat with us
      </span>
    </a>
  );
}
