import React, { useState } from 'react';
import { Rocket, MessageCircle, Send, Code, Globe, Shield, CheckCircle2, Copy } from 'lucide-react';
import { motion } from 'framer-motion';

const CHANNELS = [
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, color: 'text-green-500', status: 'Enterprise' },
  { id: 'web', name: 'Web Widget', icon: Globe, iconColor: 'text-blue-500', status: 'Ready' },
  { id: 'api', name: 'Public API', icon: Code, color: 'text-brand-primary', status: 'Developer' },
];

export default function Deploy() {
  const [copied, setCopied] = useState(false);

  const snippet = `<script
  src="https://cdn.chatflow.ai/widget.js"
  data-agent-id="YOUR_AGENT_ID"
  async
></script>`;

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-brand-primary">
          <Rocket className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Deployment Studio</span>
        </div>
        <h1 className="text-4xl font-display font-medium text-white italic">Go Live</h1>
        <p className="text-white/40 max-w-lg">
          Deploy your trained agents across multiple channels with enterprise-grade security and scale.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {CHANNELS.map((channel) => (
          <div key={channel.id} className="glass-panel p-8 space-y-6 group hover:border-brand-primary/20 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-4 rounded-2xl bg-white/5 ${channel.color || ''}`}>
                <channel.icon className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-1 rounded bg-white/5 text-white/40">
                {channel.status}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold">{channel.name}</h3>
              <p className="text-xs text-white/40 mt-2">Connect your agent to {channel.name} instantly.</p>
            </div>
            <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all">
              Configure
            </button>
          </div>
        ))}
      </div>

      <div className="glass-panel p-10 space-y-8">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Code className="w-6 h-6" />
           </div>
           <div>
              <h2 className="text-2xl font-bold italic">Web Integration</h2>
              <p className="text-sm text-white/40">Add the ChatFlow widget to your website with a single line of code.</p>
           </div>
        </div>

        <div className="bg-bg-dark rounded-2xl border border-white/5 overflow-hidden">
           <div className="px-6 py-3 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
              <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Installation Snippet</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(snippet);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="text-white/40 hover:text-white transition-colors"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-brand-primary" /> : <Copy className="w-4 h-4" />}
              </button>
           </div>
           <pre className="p-6 text-sm text-brand-primary font-mono overflow-x-auto">
             {snippet}
           </pre>
        </div>

        <div className="grid md:grid-cols-2 gap-8 pt-4">
           <div className="space-y-4">
              <div className="flex items-center gap-2 text-white/60">
                 <Shield className="w-4 h-4" />
                 <span className="text-xs font-bold uppercase tracking-widest">Security</span>
              </div>
              <p className="text-xs text-white/40 leading-relaxed">
                Whitelisted domains, CSRF protection, and JWT verification for all client-side interactions.
              </p>
           </div>
           <div className="space-y-4">
              <div className="flex items-center gap-2 text-white/60">
                 <CheckCircle2 className="w-4 h-4" />
                 <span className="text-xs font-bold uppercase tracking-widest">Analytics</span>
              </div>
              <p className="text-xs text-white/40 leading-relaxed">
                Real-time event tracking for impressions, clicks, and conversion rates directly in your dashboard.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
