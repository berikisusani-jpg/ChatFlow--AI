import BusinessProfileForm from '../../components/dashboard/BusinessProfile';
import { Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Profile() {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-brand-primary">
            <Settings className="w-5 h-5 text-brand-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Agent Configuration</span>
          </div>
          <h1 className="text-4xl font-display font-medium tracking-tight text-white italic">Business Profile</h1>
          <p className="text-white/40 max-w-lg leading-relaxed font-medium">
            Configure your AI agent's personality, knowledge, and behavior to match your brand.
          </p>
        </div>
      </div>

      <BusinessProfileForm />
    </div>
  );
}
