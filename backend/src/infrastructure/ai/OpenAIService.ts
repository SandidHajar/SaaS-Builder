import { IAIService, AIGenerationResult } from '../../domain/interfaces/IAIService';
import { generateIdeaAnalysis } from './agents/ideaGenerator';
import { generateRoadmap } from './agents/roadmapGenerator';
import { generateArchitecture } from './agents/architectureGenerator';

export class OpenAIService implements IAIService {
  async generateIdeaAnalysis(
    projectName: string,
    description: string
  ): Promise<AIGenerationResult> {
    return generateIdeaAnalysis(projectName, description);
  }

  async generateRoadmap(
    projectName: string,
    description: string
  ): Promise<AIGenerationResult> {
    return generateRoadmap(projectName, description);
  }

  async generateArchitecture(
    projectName: string,
    description: string
  ): Promise<AIGenerationResult> {
    return generateArchitecture(projectName, description);
  }
}
