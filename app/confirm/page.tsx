'use client'

import { useSearchParams } from 'next/navigation'

export default function Confirm() {
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