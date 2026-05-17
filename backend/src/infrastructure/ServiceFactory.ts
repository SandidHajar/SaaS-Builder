import { IAIService } from '../domain/interfaces/IAIService';
import { OpenAIService } from './ai/OpenAIService';
import { MockAIService } from './ai/MockAIService';

export function createAIService(): IAIService {
  const apiKey = process.env.OPENAI_API_KEY || '';
  
  // Use mock if API key is missing, a placeholder, or explicitly disabled
  const useMock = !apiKey || 
                  apiKey.includes('YOUR_KEY') || 
                  apiKey.length < 20 || 
                  apiKey.startsWith('DISABLED_');

  if (useMock) {
    console.warn('[AI] ⚠ No valid OPENAI_API_KEY found — using MockAIService (demo data)');
    return new MockAIService();
  }

  return new OpenAIService();
}
