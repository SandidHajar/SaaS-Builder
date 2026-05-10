import { IProjectRepository } from '../../domain/interfaces/IProjectRepository';
import { CreateProjectDTO, Project } from '../../domain/entities/Project';

export class CreateProjectUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  async execute(data: CreateProjectDTO): Promise<Project> {
    if (!data.name || !data.description) {
      throw new Error('Project name and description are required');
    }

    if (data.name.length < 2) {
      throw new Error('Project name must be at least 2 characters');
    }

    if (data.description.length < 10) {
      throw new Error('Description must be at least 10 characters to generate meaningful results');
    }

    return this.projectRepository.create(data);
  }
}
