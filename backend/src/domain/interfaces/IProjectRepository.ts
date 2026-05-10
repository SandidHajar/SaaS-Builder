import { Project, CreateProjectDTO, ProjectStatus } from '../entities/Project';
import { Artifact, ArtifactType } from '../entities/Artifact';

export interface IProjectRepository {
  create(data: CreateProjectDTO): Promise<Project>;
  findById(id: string): Promise<Project | null>;
  findAll(userId?: string): Promise<Project[]>;
  updateStatus(id: string, status: ProjectStatus): Promise<Project>;
  upsertArtifact(projectId: string, type: ArtifactType, content: Record<string, any>): Promise<Artifact>;
}
