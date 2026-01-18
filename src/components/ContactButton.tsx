import { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PHONE_NUMBER = '09033120032';
const WHATSAPP_NUMBER = '2349033120032';

const ContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCall = () => {
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hello! I have a question about Finite Luxury.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 left-0 flex flex-col gap-3 mb-2"
          >
            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-3 px-4 py-3 bg-[#25D366] text-white shadow-lg hover:bg-[#20bd5a] transition-colors whitespace-nowrap"
            >
              <MessageCircle size={18} />
              <span className="text-sm font-medium">WhatsApp</span>
            </button>

            {/* Call Button */}
            <button
              onClick={handleCall}
              className="flex items-center gap-3 px-4 py-3 bg-foreground text-background shadow-lg hover:bg-foreground/90 transition-colors whitespace-nowrap"
            >
              <Phone size={18} />
              <span className="text-sm font-medium">Call Us</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-foreground text-background flex items-center justify-center shadow-lg hover:bg-foreground/90 transition-colors"
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close contact options' : 'Open contact options'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="phone"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Phone size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ContactButton;
