import { motion } from 'framer-motion';
import { Apple, Github, Chrome, Twitter, Play, Zap, ShieldCheck, Activity } from 'lucide-react';

const LOGOS = [
  { icon: Apple, label: "Apple" },
  { icon: Github, label: "GitHub" },
  { icon: Chrome, label: "Google" },
  { icon: Twitter, label: "Twitter" },
  { icon: Play, label: "Youtube" },
  { icon: Zap, label: "Fastly" },
  { icon: ShieldCheck, label: "Cloudflare" },
  { icon: Activity, label: "Datadog" },
];

export default function LogoMarquee() {
  return (
    <div className="py-20 bg-bg-dark/50 relative overflow-hidden border-y border-white/5">
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-bg-dark to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-bg-dark to-transparent z-10" />

      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Trusted by Global Infrastructure Teams</span>
            <div className="h-px flex-1 bg-white/5" />
        </div>
      </div>

      <div className="flex overflow-hidden">
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-20 shrink-0 pr-20"
        >
          {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
            <div key={i} className="flex items-center gap-4 group cursor-pointer">
              <logo.icon className="w-8 h-8 text-white/10 group-hover:text-brand-primary transition-all duration-500 group-hover:scale-110" />
              <span className="text-xl font-display font-black italic uppercase tracking-tighter text-white/10 group-hover:text-white transition-colors duration-500">{logo.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
