import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { CreateProjectUseCase } from '../../application/usecases/CreateProject';
import { GetProjectUseCase } from '../../application/usecases/GetProject';
import { ListProjectsUseCase } from '../../application/usecases/ListProjects';
import { GenerateArtifactsUseCase } from '../../application/usecases/GenerateArtifacts';
import { PrismaProjectRepository } from '../../infrastructure/repositories/PrismaProjectRepository';
import { createAIService } from '../../infrastructure/ServiceFactory';

const projectRepository = new PrismaProjectRepository();

// Use MockAIService if no valid OpenAI key is configured
const aiService = createAIService();

const createProjectUseCase = new CreateProjectUseCase(projectRepository);
const getProjectUseCase = new GetProjectUseCase(projectRepository);
const listProjectsUseCase = new ListProjectsUseCase(projectRepository);
const generateArtifactsUseCase = new GenerateArtifactsUseCase(projectRepository, aiService);

export class ProjectController {
  static async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { name, description } = req.body;
      const project = await createProjectUseCase.execute({ name, description, userId: req.userId });
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const project = await getProjectUseCase.execute(id as string);
      res.json(project);
    } catch (error) {
      next(error);
    }
  }

  static async list(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const projects = await listProjectsUseCase.execute(req.userId);
      res.json(projects);
    } catch (error) {
      next(error);
    }
  }

  static async generate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;

      if (process.env.REDIS_URL) {
        // Dynamically import queue only when Redis is available
        const { addGenerationJob } = await import('../../infrastructure/queue/generationQueue');
        await projectRepository.updateStatus(id, 'GENERATING');
        await addGenerationJob(id);
        res.json({ message: 'Generation job queued', projectId: id });
      } else {
        // Fallback: synchronous generation (no Redis needed for dev)
        await generateArtifactsUseCase.execute(id as string);
        const project = await getProjectUseCase.execute(id as string);
        res.json(project);
      }
    } catch (error) {
      next(error);
    }
  }
}
