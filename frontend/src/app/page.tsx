'use client';

import { ArrowRight, Zap, Shield, Sparkles, Layout, Code2, Rocket, ArrowUpRight, Globe, BarChart3, Database } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function LandingPage() {
  const { user, loading } = useAuth();

  if (!loading && user) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-fuchsia-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 box-border" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
        <div className="max-w-7xl flex justify-between items-center bg-black/20 backdrop-blur-2xl border border-white/10 rounded-[32px] box-border" style={{ padding: '20px 40px', gap: '16px', marginLeft: 'auto', marginRight: 'auto' }}>
          <div className="flex items-center" style={{ gap: '16px' }}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] shrink-0">
              <Zap size={28} fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter leading-none">NEXUS</span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-fuchsia-500/80 mt-1">SaaS ORCHESTRATOR</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center text-xs font-black tracking-widest text-gray-400 uppercase" style={{ gap: '48px' }}>
            <Link href="#features" className="hover:text-white transition-all hover:tracking-[0.2em]">Features</Link>
            <Link href="#pricing" className="hover:text-white transition-all hover:tracking-[0.2em]">Scale</Link>
            <Link href="#showcase" className="hover:text-white transition-all hover:tracking-[0.2em]">Showcase</Link>
          </div>

          <div className="flex items-center" style={{ gap: '24px' }}>
            {!user && (
              <Link href="/login" className="text-xs font-black tracking-widest text-gray-400 hover:text-white uppercase">
                Login
              </Link>
            )}
            <Link 
              href={user ? "/dashboard" : "/register"} 
              className="bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:bg-fuchsia-500 hover:text-white transition-all shadow-xl active:scale-95 box-border"
              style={{ padding: '16px 32px' }}
            >
              {user ? 'Dashboard' : 'Launch Build'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full z-10 box-border">
        <div className="max-w-7xl box-border" style={{ paddingTop: '200px', paddingBottom: '128px', paddingLeft: '24px', paddingRight: '24px', marginLeft: 'auto', marginRight: 'auto' }}>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center rounded-full bg-white/5 border border-white/10 text-fuchsia-400 text-xs font-black tracking-[0.2em] uppercase animate-fade-in shadow-2xl backdrop-blur-md" style={{ gap: '12px', padding: '12px 24px', marginBottom: '48px' }}>
              <Sparkles size={16} className="animate-pulse" />
              <span>The Future of SaaS Production</span>
            </div>
            
            <div className="flex flex-col" style={{ gap: '32px', marginBottom: '64px' }}>
              <h1 className="text-8xl md:text-[140px] font-black tracking-tighter leading-[0.8] animate-slide-up">
                BUILD <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-600">SMARTER.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-slide-up font-medium" style={{ animationDelay: '0.1s' }}>
                Transform singular ideas into enterprise-grade SaaS architectures in seconds. Orchestrated by AI, validated by data.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row animate-slide-up" style={{ animationDelay: '0.2s', gap: '32px' }}>
              <Link 
                href={user ? "/dashboard" : "/register"}
                className="btn-elite group"
              >
                Start Your Project 
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all backdrop-blur-sm box-border" style={{ padding: '20px 40px' }}>
                Watch Vision
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="relative w-full z-10 box-border">
        <div className="max-w-7xl box-border" style={{ paddingTop: '128px', paddingBottom: '128px', paddingLeft: '24px', paddingRight: '24px', marginLeft: 'auto', marginRight: 'auto' }}>
          <div className="grid grid-cols-1 md:grid-cols-12" style={{ gap: '32px' }}>
            {/* Main Feature */}
            <div className="md:col-span-8 card-elite overflow-hidden relative group box-border" style={{ padding: '48px' }}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 blur-[80px] group-hover:bg-fuchsia-500/20 transition-colors" />
              <div className="relative z-10 flex flex-col" style={{ gap: '24px' }}>
                <div className="w-16 h-16 rounded-2xl bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400">
                  <Globe size={32} />
                </div>
                <h2 className="text-4xl font-black tracking-tighter">Global Deployment Strategy</h2>
                <p className="text-gray-400 text-lg max-w-md">Our AI doesn't just build code; it architects global infrastructure, choosing the best regions and providers for your specific SaaS needs.</p>
                <div className="pt-8">
                  <div className="flex -space-x-4">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-[10px] font-black">AI</div>
                    ))}
                    <div className="w-12 h-12 rounded-full border-2 border-black bg-fuchsia-600 flex items-center justify-center text-[10px] font-black">+1k</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Feature 1 */}
            <div className="md:col-span-4 card-elite flex flex-col justify-between group box-border" style={{ padding: '48px' }}>
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400" style={{ marginBottom: '32px' }}>
                <Database size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tighter" style={{ marginBottom: '16px' }}>Atomic Data Design</h3>
                <p className="text-gray-400 text-sm">Self-healing database schemas that evolve with your product requirements.</p>
              </div>
            </div>

            {/* Side Feature 2 */}
            <div className="md:col-span-4 card-elite flex flex-col justify-between group box-border" style={{ padding: '48px' }}>
              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400" style={{ marginBottom: '32px' }}>
                <Shield size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tighter" style={{ marginBottom: '16px' }}>Hardened Security</h3>
                <p className="text-gray-400 text-sm">Enterprise-grade security protocols baked into the core of every project.</p>
              </div>
            </div>

            {/* Wide Feature */}
            <div className="md:col-span-8 card-elite relative overflow-hidden group box-border" style={{ padding: '48px' }}>
              <div className="flex flex-col md:flex-row items-center" style={{ gap: '48px' }}>
                <div className="flex-1 flex flex-col" style={{ gap: '24px' }}>
                  <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-400">
                    <BarChart3 size={32} />
                  </div>
                  <h2 className="text-4xl font-black tracking-tighter">Real-time Analytics Pipeline</h2>
                  <p className="text-gray-400">Built-in instrumentation that tracks everything from user behavior to system performance from Day 1.</p>
                </div>
                <div className="flex-1 w-full bg-white/5 rounded-3xl border border-white/10 box-border" style={{ padding: '32px' }}>
                  <div className="flex flex-col" style={{ gap: '16px' }}>
                    {[1,2,3].map(i => (
                      <div key={i} className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-fuchsia-500" style={{ width: `${30 * i}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative w-full overflow-hidden box-border">
        <div className="max-w-7xl grid grid-cols-2 md:grid-cols-4 relative z-10 box-border" style={{ gap: '80px', paddingTop: '192px', paddingBottom: '192px', paddingLeft: '24px', paddingRight: '24px', marginLeft: 'auto', marginRight: 'auto' }}>
          {[
            { val: '10M+', label: 'Lines Orchestrated' },
            { val: '99.9%', label: 'Uptime Promise' },
            { val: '14ms', label: 'Inference Latency' },
            { val: '24/7', label: 'Expert Support' }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col" style={{ gap: '16px' }}>
              <div className="text-6xl font-black tracking-tighter text-white">{stat.val}</div>
              <div className="text-fuchsia-500 text-[10px] font-black uppercase tracking-[0.3em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full box-border">
        <div className="max-w-7xl box-border" style={{ paddingTop: '128px', paddingBottom: '128px', paddingLeft: '24px', paddingRight: '24px', marginLeft: 'auto', marginRight: 'auto' }}>
          <div className="card-elite text-center relative overflow-hidden box-border" style={{ padding: '80px' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/20 via-transparent to-indigo-500/20" />
            <div className="relative z-10 flex flex-col" style={{ gap: '48px' }}>
              <h2 className="text-6xl font-black tracking-tighter">Ready to orchestrate?</h2>
              <div className="flex flex-col sm:flex-row justify-center" style={{ gap: '24px' }}>
                <Link href="/register" className="btn-elite">Get Started Now</Link>
                <Link href="/login" className="border border-white/20 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all box-border" style={{ padding: '20px 40px' }}>Member Login</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 text-center box-border">
        <div className="max-w-7xl box-border" style={{ paddingTop: '80px', paddingBottom: '80px', paddingLeft: '24px', paddingRight: '24px', marginLeft: 'auto', marginRight: 'auto' }}>
          <div className="flex items-center justify-center gap-4 mb-8">
            <Zap size={24} className="text-fuchsia-500" />
            <span className="text-sm font-black tracking-[0.5em] text-gray-500 uppercase">NEXUS SYSTEMS</span>
          </div>
          <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em]">© 2026 Elite Digital Infrastructure. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
