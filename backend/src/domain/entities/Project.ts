import { Artifact } from './Artifact';

export type ProjectStatus = 'PENDING' | 'GENERATING' | 'COMPLETED' | 'FAILED';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  userId?: string | null;
  ideaAnalysis?: Artifact | null;
  roadmap?: Artifact | null;
  architecture?: Artifact | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectDTO {
  name: string;
  description: string;
  userId?: string;
}
