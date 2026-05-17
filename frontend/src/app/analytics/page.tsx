'use client';

import { BarChart3, TrendingUp, Users, Target, Zap, Clock, ArrowUpRight } from 'lucide-react';

const MetricCard = ({ label, value, delta, icon: Icon, colorClass }: any) => (
  <div className="card relative overflow-hidden group box-border" style={{ padding: '24px' }}>
    <div className="absolute top-0 right-0 opacity-5 group-hover:opacity-10 transition-opacity" style={{ padding: '24px' }}>
      <Icon size={64} className={colorClass} />
    </div>
    <div className="flex justify-between relative z-10" style={{ marginBottom: '16px' }}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 ${colorClass}`}>
        <Icon size={24} />
      </div>
      <span className="font-mono text-xs font-bold text-green-400 bg-green-500/10 rounded-md h-fit box-border" style={{ padding: '4px 10px' }}>{delta}</span>
    </div>
    <div className="text-xs font-bold tracking-widest uppercase text-gray-400 relative z-10" style={{ marginBottom: '4px' }}>{label}</div>
    <div className="font-heading text-3xl font-bold text-white relative z-10">{value}</div>
  </div>
);

export default function AnalyticsPage() {
  return (
    <div className="animate-slide-up">
      {/* Subbar with filters */}
      <div className="flex justify-end" style={{ marginBottom: '32px' }}>
        <div className="font-mono text-xs font-bold bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-lg box-border" style={{ padding: '8px 16px' }}>
          LAST 30 DAYS
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: '24px', marginBottom: '32px' }}>
        <MetricCard label="Total Deployments" value="152" delta="+12%" icon={Zap} colorClass="text-violet-400" />
        <MetricCard label="System Viability" value="98.4%" delta="+0.2%" icon={Target} colorClass="text-cyan-400" />
        <MetricCard label="Active Users" value="24.5k" delta="+15%" icon={Users} colorClass="text-fuchsia-400" />
        <MetricCard label="Avg Latency" value="14ms" delta="-2ms" icon={Clock} colorClass="text-green-400" />
      </div>

      {/* Charts / Detailed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '24px' }}>
        <div className="lg:col-span-2 card">
          <div className="flex justify-between items-center" style={{ marginBottom: '32px' }}>
            <h3 className="font-heading text-xl font-bold text-white">Inference Velocity</h3>
            <div className="flex items-center bg-white/5 rounded-full border border-white/10 box-border" style={{ gap: '8px', padding: '4px 12px' }}>
              <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
              <span className="font-mono text-xs text-gray-300">Live</span>
            </div>
          </div>
          
          <div className="h-[300px] flex items-end gap-3 pb-6 border-b border-white/5">
            {[40, 60, 45, 80, 55, 90, 70, 85, 60, 95, 100, 80].map((h, i) => (
              <div key={i} className="flex-1 bg-white/5 hover:bg-violet-500/20 rounded-t-md relative group transition-colors" style={{ height: `${h}%` }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-mono py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {h}k
                </div>
                {i === 10 && <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,1)]" />}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 font-mono text-xs text-gray-500">
            <span>APR 01</span>
            <span>APR 15</span>
            <span>APR 30</span>
          </div>
        </div>

        <div className="card">
          <h3 className="font-heading text-xl font-bold text-white" style={{ marginBottom: '24px' }}>Resource Allocation</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { name: 'Neural Processing', count: 42, color: 'bg-violet-500', text: 'text-violet-400' },
              { name: 'Database I/O', count: 28, color: 'bg-cyan-500', text: 'text-cyan-400' },
              { name: 'Edge Caching', count: 25, color: 'bg-fuchsia-500', text: 'text-fuchsia-400' },
              { name: 'Background Jobs', count: 18, color: 'bg-amber-500', text: 'text-amber-400' },
            ].map((cat) => (
              <div key={cat.name} className="group">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{cat.name}</span>
                  <span className={`font-mono text-xs font-bold ${cat.text}`}>{cat.count}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.count}%` }} />
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white/5 rounded-xl border border-white/10 flex items-start box-border" style={{ marginTop: '32px', padding: '16px', gap: '12px' }}>
            <Zap size={20} className="text-violet-400 flex-shrink-0" />
            <p className="text-xs text-gray-400 leading-relaxed">
              System is currently operating at optimal efficiency. Edge caching nodes are absorbing 85% of global traffic.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
