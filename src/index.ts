import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { solanaService } from './services/solanaService';
import { openaiService } from './services/openaiService';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/summarize', async (req: Request, res: Response): Promise<void> => {
  const { signature } = req.body;

  if (!signature) {
    res.status(400).json({ error: 'Signature is required' });
    return;
  }

  try {
    const txData = await solanaService.getTransactionData(signature);

    if (!txData) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }

    const summary = await openaiService.summarizeTransaction(txData);
    res.json({ signature, summary });
  } catch (error: any) {
    console.error('Error in /api/summarize:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

if (process.env.NODE_ENV !== 'test') {
  // We use Number(port) to satisfy TypeScript, and '0.0.0.0' to open it to Docker's network
  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });
}
  });
}

export default app;
