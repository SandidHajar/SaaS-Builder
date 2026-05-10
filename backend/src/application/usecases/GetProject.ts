import { IProjectRepository } from '../../domain/interfaces/IProjectRepository';
import { Project } from '../../domain/entities/Project';

export class GetProjectUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(id: string): Promise<Project> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  }
}
