'use client';

import { Key, Copy, Plus, Trash2, Shield, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function APIKeysPage() {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="max-w-[900px] mx-auto animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header Button */}
      <div className="flex justify-end">
        <button className="btn-primary text-xs rounded-xl flex items-center gap-2">
          <Plus size={16} /> Create New Key
        </button>
      </div>

      {/* Warning Box */}
      <div className="card border-amber-500/20 bg-amber-500/5 flex box-border" style={{ padding: '20px', gap: '16px' }}>
        <Shield size={24} className="text-amber-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-amber-400 mb-1">Security Best Practice</h4>
          <p className="text-xs text-amber-400/80 leading-relaxed">
            Never share your API keys or commit them to version control. If a key is compromised, revoke it immediately.
          </p>
        </div>
      </div>

      {/* Keys List */}
      <div className="card overflow-hidden" style={{ padding: 0 }}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left bg-white/5 border-b border-white/5">
                <th className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest" style={{ padding: '16px 24px' }}>NAME</th>
                <th className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest" style={{ padding: '16px 24px' }}>KEY</th>
                <th className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest" style={{ padding: '16px 24px' }}>CREATED</th>
                <th className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-widest" style={{ padding: '16px 24px' }}>LAST USED</th>
                <th style={{ padding: '16px 24px' }}></th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                <td style={{ padding: '20px 24px' }}>
                  <span className="text-sm font-bold text-white">Production Main</span>
                </td>
                <td style={{ padding: '20px 24px' }}>
                  <div className="flex items-center" style={{ gap: '12px' }}>
                    <code className="font-mono text-xs bg-black/40 border border-white/5 rounded-lg text-gray-300 box-border" style={{ padding: '6px 12px' }}>
                      {showKey ? 'ak_live_72kX92mN01vLp4z8...' : '••••••••••••••••••••••••'}
                    </code>
                    <button onClick={() => setShowKey(!showKey)} className="bg-transparent border-0 text-gray-400 hover:text-white transition-colors cursor-pointer">
                      {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button className="bg-transparent border-0 text-gray-400 hover:text-white transition-colors cursor-pointer">
                      <Copy size={16} />
                    </button>
                  </div>
                </td>
                <td className="font-mono text-xs text-gray-400" style={{ padding: '20px 24px' }}>
                  Oct 12, 2025
                </td>
                <td className="font-mono text-xs text-green-400" style={{ padding: '20px 24px' }}>
                  2 mins ago
                </td>
                <td className="text-right" style={{ padding: '20px 24px' }}>
                  <button className="bg-transparent border-0 text-red-400 hover:text-red-300 transition-colors cursor-pointer">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Docs Link */}
      <div className="card flex flex-col sm:flex-row justify-between items-center box-border" style={{ padding: '24px', gap: '16px' }}>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/10 text-violet-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
            <Key size={22} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Developer Reference</h4>
            <p className="text-xs text-gray-400 mt-0.5">Learn how to programmatically integrate orchestrated SaaS models.</p>
          </div>
        </div>
        <a href="#" className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs font-bold text-violet-400 hover:text-violet-300 transition-colors">
          View API Reference <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
