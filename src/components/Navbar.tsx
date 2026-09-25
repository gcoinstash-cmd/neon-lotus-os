import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar({ onOpenAdmin }: { onOpenAdmin?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "MENU", href: "#menu" },
    { name: "RESERVATIONS", href: "#reservations" },
    { name: "LOCATION", href: "#location" },
    { name: "STORY", href: "#story" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-charcoal/40 backdrop-blur-xl border-b border-white/5">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="font-display font-bold text-xl md:text-2xl tracking-tighter text-neon-blue"
      >
        NEON LOTUS
      </motion.div>

      <div className="hidden md:flex gap-8 items-center">
        {navLinks.map((link, i) => (
          <motion.a
            key={link.name}
            href={link.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="font-display text-xs font-semibold tracking-wider font-bold tracking-[0.3em] text-white hover:text-neon-red transition-all uppercase"
          >
            {link.name}
          </motion.a>
        ))}
        {onOpenAdmin && (
          <motion.button
            onClick={onOpenAdmin}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-neon-red/15 hover:bg-neon-red/30 border border-neon-red/60 text-neon-red px-4 py-2 font-display font-bold text-xs font-semibold tracking-wider tracking-widest transition-all rounded"
          >
            [ BISTRO PASS ]
          </motion.button>
        )}
        <motion.button
          onClick={() => document.getElementById('reservations')?.scrollIntoView({ behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-neon-red text-charcoal px-6 py-2 font-display font-black text-xs font-semibold tracking-wider tracking-widest hover:bg-white transition-colors"
        >
          BOOK NOW
        </motion.button>
      </div>

      <button 
        className="md:hidden text-bone"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 w-screen h-screen bg-[#0a0a0a] z-[9999] flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {/* Close Button - Absolute Positioned */}
            <button 
              className="absolute top-8 right-8 text-white hover:text-neon-blue transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Close Menu"
            >
              <X size={40} strokeWidth={1.5} />
            </button>

            {/* Vertical Link Stack */}
            <div className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="font-display text-5xl md:text-6xl font-black tracking-[-0.05em] text-white hover:text-neon-blue transition-all uppercase leading-none"
                >
                  {link.name}
                </motion.a>
              ))}
              
              {onOpenAdmin && (
                <motion.button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenAdmin();
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 bg-neon-red/20 border border-neon-red/60 text-neon-red px-10 py-3.5 font-display font-bold text-xs tracking-widest transition-all rounded uppercase"
                >
                  [ BISTRO PASS ]
                </motion.button>
              )}
              
              <motion.button
                onClick={() => {
                  setIsOpen(false);
                  document.getElementById('reservations')?.scrollIntoView({ behavior: 'smooth' });
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-2 bg-neon-red text-charcoal px-12 py-4 font-display font-black text-sm tracking-[0.2em] hover:bg-white transition-all uppercase"
              >
                BOOK NOW
              </motion.button>
            </div>

            {/* Branding Accent */}
            <div className="absolute bottom-12 flex flex-col items-center gap-2">
              <div className="w-12 h-[1px] bg-white/20 mb-2" />
              <div className="font-display font-bold text-xs tracking-[0.5em] text-white/40 uppercase">
                Neon Lotus Tokyo
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
