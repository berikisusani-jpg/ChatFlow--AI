import { MessageSquare, Database, LogOut, Menu, X, Bell, Zap, Cpu, LayoutGrid, Settings } from 'lucide-react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const MENU_ITEMS = [
  { icon: LayoutGrid, label: 'Overview', href: '/dashboard/overview' },
  { icon: MessageSquare, label: 'Inbox', href: '/dashboard/inbox' },
  { icon: Database, label: 'FAQ Training', href: '/dashboard/training' },
  { icon: Settings, label: 'Agent Profile', href: '/dashboard/profile' },
];

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (o: boolean) => void }) {
  const navigate = useNavigate();

  const sidebarContent = (
    <aside className="w-72 bg-bg-dark border-r border-white/5 flex flex-col h-full">
      <div className="p-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 group transition-all"
        >
          <div className="w-8 h-8 rounded-lg bg-white text-bg-dark flex items-center justify-center group-hover:scale-110 transition-transform">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <span className="font-display font-medium text-lg tracking-tight text-white uppercase italic">ChatFlow</span>
        </button>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-1">
        {MENU_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
              isActive
                ? "bg-white text-bg-dark shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                : "text-white/40 hover:text-white hover:bg-white/[0.03]"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-8">
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/20 hover:text-red-400 hover:bg-red-400/5 transition-all group"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 w-72 bg-bg-dark z-[70] lg:hidden"
            >
              <div className="absolute top-6 right-6">
                <button onClick={() => setIsOpen(false)} className="p-2 text-white/40 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const location = useLocation();
  const pageTitle = MENU_ITEMS.find(item => location.pathname.startsWith(item.href))?.label || 'Dashboard';

  return (
    <header className="h-16 lg:h-20 flex items-center justify-between px-4 lg:px-8 border-b border-white/[0.03] bg-bg-dark/50 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-white/40 hover:text-white transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg lg:text-xl font-display font-medium tracking-tight text-white">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-3 lg:gap-6">
        <div className="h-9 w-9 lg:h-10 lg:w-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/20 hover:text-white cursor-pointer transition-colors relative">
           <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
           <div className="absolute top-2 right-2 lg:top-2.5 lg:right-2.5 w-1.5 h-1.5 rounded-full bg-brand-primary" />
        </div>
        <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-white/5 p-0.5 cursor-pointer hover:border-white/10 transition-colors">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            alt="Avatar"
            className="w-full h-full rounded-full grayscale hover:grayscale-0 transition-all shadow-xl"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
}
