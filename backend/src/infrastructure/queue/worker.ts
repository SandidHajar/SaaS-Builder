import 'dotenv/config';
import { Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import { PrismaProjectRepository } from '../repositories/PrismaProjectRepository';
import { createAIService } from '../ServiceFactory';
import { GenerateArtifactsUseCase } from '../../application/usecases/GenerateArtifacts';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
});

const projectRepository = new PrismaProjectRepository();
const aiService = createAIService();
const generateArtifacts = new GenerateArtifactsUseCase(projectRepository, aiService);

const worker = new Worker(
  'ai-generation',
  async (job: Job) => {
    const { projectId } = job.data;
    console.log(`[Worker] Processing generation for project: ${projectId}`);

    await generateArtifacts.execute(projectId);

    console.log(`[Worker] Completed generation for project: ${projectId}`);
  },
  {
    connection,
    concurrency: 2,
  }
);

worker.on('completed', (job) => {
  console.log(`[Worker] Job ${job.id} completed successfully`);
});

worker.on('failed', (job, err) => {
  console.error(`[Worker] Job ${job?.id} failed:`, err.message);
});

worker.on('error', (err) => {
  console.error('[Worker] Error:', err.message);
});

export default worker;
