'use client';

import { useEffect, useState, use } from 'react';
import { Project } from '@/types';
import { api } from '@/lib/api';
import { 
  Lightbulb, Map, Building2, Frown, Clock, Zap, CheckCircle2, XCircle, 
  Check, AlertTriangle, Rocket, Calendar, Shield, RotateCcw, Sparkles, 
  SquareCheck, ArrowLeft
} from 'lucide-react';

type TabKey = 'idea' | 'roadmap' | 'architecture';

const tabs: { key: TabKey; label: string; icon: any }[] = [
  { key: 'idea', label: 'Idea Analysis', icon: Lightbulb },
  { key: 'roadmap', label: 'MVP Roadmap', icon: Map },
  { key: 'architecture', label: 'Architecture', icon: Building2 },
];

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('idea');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [genError, setGenError] = useState('');

  const fetchProject = async () => {
    try {
      const data = await api.projects.get(id);
      setProject(data);
      if (data.status === 'GENERATING') {
        setTimeout(fetchProject, 3000);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleGenerate = async () => {
    setGenerating(true);
    setGenError('');
    try {
      await api.projects.generate(id);
      // Poll for results
      const poll = async () => {
        const data = await api.projects.get(id);
        setProject(data);
        if (data.status === 'GENERATING') {
          setTimeout(poll, 3000);
        } else {
          setGenerating(false);
        }
      };
      setTimeout(poll, 2000);
    } catch (err: any) {
      setGenError(err.message);
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ maxWidth: '960px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="skeleton" style={{ height: '40px', width: '200px' }} />
          <div className="skeleton" style={{ height: '80px' }} />
          <div className="skeleton" style={{ height: '48px' }} />
          <div className="skeleton" style={{ height: '400px' }} />
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container" style={{ maxWidth: '960px', textAlign: 'center', paddingTop: '80px' }}>
        <div style={{ color: 'var(--text-muted)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
          <Frown size={64} />
        </div>
        <h2 style={{ marginBottom: '8px' }}>Project not found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>{error}</p>
        <a href="/" className="btn-gradient">Back to Dashboard</a>
      </div>
    );
  }

  const statusConfig: Record<string, { label: string; class: string; icon: any }> = {
    PENDING: { label: 'Pending', class: 'badge-pending', icon: Clock },
    GENERATING: { label: 'Generating...', class: 'badge-generating', icon: Zap },
    COMPLETED: { label: 'Completed', class: 'badge-completed', icon: CheckCircle2 },
    FAILED: { label: 'Failed', class: 'badge-failed', icon: XCircle },
  };

  const status = statusConfig[project.status] || statusConfig.PENDING;
  const isGenerating = project.status === 'GENERATING' || generating;

  const getArtifactContent = (tab: TabKey) => {
    switch (tab) {
      case 'idea': return project.ideaAnalysis?.content;
      case 'roadmap': return project.roadmap?.content;
      case 'architecture': return project.architecture?.content;
    }
  };

  const content = getArtifactContent(activeTab);

  return (
    <div className="container" style={{ maxWidth: '1024px', marginTop: '32px' }}>
      <div className="fade-in">
        {/* Breadcrumb */}
        <a href="/" style={{
          color: 'var(--text-muted)',
          textDecoration: 'none',
          fontSize: '0.85rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '24px',
          fontWeight: 500,
          transition: 'color 0.2s',
        }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </a>

        {/* Project Header Banner */}
        <div className="glass-card" style={{ 
          padding: '40px', 
          marginBottom: '32px',
          background: 'linear-gradient(180deg, var(--bg-card) 0%, rgba(20, 20, 30, 0.2) 100%)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '24px',
            flexWrap: 'wrap',
          }}>
            <div style={{ flex: 1, maxWidth: '640px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, lineHeight: 1.1 }}>
                  {project.name}
                </h1>
                <span className={`badge ${status.class}`} style={{ padding: '6px 14px', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  {isGenerating && <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />}
                  <status.icon size={14} /> {status.label}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1.05rem', margin: 0 }}>
                {project.description}
              </p>
            </div>
            <div style={{ flexShrink: 0 }}>
              {(project.status === 'PENDING' || project.status === 'FAILED') && (
                <button
                  className="btn-gradient"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  style={{ padding: '14px 28px', borderRadius: '50px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  {isGenerating ? <><Zap size={18} /> Initializing Agents...</> : <><Sparkles size={18} /> Generate with AI</>}
                </button>
              )}
              {project.status === 'COMPLETED' && (
                <button
                  className="btn-ghost"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  style={{ padding: '12px 24px', borderRadius: '50px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <RotateCcw size={16} /> Regenerate
                </button>
              )}
            </div>
          </div>
          {genError && (
            <div style={{
              marginTop: '20px',
              padding: '16px',
              borderRadius: '12px',
              background: 'rgba(239, 68, 68, 0.05)',
              border: '1px solid rgba(239, 68, 68, 0.15)',
              color: 'var(--error)',
              fontSize: '0.95rem',
              fontWeight: 500
            }}>
              {genError}
            </div>
          )}
        </div>

        {/* Generating State */}
        {isGenerating && (
          <div className="glass-card" style={{
            padding: '80px 32px',
            textAlign: 'center',
            marginBottom: '32px',
          }}>
            <div className="spinner" style={{ margin: '0 auto 32px', width: '48px', height: '48px' }} />
            <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '12px', letterSpacing: '-0.01em' }}>
              Agents are analyzing your concept...
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '400px', margin: '0 auto' }}>
              We are parallel-processing your business model, MVP features, and system architecture. This takes around 15-30 seconds.
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '32px',
              marginTop: '40px',
            }}>
              {tabs.map((t) => (
                <div key={t.key} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}>
                  <span className="pulse-dot" style={{ background: 'var(--accent-secondary)' }} />
                  <t.icon size={16} /> {t.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabs + Content */}
        {!isGenerating && project.status === 'COMPLETED' && (
          <>
            {/* Pill Tabs */}
            <div style={{ 
              display: 'flex', 
              gap: '8px', 
              marginBottom: '32px', 
              background: 'var(--bg-card)', 
              padding: '6px', 
              borderRadius: '50px',
              width: 'fit-content',
              border: '1px solid var(--border-color)'
            }}>
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '40px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <tab.icon size={18} /> {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="fade-in" key={activeTab}>
              {content ? (
                <div className="glass-card" style={{ padding: '48px', borderTopLeftRadius: activeTab === 'idea' ? '8px' : '20px' }}>
                  {activeTab === 'idea' && <IdeaContent data={content} />}
                  {activeTab === 'roadmap' && <RoadmapContent data={content} />}
                  {activeTab === 'architecture' && <ArchitectureContent data={content} />}
                </div>
              ) : (
                <div className="glass-card" style={{ padding: '64px', textAlign: 'center', borderStyle: 'dashed' }}>
                  <p style={{ color: 'var(--text-muted)' }}>No data available for this tab.</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Pending State */}
        {!isGenerating && project.status === 'PENDING' && (
          <div className="glass-card" style={{ padding: '80px 32px', textAlign: 'center', borderStyle: 'dashed' }}>
            <div style={{ color: 'var(--accent-primary)', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <Sparkles size={64} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px' }}>
              Agents Standing By
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '400px', margin: '0 auto', lineHeight: 1.6 }}>
              Click the "Generate with AI" button above to spin up our virtual architects, product managers, and business analysts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Idea Analysis Tab ─── */
function IdeaContent({ data }: { data: Record<string, any> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Summary */}
      {data.summary && (
        <Section title="Summary">
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1rem' }}>{data.summary}</p>
        </Section>
      )}

      {/* Problem */}
      {data.problemStatement && (
        <Section title="Problem Statement">
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{data.problemStatement}</p>
        </Section>
      )}

      {/* Target Audience */}
      {data.targetAudience && (
        <Section title="Target Audience">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <InfoCard label="Primary" value={data.targetAudience.primary} />
            <InfoCard label="Secondary" value={data.targetAudience.secondary} />
            <InfoCard label="Market Size" value={data.targetAudience.marketSize} />
          </div>
        </Section>
      )}

      {/* Value Proposition */}
      {data.valueProposition && (
        <Section title="Value Proposition">
          <div style={{
            background: 'rgba(99, 102, 241, 0.06)',
            padding: '16px 20px',
            borderRadius: '12px',
            borderLeft: '3px solid var(--accent-primary)',
          }}>
            <p style={{ color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.6 }}>{data.valueProposition}</p>
          </div>
        </Section>
      )}

      {/* Competitive Advantages */}
      {data.competitiveAdvantage?.length > 0 && (
        <Section title="Competitive Advantages">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.competitiveAdvantage.map((item: string, i: number) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '10px',
                background: 'var(--bg-card)',
              }}>
                <span style={{ color: 'var(--success)' }}><Check size={18} /></span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>{item}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Revenue Model */}
      {data.revenueModel && (
        <Section title="Revenue Model">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <InfoCard label="Primary Revenue" value={data.revenueModel.primary} />
            <InfoCard label="Pricing" value={data.revenueModel.pricingStrategy} />
          </div>
          {data.revenueModel.secondary?.length > 0 && (
            <div style={{ marginTop: '12px' }}>
              <p className="section-label" style={{ marginBottom: '6px' }}>Secondary Streams</p>
              {data.revenueModel.secondary.map((s: string, i: number) => (
                <span key={i} style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  background: 'var(--bg-card)',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)',
                  marginRight: '8px',
                  marginBottom: '6px',
                }}>
                  {s}
                </span>
              ))}
            </div>
          )}
        </Section>
      )}

      {/* Viability Score */}
      {data.viabilityScore && (
        <Section title="Viability Score">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: `conic-gradient(var(--accent-primary) ${data.viabilityScore * 10}%, var(--bg-card) 0%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--bg-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                fontWeight: 700,
              }}>
                {data.viabilityScore}/10
              </div>
            </div>
            {data.recommendation && (
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}>{data.recommendation}</p>
            )}
          </div>
        </Section>
      )}

      {/* Risks & Opportunities */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {data.risks?.length > 0 && (
          <Section title={<span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><AlertTriangle size={18} /> Risks</span>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {data.risks.map((r: string, i: number) => (
                <p key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', padding: '6px 0', borderBottom: '1px solid var(--border-color)' }}>
                  {r}
                </p>
              ))}
            </div>
          </Section>
        )}
        {data.opportunities?.length > 0 && (
          <Section title={<span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Rocket size={18} /> Opportunities</span>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {data.opportunities.map((o: string, i: number) => (
                <p key={i} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', padding: '6px 0', borderBottom: '1px solid var(--border-color)' }}>
                  {o}
                </p>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

/* ─── Roadmap Tab ─── */
function RoadmapContent({ data }: { data: Record<string, any> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Vision & Goal */}
      {data.vision && (
        <div style={{
          background: 'rgba(99, 102, 241, 0.06)',
          padding: '20px 24px',
          borderRadius: '14px',
          borderLeft: '3px solid var(--accent-primary)',
        }}>
          <p className="section-label">Vision</p>
          <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '1.05rem' }}>{data.vision}</p>
          {data.mvpGoal && (
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.92rem' }}>
              <strong>MVP Goal:</strong> {data.mvpGoal}
            </p>
          )}
          {data.timeline && (
            <span className="badge badge-generating" style={{ marginTop: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={14} /> {data.timeline}
            </span>
          )}
        </div>
      )}

      {/* Phases Timeline */}
      {data.phases?.length > 0 && (
        <Section title="Development Phases">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {data.phases.map((phase: any, i: number) => (
              <div key={i} style={{
                padding: '20px',
                borderRadius: '12px',
                background: 'var(--bg-card)',
                borderLeft: `3px solid ${i === 0 ? 'var(--accent-primary)' : i === 1 ? 'var(--accent-secondary)' : 'var(--success)'}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4 style={{ fontWeight: 700, fontSize: '1rem' }}>{phase.name}</h4>
                  {phase.duration && <span className="badge badge-pending" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {phase.duration}</span>}
                </div>
                {phase.goals?.length > 0 && (
                  <div style={{ marginBottom: '10px' }}>
                    <p className="section-label">Goals</p>
                    {phase.goals.map((g: string, j: number) => (
                      <p key={j} style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '4px' }}>• {g}</p>
                    ))}
                  </div>
                )}
                {phase.deliverables?.length > 0 && (
                  <div>
                    <p className="section-label">Deliverables</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {phase.deliverables.map((d: string, j: number) => (
                        <span key={j} style={{
                          padding: '3px 10px',
                          borderRadius: '16px',
                          background: 'rgba(99, 102, 241, 0.08)',
                          fontSize: '0.8rem',
                          color: 'var(--accent-primary)',
                        }}>
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Features */}
      {data.features && (
        <Section title="Feature Priorities">
          {(['mustHave', 'shouldHave', 'niceToHave'] as const).map((tier) => {
            const items = data.features[tier];
            if (!items?.length) return null;
            const tierLabels: Record<string, { label: string; color: string }> = {
              mustHave: { label: 'Must Have (P0)', color: 'var(--error)' },
              shouldHave: { label: 'Should Have (P1)', color: 'var(--warning)' },
              niceToHave: { label: 'Nice to Have (P2)', color: 'var(--text-muted)' },
            };
            const { label, color } = tierLabels[tier];
            return (
              <div key={tier} style={{ marginBottom: '16px' }}>
                <p style={{ fontWeight: 600, fontSize: '0.88rem', color, marginBottom: '8px' }}>{label}</p>
                {items.map((f: any, i: number) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: 'var(--bg-card)',
                    marginBottom: '6px',
                  }}>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{f.name}</span>
                      {f.description && <span style={{ color: 'var(--text-muted)', marginLeft: '8px', fontSize: '0.83rem' }}>— {f.description}</span>}
                    </div>
                    {f.effort && <span className="badge badge-pending" style={{ fontSize: '0.72rem' }}>{f.effort}</span>}
                  </div>
                ))}
              </div>
            );
          })}
        </Section>
      )}

      {/* Success Metrics */}
      {data.successMetrics?.length > 0 && (
        <Section title="Success Metrics">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            {data.successMetrics.map((m: any, i: number) => (
              <InfoCard key={i} label={m.metric} value={m.target} />
            ))}
          </div>
        </Section>
      )}

      {/* Launch Checklist */}
      {data.launchChecklist?.length > 0 && (
        <Section title="Launch Checklist">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {data.launchChecklist.map((item: string, i: number) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px',
                borderRadius: '8px',
                background: 'var(--bg-card)',
              }}>
                <span style={{
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <SquareCheck size={20} />
                </span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item}</span>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

/* ─── Architecture Tab ─── */
function ArchitectureContent({ data }: { data: Record<string, any> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Overview */}
      {data.overview && (
        <Section title="Architecture Overview">
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{data.overview}</p>
        </Section>
      )}

      {/* Tech Stack */}
      {data.techStack && (
        <Section title="Tech Stack">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {Object.entries(data.techStack).map(([category, details]: [string, any]) => (
              <div key={category} style={{
                padding: '20px',
                borderRadius: '12px',
                background: 'var(--bg-card)',
              }}>
                <h4 style={{
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textTransform: 'capitalize',
                  marginBottom: '12px',
                  color: 'var(--accent-primary)',
                }}>
                  {category.replace(/_/g, ' ')}
                </h4>
                {typeof details === 'object' && Object.entries(details).map(([key, value]: [string, any]) => {
                  if (key === 'reasoning') return null;
                  return (
                    <div key={key} style={{ marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                        {key.replace(/_/g, ' ')}
                      </span>
                      <p style={{ fontWeight: 500, fontSize: '0.92rem' }}>
                        {typeof value === 'string' ? value : Array.isArray(value) ? value.join(', ') : JSON.stringify(value)}
                      </p>
                    </div>
                  );
                })}
                {details?.reasoning && (
                  <p style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    marginTop: '8px',
                    fontStyle: 'italic',
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Lightbulb size={14} color="var(--accent-secondary)" /> {details.reasoning}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* System Design */}
      {data.systemDesign && (
        <Section title="System Design">
          {data.systemDesign.components?.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <p className="section-label">Components</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                {data.systemDesign.components.map((c: any, i: number) => (
                  <div key={i} style={{
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: 'var(--bg-card)',
                    borderLeft: '3px solid var(--accent-primary)',
                  }}>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>{c.name}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '4px' }}>{c.responsibility}</p>
                    <span style={{
                      padding: '2px 8px',
                      background: 'rgba(99, 102, 241, 0.08)',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      color: 'var(--accent-primary)',
                    }}>
                      {c.technology}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {data.systemDesign.dataFlow && (
            <div style={{ marginBottom: '16px' }}>
              <p className="section-label">Data Flow</p>
              <div style={{
                padding: '16px',
                borderRadius: '10px',
                background: 'var(--bg-card)',
                fontFamily: 'monospace',
                fontSize: '0.88rem',
                color: 'var(--accent-primary)',
                letterSpacing: '0.5px',
              }}>
                {data.systemDesign.dataFlow}
              </div>
            </div>
          )}
          {data.systemDesign.security?.length > 0 && (
            <div>
              <p className="section-label">Security</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {data.systemDesign.security.map((s: string, i: number) => (
                  <span key={i} style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    background: 'rgba(34, 197, 94, 0.08)',
                    color: 'var(--success)',
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Shield size={14} /> {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Section>
      )}

      {/* Data Models */}
      {data.dataModels?.length > 0 && (
        <Section title="Data Models">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {data.dataModels.map((model: any, i: number) => (
              <div key={i} style={{ padding: '16px', borderRadius: '10px', background: 'var(--bg-card)' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '10px', color: 'var(--accent-primary)' }}>{model.name}</h4>
                {model.fields?.length > 0 && (
                  <div style={{
                    fontFamily: 'monospace',
                    fontSize: '0.82rem',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: 'var(--bg-primary)',
                    marginBottom: '8px',
                  }}>
                    {model.fields.map((f: string, j: number) => (
                      <div key={j} style={{ padding: '2px 0', color: 'var(--text-secondary)' }}>{f}</div>
                    ))}
                  </div>
                )}
                {model.relationships && (
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    {model.relationships}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* API Endpoints */}
      {data.apiEndpoints?.length > 0 && (
        <Section title="API Endpoints">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {data.apiEndpoints.map((ep: any, i: number) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'var(--bg-card)',
              }}>
                <span style={{
                  padding: '2px 10px',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  background: ep.method === 'GET' ? 'rgba(34, 197, 94, 0.1)' :
                    ep.method === 'POST' ? 'rgba(99, 102, 241, 0.1)' :
                      ep.method === 'PUT' ? 'rgba(245, 158, 11, 0.1)' :
                        'rgba(239, 68, 68, 0.1)',
                  color: ep.method === 'GET' ? 'var(--success)' :
                    ep.method === 'POST' ? 'var(--accent-primary)' :
                      ep.method === 'PUT' ? 'var(--warning)' :
                        'var(--error)',
                }}>
                  {ep.method}
                </span>
                <code style={{ fontSize: '0.88rem', fontWeight: 500 }}>{ep.path}</code>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginLeft: 'auto' }}>{ep.description}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Deployment */}
      {data.deploymentStrategy && (
        <Section title="Deployment Strategy">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <InfoCard label="Approach" value={data.deploymentStrategy.approach} />
            <InfoCard label="Scaling" value={data.deploymentStrategy.scalingStrategy} />
            {data.deploymentStrategy.environments && (
              <InfoCard label="Environments" value={data.deploymentStrategy.environments.join(' → ')} />
            )}
          </div>
        </Section>
      )}

      {/* Starter Code */}
      {data.starterCode?.projectStructure && (
        <Section title="Project Structure">
          <pre style={{
            padding: '16px',
            borderRadius: '10px',
            background: 'var(--bg-card)',
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            overflow: 'auto',
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
          }}>
            {data.starterCode.projectStructure}
          </pre>
        </Section>
      )}
    </div>
  );
}

/* ─── Shared Components ─── */
function Section({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <h3 style={{
        fontSize: '1.05rem',
        fontWeight: 700,
        marginBottom: '14px',
        paddingBottom: '8px',
        borderBottom: '1px solid var(--border-color)',
      }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string | undefined }) {
  if (!value) return null;
  return (
    <div style={{
      padding: '14px 16px',
      borderRadius: '10px',
      background: 'var(--bg-card)',
    }}>
      <p className="section-label" style={{ marginBottom: '4px' }}>{label}</p>
      <p style={{ fontWeight: 500, fontSize: '0.92rem', lineHeight: 1.5 }}>{value}</p>
    </div>
  );
}
