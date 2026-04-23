'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'

// Definimos una interfaz para evitar el uso de 'any'
interface Booking {
  id: string
  name: string
  pax: number
  time: string
  status: string
}

export default function Restaurant() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  // Usamos useCallback para que la función sea estable
  const fetchBookings = useCallback(async () => {
    try {
      const today = new Date().toISOString().split('T')[0]
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('date', today)

      if (error) throw error
      setBookings(data || [])
    } catch (error) {
      console.error('Error cargando reservas:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id)
      
      if (error) throw error
      
      // Actualización optimista: cambia el estado localmente sin esperar otra petición
      setBookings(prev => 
        prev.map(b => b.id === id ? { ...b, status } : b)
      )
    } catch (error) {
      alert('No se pudo actualizar el estado')
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  if (loading) return <p>Cargando reservas...</p>

  return (
    <div>
      <h1>Reservas de hoy</h1>

      {bookings.length === 0 ? (
        <p>No hay reservas para hoy.</p>
      ) : (
        bookings.map(b => (
          <div key={b.id} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
            <p>
              <strong>{b.time}</strong> - {b.name} ({b.pax} personas) 
              <span> | Estado: {b.status}</span>
            </p>
            <button onClick={() => updateStatus(b.id, 'arrived')}>✔ Llegó</button>
            <button onClick={() => updateStatus(b.id, 'no_show')}>❌ No vino</button>
          </div>
        ))
      )}
    </div>
  )
}
