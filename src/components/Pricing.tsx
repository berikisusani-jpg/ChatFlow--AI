import { motion } from 'framer-motion';
import { Check, ShieldCheck, Zap, Globe, Sparkles, Activity } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const TIERS = [
  {
    name: "Foundation",
    price: "49",
    description: "Ideal for boutique digital storefronts.",
    features: [
      "2,500 messages / cycle",
      "1 Cognitive AI Persona",
      "Standard Logic Analysis",
      "WhatsApp Gateway Access",
      "SSL Data Encryption"
    ],
    highlight: false,
    icon: <Globe className="w-5 h-5 text-white/40" />
  },
  {
    name: "Acceleration",
    price: "159",
    description: "The gold standard for scaling ops.",
    features: [
      "15,000 messages / cycle",
      "3 Cognitive AI Personas",
      "Neural Document Sync (PDF/Web)",
      "Intent & Sentiment Engine",
      "Priority API Routing",
      "Team Collaboration Nodes"
    ],
    highlight: true,
    icon: <Zap className="w-5 h-5 text-brand-primary" />
  },
  {
    name: "Sovereignty",
    price: "Custom",
    description: "Custom-built for institutional volume.",
    features: [
      "Uncapped Message Logic",
      "Multi-Tenant Cluster Support",
      "SSO & Custom Auth Modules",
      "On-Premise Node Hosting",
      "99.99% Guaranteed Uptime",
      "Dedicated Neural Engineers"
    ],
    highlight: false,
    icon: <ShieldCheck className="w-5 h-5 text-brand-secondary" />
  }
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-48 relative overflow-hidden bg-bg-dark/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 text-brand-secondary mb-6"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] italic">Institutional Grade Licensing</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl font-black tracking-tighter mb-8 text-white italic"
          >
            Capital <span className="text-brand-secondary">Allocation.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/30 max-w-2xl mx-auto text-lg md:text-xl font-medium tracking-wide mb-12"
          >
            Drive efficiency at scale with predictable, outcome-based infrastructure tiers.
          </motion.p>

          <div className="flex items-center justify-center gap-6 mb-20">
             <span className={cn("text-[11px] font-black uppercase tracking-widest transition-colors", !annual ? "text-white" : "text-white/20")}>Cycles Only</span>
             <button
                onClick={() => setAnnual(!annual)}
                className="w-16 h-8 rounded-full bg-white/5 border border-white/10 p-1 relative transition-all"
             >
                <motion.div
                    animate={{ x: annual ? 32 : 0 }}
                    className="w-6 h-6 rounded-full bg-brand-secondary shadow-[0_0_10px_rgba(0,209,255,0.5)]"
                />
             </button>
             <div className="flex items-center gap-2">
                <span className={cn("text-[11px] font-black uppercase tracking-widest transition-colors", annual ? "text-white" : "text-white/20 theme-transition")}>Annual Reserved</span>
                <span className="px-2 py-0.5 rounded bg-brand-primary/10 text-brand-primary text-[8px] font-black uppercase tracking-tighter">Save 20%</span>
             </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {TIERS.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={cn(
                "group relative p-12 rounded-[3.5rem] flex flex-col h-full transition-all duration-500 border overflow-hidden",
                tier.highlight
                  ? 'bg-surface-elevated border-brand-primary/20 shadow-huge'
                  : 'bg-white/[0.02] border-white/5 hover:border-white/10'
              )}
            >
              {tier.highlight && (
                <div className="absolute top-0 right-0 px-10 py-3 bg-brand-primary text-bg-dark text-[10px] font-black uppercase tracking-[0.2em] rounded-bl-[2.5rem] italic">
                  Cluster Preferred
                </div>
              )}

              <div className="mb-10">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                        {tier.icon}
                    </div>
                    <h3 className="text-xl font-display font-black tracking-tighter text-white italic uppercase">{tier.name}</h3>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black font-display tracking-tighter text-white italic">
                    {tier.price === "Custom" ? "" : "$"}
                    {tier.price === "Custom" ? tier.price : annual ? Math.floor(Number(tier.price) * 0.8) : tier.price}
                  </span>
                  {tier.price !== "Custom" && <span className="text-white/20 font-bold uppercase tracking-widest text-[10px]">/ Per Cycle</span>}
                </div>
                <p className="mt-4 text-white/30 text-sm font-medium tracking-wide leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <div className="flex-1 space-y-5 mb-12">
                {tier.features.map((feature, j) => (
                  <div key={j} className="flex gap-4 text-[13px] text-white/40 items-start group-hover:text-white/60 transition-colors">
                    <div className="mt-1 w-5 h-5 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0 group-hover:border-brand-primary/20 group-hover:bg-brand-primary/5 transition-all">
                      <Check className="w-3 h-3 text-brand-primary" />
                    </div>
                    <span className="font-medium tracking-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <Link to="/dashboard" className={cn(
                "w-full py-5 rounded-[1.5rem] font-black text-[12px] uppercase tracking-[0.2em] transition-all duration-500 text-center active:scale-95",
                tier.highlight
                  ? 'bg-brand-primary text-bg-dark shadow-[0_20px_40px_rgba(0,255,156,0.2)] hover:shadow-brand-primary/40'
                  : 'bg-white/[0.05] text-white/60 border border-white/5 hover:bg-white/[0.1] hover:text-white'
              )}>
                {tier.price === "Custom" ? "Contact Architecture" : "Initialize License"}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
