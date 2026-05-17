'use client';

import { useAuth } from '@/lib/auth';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  // Define public paths where sidebar and topbar must never be rendered
  const publicPaths = ['/', '/login', '/register'];
  const isPublicPath = publicPaths.includes(pathname);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-500 animate-pulse flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.3)]">
          <div className="w-8 h-8 rounded-xl bg-[#09090b]" />
        </div>
      </div>
    );
  }

  // If not logged in, or on a public auth/landing page, render only the content
  if (!user || isPublicPath) {
    return <main className="bg-[#09090b] min-h-screen text-gray-100">{children}</main>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#09090b] text-gray-100 relative">
      {/* Sidebar - Remains entirely fixed as part of the flex container */}
      <Sidebar />

      {/* Main Content Area - Uses flex column, taking full height */}
      <div className="flex-1 flex flex-col min-w-0 relative h-screen">
        {/* Background Ambience for Main View */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none z-0" />
        
        <Topbar />

        <main className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 box-border" style={{ padding: '24px 28px' }}>
          <div className="w-full min-h-full animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
