import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// OAuth callback handler — exchanges the auth code for a session then redirects to /account
// Make sure to add this URL to Supabase Dashboard → Authentication → URL Configuration → Redirect URLs:
//   http://localhost:3000/auth/callback  (dev)
//   https://yourdomain.com/auth/callback  (production)
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(`${origin}/account`)
}
