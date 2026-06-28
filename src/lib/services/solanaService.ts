import { Connection, clusterApiUrl, ParsedTransactionWithMeta } from '@solana/web3.js';

export class SolanaService {
  private connection: Connection;

  constructor(endpoint?: string) {
    this.connection = new Connection(endpoint || clusterApiUrl('mainnet-beta'), 'confirmed');
  }

  async getTransactionData(signature: string): Promise<ParsedTransactionWithMeta | null> {
    try {
      const transaction = await this.connection.getParsedTransaction(signature, {
        maxSupportedTransactionVersion: 0,
      });
      return transaction;
    } catch (error: any) {
      console.error('Error fetching Solana transaction:', error);
      if (error.message && (error.message.includes('Non-base58') || error.message.includes('Invalid signature'))) {
        throw new Error('Invalid signature format. Are you sure this is a Solana transaction?');
      }
      throw new Error('Failed to fetch transaction data');
    }
  }
}

export const solanaService = new SolanaService();
