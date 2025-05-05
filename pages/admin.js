import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Admin() {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('users_data')
        .select('*')
        .eq('submitted', true)

      if (!error) setEntries(data)
      else console.error(error)
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Gesendete Formulare</h1>
      {entries.map((entry) => (
        <div key={entry.id} style={{ border: '1px solid #ccc', marginBottom: 10, padding: 10 }}>
          <p><strong>Name:</strong> {entry.name}</p>
          <p><strong>Geburtstag:</strong> {entry.birthday}</p>
          <p><strong>Klappt:</strong> {entry.klappt ? 'Ja' : 'Nein'}</p>
          <p><strong>Nope:</strong> {entry.nope ? 'Ja' : 'Nein'}</p>
        </div>
      ))}
    </div>
  )
}
