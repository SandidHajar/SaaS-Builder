'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { 
  LayoutDashboard, 
  FolderRoot, 
  Sparkles, 
  BarChart3, 
  History, 
  Settings, 
  Key,
  LogOut,
  Zap
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Projects', icon: FolderRoot, href: '/projects' },
  { name: 'Generate', icon: Sparkles, href: '/projects/new' },
  { name: 'Analytics', icon: BarChart3, href: '/analytics' },
  { name: 'History', icon: History, href: '/history' },
  { name: 'Settings', icon: Settings, href: '/settings' },
  { name: 'API Keys', icon: Key, href: '/api-keys' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <aside className="sticky top-0 shrink-0 h-screen glass-panel border-r border-white/10 flex flex-col z-[100]" style={{ width: '240px', minWidth: '240px' }}>
      <div className="flex flex-col">
        <div style={{ padding: '32px 24px' }}>
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-lg group-hover:shadow-violet-500/25 transition-all">
              <Zap size={22} fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-[18px] tracking-tight text-white group-hover:text-violet-400 transition-colors">SaaS Builder</span>
              <span className="text-[10px] font-medium tracking-[0.2em] text-violet-400/80 uppercase">Orchestrator</span>
            </div>
          </Link>
        </div>

        <nav className="flex flex-col" style={{ padding: '8px 16px' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard' && item.href !== '/projects');
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`
                  flex items-center gap-3 rounded-xl transition-all duration-200 group relative
                  ${isActive 
                    ? 'bg-violet-600/10 text-violet-400 font-medium' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}
                `}
                style={{ padding: '10px 12px', marginBottom: '4px' }}
              >
                <item.icon 
                  size={20} 
                  strokeWidth={isActive ? 2.5 : 2} 
                  className={`transition-colors ${isActive ? 'text-violet-400' : 'text-gray-500 group-hover:text-gray-300'}`} 
                />
                <span className="text-[14.5px] font-sans">{item.name}</span>
                
                {item.name === 'Analytics' && (
                  <div className="ml-auto bg-violet-500/20 text-violet-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-violet-500/20">
                    NEW
                  </div>
                )}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-violet-500 rounded-r-full shadow-[0_0_10px_rgba(139,92,246,0.6)]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-white/10 bg-white/5 backdrop-blur-sm" style={{ marginTop: 'auto', padding: '16px 12px' }}>
        <div className="flex items-center gap-3" style={{ marginBottom: '16px' }}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold shadow-lg shrink-0">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-semibold text-white truncate">{user.name || 'User'}</p>
            <p className="text-xs text-violet-300 font-medium">Pro Plan</p>
          </div>
        </div>
        <button 
          onClick={logout}
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all text-sm font-medium border border-red-500/10 box-border"
          style={{ padding: '10px 0' }}
        >
          <LogOut size={16} strokeWidth={2} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
