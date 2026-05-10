import { ARCHITECTURE_PROMPT } from '../prompts/templates';
import { callOpenAI } from '../openaiClient';

export async function generateArchitecture(
  projectName: string,
  description: string
): Promise<Record<string, any>> {
  const prompt = ARCHITECTURE_PROMPT
    .replace('{{projectName}}', projectName)
    .replace('{{description}}', description);

  return callOpenAI(prompt);
}
