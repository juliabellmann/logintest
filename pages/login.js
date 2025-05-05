import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error) {
      router.push('/form')
    } else if (error.message === 'Invalid login credentials') {
      // Try to register the user
      const { error: signUpError } = await supabase.auth.signUp({ email, password })
      if (signUpError) {
        alert('Registrierung fehlgeschlagen: ' + signUpError.message)
      } else {
        alert('Registrierung erfolgreich! Bitte E-Mail bestätigen.')
      }
    } else {
      alert('Fehler: ' + error.message)
    }
  }

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' })
  }

  return (
    <div>
      <h1>Login oder Registrierung</h1>
      <input type="email" placeholder="E-Mail" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Passwort" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Einloggen oder Registrieren</button>
      <br />
      <button onClick={handleGoogleLogin}>Mit Google anmelden</button>
    </div>
  )
}
