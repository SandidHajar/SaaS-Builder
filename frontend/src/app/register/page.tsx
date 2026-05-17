'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import Link from 'next/link';
import { UserPlus, Mail, Lock, User, Loader2, ArrowLeft, Zap } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register({ name, email, password });
    } catch (err: any) {
      setError(err.message || 'Failed to register');
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
            <UserPlus size={32} />
          </div>
          <h1 className="text-3xl font-heading font-bold mb-2 tracking-tight text-white">Create Account</h1>
          <p className="text-gray-400 text-sm">Join the ecosystem and build your vision.</p>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm mb-8 text-center font-medium animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-widest uppercase text-gray-400 pl-1">Full Name</label>
            <div className="relative group">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-violet-400 transition-colors" />
              <input 
                type="text" 
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-widest uppercase text-gray-400 pl-1">Email Address</label>
            <div className="relative group">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-violet-400 transition-colors" />
              <input 
                type="email" 
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm"
                placeholder="architect@saas.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold tracking-widest uppercase text-gray-400 pl-1">Password</label>
            <div className="relative group">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-violet-400 transition-colors" />
              <input 
                type="password" 
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-sm"
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
                Initialize Profile
                <ArrowLeft size={18} className="rotate-180 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-400 text-sm">
            Already have an account? <Link href="/login" className="text-white font-bold hover:text-violet-400 transition-colors">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
