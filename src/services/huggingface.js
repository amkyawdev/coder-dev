import { HfInference } from '@huggingface/inference'

const hf = new HfInference({
  token: import.meta.env.VITE_HF_API_KEY || ''
})

export const sendMessage = async (message) => {
  try {
    const response = await hf.chatCompletion({
      model: 'microsoft/Phi-3.5-mini-instruct',
      messages: [
        { role: 'user', content: message }
      ],
      max_tokens: 256
    })
    return response.choices[0].message.content
  } catch (error) {
    console.error('HF Error:', error)
    return 'Sorry, I encountered an error. Please try again.'
  }
}

export default hf