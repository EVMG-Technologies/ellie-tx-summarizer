import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
    });
  }

  async summarizeTransaction(transactionData: any): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a Solana transaction expert. Summarize the following raw transaction data in a concise and human-readable way.',
          },
          {
            role: 'user',
            content: JSON.stringify(transactionData, null, 2),
          },
        ],
      });

      return response.choices[0]?.message?.content || 'Could not generate summary.';
    } catch (error) {
      console.error('Error with OpenAI API:', error);
      throw new Error('Failed to summarize transaction');
    }
  }

  async generateAudioChangelog(text: string): Promise<Buffer> {
     try {
      const mp3 = await this.openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: text,
      });
      return Buffer.from(await mp3.arrayBuffer());
    } catch (error) {
      console.error('Error generating audio changelog:', error);
      throw new Error('Failed to generate audio changelog');
    }
  }
}

export const openaiService = new OpenAIService();
