import { Project, CreateProjectPayload } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }

  return res.json();
}

export const api = {
  projects: {
    list: () => fetcher<Project[]>('/projects'),

    get: (id: string) => fetcher<Project>(`/projects/${id}`),

    create: (data: CreateProjectPayload) =>
      fetcher<Project>('/projects', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    generate: (id: string) =>
      fetcher<Project | { message: string; projectId: string }>(`/projects/${id}/generate`, {
        method: 'POST',
      }),
  },
};
