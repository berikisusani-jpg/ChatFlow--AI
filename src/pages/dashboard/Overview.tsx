import LiveActivityFeed from '../../components/dashboard/LiveActivityFeed';
import { LayoutGrid, Sparkles, Activity, Users, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Overview() {
  const stats = [
    { label: 'Total Inferences', value: '12.4k', icon: Sparkles, color: 'text-brand-primary' },
    { label: 'Active Sessions', value: '142', icon: Activity, color: 'text-blue-400' },
    { label: 'Lead Potential', value: '85%', icon: Users, color: 'text-orange-500' },
    { label: 'AI Resolution', value: '92%', icon: MessageSquare, color: 'text-brand-secondary' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-brand-primary">
            <LayoutGrid className="w-5 h-5 text-brand-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">System Overview</span>
          </div>
          <h1 className="text-4xl font-display font-medium tracking-tight text-white italic">Agent Dashboard</h1>
          <p className="text-white/40 max-w-lg leading-relaxed font-medium">
            Monitor real-time AI performance and customer interaction metrics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4"
          >
            <div className={`p-3 rounded-xl bg-white/5 w-fit ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-display font-bold text-white">{stat.value}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/20">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-8 p-8 rounded-[2.5rem] bg-white/[0.01] border border-white/5"
        >
          <LiveActivityFeed />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-4 p-8 rounded-[2.5rem] bg-white/[0.01] border border-white/5 flex flex-col items-center justify-center text-center space-y-6"
        >
          <div className="w-20 h-20 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-brand-primary animate-pulse" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Agent is Healthy</h3>
            <p className="text-sm text-white/40 leading-relaxed font-medium">
              Your AI model is responding within target latency and maintains high sentiment scores.
            </p>
          </div>
          <button className="px-8 py-3 rounded-2xl bg-white/5 border border-white/5 text-[11px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all">
            View Analytics
          </button>
        </motion.div>
      </div>
    </div>
  );
}
