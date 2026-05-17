'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, FolderPlus } from 'lucide-react';

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
    <Link href={`/projects/${project.id}`} className="card block box-border relative overflow-hidden group hover:border-violet-500/30 rounded-xl" style={{ padding: '24px' }}>
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
        <div className={`flex items-center gap-2 border px-2.5 py-1 rounded-md shrink-0 ${statusBg}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
          <span className={`font-mono text-[10px] font-bold uppercase tracking-wider ${statusText}`}>
            {status}
          </span>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <div className="bg-white/5 text-gray-300 border border-white/10 font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
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

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Completed', 'Running', 'Drafts'];

  const projects = [
    { id: '1', name: 'Smart Grocery AI', description: 'Real-time inventory orchestration with predictive restock pipelines based on computer vision.', themeColor: '#8b5cf6', status: 'Running', score: 8.5, date: 'Oct 12, 2025' },
    { id: '2', name: 'Elite Guard Protocol', description: 'Zero-trust security architecture for distributed SaaS environments.', themeColor: '#0ea5e9', status: 'Done', score: 9.2, date: 'Oct 10, 2025' },
    { id: '3', name: 'Vision Stream Analytics', description: 'Low-latency computer vision pipelines for industrial automation safety monitoring.', themeColor: '#ec4899', status: 'Pending', score: 6.8, date: 'Oct 08, 2025' },
    { id: '4', name: 'Fintech Data Aggregator', description: 'Consolidates financial data from multiple APIs into a single standardized GraphQL endpoint.', themeColor: '#f59e0b', status: 'Done', score: 8.0, date: 'Oct 01, 2025' },
    { id: '5', name: 'Content Orchestrator', description: 'AI-driven content pipeline that automates creation, review, and multi-channel publishing.', themeColor: '#10b981', status: 'Draft', score: 5.5, date: 'Sep 28, 2025' },
  ];

  return (
    <div className="animate-slide-up max-w-[1200px] mx-auto">
      <div className="flex justify-between items-end pb-4 border-b border-white/10" style={{ marginBottom: '32px' }}>
        <div>
          <h1 className="font-heading text-3xl font-bold text-white">All Projects</h1>
          <p className="text-sm text-gray-400 mt-2">Manage and monitor your AI-orchestrated platforms</p>
        </div>
        <div className="flex gap-4 items-center">
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
          <Link 
            href="/projects/new" 
            className="flex items-center gap-2 bg-white text-black hover:bg-violet-600 hover:text-white transition-all rounded-xl font-bold text-sm shadow-lg hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] box-border"
            style={{ padding: '10px 20px' }}
          >
            <FolderPlus size={16} />
            New Project
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} project={project} />
        ))}
      </div>
    </div>
  );
}
