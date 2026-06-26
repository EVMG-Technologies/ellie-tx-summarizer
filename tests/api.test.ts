import request from 'supertest';
import app from '../src/index';
import { solanaService } from '../src/services/solanaService';
import { openaiService } from '../src/services/openaiService';

jest.mock('@solana/web3.js', () => {
  return {
    clusterApiUrl: jest.fn().mockReturnValue('https://api.mainnet-beta.solana.com'),
    Connection: jest.fn().mockImplementation(() => ({
      getParsedTransaction: jest.fn(),
    })),
  };
});

jest.mock('../src/services/solanaService');
jest.mock('../src/services/openaiService');

describe('API Routes', () => {
  describe('POST /api/summarize', () => {
    it('should return 400 if signature is missing', async () => {
      const response = await request(app).post('/api/summarize').send({});
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Signature is required');
    });

    it('should return 404 if transaction is not found', async () => {
      (solanaService.getTransactionData as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .post('/api/summarize')
        .send({ signature: 'non-existent' });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Transaction not found');
    });

    it('should return a summary on success', async () => {
      (solanaService.getTransactionData as jest.Mock).mockResolvedValue({ some: 'data' });
      (openaiService.summarizeTransaction as jest.Mock).mockResolvedValue('A nice summary');

      const response = await request(app)
        .post('/api/summarize')
        .send({ signature: 'valid-sig' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        signature: 'valid-sig',
        summary: 'A nice summary',
      });
    });

    it('should return 500 if an error occurs', async () => {
      (solanaService.getTransactionData as jest.Mock).mockRejectedValue(new Error('Internal error'));

      const response = await request(app)
        .post('/api/summarize')
        .send({ signature: 'error-sig' });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Internal error');
    });
  });

  describe('GET /health', () => {
    it('should return 200 ok', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('ok');
    });
  });
});
