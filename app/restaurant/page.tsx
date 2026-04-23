'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Restaurant() {
  const [bookings, setBookings] = useState<any[]>([])

  const fetchBookings = async () => {
    const today = new Date().toISOString().split('T')[0]

    const { data } = await supabase
      .from('bookings')
      .select('*')
      .eq('date', today)

    setBookings(data || [])
  }

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('bookings').update({ status }).eq('id', id)
    fetchBookings()
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  return (
    <div>
      <h1>Reservas de hoy</h1>

      {bookings.map(b => (
        <div key={b.id}>
          {b.name} - {b.pax} - {b.time} - {b.status}
          <button onClick={() => updateStatus(b.id, 'arrived')}>✔</button>
          <button onClick={() => updateStatus(b.id, 'no_show')}>❌</button>
        </div>
      ))}
    </div>
  )
}