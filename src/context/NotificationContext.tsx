import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Bell, Sparkles, UserPlus, Flame, MessageSquare, ShieldCheck, X, Activity } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export type NotificationType = 'ai' | 'lead' | 'customer' | 'system' | 'success';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (type: NotificationType, title: string, message: string) => void;
  removeNotification: (id: string) => void;
  activityStream: Notification[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeToasts, setActiveToasts] = useState<Notification[]>([]);
  const [activityStream, setActivityStream] = useState<Notification[]>([]);

  const addNotification = useCallback((type: NotificationType, title: string, message: string) => {
    const id = Math.random().toString(36).substring(7);
    const newNotif: Notification = { id, type, title, message, timestamp: new Date() };

    setNotifications(prev => [newNotif, ...prev].slice(0, 50));
    setActivityStream(prev => [newNotif, ...prev].slice(0, 100));
    setActiveToasts(prev => [...prev, newNotif]);

    // Auto-remove toast after 5s
    setTimeout(() => {
      setActiveToasts(prev => prev.filter(n => n.id !== id));
    }, 5000);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setActiveToasts(prev => prev.filter(n => n.id !== id));
  }, []);

  // Simulate "Live" feel with random events
  useEffect(() => {
    const events = [
      { type: 'ai' as const, title: 'Inference Complete', msg: 'AI successfully resolved inquiry for node: #AX-42' },
      { type: 'lead' as const, title: 'Hot Lead Detected', msg: 'Buying intent detected for customer: Alice Walker' },
      { type: 'customer' as const, title: 'New Connection', msg: 'Incoming session from San Francisco cluster' },
      { type: 'system' as const, title: 'Node Scaled', msg: 'Auto-scaling: New inference node deployed in EU-West-1' },
      { type: 'ai' as const, title: 'Sentiment Shift', msg: 'Sentiment moved to [Positive] for ongoing session #B2' },
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        const event = events[Math.floor(Math.random() * events.length)];
        addNotification(event.type, event.title, event.msg);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [addNotification]);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, activityStream }}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-8 right-8 z-[100] flex flex-col gap-4 pointer-events-none">
        <AnimatePresence>
          {activeToasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              className="pointer-events-auto"
            >
              <Toast notification={toast} onClose={() => removeNotification(toast.id)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

const Toast = ({ notification, onClose }: { notification: Notification; onClose: () => void }) => {
  const icons = {
    ai: { icon: Sparkles, color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
    lead: { icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    customer: { icon: UserPlus, color: 'text-brand-secondary', bg: 'bg-brand-secondary/10' },
    system: { icon: Activity, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    success: { icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  };

  const { icon: Icon, color, bg } = icons[notification.type];

  return (
    <div className="w-[380px] p-6 rounded-[2rem] bg-bg-dark/90 backdrop-blur-xl border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative group overflow-hidden">
      <div className={cn("absolute inset-0 opacity-5 pointer-events-none", bg)} />
      <div className="flex gap-4 relative z-10">
        <div className={cn("p-3 rounded-xl h-fit shrink-0", bg, color)}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white italic">{notification.title}</h4>
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{notification.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <p className="text-[13px] text-white/60 font-medium leading-relaxed italic">{notification.message}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/5 rounded-lg text-white/10 hover:text-white transition-all h-fit"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="absolute bottom-0 left-0 h-1 bg-brand-primary animate-toast-progress" />
    </div>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
};
