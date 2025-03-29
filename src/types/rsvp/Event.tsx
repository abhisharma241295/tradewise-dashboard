export type EventType =
  | "Bachelorette"
  | "Cocktail"
  | "Mehendi"
  | "Sangeet"
  | "Reception"
  | "Wedding"

export interface Event {
  id: string
  type: EventType
  image: string
  date: string
  time: string
  location: string
  status: "upcoming" | "ongoing" | "completed"
  selected?: boolean
  guestCount?: number
}
