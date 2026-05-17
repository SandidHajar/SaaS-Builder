'use client';

import { useState, useEffect } from 'react';
import { Target, DollarSign, AlertTriangle } from 'lucide-react';

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('business');
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'business', label: 'Business Analysis' },
    { id: 'roadmap', label: 'MVP Roadmap' },
    { id: 'technical', label: 'Technical Architecture' },
  ];

  return (
    <div className="space-y-8 max-w-[1000px] mx-auto pb-20 animate-slide-up">
      
      {isGenerating && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-center justify-center gap-3 backdrop-blur-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="font-mono text-sm text-blue-400 font-medium tracking-wide">Orchestrating infrastructure...</span>
        </div>
      )}

      <div className="glass-panel p-8 rounded-3xl flex flex-col md:flex-row justify-between items-start gap-6 border-white/10 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-violet-600/20 blur-[100px] pointer-events-none" />
        
        <div className="space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="font-heading font-bold text-3xl text-white">Smart Grocery AI</h1>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              <div className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-blue-500 animate-pulse' : 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]'}`} />
              <span className={`font-mono text-xs font-bold uppercase tracking-wider ${isGenerating ? 'text-blue-400' : 'text-green-400'}`}>
                {isGenerating ? 'Deploying' : 'Active'}
              </span>
            </div>
            <span className="font-mono text-xs text-gray-400 border-l border-white/10 pl-4 py-1">Oct 12, 2025</span>
          </div>
          <p className="font-sans text-gray-300 max-w-2xl leading-relaxed">
            Real-time inventory orchestration with predictive restock pipelines based on computer vision.
          </p>
        </div>
        
        <div className="text-right shrink-0 relative z-10">
          <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-bold">Viability Score</p>
          <div className="flex items-baseline justify-end gap-1">
            <span className="font-heading font-bold text-6xl text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-emerald-600 leading-none drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">8.5</span>
            <span className="font-heading font-bold text-2xl text-gray-500">/10</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 border-b border-white/10 overflow-x-auto pb-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-6 py-4 font-sans font-medium text-sm transition-all whitespace-nowrap rounded-t-xl
              ${activeTab === tab.id 
                ? 'bg-white/5 border-b-2 border-violet-500 text-violet-400' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="pt-2">
        {isGenerating ? (
          <div className="space-y-6">
            <div className="h-32 bg-white/5 rounded-2xl animate-pulse border border-white/5" />
            <div className="h-32 bg-white/5 rounded-2xl animate-pulse border border-white/5" />
            <div className="h-48 bg-white/5 rounded-2xl animate-pulse border border-white/5" />
          </div>
        ) : (
          <div className="animate-fade-in">
            {activeTab === 'business' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card space-y-5 bg-white/5 border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                    <Target size={24} />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white">Target Audience</h3>
                  <p className="font-sans text-sm text-gray-300 leading-relaxed">
                    Urban professionals (25-45) who value time over money, tech-savvy parents, and health-conscious individuals who stick to strict grocery lists.
                  </p>
                </div>
                
                <div className="card space-y-5 bg-white/5 border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                    <DollarSign size={24} />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white">Revenue Model</h3>
                  <p className="font-sans text-sm text-gray-300 leading-relaxed">
                    Freemium B2C app (ads/coupons) + B2B API licensing for grocery chains to integrate the routing algorithm into their own apps.
                  </p>
                </div>

                <div className="card md:col-span-2 space-y-5 bg-white/5 border-white/10">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                      <AlertTriangle size={24} />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-white">Critical Constraints</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['High acquisition cost for B2B grocery partnerships.', 'Map data accuracy across different store layouts.', 'User drop-off if initial store maps are incomplete.'].map((risk, i) => (
                      <div key={i} className="p-4 rounded-xl bg-black/20 border border-white/5 flex gap-3">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span className="text-gray-300 font-sans text-sm">{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'roadmap' && (
              <div className="space-y-6 relative">
                <div className="absolute top-8 bottom-8 left-[31px] w-0.5 bg-gradient-to-b from-violet-500 via-cyan-500 to-fuchsia-500 opacity-20" />
                {[
                  { phase: 'Phase 1: Foundation', color: 'bg-violet-500', shadow: 'shadow-[0_0_15px_rgba(139,92,246,0.4)]', features: ['User Auth & Profiles', 'Basic List Creation', 'Static Store Map Integration'] },
                  { phase: 'Phase 2: Core Value', color: 'bg-cyan-500', shadow: 'shadow-[0_0_15px_rgba(6,182,212,0.4)]', features: ['Routing Algorithm v1', 'Real-time Item Checking', 'Store Mapping Tool for Admins'] },
                  { phase: 'Phase 3: Scale', color: 'bg-fuchsia-500', shadow: 'shadow-[0_0_15px_rgba(217,70,239,0.4)]', features: ['Predictive AI Suggestions', 'B2B API endpoints', 'Loyalty Card Integration'] }
                ].map((item, idx) => (
                  <div key={idx} className="card bg-white/5 border-white/10 flex gap-6 group hover:border-white/20 transition-colors relative z-10">
                    <div className={`mt-1 shrink-0 w-4 h-4 rounded-full ${item.color} ${item.shadow} border-2 border-[#09090b] group-hover:scale-125 transition-transform`} />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-heading text-lg font-bold text-white">{item.phase}</h4>
                        <span className="font-mono text-[10px] uppercase font-bold tracking-widest bg-white/10 text-gray-300 px-3 py-1 rounded-full border border-white/10">Beta release</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {item.features.map((feat, i) => (
                          <div key={i} className="font-sans text-sm text-gray-400 bg-black/40 px-4 py-2.5 rounded-lg border border-white/5 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                            {feat}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'technical' && (
              <div className="space-y-8">
                <div className="card bg-white/5 border-white/10">
                  <h3 className="font-heading font-bold text-xl text-white mb-6">Stack Topology</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { cat: 'Client Edge', tech: 'Next.js 14 + Tailwind', color: 'text-violet-400', border: 'border-violet-500/20', bg: 'bg-violet-500/10' },
                      { cat: 'Compute Core', tech: 'Node.js + Express', color: 'text-cyan-400', border: 'border-cyan-500/20', bg: 'bg-cyan-500/10' },
                      { cat: 'Persistence', tech: 'PostgreSQL + Prisma', color: 'text-fuchsia-400', border: 'border-fuchsia-500/20', bg: 'bg-fuchsia-500/10' },
                      { cat: 'Neural Engine', tech: 'Python FastAPI', color: 'text-emerald-400', border: 'border-emerald-500/20', bg: 'bg-emerald-500/10' },
                    ].map((stack, i) => (
                      <div key={i} className={`p-5 rounded-2xl border ${stack.border} ${stack.bg} backdrop-blur-sm`}>
                        <div className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-3 font-bold">{stack.cat}</div>
                        <div className={`font-sans font-bold text-sm ${stack.color}`}>
                          {stack.tech}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card bg-white/5 border-white/10">
                  <h3 className="font-heading font-bold text-xl text-white mb-6">Service Endpoints</h3>
                  <div className="space-y-3">
                    {[
                      { method: 'GET', path: '/api/v1/stores/:id/map', desc: 'Retrieve store layout and node coordinates', bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
                      { method: 'POST', path: '/api/v1/routes/optimize', desc: 'Calculate shortest path through the store', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
                      { method: 'PUT', path: '/api/v1/lists/:id/items', desc: 'Update checked status of list items', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
                    ].map((api, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-black/40 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                        <div className={`w-[60px] text-center font-mono text-[10px] font-bold py-1.5 rounded-lg border ${api.bg} ${api.text} ${api.border}`}>
                          {api.method}
                        </div>
                        <div className="font-mono text-sm text-gray-200 w-[240px] truncate">{api.path}</div>
                        <div className="font-sans text-sm text-gray-400 flex-1">{api.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#030303] rounded-2xl p-6 overflow-x-auto shadow-2xl border border-white/5 relative group">
                  <div className="absolute top-0 right-0 p-4 font-mono text-xs text-gray-600 font-bold">algo.js</div>
                  <div className="flex gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <pre className="font-mono text-sm text-gray-300 leading-relaxed">
<span className="text-gray-500">// Example Routing Service (Node.js)</span>
<br />
<span className="text-violet-400">class</span> <span className="text-emerald-400">RoutingService</span> {'{'}
<br />
&nbsp;&nbsp;<span className="text-violet-400">async</span> <span className="text-blue-400">calculateOptimalPath</span>(storeId, itemLocations) {'{'}
<br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-violet-400">const</span> storeGraph = <span className="text-violet-400">await</span> db.storeMaps.<span className="text-blue-400">getGraph</span>(storeId);
<br />
&nbsp;&nbsp;&nbsp;&nbsp;
<br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-500">// Using an optimized Traveling Salesperson approach</span>
<br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-violet-400">const</span> route = <span className="text-violet-400">await</span> PathfindingAlgo.<span className="text-blue-400">solve</span>(storeGraph, {'{'}
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;startNode: <span className="text-amber-300">'ENTRANCE'</span>,
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;waypoints: itemLocations,
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;endNode: <span className="text-amber-300">'CHECKOUT'</span>
<br />
&nbsp;&nbsp;&nbsp;&nbsp;{'}'});
<br />
&nbsp;&nbsp;&nbsp;&nbsp;
<br />
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-violet-400">return</span> route;
<br />
&nbsp;&nbsp;{'}'}
<br />
{'}'}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
