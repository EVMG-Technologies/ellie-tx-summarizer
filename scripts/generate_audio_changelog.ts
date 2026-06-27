import fs from 'fs';
import path from 'path';
import { openaiService } from '../src/services/openaiService';

const changelogText = `
Changelog:
1. Initialized the project with TypeScript and Express.
2. Integrated @solana/web3.js to fetch parsed transaction data from Solana mainnet.
3. Integrated OpenAI API to summarize raw transaction data into human-readable text.
4. Built a POST /api/summarize route to handle transaction summary requests.
5. Implemented comprehensive unit and integration tests for services and API routes.
6. Updated all dependencies to their latest stable releases.
7. Generated this audio changelog.
`;

async function main() {
  console.log('Generating audio changelog...');
  try {
    const buffer = await openaiService.generateAudioChangelog(changelogText);
    const outputPath = path.join(process.cwd(), 'changelog.mp3');
    fs.writeFileSync(outputPath, buffer);
    console.log(`Audio changelog generated at: ${outputPath}`);
  } catch (error) {
    console.error('Failed to generate audio changelog:', error);
    process.exit(1);
  }
}

main();
