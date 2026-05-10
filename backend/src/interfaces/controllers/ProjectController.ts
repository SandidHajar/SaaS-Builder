import { Request, Response, NextFunction } from 'express';
import { CreateProjectUseCase } from '../../application/usecases/CreateProject';
import { GetProjectUseCase } from '../../application/usecases/GetProject';
import { ListProjectsUseCase } from '../../application/usecases/ListProjects';
import { GenerateArtifactsUseCase } from '../../application/usecases/GenerateArtifacts';
import { PrismaProjectRepository } from '../../infrastructure/repositories/PrismaProjectRepository';
import { OpenAIService } from '../../infrastructure/ai/OpenAIService';
import { MockAIService } from '../../infrastructure/ai/MockAIService';

const projectRepository = new PrismaProjectRepository();

// Use MockAIService if no valid OpenAI key is configured
const apiKey = process.env.OPENAI_API_KEY || '';
const useMock = !apiKey || apiKey.includes('YOUR_KEY') || apiKey.length < 20;

if (useMock) {
  console.log('[AI] ⚠ No valid OPENAI_API_KEY found — using MockAIService (demo data)');
} else {
  console.log('[AI] ✓ OpenAI key detected — using live AI generation');
}

const aiService = useMock ? new MockAIService() : new OpenAIService();

const createProjectUseCase = new CreateProjectUseCase(projectRepository);
const getProjectUseCase = new GetProjectUseCase(projectRepository);
const listProjectsUseCase = new ListProjectsUseCase(projectRepository);
const generateArtifactsUseCase = new GenerateArtifactsUseCase(projectRepository, aiService);

export class ProjectController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description } = req.body;
      const project = await createProjectUseCase.execute({ name, description });
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await getProjectUseCase.execute(req.params.id);
      res.json(project);
    } catch (error) {
      next(error);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await listProjectsUseCase.execute();
      res.json(projects);
    } catch (error) {
      next(error);
    }
  }

  static async generate(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (process.env.REDIS_URL) {
        // Dynamically import queue only when Redis is available
        const { addGenerationJob } = await import('../../infrastructure/queue/generationQueue');
        await projectRepository.updateStatus(id, 'GENERATING');
        await addGenerationJob(id);
        res.json({ message: 'Generation job queued', projectId: id });
      } else {
        // Fallback: synchronous generation (no Redis needed for dev)
        await generateArtifactsUseCase.execute(id);
        const project = await getProjectUseCase.execute(id);
        res.json(project);
      }
    } catch (error) {
      next(error);
    }
  }
}
