import { ROADMAP_PROMPT } from '../prompts/templates';
import { callOpenAI } from '../openaiClient';

export async function generateRoadmap(
  projectName: string,
  description: string
): Promise<Record<string, any>> {
  const prompt = ROADMAP_PROMPT
    .replace('{{projectName}}', projectName)
    .replace('{{description}}', description);

  return callOpenAI(prompt);
}
