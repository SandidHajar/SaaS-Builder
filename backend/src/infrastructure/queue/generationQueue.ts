import { Queue } from 'bullmq';
import IORedis from 'ioredis';

let connection: IORedis | null = null;
export let generationQueue: Queue | null = null;

if (process.env.REDIS_URL) {
  connection = new IORedis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null,
  });

  generationQueue = new Queue('ai-generation', {
    connection,
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: 'exponential', delay: 2000 },
      removeOnComplete: 100,
      removeOnFail: 50,
    },
  });
}

export async function addGenerationJob(projectId: string) {
  if (generationQueue) {
    await generationQueue.add('generate', { projectId }, {
      jobId: `gen-${projectId}-${Date.now()}`,
    });
  }
}
