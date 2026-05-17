export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const { message } = await request.json()
    
    const hfToken = process.env.VITE_HF_API_KEY
    
    if (!hfToken) {
      return Response.json({ error: 'API key not configured' }, { status: 500 })
    }
    
    // Use HF Inference API directly
    const hfResponse = await fetch(
      'https://api-inference.huggingface.co/models/microsoft/Phi-3.5-mini-instruct/v1/chat/completions',
      {
        headers: {
          'Authorization': `Bearer ${hfToken}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          messages: [{ role: 'user', content: message }],
          max_tokens: 256
        })
      }
    )
    
    const data = await hfResponse.json()
    
    if (data.error) {
      return Response.json({ error: data.error }, { status: 500 })
    }
    
    return Response.json({ 
      message: data.choices[0].message.content 
    })
    
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}