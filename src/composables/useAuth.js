import { ref } from 'vue'
import { supabase } from '../services/supabase'

const user = ref(null)

export const useAuth = () => {
  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    user.value = data.user
    return data
  }

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    user.value = data.user
    return data
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    user.value = null
  }

  const getSession = async () => {
    const { data } = await supabase.auth.getSession()
    user.value = data.session?.user
  }

  return { user, signUp, signIn, signOut, getSession }
}