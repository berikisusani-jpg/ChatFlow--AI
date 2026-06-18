import { useState, useEffect } from 'react';
import { Search, Plus, Edit3, Trash2, Save, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const INITIAL_FAQS: FAQ[] = [
  { id: '1', question: 'Do you deliver in Abuja?', answer: 'Yes, we deliver within Abuja same-day for orders placed before 2 PM. Other locations take 24–48 hours.' },
  { id: '2', question: 'What are your working hours?', answer: 'Our physical store in Wuse 2 is open Monday to Saturday from 9 AM to 6 PM. We are closed on Sundays.' },
  { id: '3', question: 'How can I pay?', answer: 'We accept Bank Transfers and POS. We only accept Cash on Delivery for Abuja orders under ₦20,000.' },
];

export default function FAQPanel() {
  const [faqs, setFaqs] = useState<FAQ[]>(() => {
    const saved = localStorage.getItem('chatflow_faqs');
    return saved ? JSON.parse(saved) : INITIAL_FAQS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ question: '', answer: '' });

  useEffect(() => {
    localStorage.setItem('chatflow_faqs', JSON.stringify(faqs));
  }, [faqs]);

  const filteredFaqs = faqs.filter(f =>
    f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = () => {
    if (!formData.question || !formData.answer) return;

    if (editingId) {
      setFaqs(prev => prev.map(f => f.id === editingId ? { ...f, ...formData } : f));
      setEditingId(null);
    } else {
      const newFaq = { id: Date.now().toString(), ...formData };
      setFaqs(prev => [newFaq, ...prev]);
      setIsAdding(false);
    }
    setFormData({ question: '', answer: '' });
  };

  const startEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    setFormData({ question: faq.question, answer: faq.answer });
    setIsAdding(false);
  };

  const deleteFaq = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-white/20 transition-all font-medium"
          />
        </div>
        <button
          onClick={() => { setIsAdding(true); setEditingId(null); setFormData({ question: '', answer: '' }); }}
          className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-white text-bg-dark font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.05] active:scale-95 transition-all shadow-huge"
        >
          <Plus className="w-5 h-5" /> Add FAQ
        </button>
      </div>

      <AnimatePresence>
        {(isAdding || editingId) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-4 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 shadow-huge space-y-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white tracking-tight">{editingId ? 'Edit FAQ' : 'Add New FAQ'}</h3>
              <button
                onClick={() => { setIsAdding(false); setEditingId(null); }}
                className="p-2 text-white/20 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">Question</label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                  placeholder="e.g. Do you deliver in Abuja?"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 sm:px-6 py-4 text-sm focus:outline-none focus:border-white/20 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] ml-1">Answer</label>
                <textarea
                  rows={4}
                  value={formData.answer}
                  onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))}
                  placeholder="e.g. Yes, we deliver within Abuja in 24–48 hours."
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 sm:px-6 py-4 text-sm focus:outline-none focus:border-white/20 font-medium resize-none"
                />
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-4">
              <button
                onClick={() => { setIsAdding(false); setEditingId(null); }}
                className="w-full sm:w-auto px-8 py-3 rounded-2xl border border-white/5 text-white/40 hover:text-white hover:bg-white/5 transition-all text-sm font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="w-full sm:w-auto px-10 py-3 rounded-2xl bg-white text-bg-dark font-bold text-sm shadow-xl hover:scale-[1.05] active:scale-95 transition-all"
              >
                Save FAQ
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-4">
        {filteredFaqs.map((faq) => (
          <motion.div
            layout
            key={faq.id}
            className="p-5 sm:p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                 <h4 className="text-base sm:text-lg font-bold text-white mb-2 tracking-tight leading-tight">{faq.question}</h4>
                 <p className="text-sm text-white/40 leading-relaxed font-medium italic">"{faq.answer}"</p>
              </div>
              <div className="flex items-center gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity shrink-0 w-full sm:w-auto justify-end mt-4 sm:mt-0">
                <button onClick={() => startEdit(faq)} className="flex-1 sm:flex-none p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all flex justify-center"><Edit3 className="w-5 h-5" /></button>
                <button onClick={() => deleteFaq(faq.id)} className="flex-1 sm:flex-none p-3 rounded-xl bg-red-400/5 hover:bg-red-400/10 text-white/40 hover:text-red-400 transition-all flex justify-center"><Trash2 className="w-5 h-5" /></button>
              </div>
            </div>
          </motion.div>
        ))}
        {filteredFaqs.length === 0 && (
          <div className="py-20 text-center opacity-20">
             <Search className="w-12 h-12 mx-auto mb-4" />
             <p className="font-bold text-lg italic uppercase tracking-widest">No FAQs Found</p>
          </div>
        )}
      </div>
    </div>
  );
}
