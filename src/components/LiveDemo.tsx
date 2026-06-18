import { motion } from 'motion/react';
import { MessageSquare, Sparkles } from 'lucide-react';

export default function LiveDemo() {
  return (
    <section className="py-24 sm:py-48 bg-bg-dark border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
           <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary mb-6 block">Live Interaction</span>
           <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-white italic">
             Conversations that feel <span className="text-white/30">real.</span>
           </h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex gap-4 items-start"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
               <span className="text-xs font-bold text-white/40">JD</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl rounded-tl-none text-white/80 text-sm shadow-xl">
               Do you deliver in Abuja?
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="flex gap-4 items-start justify-end"
          >
            <div className="bg-brand-primary/10 border border-brand-primary/20 p-5 rounded-2xl rounded-tr-none text-brand-primary text-sm shadow-xl flex gap-3 items-start">
               <div className="w-5 h-5 rounded-lg bg-brand-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3" />
               </div>
               <span>Yes, we currently deliver within Abuja in 24–48 hours.</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
               <MessageSquare className="w-4 h-4 text-brand-primary" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.4 }}
            className="flex gap-4 items-start"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
               <span className="text-xs font-bold text-white/40">JD</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl rounded-tl-none text-white/80 text-sm shadow-xl">
               What are your working hours?
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 2.0 }}
            className="flex gap-4 items-start justify-end"
          >
            <div className="bg-brand-primary/10 border border-brand-primary/20 p-5 rounded-2xl rounded-tr-none text-brand-primary text-sm shadow-xl flex gap-3 items-start">
               <div className="w-5 h-5 rounded-lg bg-brand-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3" />
               </div>
               <span>We’re available Monday–Saturday from 8AM to 6PM.</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
               <MessageSquare className="w-4 h-4 text-brand-primary" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
