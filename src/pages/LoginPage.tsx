import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Zap, Mail, Lock, ArrowRight } from 'lucide-react';
import api from '../services/apiService';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = isSignup ? '/auth/signup' : '/auth/login';
      const res = await api.post(endpoint, { email, password, name: email.split('@')[0] });
      login(res.data.user, res.data.accessToken, res.data.refreshToken);
    } catch (err) {
      alert('Authentication failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(circle_at_50%_50%,_#141414_0%,_#0A0A0A_100%)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-panel p-10 space-y-8"
      >
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-brand-primary/10 text-brand-primary mb-4">
            <Zap className="w-8 h-8 fill-current" />
          </div>
          <h1 className="text-3xl font-bold italic uppercase tracking-tighter">ChatFlow AI</h1>
          <p className="text-white/40">{isSignup ? 'Create your account' : 'Welcome back, sign in'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-brand-primary transition-colors" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-brand-primary/50 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-brand-primary transition-colors" />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-brand-primary/50 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full cyber-button flex items-center justify-center gap-2">
            {isSignup ? 'Create Account' : 'Sign In'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-sm text-white/40 hover:text-white transition-colors"
          >
            {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
