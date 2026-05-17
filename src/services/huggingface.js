import { HfInference } from '@huggingface/inference'

const hf = new HfInference({
  token: import.meta.env.VITE_HF_API_KEY || ''
})

export const sendMessage = async (message) => {
  if (!import.meta.env.VITE_HF_API_KEY) {
    return 'Error: VITE_HF_API_KEY not configured. Please set in Vercel Environment Variables.'
  }
  
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    })
    const data = await response.json()
    if (data.error) {
      return 'Error: ' + data.error
    }
    return data.message
  } catch (error) {
    console.error('HF Error:', error)
    return 'Error: ' + error.message
  }
}

export default hf