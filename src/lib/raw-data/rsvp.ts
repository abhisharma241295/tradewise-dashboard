export interface Contact {
  email: string
  phone: string
}

export interface Event {
  id: number
  icon_id: string
  event_name: string
}

export interface RSVP {
  id: string
  name: string
  contact: Contact
  address: string
  rsvpStatus: "Coming" | "Undecided" | "Not Coming"
  event_list: any[]
  relation: "Bride" | "Groom" | "Other"
  rawData: any | undefined
  plusOne: boolean
}

export interface GuestList {
  guests: RSVP[]
}
