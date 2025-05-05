import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function FormPage() {
  const [user, setUser] = useState(null)
  const [form, setForm] = useState({ name: '', birthday: '', klappt: false, nope: false })
  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) router.push('/login')
      else setUser(session.user)
    }
    getSession()
  }, [])

  const loadForm = async () => {
    const { data } = await supabase.from('users_data').select('*').eq('user_id', user.id).single()
    if (data) setForm(data)
  }

  useEffect(() => {
    if (user) loadForm()
  }, [user])

  const saveDraft = async () => {
    await supabase.from('users_data').upsert({ user_id: user.id, ...form })
    alert('Zwischengespeichert!')
  }

  const sendForm = async () => {
    await supabase.from('users_data').update({ ...form, submitted: true }).eq('user_id', user.id)
    alert('Informationen gesendet!')
  }

  return (
    <div>
      <h1>Formular</h1>
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input type="date" value={form.birthday} onChange={e => setForm({ ...form, birthday: e.target.value })} />
      <label>
        <input type="checkbox" checked={form.klappt} onChange={e => setForm({ ...form, klappt: e.target.checked })} />
        Klappt
      </label>
      <label>
        <input type="checkbox" checked={form.nope} onChange={e => setForm({ ...form, nope: e.target.checked })} />
        Nope
      </label>
      <br />
      <button onClick={saveDraft}>Zwischenspeichern</button>
      <button onClick={sendForm}>Informationen senden</button>
    </div>
  )
}
