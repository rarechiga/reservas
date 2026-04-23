'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

// 1. El componente que usa los params
function ConfirmContent() {
  const params = useSearchParams()
  const code = params.get('code')

  return (
    <div>
      <h1>Reserva confirmada</h1>
      <p>Código: {code}</p>
      <p>Muéstralo al llegar</p>
    </div>
  )
}

// 2. El export principal envuelto en Suspense
export default function Confirm() {
  return (
    <Suspense fallback={<div>Cargando confirmación...</div>}>
      <ConfirmContent />
    </Suspense>
  )
}
