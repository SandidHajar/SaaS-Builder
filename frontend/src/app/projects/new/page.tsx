'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Lightbulb, Zap, Code2 } from 'lucide-react';

export default function NewProjectPage() {
  const [idea, setIdea] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleExampleClick = (text: string) => {
    setIdea(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      router.push('/projects/new-123');
    }, 1500);
  };

  const examples = [
    { title: "Smart Grocery", icon: Lightbulb, text: "An AI-powered grocery shopping app that learns user preferences and creates optimized paths through the store." },
    { title: "Design to Code", icon: Code2, text: "A developer tool that automatically converts Figma designs into production-ready React components with Tailwind CSS." },
    { title: "Freelancer OS", icon: Zap, text: "A micro-SaaS for freelancers to manage subscriptions, invoices, and client communication in one dashboard." }
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center animate-slide-up" style={{ minHeight: 'calc(100vh - 140px)', padding: '24px 0' }}>
      <div className="w-full max-w-[800px]">
        <div className="text-center" style={{ marginBottom: '48px' }}>
          <div className="inline-flex items-center rounded-full bg-violet-500/10 text-violet-400 text-xs font-bold tracking-widest uppercase border border-violet-500/20" style={{ gap: '8px', padding: '8px 16px', marginBottom: '24px' }}>
            <Sparkles size={14} className="animate-pulse" /> AI Orchestrator
          </div>
          <h1 className="font-heading font-bold text-5xl text-white tracking-tight" style={{ marginBottom: '16px' }}>
          What's your vision?
        </h1>
        <p className="text-gray-400 text-lg max-w-lg mx-auto">
          Describe the problem you're solving, and we'll architect the entire platform in seconds.
        </p>
      </div>

      <div className="glass-panel rounded-3xl relative overflow-hidden shadow-2xl border-white/10 group box-border" style={{ padding: '32px' }}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 blur-[80px] group-hover:bg-violet-600/20 transition-colors pointer-events-none" />
        
        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="relative" style={{ marginBottom: '24px' }}>
            <div className="absolute top-4 text-violet-400/50" style={{ left: '16px' }}>
              <Sparkles size={24} />
            </div>
            <textarea 
              className="w-full bg-black/40 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-lg min-h-[200px] resize-none box-border"
              placeholder="e.g. A platform that connects local artisans with global buyers, using AI to match aesthetics..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              style={{ padding: '24px 24px 24px 48px' }}
            />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest" style={{ marginBottom: '16px' }}>Or try an example</p>
            <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '12px' }}>
              {examples.map((ex, i) => (
                <button 
                  key={i}
                  type="button"
                  onClick={() => handleExampleClick(ex.text)}
                  className="flex items-start rounded-xl bg-white/5 border border-white/5 text-left hover:bg-violet-500/10 hover:border-violet-500/30 transition-all group/btn box-border"
                  style={{ gap: '12px', padding: '16px' }}
                >
                  <ex.icon size={16} className="mt-0.5 text-gray-500 group-hover/btn:text-violet-400 shrink-0" />
                  <span className="text-sm font-medium text-gray-300 group-hover/btn:text-white leading-snug">{ex.title}</span>
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={!idea.trim() || isSubmitting}
            className={`w-full rounded-2xl font-bold text-lg flex items-center justify-center transition-all shadow-[0_0_40px_rgba(139,92,246,0.3)] box-border
              ${(!idea.trim() || isSubmitting) 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed shadow-none' 
                : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white hover:shadow-[0_0_60px_rgba(139,92,246,0.5)] transform hover:-translate-y-1'}`
            }
            style={{ padding: '20px 0', gap: '12px' }}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Architecting Solution...
              </>
            ) : (
              <>
                Generate Architecture <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}
