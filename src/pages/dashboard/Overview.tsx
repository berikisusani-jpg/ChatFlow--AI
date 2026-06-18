import { motion } from 'motion/react';
import {
  MessageSquare,
  Sparkles,
  Flame,
  Clock,
  TrendingUp,
  Users,
  BrainCircuit,
  Zap
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import LiveActivityFeed from '../../components/dashboard/LiveActivityFeed';

const DATA = [
  { name: '00:00', messages: 120, ai: 95 },
  { name: '04:00', messages: 80, ai: 70 },
  { name: '08:00', messages: 250, ai: 210 },
  { name: '12:00', messages: 480, ai: 420 },
  { name: '16:00', messages: 390, ai: 340 },
  { name: '20:00', messages: 210, ai: 180 },
  { name: '23:59', messages: 150, ai: 130 },
];

const STATS = [
  { label: 'Total Messages', value: '1,284', change: '+12%', icon: MessageSquare, color: 'text-blue-400' },
  { label: 'AI Resolved', value: '89%', change: '+5%', icon: Sparkles, color: 'text-brand-primary' },
  { label: 'Hot Leads', value: '42', change: '+18%', icon: Flame, color: 'text-orange-500' },
  { label: 'Avg Response', value: '1.2s', change: '-0.4s', icon: Clock, color: 'text-purple-400' },
];

export default function Overview() {
  return (
    <div className="space-y-10 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-brand-primary">
            <BrainCircuit className="w-5 h-5 text-brand-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Neural Dashboard</span>
          </div>
          <h1 className="text-4xl font-display font-medium tracking-tight text-white italic">Intelligence <span className="text-white/30 text-3xl">Overview</span></h1>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Network Status: <span className="text-white">Optimal</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <stat.icon className="w-24 h-24" />
            </div>
            <div className="relative z-10">
                <div className={cn("p-3 rounded-xl bg-white/5 w-fit mb-6", stat.color)}>
                    <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-1">{stat.label}</div>
                <div className="flex items-baseline gap-3">
                    <div className="text-3xl font-display font-black text-white italic tracking-tight">{stat.value}</div>
                    <div className="text-[10px] font-bold text-brand-primary flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" />
                        {stat.change}
                    </div>
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid xl:grid-cols-12 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="xl:col-span-8 p-8 rounded-[3rem] bg-white/[0.01] border border-white/5"
        >
          <div className="flex items-center justify-between mb-10 px-4">
            <div>
                <h3 className="text-xl font-display font-black italic text-white uppercase tracking-tight">Inference Volume</h3>
                <p className="text-xs text-white/20 font-medium">Message processing clusters across 24h cycle</p>
            </div>
            <div className="flex gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-primary" />
                    <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">AI Resolved</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Total Traffic</span>
                </div>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DATA}>
                <defs>
                  <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FF9C" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#00FF9C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#ffffff20', fontSize: 10, fontWeight: 900 }}
                    dy={15}
                />
                <YAxis
                    hide
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#0A0A0A',
                        border: '1px solid #ffffff10',
                        borderRadius: '16px',
                        fontSize: '12px',
                        color: '#fff'
                    }}
                    itemStyle={{ color: '#fff' }}
                />
                <Area
                    type="monotone"
                    dataKey="messages"
                    stroke="#ffffff20"
                    fill="transparent"
                    strokeWidth={2}
                    dot={false}
                />
                <Area
                    type="monotone"
                    dataKey="ai"
                    stroke="#00FF9C"
                    fillOpacity={1}
                    fill="url(#colorAi)"
                    strokeWidth={3}
                    dot={{ fill: '#00FF9C', r: 4, strokeWidth: 2, stroke: '#00FF9C' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="xl:col-span-4 p-8 rounded-[3rem] bg-white/[0.01] border border-white/5"
        >
          <LiveActivityFeed />
        </motion.div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
