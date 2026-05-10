'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function NewProjectPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const project = await api.projects.create({ name, description });
      router.push(`/projects/${project.id}`);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const examplePrompts = [
    {
      name: 'Smart Grocery Optimizer',
      desc: 'An AI-powered grocery shopping platform that suggests recipes based on sale items and nutritional goals for busy professionals.',
    },
    {
      name: 'Remote Team Culture Sync',
      desc: 'A framework for distributed teams to build culture through asynchronous rituals and AI-matched networking chats.',
    },
    {
      name: 'Freelance Financial Suite',
      desc: 'An automated finance tool for independent contractors focusing on tax estimation and cash flow forecasting.',
    },
  ];

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <div className="fade-in">
        {/* Header */}
        <div style={{ marginBottom: '56px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.03em' }}>
            New Project <span style={{ color: 'var(--accent-primary)' }}>Architecture</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '520px', margin: '0 auto' }}>
            Provide your startup concept details. Our AI agents will analyze the business model and generate a technical blueprint.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="glass-card" style={{ padding: '48px', background: 'rgba(15, 23, 42, 0.4)' }}>
            {/* Name */}
            <div style={{ marginBottom: '32px' }}>
              <label className="section-label" htmlFor="project-name" style={{ display: 'block', marginBottom: '12px' }}>
                Project Designation
              </label>
              <input
                id="project-name"
                type="text"
                className="input-field"
                placeholder="e.g. Project Orion"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
                maxLength={100}
                style={{ padding: '16px' }}
              />
            </div>

            {/* Description */}
            <div style={{ marginBottom: '40px' }}>
              <label className="section-label" htmlFor="project-description" style={{ display: 'block', marginBottom: '12px' }}>
                Concept & Core Objectives
              </label>
              <textarea
                id="project-description"
                className="input-field"
                placeholder="Describe the problem, target audience, and primary features..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                minLength={10}
                rows={8}
                style={{ minHeight: '180px', padding: '16px', lineHeight: 1.6 }}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '12px',
              }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Detailed descriptions yield more accurate system designs.
                </span>
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: description.length < 10 ? 'var(--text-muted)' : 'var(--accent-primary)',
                }}>
                  {description.length} chars
                </span>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                padding: '16px',
                borderRadius: '8px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                color: 'var(--error)',
                fontSize: '0.9rem',
                marginBottom: '32px',
                fontWeight: 500,
              }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="btn-gradient"
              disabled={loading || name.length < 2 || description.length < 10}
              style={{ width: '100%', padding: '18px', fontSize: '1rem', letterSpacing: '0.01em' }}
            >
              {loading ? (
                <>
                  <span className="spinner" style={{ marginRight: '12px' }} />
                  Processing Architecture...
                </>
              ) : (
                'Generate Full Architecture'
              )}
            </button>
          </div>
        </form>

        {/* Example Prompts */}
        <div style={{ marginTop: '64px', paddingBottom: '64px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
              Example Concepts
            </h4>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
            {examplePrompts.map((example, index) => (
              <button
                key={example.name}
                type="button"
                className="glass-card"
                onClick={() => {
                  setName(example.name);
                  setDescription(example.desc);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  padding: '24px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  border: '1px solid var(--border-color)',
                }}
              >
                <h5 style={{ fontWeight: 700, marginBottom: '8px', fontSize: '1rem', color: 'var(--text-primary)' }}>
                  {example.name}
                </h5>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  margin: 0
                }}>
                  {example.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
