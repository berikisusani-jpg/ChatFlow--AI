import FAQPanel from '../../components/dashboard/FAQPanel';
import { Database, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Training() {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-brand-primary">
            <Database className="w-5 h-5 text-brand-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Knowledge Base</span>
          </div>
          <h1 className="text-4xl font-display font-medium tracking-tight text-white italic">FAQ Training</h1>
          <p className="text-white/40 max-w-lg leading-relaxed font-medium">
            Teach ChatFlow AI about your business. Add common questions and answers to help it serve your customers better.
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/[0.01] rounded-3xl sm:rounded-[2.5rem] border border-white/5 overflow-hidden"
      >
        <FAQPanel />
      </motion.div>
    </div>
  );
}
