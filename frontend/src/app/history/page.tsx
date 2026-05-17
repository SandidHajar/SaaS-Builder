'use client';

import { History as HistoryIcon, Search, Filter, Calendar, Clock, Download, MoreVertical } from 'lucide-react';

export default function HistoryPage() {
  const events = [
    { id: 1, type: 'Generation', name: 'EcoTrack SaaS', date: '2 hours ago', status: 'Completed', detail: 'Technical Architecture Updated' },
    { id: 2, type: 'Export', name: 'PawGuard AI', date: '5 hours ago', status: 'PDF Export', detail: 'MVP Roadmap Exported' },
    { id: 3, type: 'Generation', name: 'SkillSwap', date: 'Yesterday', status: 'Completed', detail: 'Business Analysis Finalized' },
    { id: 4, type: 'Modification', name: 'EcoTrack SaaS', date: '2 days ago', status: 'Edited', detail: 'Revenue model refined' },
    { id: 5, type: 'Generation', name: 'VibeCheck', date: '3 days ago', status: 'Completed', detail: 'Initial blueprint generated' },
  ];

  return (
    <div className="max-w-[1000px] mx-auto animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row" style={{ gap: '16px' }}>
        <div className="relative flex-1">
          <Search size={18} className="absolute text-gray-500" style={{ left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            className="w-full bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-all text-sm box-border" 
            placeholder="Search audit logs..." 
            style={{ padding: '14px 16px 14px 44px' }}
          />
        </div>
        <div className="flex" style={{ gap: '8px' }}>
          <button className="btn-secondary text-xs rounded-xl flex items-center" style={{ padding: '10px 16px', gap: '8px' }}>
            <Filter size={16} /> Filter
          </button>
          <button className="btn-secondary text-xs rounded-xl flex items-center" style={{ padding: '10px 16px', gap: '8px' }}>
            <Calendar size={16} /> Date Range
          </button>
        </div>
      </div>

      {/* History Table */}
      <div className="card overflow-hidden" style={{ padding: 0 }}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left bg-white/5 border-b border-white/5">
                <th className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest" style={{ padding: '16px 24px' }}>ACTIVITY</th>
                <th className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest" style={{ padding: '16px 24px' }}>PROJECT</th>
                <th className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest" style={{ padding: '16px 24px' }}>DETAILS</th>
                <th className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest" style={{ padding: '16px 24px' }}>TIME</th>
                <th style={{ padding: '16px 24px' }}></th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td style={{ padding: '20px 24px' }}>
                    <div className="flex items-center" style={{ gap: '12px' }}>
                      <div className={`rounded-lg flex items-center justify-center shrink-0
                        ${event.type === 'Generation' 
                          ? 'bg-violet-500/10 text-violet-400 border border-violet-500/10' 
                          : 'bg-white/5 text-gray-400 border border-white/10'}`}
                        style={{ width: '36px', height: '36px' }}
                      >
                        {event.type === 'Generation' ? <HistoryIcon size={16} /> : <Download size={16} />}
                      </div>
                      <span className="text-sm font-bold text-white">{event.type}</span>
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <span className="text-sm text-gray-200">{event.name}</span>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <span className="text-sm text-gray-400">{event.detail}</span>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div className="flex items-center font-mono text-xs text-gray-400" style={{ gap: '8px' }}>
                      <Clock size={14} className="text-gray-500" />
                      <span>{event.date}</span>
                    </div>
                  </td>
                  <td className="text-right" style={{ padding: '20px 24px' }}>
                    <button className="bg-transparent border-0 text-gray-500 hover:text-white transition-colors cursor-pointer">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center" style={{ gap: '8px', paddingTop: '16px' }}>
        <button className="text-xs font-bold text-gray-400 hover:text-white bg-white/5 border border-white/10 rounded-lg cursor-pointer transition-colors" style={{ padding: '8px 16px' }}>PREV</button>
        <button className="text-xs font-bold text-white bg-violet-600 rounded-lg cursor-pointer shadow-lg shadow-violet-500/25" style={{ padding: '8px 16px' }}>1</button>
        <button className="text-xs font-bold text-gray-400 hover:text-white bg-white/5 border border-white/10 rounded-lg cursor-pointer transition-colors" style={{ padding: '8px 16px' }}>2</button>
        <button className="text-xs font-bold text-gray-400 hover:text-white bg-white/5 border border-white/10 rounded-lg cursor-pointer transition-colors" style={{ padding: '8px 16px' }}>NEXT</button>
      </div>
    </div>
  );
}
