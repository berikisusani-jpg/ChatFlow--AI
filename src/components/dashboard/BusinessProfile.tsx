import { useState, useEffect } from 'react';
import { Save, Building2, Clock, Truck, Phone, MessageCircle, ListChecks, Info, Sparkles, CheckCircle2, Bot, Shield, Heart, Target, Zap, LayoutGrid, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/src/lib/utils';
import { BUSINESS_DEMOS } from '@/src/constants/demoData';

interface BusinessProfile {
  name: string;
  type: string;
  description: string;
  products: string;
  workingHours: string;
  deliveryInfo: string;
  contact: string;
  tone: string;
}

const DEFAULT_PROFILE: BusinessProfile = {
  name: "ChatFlow Electronics",
  type: "E-commerce store",
  description: "A premium electronics store specializing in high-end gadgets and home automation.",
  products: "Smartphones, Laptops, Smart Home devices, Audio gear",
  workingHours: "Mon-Fri: 9AM - 6PM, Sat: 10AM - 4PM, Sun: Closed",
  deliveryInfo: "Free shipping on orders over $100. 3-5 business days for standard delivery.",
  contact: "Email: support@chatflow.ai, Phone: +1 555-0123",
  tone: "Professional"
};

const TONE_OPTIONS = [
  { id: 'Professional', icon: Shield, desc: 'Balanced, objective, and authoritative.', preview: "Hello. I have checked your order status. It is currently being processed and will ship within 24 hours." },
  { id: 'Friendly', icon: Heart, desc: 'Warm, welcoming, and very approachable.', preview: "Hi there! I've got great news! Your order is being packed up right now and should be on its way to you by tomorrow! 😊" },
  { id: 'Luxury Brand', icon: Sparkles, desc: 'Sophisticated, elegant, and exclusive.', preview: "Good afternoon. We are currently preparing your acquisition for transit. You can expect a dispatch notification shortly." },
  { id: 'Casual', icon: MessageCircle, desc: 'Relaxed, peer-to-peer, and helpful.', preview: "Hey! Just wanted to let you know your order's in the works. It'll be out the door soon!" },
  { id: 'Sales Focused', icon: Target, desc: 'Persuasive with strong calls to action.', preview: "Your order is being processed! Check out these matching accessories to complete your setup before we ship!" },
  { id: 'Corporate', icon: Building2, desc: 'Structured and strictly protocol-driven.', preview: "Order ID #412: Status - Processing. Estimated dispatch window: T-minus 18 hours. Internal SLA maintained." },
  { id: 'Fast Support', icon: Zap, desc: 'Brief, direct, and bullet-focused.', preview: "Status: Processing. Shipping: <24h. Tracking: Sent to email." },
];

export default function BusinessProfileForm() {
  const [profile, setProfile] = useState<BusinessProfile>(() => {
    const saved = localStorage.getItem('chatflow_business_profile');
    return saved ? JSON.parse(saved) : { ...DEFAULT_PROFILE, tone: 'Professional' };
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [previewTone, setPreviewTone] = useState(profile.tone);

  const applyDemo = (demoId: keyof typeof BUSINESS_DEMOS) => {
    const demo = BUSINESS_DEMOS[demoId];
    setProfile(demo.profile);
    setPreviewTone(demo.profile.tone);
    localStorage.setItem('chatflow_current_demo', demoId);
    localStorage.setItem('chatflow_business_profile', JSON.stringify(demo.profile));
    localStorage.removeItem('chatflow_customers'); // Force reload of customers on next visit to Inbox
    localStorage.removeItem('chatflow_faqs'); // Force reload of FAQs
    setShowSuccess(true);
    setTimeout(() => {
        setShowSuccess(false);
        window.location.reload(); // Hard refresh to reset context and data
    }, 1000);
  };

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem('chatflow_business_profile', JSON.stringify(profile));
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const InputWrapper = ({ label, icon: Icon, children, description }: any) => (
    <div className="space-y-2.5">
      <div className="flex justify-between items-end ml-1">
        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-white/30">
          <Icon className="w-3.5 h-3.5 text-brand-primary" /> {label}
        </label>
        {description && <span className="text-[9px] text-white/10 font-bold uppercase italic">{description}</span>}
      </div>
      <div className="relative group">
        {children}
        <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none group-focus-within:border-brand-primary/30 transition-colors duration-500" />
      </div>
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 className="text-3xl font-display font-black tracking-tight italic flex items-center gap-3">
            Business <span className="text-brand-primary">Model</span>
            <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse shadow-[0_0_8px_rgba(0,255,156,0.5)]" />
          </h2>
          <p className="text-[13px] text-white/30 font-medium mt-1">Foundational parameters for the agent's inference engine.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="flex bg-white/[0.03] border border-white/5 rounded-2xl p-1 gap-1">
                {(Object.keys(BUSINESS_DEMOS) as Array<keyof typeof BUSINESS_DEMOS>).map((key) => (
                    <button
                        key={key}
                        onClick={() => applyDemo(key)}
                        className={cn(
                            "px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
                            localStorage.getItem('chatflow_current_demo') === key
                                ? "bg-brand-primary text-bg-dark shadow-lg"
                                : "text-white/20 hover:text-white/40"
                        )}
                    >
                        {key}
                    </button>
                ))}
            </div>
            <button
            onClick={handleSave}
            disabled={isSaving}
            className={cn(
                "relative px-10 py-4 rounded-[1.2rem] font-black text-[12px] uppercase tracking-widest transition-all duration-500 flex items-center gap-3 overflow-hidden group",
                showSuccess ? "bg-green-500 text-bg-dark" : "bg-brand-primary text-bg-dark shadow-2xl shadow-brand-primary/20 hover:scale-105 active:scale-95"
            )}
            >
              <AnimatePresence mode="wait">
                {isSaving ? (
                  <motion.div key="saving" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-bg-dark/30 border-t-bg-dark rounded-full animate-spin" />
                    Synchronizing...
                  </motion.div>
                ) : showSuccess ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Deploy Success
                  </motion.div>
                ) : (
                  <motion.div key="save" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                    <Save className="w-4 h-4" /> Push Updates
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
        </div>
      </div>

      <div className="grid xl:grid-cols-12 gap-10">
        <div className="xl:col-span-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-10 rounded-[3rem] bg-surface-elevated border border-white/[0.05] relative overflow-hidden group mb-10"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                <Sparkles className="w-48 h-48" />
              </div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Bot className="w-5 h-5 text-brand-primary" />
                            <h3 className="text-xl font-display font-black italic tracking-tight uppercase">Neural Persona Engine</h3>
                        </div>
                        <p className="text-white/30 text-xs font-medium">Fine-tune the linguistic output layer for your brand identity.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {TONE_OPTIONS.map((tone) => (
                        <button
                            key={tone.id}
                            onClick={() => {
                                setProfile({ ...profile, tone: tone.id });
                                setPreviewTone(tone.id);
                            }}
                            className={cn(
                                "flex flex-col items-start p-6 rounded-[2rem] border transition-all duration-500 text-left group/tone",
                                profile.tone === tone.id
                                    ? "bg-brand-primary/10 border-brand-primary/30 shadow-xl"
                                    : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]"
                            )}
                        >
                            <div className={cn(
                                "p-3 rounded-xl mb-4 transition-colors",
                                profile.tone === tone.id ? "bg-brand-primary text-bg-dark" : "bg-white/5 text-white/40 group-hover/tone:text-white"
                            )}>
                                <tone.icon className="w-5 h-5" />
                            </div>
                            <div className={cn(
                                "text-[11px] font-black uppercase tracking-widest mb-1",
                                profile.tone === tone.id ? "text-brand-primary" : "text-white/60"
                            )}>
                                {tone.id}
                            </div>
                            <div className="text-[10px] text-white/20 font-medium leading-tight">{tone.desc}</div>
                        </button>
                    ))}
                </div>

                <div className="p-8 rounded-[2.5rem] bg-bg-dark/40 border border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/[0.02] to-transparent pointer-events-none" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <MessageCircle className="w-3.5 h-3.5 text-brand-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Real-time Inference Preview</span>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center shrink-0">
                                <Bot className="w-5 h-5 text-brand-primary" />
                            </div>
                            <div className="space-y-2 flex-1">
                                <div className="text-[10px] font-black uppercase tracking-widest text-white/40 italic">Agent Preview</div>
                                <div className="p-6 rounded-2xl rounded-tl-none bg-white/[0.03] border border-white/5 text-sm font-medium italic text-white/80 leading-relaxed max-w-2xl relative">
                                    <div className="absolute -left-2 top-0 w-2 h-2 bg-white/[0.03] rotate-45 border-l border-t border-white/5" />
                                    {TONE_OPTIONS.find(t => t.id === profile.tone)?.preview}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>
        </div>

        <div className="xl:col-span-6 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-10 rounded-[2.5rem] bg-surface-elevated border border-white/[0.05] space-y-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
                <Building2 className="w-32 h-32" />
            </div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/20 italic">Primary Identity</h3>

            <InputWrapper label="Digital Alias" icon={Building2} description="Global Identifier">
              <input
                type="text"
                value={profile.name}
                onChange={e => setProfile({...profile, name: e.target.value})}
                placeholder="e.g. ChatFlow Systems"
                className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-sm font-medium focus:bg-white/[0.04] outline-none transition-all placeholder:text-white/5"
              />
            </InputWrapper>

            <div className="grid sm:grid-cols-2 gap-6">
                <InputWrapper label="Domain Category" icon={Info}>
                <input
                    type="text"
                    value={profile.type}
                    onChange={e => setProfile({...profile, type: e.target.value})}
                    placeholder="e.g. Fintech"
                    className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-sm font-medium focus:bg-white/[0.04] outline-none transition-all"
                />
                </InputWrapper>

                <InputWrapper label="Communication Tier" icon={Clock}>
                <input
                    type="text"
                    value={profile.workingHours}
                    onChange={e => setProfile({...profile, workingHours: e.target.value})}
                    className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-sm font-medium focus:bg-white/[0.04] outline-none transition-all"
                />
                </InputWrapper>
            </div>

            <InputWrapper label="Mission Brief" icon={MessageCircle} description="Max 500 chars">
              <textarea
                rows={4}
                value={profile.description}
                onChange={e => setProfile({...profile, description: e.target.value})}
                placeholder="Define the central objective..."
                className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-sm font-medium focus:bg-white/[0.04] outline-none resize-none transition-all"
              />
            </InputWrapper>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.1 }}
             className="p-10 rounded-[2.5rem] bg-surface-elevated border border-white/[0.05] space-y-8"
          >
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/20 italic">Inventory & Assets</h3>

            <InputWrapper label="Core Offerings" icon={ListChecks}>
              <textarea
                rows={4}
                value={profile.products}
                onChange={e => setProfile({...profile, products: e.target.value})}
                placeholder="List products or specific services..."
                className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-sm font-medium focus:bg-white/[0.04] outline-none resize-none transition-all"
              />
            </InputWrapper>
          </motion.div>
        </div>

        <div className="xl:col-span-6 space-y-8">
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="p-10 rounded-[2.5rem] bg-surface-elevated border border-white/[0.05] space-y-8"
           >
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/20 italic">Fulfillment & Gateway</h3>

              <InputWrapper label="Logistics Logic" icon={Truck} description="Sync with DHL/FedEx">
                <textarea
                  rows={5}
                  value={profile.deliveryInfo}
                  onChange={e => setProfile({...profile, deliveryInfo: e.target.value})}
                  className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-sm font-medium focus:bg-white/[0.04] outline-none resize-none transition-all"
                />
              </InputWrapper>

              <InputWrapper label="Escalation Channels" icon={Phone}>
                <textarea
                  rows={2}
                  value={profile.contact}
                  onChange={e => setProfile({...profile, contact: e.target.value})}
                  className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-sm font-medium focus:bg-white/[0.04] outline-none resize-none transition-all"
                />
              </InputWrapper>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
