export default interface WeddingOverview {
  album: Record<string, unknown>
  budget_overview: {
    budget_left: number
    total_budget: number
    total_spent: number
  }
  contacts: unknown[]
  due_payments: number
  guest_overview: {
    events: Array<{
      event_date: string
      event_name: string
      guest_count: number
    }>
    total_guests: number
  }
  image_url: string
  pending_tasks: number
  registry: Record<string, unknown>
  upcoming_events: Array<{
    event_date: string
    event_name: string
  }>
  wedding_name: string
  wedding_status: {
    noOfDays: number
    type: string
  }
}
