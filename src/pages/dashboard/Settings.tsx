import BusinessProfileForm from '../../components/dashboard/BusinessProfile';
import { Settings as SettingsIcon, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function Settings() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-brand-primary">
            <SettingsIcon className="w-5 h-5 text-brand-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">System Parameters</span>
          </div>
          <h1 className="text-4xl font-display font-medium tracking-tight text-white italic">Business <span className="text-white/30">Profile</span></h1>
          <p className="text-white/40 max-w-lg leading-relaxed font-medium">
            Configure your brand identity, operational hours, and AI personality settings.
          </p>
        </div>

        <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-brand-primary/10 border border-brand-primary/20">
            <ShieldCheck className="w-5 h-5 text-brand-primary" />
            <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Encryption Active</span>
                <span className="text-[9px] font-bold text-white/40 uppercase">RSA-4096 Protection</span>
            </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <BusinessProfileForm />
      </motion.div>
    </div>
  );
}
