import { IProjectRepository } from '../../domain/interfaces/IProjectRepository';
import { IAIService } from '../../domain/interfaces/IAIService';

export class GenerateArtifactsUseCase {
  constructor(
    private projectRepository: IProjectRepository,
    private aiService: IAIService
  ) {}

  async execute(projectId: string): Promise<void> {
    const project = await this.projectRepository.findById(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    // Allow re-generation for FAILED or stuck GENERATING projects

    // Mark as generating
    await this.projectRepository.updateStatus(projectId, 'GENERATING');

    try {
      // Generate all three artifacts in parallel
      const [ideaAnalysis, roadmap, architecture] = await Promise.all([
        this.aiService.generateIdeaAnalysis(project.name, project.description),
        this.aiService.generateRoadmap(project.name, project.description),
        this.aiService.generateArchitecture(project.name, project.description),
      ]);

      // Store artifacts
      await Promise.all([
        this.projectRepository.upsertArtifact(projectId, 'IDEA', ideaAnalysis),
        this.projectRepository.upsertArtifact(projectId, 'ROADMAP', roadmap),
        this.projectRepository.upsertArtifact(projectId, 'ARCHITECTURE', architecture),
      ]);

      await this.projectRepository.updateStatus(projectId, 'COMPLETED');
    } catch (error) {
      await this.projectRepository.updateStatus(projectId, 'FAILED');
      throw error;
    }
  }
}
