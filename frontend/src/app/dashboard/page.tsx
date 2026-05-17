'use client';

import { useAuth } from '@/lib/auth';
import { Plus, ArrowUpRight, Activity } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const StatCard = ({ label, value, delta, isUp }: any) => (
  <div className="card box-border relative overflow-hidden group rounded-xl" style={{ padding: '20px 22px' }}>
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Activity size={48} className={isUp ? 'text-green-500' : 'text-violet-500'} />
    </div>
    <p className="font-mono text-[11px] text-gray-400 uppercase tracking-widest mb-3">{label}</p>
    <div className="flex items-end justify-between relative z-10">
      <h3 className="font-heading text-4xl font-bold text-white leading-none">{value}</h3>
      <span className={`font-mono text-xs px-2 py-1 rounded-md ${isUp ? 'bg-[#14532d] text-[#86efac]' : 'bg-gray-500/10 text-gray-400'}`}>
        {delta}
      </span>
    </div>
  </div>
);

const ProjectCard = ({ project, status, score }: any) => {
  let statusBg = '';
  let statusText = '';
  let dotColor = '';

  if (status === 'Done') {
    statusBg = 'bg-[#14532d] border-green-500/20'; statusText = 'text-[#86efac]'; dotColor = 'bg-[#86efac]';
  } else if (status === 'Running') {
    statusBg = 'bg-[#1e3a5f] border-blue-500/20'; statusText = 'text-[#93c5fd]'; dotColor = 'bg-[#93c5fd]';
  } else {
    statusBg = 'bg-[#451a03] border-amber-500/20'; statusText = 'text-[#fcd34d]'; dotColor = 'bg-[#fcd34d]';
  }

  let scoreBg = '';
  let scoreText = '';
  if (score >= 7.5) {
    scoreBg = 'bg-green-500/10'; scoreText = 'text-[#4ade80]';
  } else if (score >= 5.0) {
    scoreBg = 'bg-amber-500/10'; scoreText = 'text-[#fcd34d]';
  } else {
    scoreBg = 'bg-red-500/10'; scoreText = 'text-red-400';
  }

  return (
    <Link href={`/projects/${project.id}`} className="card block box-border relative overflow-hidden group hover:border-violet-500/30 rounded-xl" style={{ padding: '20px 22px' }}>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-50 group-hover:opacity-100 transition-opacity" style={{ 
        backgroundImage: `linear-gradient(to right, ${project.themeColor}, transparent)` 
      }} />
      
      <div className="flex justify-between items-start mb-4 pt-2">
        <div className="flex-1 pr-4">
          <h3 className="font-heading text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors flex items-center gap-2">
            {project.name}
            <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-violet-400" />
          </h3>
          <p className="font-sans text-sm text-gray-400 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className={`flex items-center gap-2 px-2.5 py-1 rounded-md border ${statusBg}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${status === 'Running' ? 'animate-pulse' : ''} ${dotColor}`} />
          <span className={`font-mono text-[10px] font-bold uppercase tracking-wider ${statusText}`}>{status}</span>
        </div>
        <div className="bg-[#1e1b4b] text-[#a5b4fc] border border-indigo-500/20 font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
          SaaS
        </div>
        <div className="bg-[#1e1b4b] text-[#a5b4fc] border border-indigo-500/20 font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
          AI
        </div>
      </div>

      <div className="border-t border-white/5 pt-4 flex justify-between items-center">
        <span className="font-mono text-xs text-gray-500">{project.date}</span>
        <div className={`font-mono text-xs px-3 py-1.5 rounded-md font-bold ${scoreBg} ${scoreText}`}>
          Score: {score}/10
        </div>
      </div>
    </Link>
  );
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Completed', 'Running', 'Drafts'];

  const projects = [
    { id: '1', name: 'Smart Grocery AI', description: 'Real-time inventory orchestration with predictive restock pipelines based on computer vision.', themeColor: '#8b5cf6', status: 'Running', score: 8.5, date: 'Oct 12, 2025' },
    { id: '2', name: 'Elite Guard Protocol', description: 'Zero-trust security architecture for distributed SaaS environments.', themeColor: '#0ea5e9', status: 'Done', score: 9.2, date: 'Oct 10, 2025' },
    { id: '3', name: 'Vision Stream Analytics', description: 'Low-latency computer vision pipelines for industrial automation safety monitoring.', themeColor: '#ec4899', status: 'Pending', score: 6.8, date: 'Oct 08, 2025' },
    { id: '4', name: 'Fintech Data Aggregator', description: 'Consolidates financial data from multiple APIs into a single standardized GraphQL endpoint.', themeColor: '#f59e0b', status: 'Done', score: 8.0, date: 'Oct 01, 2025' },
  ];

  return (
    <div className="animate-slide-up">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4" style={{ marginBottom: '28px' }}>
        <StatCard label="Total Projects" value="24" delta="+3 this week" isUp={true} />
        <StatCard label="Completed" value="18" delta="75% success" isUp={true} />
        <StatCard label="Avg Viability" value="8.4" delta="+0.2" isUp={true} />
        <StatCard label="API Calls" value="1.2k" delta="Stable" isUp={false} />
      </div>

      {/* Section Header */}
      <div className="flex justify-between items-end pb-2" style={{ marginBottom: '24px' }}>
        <div>
          <h2 className="font-heading text-2xl font-bold text-white">Active Architectures</h2>
          <p className="text-sm text-gray-400 mt-1">Monitor and scale your deployments</p>
        </div>
        <div className="flex gap-2 glass-panel p-1 rounded-lg">
          {filters.map(filter => {
            const isActive = activeFilter === filter;
            return (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className="rounded-md font-mono text-xs tracking-wider uppercase transition-all box-border cursor-pointer"
                style={{
                  padding: '6px 16px',
                  backgroundColor: isActive ? '#7c3aed' : 'transparent',
                  color: isActive ? '#ffffff' : '#d1d5db',
                  fontWeight: isActive ? '900' : '600',
                  border: 'none',
                  outline: 'none',
                  boxShadow: isActive ? '0 4px 12px rgba(124, 58, 237, 0.3)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#d1d5db';
                  }
                }}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} project={project} />
        ))}
      </div>
    </div>
  );
}
