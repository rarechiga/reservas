'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Admin() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: result, error } = await supabase
          .from('bookings')
          .select('*')
        
        if (error) throw error
        setData(result || [])
      } catch (error) {
        console.error('Error fetching admin data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  // Cálculos protegidos (si data está vacío, los valores por defecto evitan errores)
  const bookingsCount = data.length
  const arrivals = data.filter(b => b.status === 'arrived').length
  
  // Usamos Number() para asegurar que pax sea tratado como número
  const totalPax = data.reduce((acc, b) => acc + (Number(b.pax) || 0), 0)
  
  const showRate = bookingsCount > 0 
    ? ((arrivals / bookingsCount) * 100).toFixed(1) 
    : "0"

  if (loading) return <div>Cargando estadísticas...</div>

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <div className="mt-4 space-y-2">
        <p>Total Bookings: <strong>{bookingsCount}</strong></p>
        <p>Total Arrivals: <strong>{arrivals}</strong></p>
        <p>Show Rate: <strong>{showRate}%</strong></p>
        <p>Total Pax: <strong>{totalPax}</strong></p>
      </div>
    </div>
  )
}
