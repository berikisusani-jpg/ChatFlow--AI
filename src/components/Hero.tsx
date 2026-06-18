import { motion } from 'motion/react';
import { ChevronRight, MessageSquare, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-bg-dark">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-10"
        >
          <Sparkles className="w-3" />
          <span>Automated Support</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-8xl font-display font-medium tracking-tight text-white mb-8 max-w-4xl mx-auto leading-[0.95]"
        >
          AI replies to your <br className="hidden sm:block" /><span className="text-white/30">WhatsApp customers</span> <br className="hidden sm:block" />automatically.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Train ChatFlow AI with your business FAQs and let it answer customer questions 24/7.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 sm:mb-32"
        >
          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-bg-dark font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Try Demo <ChevronRight className="w-4 h-4" />
          </Link>
          <button
            onClick={() => document.getElementById('live-demo')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all"
          >
            See how it works
          </button>
        </motion.div>

        {/* Clean Hero Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative max-w-5xl mx-auto rounded-3xl border border-white/10 bg-surface-elevated/30 p-1.5 sm:p-2 shadow-huge overflow-hidden"
        >
          <div className="rounded-2xl border border-white/5 bg-bg-dark/80 overflow-hidden aspect-[4/5] sm:aspect-[16/9] flex items-center justify-center relative">
             <div className="max-w-md w-full p-6 sm:p-8 z-20 space-y-4">
                <div className="flex flex-col gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="self-start bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none max-w-[80%] text-left text-sm text-white/60"
                  >
                    Hi! What are your delivery times for Abuja?
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2 }}
                    className="self-end bg-brand-primary/10 border border-brand-primary/20 p-4 rounded-2xl rounded-tr-none max-w-[85%] text-left text-sm text-brand-primary flex items-start gap-4"
                  >
                    <div className="w-6 h-6 rounded-lg bg-brand-primary/20 flex items-center justify-center grow-0 shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3" />
                    </div>
                    <p>We deliver within Abuja in 24–48 hours. Standard delivery fee is $5. Would you like to proceed with an order?</p>
                  </motion.div>
                </div>
             </div>
             {/* Simple grid background */}
             <div className="absolute inset-0 opacity-[0.02] bg-[url('https://api.dicebear.com/7.x/identicon/svg?seed=minimal')] scale-150 pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
