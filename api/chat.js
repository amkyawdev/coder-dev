export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const { message } = await request.json()
    
    const hfToken = process.env.VITE_HF_API_KEY
    
    if (!hfToken) {
      return Response.json({ error: 'API key not configured' }, { status: 500 })
    }
    
    // Use HF chat completion API via router
    const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
      headers: {
        'Authorization': `Bearer ${hfToken}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ 
        model: 'meta-llama/Llama-3.2-1B-Instruct',
        messages: [{ role: 'user', content: message }],
        max_tokens: 256
      })
    })
    
    const data = await response.json()
    
    if (data.error) {
      return Response.json({ error: data.error }, { status: 500 })
    }
    
    return Response.json({ message: data.choices[0].message.content })
    
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}