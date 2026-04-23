export type Booking = {
  id: string
  name: string
  phone: string
  pax: number
  date: string
  time: string
  restaurant_id: string
  status: 'pending' | 'arrived' | 'no_show'
}

export type Restaurant = {
  id: string
  name: string
  avg_ticket: number
}