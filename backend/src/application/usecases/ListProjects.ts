import { IProjectRepository } from '../../domain/interfaces/IProjectRepository';
import { Project } from '../../domain/entities/Project';

export class ListProjectsUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(userId?: string): Promise<Project[]> {
    return this.projectRepository.findAll(userId);
  }
}
