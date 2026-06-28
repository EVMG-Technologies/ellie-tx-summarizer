import { createAPIFileRoute } from '@tanstack/react-start/api'
import { solanaService } from '../../lib/services/solanaService'
import { openaiService } from '../../lib/services/openaiService'

export const APIRoute = createAPIFileRoute('/api/summarize')({
  POST: async ({ request }) => {
    try {
      const body = await request.json()
      const signature = body.signature

      if (!signature) {
        return new Response(JSON.stringify({ error: 'Signature is required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      const txData = await solanaService.getTransactionData(signature)
      if (!txData) {
        return new Response(JSON.stringify({ error: 'Transaction not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        })
      }

      const summary = await openaiService.summarizeTransaction(txData)
      return new Response(JSON.stringify({ signature, summary }), {
        headers: { 'Content-Type': 'application/json' }
      })
    } catch (error: any) {
      console.error('Error in /api/summarize:', error)
      return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }
  },
})
