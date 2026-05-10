import prisma from '../database/prismaClient';
import { IProjectRepository } from '../../domain/interfaces/IProjectRepository';
import { Project, CreateProjectDTO, ProjectStatus } from '../../domain/entities/Project';
import { Artifact, ArtifactType } from '../../domain/entities/Artifact';

export class PrismaProjectRepository implements IProjectRepository {
  private mapProject(dbProject: any): Project {
    const artifacts = dbProject.artifacts || [];
    return {
      ...dbProject,
      ideaAnalysis: artifacts.find((a: any) => a.type === 'IDEA') || null,
      roadmap: artifacts.find((a: any) => a.type === 'ROADMAP') || null,
      architecture: artifacts.find((a: any) => a.type === 'ARCHITECTURE') || null,
    };
  }

  async create(data: CreateProjectDTO): Promise<Project> {
    const project = await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        userId: data.userId,
      },
      include: { artifacts: true },
    });
    return this.mapProject(project);
  }

  async findById(id: string): Promise<Project | null> {
    const project = await prisma.project.findUnique({
      where: { id },
      include: { artifacts: true },
    });
    if (!project) return null;
    return this.mapProject(project);
  }

  async findAll(userId?: string): Promise<Project[]> {
    const projects = await prisma.project.findMany({
      where: userId ? { userId } : {},
      include: { artifacts: true },
      orderBy: { createdAt: 'desc' },
    });
    return projects.map((p) => this.mapProject(p));
  }

  async updateStatus(id: string, status: ProjectStatus): Promise<Project> {
    const project = await prisma.project.update({
      where: { id },
      data: { status },
      include: { artifacts: true },
    });
    return this.mapProject(project);
  }

  async upsertArtifact(
    projectId: string,
    type: ArtifactType,
    content: Record<string, any>
  ): Promise<Artifact> {
    const artifact = await prisma.artifact.upsert({
      where: {
        projectId_type: { projectId, type },
      },
      update: { content },
      create: { projectId, type, content },
    });
    return artifact as unknown as Artifact;
  }
}
