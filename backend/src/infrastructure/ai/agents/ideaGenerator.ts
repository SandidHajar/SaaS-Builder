import { IDEA_ANALYSIS_PROMPT } from '../prompts/templates';
import { callOpenAI } from '../openaiClient';

export async function generateIdeaAnalysis(
  projectName: string,
  description: string
): Promise<Record<string, any>> {
  const prompt = IDEA_ANALYSIS_PROMPT
    .replace('{{projectName}}', projectName)
    .replace('{{description}}', description);

  return callOpenAI(prompt);
}
