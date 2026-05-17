'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Plus, Bell, Search } from 'lucide-react';

export default function Topbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  if (!user) return null;

  // Determine title and subtitle dynamically based on path to avoid double vision overlaps
  let title = 'Dashboard';
  let subtitle = 'Welcome back, ready to build?';

  if (pathname === '/projects/new') {
    title = 'AI Orchestrator';
    subtitle = 'Describe your vision, and we will architect the startup';
  } else if (pathname.startsWith('/projects/')) {
    title = 'Project Detail';
    subtitle = 'System blueprint and technical MVP architecture';
  } else if (pathname === '/projects') {
    title = 'Your Projects';
    subtitle = 'Manage and scale your existing architectures';
  } else if (pathname === '/analytics') {
    title = 'System Telemetry';
    subtitle = 'Real-time performance metrics across orchestrated nodes';
  } else if (pathname === '/settings') {
    title = 'Account Settings';
    subtitle = 'Manage your profile, preferences, and billing details';
  } else if (pathname === '/history') {
    title = 'Audit History';
    subtitle = 'A complete log of system actions and blueprint generations';
  } else if (pathname === '/api-keys') {
    title = 'API Configuration';
    subtitle = 'Access your AI SaaS Builder environment programmatically';
  }

  return (
    <header className="flex items-center justify-between sticky top-0 z-[90] glass-panel border-b border-white/5 box-border" style={{ padding: '16px 28px' }}>
      <div className="flex flex-col animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-2xl font-heading font-bold text-white tracking-tight">{title}</h2>
        <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
      </div>

      <div className="flex items-center gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        {/* Search Bar */}
        <div className="hidden md:flex items-center relative w-full max-w-[280px]">
          <Search size={16} className="absolute text-gray-500" style={{ left: '12px' }} />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="bg-black/20 border border-white/10 rounded-full text-sm text-white focus:outline-none focus:border-violet-500/50 focus:bg-black/40 transition-all w-full placeholder-gray-500 box-border"
            style={{ padding: '8px 16px 8px 40px' }}
          />
        </div>

        <button className="relative text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5" style={{ padding: '8px' }}>
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-violet-500 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.8)]"></span>
        </button>

        <Link 
          href="/projects/new" 
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-sm rounded-full transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transform hover:-translate-y-0.5"
          style={{ padding: '10px 20px', whiteSpace: 'nowrap', minWidth: 'max-content' }}
        >
          <Plus size={18} strokeWidth={2.5} />
          New Project
        </Link>
      </div>
    </header>
  );
}
