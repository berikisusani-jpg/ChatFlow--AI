import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '@/src/context/NotificationContext';
import { Sparkles, Flame, UserPlus, Activity, ShieldCheck, Clock } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function LiveActivityFeed() {
  const { activityStream } = useNotifications();

  const getIcon = (type: string) => {
    switch (type) {
      case 'ai': return Sparkles;
      case 'lead': return Flame;
      case 'customer': return UserPlus;
      case 'system': return Activity;
      default: return ShieldCheck;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'ai': return 'text-brand-primary';
      case 'lead': return 'text-orange-500';
      case 'customer': return 'text-brand-secondary';
      case 'system': return 'text-blue-400';
      default: return 'text-white/40';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
          <h3 className="text-[11px] font-black uppercase tracking-[0.4em] italic text-white">Neural Event Stream</h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-black text-white/20 uppercase tracking-widest">
            Live Cluster Sync
        </div>
      </div>

      <div className="space-y-4 max-h-[600px] overflow-hidden relative">
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-dark to-transparent z-10 pointer-events-none" />
        <AnimatePresence initial={false}>
          {activityStream.slice(0, 8).map((event, i) => {
            const Icon = getIcon(event.type);
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-all relative overflow-hidden">
                    <div className={cn("shrink-0 p-2.5 rounded-xl bg-white/5", getColor(event.type))}>
                        <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">{event.title}</span>
                            <div className="flex items-center gap-1.5 text-[9px] font-bold text-white/10 uppercase italic">
                                <Clock className="w-2.5 h-2.5" />
                                {event.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            </div>
                        </div>
                        <p className="text-[11px] text-white/30 leading-snug truncate italic font-medium">{event.message}</p>
                    </div>
                </div>
                {i < Math.min(activityStream.length, 8) - 1 && (
                    <div className="ml-7 h-4 w-px bg-white/[0.05]" />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {activityStream.length === 0 && (
            <div className="py-20 text-center">
                <div className="flex justify-center mb-4 opacity-20">
                    <Activity className="w-10 h-10 animate-pulse" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/10 italic">Awaiting pulse signal from cloud clusters...</p>
            </div>
        )}
      </div>
    </div>
  );
}
