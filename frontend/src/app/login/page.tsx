'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import Link from 'next/link';
import { LogIn, Mail, Lock, Loader2, ArrowLeft, Zap, Github } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ email, password });
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6 relative overflow-hidden text-gray-100">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[440px] glass-panel rounded-3xl p-10 relative z-10 animate-slide-up shadow-2xl border-white/10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-[11px] font-bold tracking-widest uppercase mb-10 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Reality
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white mx-auto mb-6 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
            <Zap size={32} fill="currentColor" />
          </div>
          <h1 className="text-3xl font-heading font-bold mb-2 tracking-tight text-white">Welcome Back</h1>
          <p className="text-gray-400 text-sm">Sign in to orchestrate your SaaS empire.</p>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm mb-8 text-center font-medium animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-widest uppercase text-gray-400 pl-1">Email Address</label>
            <div className="relative group">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-violet-400 transition-colors" />
              <input 
                type="email" 
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm"
                placeholder="architect@saas.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center pl-1">
              <label className="text-[11px] font-bold tracking-widest uppercase text-gray-400">Password</label>
              <a href="#" className="text-[10px] font-bold tracking-widest uppercase text-violet-400 hover:text-violet-300 transition-colors">Forgot?</a>
            </div>
            <div className="relative group">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-violet-400 transition-colors" />
              <input 
                type="password" 
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-white text-black hover:bg-gray-200 font-bold text-sm py-4 rounded-xl transition-all flex items-center justify-center gap-2 group mt-8">
            {loading ? <Loader2 className="animate-spin text-black" size={20} /> : (
              <>
                Initialize Session
                <ArrowLeft size={18} className="rotate-180 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-400 text-sm">
            No access codes? <Link href="/register" className="text-white font-bold hover:text-violet-400 transition-colors">Request Access</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
