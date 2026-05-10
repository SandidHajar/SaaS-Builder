export interface AIGenerationResult {
  [key: string]: any;
}

export interface IAIService {
  generateIdeaAnalysis(projectName: string, description: string): Promise<AIGenerationResult>;
  generateRoadmap(projectName: string, description: string): Promise<AIGenerationResult>;
  generateArchitecture(projectName: string, description: string): Promise<AIGenerationResult>;
}
