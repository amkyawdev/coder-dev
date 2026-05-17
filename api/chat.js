export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const { message } = await request.json()
    
    const hfToken = process.env.VITE_HF_API_KEY
    
    if (!hfToken) {
      return Response.json({ error: 'API key not configured' }, { status: 500 })
    }
    
    const response = await fetch('https://api-inference.huggingface.co/models/microsoft/Phi-3.5-mini-instruct', {
      headers: {
        'Authorization': `Bearer ${hfToken}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ 
        inputs: message,
        parameters: { max_new_tokens: 256 }
      })
    })
    
    const data = await response.json()
    
    return Response.json({ message: data[0]?.generated_text || 'No response' })
    
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}