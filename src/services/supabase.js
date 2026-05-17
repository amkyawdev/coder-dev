import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'

const supabaseUrl = 'https://psbylwxvukdoampxpury.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_wvNmeQHpOTBU0SgIRfE5wQ_DS7x8rHQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const createSupabaseClient = (cookies) => {
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get: (name) => cookies.get(name)?.value,
      set: (name, value, options) => cookies.set(name, value, options),
      remove: (name, options) => cookies.remove(name, options)
    }
  })
}