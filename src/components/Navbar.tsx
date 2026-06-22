import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Menu, X, ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500",
      scrolled ? "py-2 sm:py-4" : "py-4 sm:py-8"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={cn(
            "flex items-center justify-between px-6 sm:px-8 h-16 sm:h-20 rounded-2xl sm:rounded-[2rem] border transition-all duration-500",
            scrolled
                ? "bg-bg-dark/80 backdrop-blur-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                : "bg-white/[0.03] backdrop-blur-md border-white/5"
        )}>
            <Link to="/" className="flex items-center gap-3 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-brand-primary flex items-center justify-center shadow-2xl shadow-brand-primary/20 group-hover:scale-110 transition-transform duration-500">
                    <MessageSquare className="text-bg-dark w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="font-display font-black text-lg sm:text-xl tracking-tight text-white italic">ChatFlow <span className="text-brand-primary">AI</span></span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-white/30">
            {[
              { label: 'Features', target: 'features' },
              { label: 'Live Demo', target: 'live-demo' },
            ].map((item, i) => {
                return (
                    <motion.a
                    key={item.label}
                    href={`#${item.target}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="hover:text-white transition-colors group flex items-center gap-1"
                    >
                    {item.label}
                    </motion.a>
                );
            })}
            <div className="h-6 w-px bg-white/10 mx-2" />
            <Link
                to="/dashboard"
                className="px-8 py-3 rounded-xl bg-white text-bg-dark font-bold text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
            >
                Try Demo
            </Link>
            </div>

            {/* Mobile Toggle */}
            <button
            className="md:hidden text-white/40 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="md:hidden absolute top-full left-4 right-4 mt-4 p-8 rounded-3xl bg-bg-dark border border-white/10 shadow-huge flex flex-col gap-6 z-50 text-center"
          >
          {[
            { label: 'Features', target: 'features' },
            { label: 'Live Demo', target: 'live-demo' },
          ].map((item) => (
            <a
              key={item.label}
              href={`#${item.target}`}
              className="text-2xl font-bold uppercase tracking-tight text-white/40 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="w-full py-5 rounded-2xl bg-white text-bg-dark font-bold text-sm uppercase tracking-widest text-center shadow-2xl"
          >
           Watch AI Reply Live
          </Link>
        </motion.div>
      )}
      </AnimatePresence>
    </nav>
  );
}
