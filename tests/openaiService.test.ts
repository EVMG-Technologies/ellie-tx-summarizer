import { OpenAIService } from '../src/services/openaiService';
import OpenAI from 'openai';

jest.mock('openai');

describe('OpenAIService', () => {
  let openaiService: OpenAIService;
  let mockOpenAIInstance: any;

  beforeEach(() => {
    mockOpenAIInstance = {
      chat: {
        completions: {
          create: jest.fn(),
        },
      },
      audio: {
        speech: {
          create: jest.fn(),
        },
      },
    };
    (OpenAI as unknown as jest.Mock).mockImplementation(() => mockOpenAIInstance);
    openaiService = new OpenAIService();
  });

  it('should summarize transaction data successfully', async () => {
    const mockResponse = {
      choices: [{ message: { content: 'Summary of transaction' } }],
    };
    mockOpenAIInstance.chat.completions.create.mockResolvedValue(mockResponse);

    const result = await openaiService.summarizeTransaction({ data: 'raw' });

    expect(result).toBe('Summary of transaction');
    expect(mockOpenAIInstance.chat.completions.create).toHaveBeenCalled();
  });

  it('should throw an error if OpenAI API fails', async () => {
    mockOpenAIInstance.chat.completions.create.mockRejectedValue(new Error('OpenAI error'));

    await expect(openaiService.summarizeTransaction({ data: 'raw' })).rejects.toThrow('Failed to summarize transaction');
  });

  it('should generate audio changelog successfully', async () => {
     const mockAudioResponse = {
        arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(8))
     };
     mockOpenAIInstance.audio.speech.create.mockResolvedValue(mockAudioResponse);

     const result = await openaiService.generateAudioChangelog('test text');
     expect(result).toBeInstanceOf(Buffer);
     expect(mockOpenAIInstance.audio.speech.create).toHaveBeenCalled();
  });
});
