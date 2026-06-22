import { Sparkles, Video, Image as ImageIcon, Megaphone, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateCreativeAsset } from '../../services/glmService';

export default function CreativeStudio() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'image' | 'video' | 'ad'>('image');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setResult(null);
    try {
        const data = await generateCreativeAsset(prompt, activeTab);
        setResult(data);
    } catch (error) {
        console.error(error);
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-brand-primary">
            <Sparkles className="w-5 h-5 text-brand-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Open Source Creative Suite</span>
          </div>
          <h1 className="text-4xl font-display font-medium tracking-tight text-white italic">Creative Studio</h1>
          <p className="text-white/40 max-w-lg leading-relaxed font-medium">
            Generate high-fidelity marketing assets using open-source GLM-4 and CogView models.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
            {[
              { id: 'image', label: 'Image', icon: ImageIcon },
              { id: 'video', label: 'Video', icon: Video },
              { id: 'ad', label: 'Ad Copy', icon: Megaphone },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab.id ? 'bg-brand-primary text-bg-dark' : 'text-white/40 hover:text-white'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" /> {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8 rounded-[2.5rem] bg-white/[0.01] border border-white/5 space-y-6">
            <div className="space-y-2">
                <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">Asset Prompt</label>
                <textarea
                  rows={6}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the asset you want to generate..."
                  className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-sm font-medium focus:bg-white/[0.04] outline-none resize-none transition-all"
                />
            </div>
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-4 rounded-2xl bg-white text-bg-dark font-black text-[11px] uppercase tracking-[0.2em] shadow-huge flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Synthesizing...</>
              ) : (
                <><Send className="w-4 h-4" /> Generate Asset</>
              )}
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
           <div className="aspect-square lg:aspect-video rounded-[3rem] bg-white/[0.01] border border-white/5 flex items-center justify-center relative overflow-hidden group">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <div className="w-16 h-16 rounded-full border-2 border-brand-primary/20 border-t-brand-primary animate-spin" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary animate-pulse">Running Neural Inference</span>
                    </motion.div>
                ) : result ? (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full h-full p-4 flex flex-col gap-6"
                    >
                        {activeTab === 'ad' && (
                            <div className="p-6 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                                <div className="text-[9px] font-black text-brand-primary uppercase tracking-widest mb-2">Generated Ad Copy</div>
                                <p className="text-sm text-white/80 leading-relaxed font-medium italic">{result.copy}</p>
                            </div>
                        )}
                        <div className="flex-1 rounded-2xl overflow-hidden border border-white/10 relative">
                            {activeTab === 'video' ? (
                                <video src={result.url} controls className="w-full h-full object-cover" />
                            ) : (
                                <img src={result.url} alt="Generated" className="w-full h-full object-cover" />
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <div className="text-center space-y-4 opacity-20">
                        <Sparkles className="w-16 h-16 mx-auto" />
                        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Waiting for Prompt Signal</p>
                    </div>
                )}
              </AnimatePresence>
           </div>
        </div>
      </div>
    </div>
  );
}
