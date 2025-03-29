export interface Group {
  group_id: string
  group_name: string
  guests?: Guest[]
}

export interface Guest {
  guest_id: string
  guest_name: string
}

export interface EventsType {
  event_id: string
  event_name: string
}

export interface Message {
  created_at: string
  message_content: string
  message_id: string
}

export interface CommunicationGroup {
  comm_group_id: string
  comm_group_name: string
  last_message_datetime: string | null
  last_message: string | null
  events: EventsType[]
  groups: Group[]
  guests: Guest[]
}
