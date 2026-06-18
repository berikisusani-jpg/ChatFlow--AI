import { Search, Send, Bot, Sparkles, User, Info, CheckCheck, MoreVertical, X, Phone, Video, ChevronLeft } from 'lucide-react';
import { useState, useRef, useEffect, useMemo, FormEvent } from 'react';
import { cn } from '@/src/lib/utils';
import { generateAIResponse, generateSuggestions, generateConversationSummary, analyzeLeadPotential } from '@/src/services/geminiService';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: number;
  text: string;
  type: 'user' | 'ai';
  time: string;
}

interface Chat {
  id: number;
  name: string;
  lastMsg: string;
  time: string;
  unread: number;
  avatar: string;
}

const INITIAL_CHATS: Chat[] = [
  {
    id: 1,
    name: 'Hadiza Bello',
    lastMsg: 'Do you deliver to Gwarinpa?',
    time: '2m',
    unread: 2,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hadiza'
  },
  {
    id: 2,
    name: 'Kayshop Logistics',
    lastMsg: 'Rider is outside',
    time: '1h',
    unread: 0,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kay'
  },
  {
    id: 3,
    name: 'Uche Okafor',
    lastMsg: 'How much for the iPhone 13?',
    time: '3h',
    unread: 0,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Uche'
  },
];

export default function Inbox() {
  const [chats, setChats] = useState<Chat[]>(() => {
    const savedCustomers = localStorage.getItem('chatflow_customers');
    if (savedCustomers) {
        const parsed = JSON.parse(savedCustomers);
        return parsed.map((c: any) => ({
            id: c.id,
            name: c.name,
            lastMsg: c.lastMsg,
            time: 'Just now',
            unread: 0,
            avatar: c.avatar
        }));
    }
    return INITIAL_CHATS;
  });
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null); // Start null on mobile for list view
  const [isMobileView, setIsMobileView] = useState(false);

  // Persistence for messages per chat
  const [allMessages, setAllMessages] = useState<Record<number, Message[]>>(() => {
    const saved = localStorage.getItem('chatflow_messages');
    if (saved) return JSON.parse(saved);
    return {
      1: [
        { id: 1, text: 'Hello, do you deliver to Gwarinpa today?', type: 'user', time: '10:00 AM' },
        { id: 2, text: 'Hi Hadiza! Yes we do. Our dispatch rider leaves by 2 PM. Would you like to place an order?', type: 'ai', time: '10:01 AM' },
      ],
      2: [
        { id: 1, text: 'Is the rider there yet?', type: 'user', time: '09:15 AM' },
        { id: 2, text: 'Rider just called, he is outside your gate.', type: 'ai', time: '09:16 AM' },
      ],
      3: [
        { id: 1, text: 'I saw your post on IG. How much for the iPhone 13 128GB?', type: 'user', time: '08:00 AM' },
        { id: 2, text: 'Hello Uche! The iPhone 13 128GB is currently ₦450,000 for a clean UK used one.', type: 'ai', time: '08:05 AM' },
      ]
    };
  });

  const messages = useMemo(() => selectedChat ? (allMessages[selectedChat.id] || []) : [], [allMessages, selectedChat]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false); // Hidden by default on mobile
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [intelligence, setIntelligence] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Responsive check
  useEffect(() => {
    const checkViewport = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobileView(mobile);
      if (!mobile && !selectedChat) setSelectedChat(chats[0]);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, [selectedChat, chats]);

  useEffect(() => {
    localStorage.setItem('chatflow_messages', JSON.stringify(allMessages));
  }, [allMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping, error]);

  // AI Insights and Suggestions Effect
  useEffect(() => {
    if (selectedChat && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.type === 'user') {
        generateSuggestions(lastMessage.text).then(setSuggestions);
      } else {
        setSuggestions([]);
      }

      const history = messages.map(m => ({
        role: m.type === 'user' ? 'user' as const : 'model' as const,
        parts: [{ text: m.text }]
      }));

      Promise.all([
        generateConversationSummary(history),
        analyzeLeadPotential(history)
      ]).then(([summary, lead]) => {
        setIntelligence({ ...summary, ...lead });
      });
    }
  }, [selectedChat, messages]);

  const handleSend = async (e?: FormEvent, retryText?: string) => {
    e?.preventDefault();
    const textToSend = retryText || inputValue;
    if (!textToSend.trim()) return;

    setError(null);
    if (!retryText) {
      const userMessage: Message = {
        id: Date.now(),
        text: textToSend,
        type: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      if (selectedChat) {
        setAllMessages(prev => ({
          ...prev,
          [selectedChat.id]: [...(prev[selectedChat.id] || []), userMessage]
        }));
      }
      setInputValue('');
    }

    setIsTyping(true);

    try {
      const startTime = Date.now();
      const savedFaqs = localStorage.getItem('chatflow_faqs');
      const faqsList = savedFaqs ? JSON.parse(savedFaqs) : [];
      const faqContext = faqsList.map((f: any) => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n');

      const savedProfile = localStorage.getItem('chatflow_business_profile');
      const profile = savedProfile ? JSON.parse(savedProfile) : null;
      const profileContext = profile ? `
        Business Name: ${profile.name}
        Type: ${profile.type}
        Description: ${profile.description}
        Products/Services: ${profile.products}
        Hours: ${profile.workingHours}
        Delivery: ${profile.deliveryInfo}
        Contact: ${profile.contact}
      ` : "";

      const history = messages.map(m => ({
        role: m.type === 'user' ? 'user' as const : 'model' as const,
        parts: [{ text: m.text }]
      }));

      const aiResponse = await generateAIResponse(textToSend, history, faqContext, profileContext);

      const elapsedTime = Date.now() - startTime;
      const minDelay = 1500;
      if (elapsedTime < minDelay) {
        await new Promise(resolve => setTimeout(resolve, minDelay - elapsedTime));
      }

      setIsTyping(false);
      if (selectedChat) {
        setAllMessages(prev => ({
          ...prev,
          [selectedChat.id]: [...(prev[selectedChat.id] || []), {
            id: Date.now() + 1,
            text: aiResponse,
            type: 'ai',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]
        }));
      }
    } catch (err) {
      setIsTyping(false);
      setError("Failed to generate response. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="h-full flex bg-bg-dark rounded-none lg:rounded-3xl lg:border border-white/5 overflow-hidden lg:shadow-huge relative">

      {/* Chats Sidebar */}
      <div className={cn(
        "flex flex-col border-r border-white/5 bg-white/[0.01] transition-all duration-300",
        isMobileView ? (selectedChat ? "w-0 opacity-0 pointer-events-none" : "w-full") : "w-80"
      )}>
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold text-white mb-4">Inbox</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              type="text"
              placeholder="Search chat..."
              className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-white/10 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={cn(
                "w-full p-4 flex gap-4 hover:bg-white/[0.02] transition-colors text-left",
                selectedChat?.id === chat.id && "bg-white/[0.03] shadow-inner"
              )}
            >
              <img src={chat.avatar} alt="" className="w-12 h-12 rounded-xl bg-white/5" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-white truncate">{chat.name}</span>
                  <span className="text-[10px] text-white/20 uppercase font-black">{chat.time}</span>
                </div>
                <p className="text-xs text-white/40 truncate">{chat.lastMsg}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={cn(
        "flex-1 flex flex-col min-w-0 bg-bg-dark transition-all duration-300",
        isMobileView && !selectedChat ? "hidden" : "flex"
      )}>
        {selectedChat ? (
          <>
            <div className="h-20 px-4 lg:px-8 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3 lg:gap-4 overflow-hidden">
                {isMobileView && (
                  <button
                    onClick={() => setSelectedChat(null)}
                    className="p-2 -ml-2 text-white/40 hover:text-white"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}
                <img src={selectedChat.avatar} alt="" className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-bold text-white truncate text-sm lg:text-base">{selectedChat.name}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                    <span className="text-[9px] lg:text-[10px] font-black text-brand-primary uppercase tracking-widest truncate">AI Responding</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 lg:gap-4 text-white/30">
                <button className="hidden sm:block p-2 hover:text-white hover:bg-white/5 rounded-lg transition-all"><Phone className="w-5 h-5" /></button>
                <button className="hidden sm:block p-2 hover:text-white hover:bg-white/5 rounded-lg transition-all"><Video className="w-5 h-5" /></button>
                <div className="hidden sm:block w-px h-6 bg-white/5 mx-2" />
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className={cn("p-2 rounded-lg transition-all", showProfile ? "text-brand-primary bg-brand-primary/10" : "hover:text-white hover:bg-white/5")}
                >
                  <Info className="w-5 h-5 lg:w-6 lg:h-6" />
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 lg:px-8 py-6 lg:py-10 space-y-6 custom-scrollbar"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col max-w-[85%] lg:max-w-[70%]",
                    msg.type === 'user' ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div className={cn(
                    "p-3 lg:p-4 rounded-xl lg:rounded-2xl text-sm leading-relaxed",
                    msg.type === 'user'
                      ? "bg-white text-bg-dark font-medium rounded-tr-none"
                      : "bg-white/5 text-white/90 border border-white/5 rounded-tl-none shadow-xl"
                  )}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] lg:text-[10px] text-white/20 font-black uppercase mt-2 px-1">
                    {msg.time}
                  </span>
                </div>
              ))}
              {isTyping && (
                <div className="flex flex-col items-start max-w-[70%]">
                  <div className="bg-white/5 border border-white/5 p-3 lg:p-4 rounded-xl lg:rounded-2xl rounded-tl-none flex gap-1.5 shadow-xl">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/40 animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/40 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/40 animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 ml-1">
                    <Sparkles className="w-3 h-3 text-brand-primary animate-pulse" />
                    <span className="text-[9px] font-black text-brand-primary uppercase tracking-[0.2em]">AI Typing</span>
                  </div>
                </div>
              )}
              {error && (
                <div className="flex flex-col items-start max-w-[70%]">
                  <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl rounded-tl-none text-red-400 text-xs shadow-xl">
                    {error}
                  </div>
                  <button
                    onClick={() => handleSend(undefined, messages[messages.length - 1].text)}
                    className="mt-2 ml-1 text-[10px] font-bold text-brand-primary hover:underline uppercase tracking-widest flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" /> Retry Generation
                  </button>
                </div>
              )}
            </div>

            <div className="p-4 lg:p-8 pt-0 space-y-4">
              <AnimatePresence>
                {suggestions.length > 0 && !isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex flex-wrap gap-2"
                    >
                        {suggestions.map((suggestion, i) => (
                            <button
                                key={i}
                                onClick={() => handleSend(undefined, suggestion)}
                                className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[11px] font-bold text-brand-primary hover:bg-brand-primary/10 hover:border-brand-primary/20 transition-all uppercase tracking-wider"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSend} className="relative group">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Send a message..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl lg:rounded-2xl py-3 lg:py-4 pl-4 lg:pl-6 pr-12 lg:pr-14 text-sm focus:outline-none focus:border-white/20 transition-all font-medium"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-white text-bg-dark flex items-center justify-center hover:scale-[1.05] active:scale-95 transition-all shadow-xl disabled:opacity-50 disabled:scale-100"
                >
                  <Send className="w-3.5 h-3.5 lg:w-4 h-4" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center opacity-20">
            <Bot className="w-16 h-16 mb-4" />
            <h3 className="text-xl font-bold italic uppercase tracking-widest">Select a Conversation</h3>
          </div>
        )}
      </div>

      {/* Right Sidebar - Profile */}
      <AnimatePresence>
        {selectedChat && showProfile && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            className={cn(
              "flex flex-col border-l border-white/5 bg-bg-dark/95 backdrop-blur-xl lg:bg-white/[0.01] overflow-hidden z-20 transition-all shadow-huge",
              isMobileView ? "fixed inset-0" : "w-80 relative"
            )}
          >
            <div className="flex justify-end p-4 lg:hidden">
              <button onClick={() => setShowProfile(false)} className="p-2 text-white/40 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-10 text-center pb-6">
              <img src={selectedChat.avatar} alt="" className="w-20 h-20 rounded-3xl mx-auto mb-4 shadow-huge border-2 border-white/5" />
              <h3 className="text-lg font-bold text-white mb-1">{selectedChat.name}</h3>
              <p className="text-[10px] text-white/40 font-black uppercase tracking-widest italic">Verified Customer</p>
            </div>

            <div className="px-6 space-y-6 flex-1 overflow-y-auto pb-10 custom-scrollbar">
              {intelligence && (
                <div className="space-y-6">
                   <div className="p-5 rounded-2xl bg-brand-primary/5 border border-brand-primary/10 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-[0.05] pointer-events-none group-hover:scale-110 transition-transform">
                        <Sparkles className="w-12 h-12 text-brand-primary" />
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                         <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
                         <span className="text-[9px] font-black uppercase tracking-widest text-brand-primary">AI Summary</span>
                      </div>
                      <p className="text-xs text-white/70 leading-relaxed font-medium italic">
                         "{intelligence.summary}"
                      </p>
                   </div>

                   <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                         <div className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-1">Intent</div>
                         <div className={cn(
                            "text-xs font-bold",
                            intelligence.intent === 'Hot' ? 'text-orange-500' :
                            intelligence.intent === 'Warm' ? 'text-yellow-500' : 'text-blue-400'
                         )}>
                            {intelligence.intent}
                         </div>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                         <div className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-1">Lead Score</div>
                         <div className="text-xs font-bold text-white">{intelligence.score}/100</div>
                      </div>
                   </div>

                   <div className="space-y-3">
                      <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Key Issues</span>
                      <div className="flex flex-wrap gap-2">
                         {intelligence.issues?.map((issue: string, i: number) => (
                            <span key={i} className="px-2.5 py-1 rounded-lg bg-red-500/5 border border-red-500/10 text-[10px] font-bold text-red-400/80">
                               {issue}
                            </span>
                         ))}
                      </div>
                   </div>

                   <div className="space-y-3">
                      <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Next Steps</span>
                      <div className="space-y-2">
                         {intelligence.nextSteps?.map((step: string, i: number) => (
                            <div key={i} className="flex items-start gap-2 text-[11px] text-white/40 font-medium leading-snug">
                               <CheckCheck className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5" />
                               {step}
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
              )}

              <div className="space-y-4 pt-6 border-t border-white/5">
                <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Contact Details</span>
                <div className="space-y-3 text-[12px]">
                   <div className="flex justify-between items-center">
                      <span className="text-white/30 font-medium">Email</span>
                      <span className="text-white truncate max-w-[120px] font-bold">{selectedChat.name.toLowerCase().replace(' ', '.')}@gmail.com</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-white/30 font-medium">Phone</span>
                      <span className="text-white font-bold">+234 812 345 6789</span>
                   </div>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Automation</span>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                   <div className="flex items-center justify-between mb-2">
                     <span className="text-xs font-bold text-white/60">AI Mode</span>
                     <button className="w-10 h-5 rounded-full bg-brand-primary p-0.5 relative">
                        <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-bg-dark" />
                     </button>
                   </div>
                   <p className="text-[10px] text-white/20 leading-relaxed font-medium italic">
                     ChatFlow AI is managing responses for this customer based on your FAQ training.
                   </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
