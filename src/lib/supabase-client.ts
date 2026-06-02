import { createClient } from '@supabase/supabase-js'

// Browser-side Supabase client (singleton)
// NOTE: Before Google OAuth works, add your site URL and callback URL to the
// Supabase Dashboard → Authentication → URL Configuration:
//   Site URL: https://yourdomain.com  (or http://localhost:3000 for dev)
//   Redirect URLs: https://yourdomain.com/auth/callback
//                  http://localhost:3000/auth/callback

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Singleton pattern to avoid creating multiple instances during hot reload
const globalForSupabase = globalThis as unknown as { supabaseClient: ReturnType<typeof createClient> | undefined }

export const supabase =
  globalForSupabase.supabaseClient ??
  createClient(supabaseUrl, supabaseAnonKey)

if (process.env.NODE_ENV !== 'production') {
  globalForSupabase.supabaseClient = supabase
}
