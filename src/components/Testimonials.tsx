import { motion } from 'framer-motion';
import { Quote, Star, Sparkles } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "Director of Ops, Glow Fashion",
    content: "Deploying ChatFlow AI reduced our human query volume by 82% within the first 48 hours. The sentiment detection is frighteningly accurate.",
    avatarPath: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&auto=format&fit=crop"
  },
  {
    name: "Michael Chen",
    role: "CTO, NextStream",
    content: "Zero-latency training on our technical documentation changed the game. It handles complex architectural queries better than our senior support staff.",
    avatarPath: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&auto=format&fit=crop"
  },
  {
    name: "Elena Rodriguez",
    role: "Founder, Zenith Global",
    content: "Native translation across 95 languages allowed us to scale into the Asian market without hiring a single local agent. Pure efficiency.",
    avatarPath: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&auto=format&fit=crop"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-48 relative overflow-hidden bg-bg-dark">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-brand-primary mb-6"
          >
            <Sparkles className="w-4 h-4 shadow-[0_0_10px_rgba(0,255,156,0.5)]" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] italic">Social Validation</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl font-black tracking-tighter mb-8 text-white italic"
          >
            Trust <span className="text-brand-primary">Architected.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/30 max-w-2xl mx-auto text-lg md:text-xl font-medium tracking-wide"
          >
            Powering the world's most innovative high-growth commerce nodes.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="relative p-12 rounded-[4rem] bg-surface-elevated border border-white/5 group hover:border-brand-primary/20 transition-all duration-700 shadow-2xl"
            >
              <div className="flex gap-1 mb-8">
                {[1, 2, 3, 4, 5].map((_, j) => (
                    <Star key={j} className="w-3 h-3 fill-brand-primary text-brand-primary shadow-[0_0_8px_rgba(0,255,156,0.2)]" />
                ))}
              </div>

              <p className="text-lg text-white/50 leading-relaxed font-bold tracking-tight italic mb-10 group-hover:text-white transition-colors duration-500">
                "{t.content}"
              </p>

              <div className="flex items-center gap-5">
                <div className="relative">
                    <div className="absolute inset-0 bg-brand-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <img
                        src={t.avatarPath}
                        alt={t.name}
                        className="relative w-14 h-14 rounded-full border-2 border-white/10 group-hover:border-brand-primary/50 transition-colors duration-500 object-cover"
                        referrerPolicy="no-referrer"
                    />
                </div>
                <div>
                  <div className="font-display font-black text-white italic text-lg tracking-tight uppercase leading-tight">{t.name}</div>
                  <div className="text-[10px] text-white/20 font-black uppercase tracking-widest mt-0.5">{t.role}</div>
                </div>
              </div>

              <Quote className="absolute top-12 right-12 w-12 h-12 text-white/[0.02] group-hover:text-brand-primary/[0.05] transition-colors duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
