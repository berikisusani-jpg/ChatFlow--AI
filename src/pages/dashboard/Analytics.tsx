import React from 'react';
import { BarChart, LineChart, Activity, TrendingUp, Users, MessageSquare } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-display font-medium text-white italic">Enterprise Analytics</h1>
        <p className="text-white/40">Real-time performance metrics and business intelligence.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Conversion Rate', value: '12.5%', trend: '+2.1%', icon: TrendingUp },
          { label: 'Avg. Response Time', value: '1.2s', trend: '-0.4s', icon: Activity },
          { label: 'Active Users', value: '842', trend: '+14%', icon: Users },
          { label: 'Total Messages', value: '42.1k', trend: '+8.2%', icon: MessageSquare },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 space-y-4">
            <div className="p-3 rounded-xl bg-white/5 w-fit text-brand-primary">
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-white/20">{stat.label}</span>
                <span className="text-[10px] font-bold text-brand-primary">{stat.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="glass-panel p-8 h-80 flex items-center justify-center border-dashed border-white/10">
            <span className="text-white/20 text-xs font-bold uppercase tracking-widest">Conversation Growth Chart</span>
         </div>
         <div className="glass-panel p-8 h-80 flex items-center justify-center border-dashed border-white/10">
            <span className="text-white/20 text-xs font-bold uppercase tracking-widest">AI Accuracy Heatmap</span>
         </div>
      </div>
    </div>
  );
}
