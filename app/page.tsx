'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { generateCode } from '@/utils/helpers'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    pax: 1,
    date: '',
    time: '',
    restaurant_id: ''
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const code = generateCode()

    const { error } = await supabase.from('bookings').insert({
      ...form,
      status: 'pending',
      id: code
    })

    if (!error) router.push(`/confirm?code=${code}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Phone" onChange={e => setForm({...form, phone: e.target.value})} />
      <input type="number" onChange={e => setForm({...form, pax: Number(e.target.value)})} />
      <input type="date" onChange={e => setForm({...form, date: e.target.value})} />
      <input type="time" onChange={e => setForm({...form, time: e.target.value})} />
      <input placeholder="Restaurant ID" onChange={e => setForm({...form, restaurant_id: e.target.value})} />
      <button type="submit">Book</button>
    </form>
  )
}