'use client';

import { useEffect, useState } from 'react';
import { Project } from '@/types';
import { api } from '@/lib/api';

import { Clock, Zap, CheckCircle2, XCircle, Building2, ArrowRight } from 'lucide-react';

const statusConfig: Record<string, { label: string; class: string; icon: any }> = {
  PENDING: { label: 'Pending', class: 'badge-pending', icon: Clock },
  GENERATING: { label: 'Generating', class: 'badge-generating', icon: Zap },
  COMPLETED: { label: 'Completed', class: 'badge-completed', icon: CheckCircle2 },
  FAILED: { label: 'Failed', class: 'badge-failed', icon: XCircle },
};

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.projects
      .list()
      .then(setProjects)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      {/* Hero Header */}
      <div className="fade-in" style={{ textAlign: 'center', marginBottom: '80px' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '6px 14px', 
          background: 'rgba(99, 102, 241, 0.1)', 
          borderRadius: '100px', 
          border: '1px solid rgba(99, 102, 241, 0.2)', 
          marginBottom: '32px', 
          fontSize: '0.8rem', 
          fontWeight: 600,
          color: 'var(--accent-primary)',
          letterSpacing: '0.02em',
          textTransform: 'uppercase'
        }}>
          <span>Enterprise-Grade AI Architecture Agent</span>
        </div>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: 800,
          marginBottom: '24px',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
        }}>
          Architect your next <br />
          <span style={{ color: 'var(--accent-primary)' }}>production startup</span>
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.125rem',
          maxWidth: '600px',
          margin: '0 auto 40px',
          lineHeight: 1.6,
        }}>
          Generate comprehensive business analysis, MVP roadmaps, and technical system designs for your startup concept in seconds.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <a href="/projects/new" className="btn-gradient" style={{ padding: '14px 32px' }}>
            Get Started Free
          </a>
          <a href="#projects" className="btn-ghost" style={{ padding: '14px 32px' }}>
            View Dashboard
          </a>
        </div>
      </div>

      {/* Projects List Header */}
      <div id="projects" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '32px',
        paddingBottom: '20px',
        borderBottom: '1px solid var(--border-color)',
      }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '4px' }}>Active Projects</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Manage and monitor your generated architectures.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>
            Total: <span style={{ color: 'var(--text-primary)' }}>{projects.length}</span>
          </span>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card" style={{ height: '220px', opacity: 0.5 }}>
              <div style={{ padding: '28px' }}>
                <div style={{ width: '80px', height: '20px', background: 'var(--border-color)', borderRadius: '4px', marginBottom: '16px' }} />
                <div style={{ width: '100%', height: '24px', background: 'var(--border-color)', borderRadius: '4px', marginBottom: '12px' }} />
                <div style={{ width: '60%', height: '16px', background: 'var(--border-color)', borderRadius: '4px' }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && projects.length === 0 && (
        <div className="glass-card" style={{
          padding: '100px 32px',
          textAlign: 'center',
          borderStyle: 'dashed',
          background: 'rgba(15, 23, 42, 0.2)',
        }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            background: 'rgba(99, 102, 241, 0.1)', 
            borderRadius: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 24px',
            color: 'var(--accent-primary)'
          }}>
            <Building2 size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>No projects found</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '380px', margin: '0 auto 32px' }}>
            Start your first project to generate business analysis and technical architecture instantly.
          </p>
          <a href="/projects/new" className="btn-gradient">Create First Project</a>
        </div>
      )}

      {/* Project Grid */}
      {!loading && !error && projects.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '24px',
        }}>
          {projects.map((project, index) => {
            const status = statusConfig[project.status] || statusConfig.PENDING;
            const isGen = project.status === 'GENERATING';
            
            return (
              <a
                key={project.id}
                href={`/projects/${project.id}`}
                className="glass-card fade-in"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '32px',
                  textDecoration: 'none',
                  color: 'inherit',
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span className={`badge ${status.class}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <status.icon size={14} />
                    {status.label}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  marginBottom: '12px',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                }}>
                  {project.name}
                </h3>
                
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.925rem',
                  lineHeight: 1.6,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  marginBottom: '24px',
                  flex: 1
                }}>
                  {project.description}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--border-color)',
                  marginTop: 'auto'
                }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)' }} />
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(14, 165, 233, 0.1)', border: '1px solid rgba(14, 165, 233, 0.2)', marginLeft: '-12px' }} />
                  </div>
                  <span style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Analyze Artifacts <ArrowRight size={16} />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
