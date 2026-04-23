'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Admin() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('bookings').select('*')
      setData(data || [])
    }
    fetch()
  }, [])

  const bookings = data.length
  const arrivals = data.filter(b => b.status === 'arrived').length
  const pax = data.reduce((acc, b) => acc + b.pax, 0)
  const showRate = bookings ? (arrivals / bookings * 100).toFixed(1) : 0

  return (
    <div>
      <h1>Admin</h1>
      <p>Bookings: {bookings}</p>
      <p>Arrivals: {arrivals}</p>
      <p>Show rate: {showRate}%</p>
      <p>Total pax: {pax}</p>
    </div>
  )
}