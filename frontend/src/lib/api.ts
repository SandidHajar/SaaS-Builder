import { Project, CreateProjectPayload } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }

  return res.json();
}

export const api = {
  auth: {
    login: (data: any) => fetcher<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    register: (data: any) => fetcher<{ user: any; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    me: () => fetcher<any>('/auth/me'),
  },
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
