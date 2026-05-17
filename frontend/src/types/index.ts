export type ProjectStatus = 'PENDING' | 'GENERATING' | 'COMPLETED' | 'FAILED';
export type ArtifactType = 'IDEA' | 'ROADMAP' | 'ARCHITECTURE';

export interface Artifact {
  id: string;
  type: ArtifactType;
  content: Record<string, any>;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  artifacts?: Artifact[];
  ideaAnalysis?: Artifact | null;
  roadmap?: Artifact | null;
  architecture?: Artifact | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectPayload {
  name: string;
  description: string;
}
