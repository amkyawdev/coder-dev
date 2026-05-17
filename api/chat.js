import { HfInference } from '@huggingface/inference'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const { message } = await request.json()
    
    const hfToken = process.env.VITE_HF_API_KEY
    
    if (!hfToken) {
      return Response.json({ error: 'API key not configured' }, { status: 500 })
    }
    
    const hf = new HfInference({ token: hfToken })
    
    const response = await hf.chatCompletion({
      model: 'microsoft/Phi-3.5-mini-instruct',
      messages: [{ role: 'user', content: message }],
      max_tokens: 256
    })
    
    return Response.json({ 
      message: response.choices[0].message.content 
    })
    
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}