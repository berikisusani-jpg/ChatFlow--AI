import { Rocket, ShieldCheck, Copy, CheckCircle2, Terminal, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function Deploy() {
  const [copied, setCopied] = useState<string | null>(null);

  const config = {
    webhookUrl: 'https://api.chatflow.ai/webhooks/whatsapp/v1/7x92k1',
    apiToken: 'cf_live_92k1_02xm83l91pz0x',
    verifyToken: 'chatflow_secure_handshake'
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-brand-primary">
            <Rocket className="w-5 h-5 text-brand-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Deployment Center</span>
          </div>
          <h1 className="text-4xl font-display font-medium tracking-tight text-white italic">Go Live</h1>
          <p className="text-white/40 max-w-lg leading-relaxed font-medium">
            Connect your trained AI agent to WhatsApp and start automating your customer support in real-time.
          </p>
        </div>

        <div className="px-6 py-3 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Environment: Production</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 rounded-[2.5rem] bg-white/[0.01] border border-white/5 space-y-8"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                        <Terminal className="w-6 h-6 text-white/40" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">API Configuration</h3>
                        <p className="text-xs text-white/20 font-medium">Use these credentials to bridge your WhatsApp Business API.</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {[
                        { label: 'Webhook URL', value: config.webhookUrl, key: 'webhook' },
                        { label: 'API Token', value: config.apiToken, key: 'token' },
                        { label: 'Verify Token', value: config.verifyToken, key: 'verify' }
                    ].map((item) => (
                        <div key={item.key} className="space-y-2">
                            <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">{item.label}</label>
                            <div className="flex gap-2">
                                <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-xs font-mono text-white/60 truncate">
                                    {item.value}
                                </div>
                                <button
                                    onClick={() => handleCopy(item.value, item.key)}
                                    className="px-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all flex items-center justify-center text-white/40 hover:text-white"
                                >
                                    {copied === item.key ? <CheckCircle2 className="w-4 h-4 text-brand-primary" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-8 rounded-[2.5rem] bg-brand-primary/[0.02] border border-brand-primary/10 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                    <ShieldCheck className="w-32 h-32 text-brand-primary" />
                </div>

                <h3 className="text-lg font-bold text-white mb-4">Security Handshake</h3>
                <p className="text-sm text-white/40 leading-relaxed font-medium mb-6">
                    ChatFlow AI uses an encrypted WSS (WebSocket Secure) protocol to ensure all customer data is processed within your private instance.
                </p>
                <button className="flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline">
                    View Security Protocol <ExternalLink className="w-3 h-3" />
                </button>
            </motion.div>
        </div>

        <div className="lg:col-span-5">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-10 rounded-[3rem] bg-white/[0.01] border border-white/5 space-y-10"
            >
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">Integration Guide</h3>
                    <p className="text-xs text-white/20 font-medium italic leading-relaxed">Follow these steps to synchronize your agent.</p>
                </div>

                <div className="space-y-8">
                    {[
                        { step: '01', title: 'Meta Developer Portal', desc: 'Create a WhatsApp Business App in your Meta Developer account.' },
                        { step: '02', title: 'Configure Webhooks', desc: 'Paste the Webhook URL and Verify Token into the WhatsApp settings.' },
                        { step: '03', title: 'Authorize Agent', desc: 'Add your ChatFlow API Token to the Authorization header of your outbound calls.' },
                        { step: '04', title: 'Production Pulse', desc: 'The system will automatically detect the first incoming message and go live.' },
                    ].map((item, i) => (
                        <div key={i} className="flex gap-6">
                            <div className="text-2xl font-display font-black text-brand-primary opacity-20 italic shrink-0 leading-none">{item.step}</div>
                            <div className="space-y-1.5">
                                <h4 className="text-sm font-bold text-white tracking-tight leading-none">{item.title}</h4>
                                <p className="text-xs text-white/40 leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-4">
                    <button className="w-full py-4 rounded-2xl bg-white text-bg-dark font-black text-[11px] uppercase tracking-[0.2em] shadow-huge hover:scale-[1.02] active:scale-[0.98] transition-all">
                        Validate Connection
                    </button>
                </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
}
