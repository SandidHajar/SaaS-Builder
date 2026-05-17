'use client';

import { User, Bell, Lock, Shield, CreditCard, ChevronRight, Mail, Camera } from 'lucide-react';
import { useAuth } from '@/lib/auth';

const SettingItem = ({ icon: Icon, title, desc, action }: any) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-6 border-b border-white/5 gap-4">
    <div className="flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center border border-violet-500/10 shrink-0">
        <Icon size={20} strokeWidth={2} />
      </div>
      <div>
        <h4 className="text-sm font-bold text-white">{title}</h4>
        <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
      </div>
    </div>
    <div className="flex items-center gap-3 self-end sm:self-auto">
      {action}
      <ChevronRight size={16} className="text-gray-500" />
    </div>
  </div>
);

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-[800px] mx-auto animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Profile Section */}
      <div className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div className="flex flex-col sm:flex-row items-center border-b border-white/5" style={{ gap: '24px', paddingBottom: '24px' }}>
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-3xl font-heading font-black text-white shadow-xl">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#18181b] border border-white/10 flex items-center justify-center cursor-pointer shadow-lg hover:border-violet-500/50 transition-colors">
              <Camera size={14} className="text-violet-400" />
            </button>
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h3 className="font-heading text-2xl font-bold text-white">{user?.name || 'User'}</h3>
            <p className="text-sm text-gray-400">{user?.email}</p>
            <div className="inline-flex px-3 py-1 bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-full text-[10px] font-bold tracking-wider uppercase mt-2">
              PRO PLAN
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <SettingItem 
            icon={Mail} 
            title="Email Address" 
            desc="The primary email associated with your account."
            action={<span className="font-mono text-xs text-gray-300">{user?.email}</span>}
          />
          <SettingItem 
            icon={Lock} 
            title="Password" 
            desc="Update your password to keep your account secure."
            action={<button className="font-mono text-xs font-bold text-violet-400 hover:text-violet-300 transition-colors bg-transparent border-0 cursor-pointer uppercase tracking-wider">Change Password</button>}
          />
          <SettingItem 
            icon={Bell} 
            title="Notifications" 
            desc="Control which emails and alerts you receive."
            action={
              <div className="w-11 h-6 bg-violet-600 rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-all" />
              </div>
            }
          />
        </div>
      </div>

      {/* Subscription Section */}
      <div className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 className="font-heading text-xl font-bold text-white">Billing & Subscription</h3>
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-white/5 border border-white/5 rounded-2xl gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-violet-400 shrink-0 shadow-inner">
              <CreditCard size={24} />
            </div>
            <div>
              <div className="text-base font-bold text-white">Pro Annual Plan</div>
              <div className="text-xs text-gray-400 mt-0.5">Billed annually ($199/year)</div>
            </div>
          </div>
          <button className="btn-secondary w-full sm:w-auto text-xs py-3 px-5 rounded-xl border-white/10">
            Manage Billing
          </button>
        </div>
        
        <div className="flex flex-col">
          <SettingItem 
            icon={Shield} 
            title="Security Features" 
            desc="Two-factor authentication and login history."
            action={<span className="font-mono text-xs font-bold text-green-400 bg-green-500/10 px-2.5 py-1 rounded-md">ENABLED</span>}
          />
        </div>
      </div>
    </div>
  );
}