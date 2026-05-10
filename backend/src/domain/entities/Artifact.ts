export type ArtifactType = 'IDEA' | 'ROADMAP' | 'ARCHITECTURE';

export interface Artifact {
  id: string;
  type: ArtifactType;
  content: Record<string, any>;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}
