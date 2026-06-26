import { SolanaService } from '../src/services/solanaService';

const mockGetParsedTransaction = jest.fn();

jest.mock('@solana/web3.js', () => {
  return {
    clusterApiUrl: jest.fn().mockReturnValue('https://api.mainnet-beta.solana.com'),
    Connection: jest.fn().mockImplementation(() => ({
      getParsedTransaction: (...args: any[]) => mockGetParsedTransaction(...args),
    })),
  };
});

describe('SolanaService', () => {
  let solanaService: SolanaService;

  beforeEach(() => {
    jest.clearAllMocks();
    solanaService = new SolanaService('http://mock-endpoint');
  });

  it('should fetch transaction data successfully', async () => {
    const mockTxData = { signature: 'test-sig', slot: 123 };
    mockGetParsedTransaction.mockResolvedValue(mockTxData);

    const result = await solanaService.getTransactionData('test-sig');

    expect(result).toEqual(mockTxData);
    expect(mockGetParsedTransaction).toHaveBeenCalledWith('test-sig', {
      maxSupportedTransactionVersion: 0,
    });
  });

  it('should throw an error if fetching fails', async () => {
    mockGetParsedTransaction.mockRejectedValue(new Error('Solana error'));

    await expect(solanaService.getTransactionData('test-sig')).rejects.toThrow('Failed to fetch transaction data');
  });
});
