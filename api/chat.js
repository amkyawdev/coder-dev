export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const { message } = await request.json()
    
    const hfToken = process.env.VITE_HF_API_KEY
    
    if (!hfToken) {
      return Response.json({ error: 'API key not configured' }, { status: 500 })
    }
    
    // Format prompt for Llama-3.2
    const formattedPrompt = `<|begin_of_text|><|start_header_id|>user<|end_header_id|>

${message}<|eot_id|><|start_header_id|>assistant<|end_header_id|>

`
    
    // Use correct HF Inference API
    const response = await fetch('https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-1B-Instruct', {
      headers: {
        'Authorization': `Bearer ${hfToken}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ 
        inputs: formattedPrompt,
        parameters: {
          max_new_tokens: 256,
          temperature: 0.7,
          return_full_text: false
        }
      })
    })
    
    const data = await response.json()
    
    // Handle HF API error response
    if (data.error) {
      console.error('HF API Error:', data)
      return Response.json({ error: data.error }, { status: 500 })
    }
    
    // Extract generated text
    const generatedText = Array.isArray(data) ? data[0]?.generated_text : data.generated_text
    
    return Response.json({ message: generatedText })
    
  } catch (error) {
    console.error('Server Error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
