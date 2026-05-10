import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;

const openai = apiKey ? new OpenAI({ apiKey }) : null;

export async function callOpenAI(prompt: string): Promise<Record<string, any>> {
  if (!openai) {
    throw new Error('OpenAI client is not configured. Set OPENAI_API_KEY in .env');
  }
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful AI assistant that always responds with valid JSON. Do not include markdown formatting, code fences, or any text outside of the JSON object.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
      response_format: { type: 'json_object' },
    });

    const text = response.choices[0]?.message?.content || '{}';
    return JSON.parse(text);
  } catch (error: any) {
    console.error('OpenAI API error:', error.message);
    throw new Error(`AI generation failed: ${error.message}`);
  }
}
