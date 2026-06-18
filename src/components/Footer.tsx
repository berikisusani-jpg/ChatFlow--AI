import { MessageSquare, Twitter, Github, Linkedin, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="py-24 bg-bg-dark border-t border-white/5 relative overflow-hidden">
      {/* Subtle light effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-white/[0.01] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 pb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white text-bg-dark flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 fill-current" />
              </div>
              <span className="font-display font-medium text-2xl tracking-tighter text-white uppercase italic">ChatFlow</span>
            </Link>
            <p className="text-white/30 max-w-sm text-sm font-medium leading-relaxed">
              AI replies to your WhatsApp customers automatically. Train with your business FAQs and let it answer customer questions 24/7.
            </p>
          </div>

          <div className="flex flex-wrap gap-12">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Product</span>
              <ul className="space-y-3">
                <li><a href="#features" className="text-sm text-white/40 hover:text-white transition-colors">Features</a></li>
                <li><a href="#live-demo" className="text-sm text-white/40 hover:text-white transition-colors">Live Demo</a></li>
                <li><Link to="/dashboard" className="text-sm text-white/40 hover:text-white transition-colors">Try Demo</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Connect</span>
              <div className="flex gap-4">
                {[Twitter, Github, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-black uppercase tracking-widest text-white/10 italic text-center sm:text-left">
            © 2026 ChatFlow AI. All rights reserved.
          </p>
          <div className="flex gap-8 text-[11px] font-black uppercase tracking-widest text-white/10">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
