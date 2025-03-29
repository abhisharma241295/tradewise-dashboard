// Model for individual checklist item
export interface ChecklistItem {
  checklist_icon_id: number
  checklist_name: string
  checklist_status: "todo" | "completed" | "pending" // Enum for status
}

export interface ChecklistItemWithId extends ChecklistItem {
  checklist_id: string
}

// Model for the entire wedding planner event
export interface WeddingPlannerEvent {
  checklists: ChecklistItem[] // Array of checklist items
  todo_category: string // Category of the todo
  todo_due_date: string // Due date in string format (ISO date)
  todo_icon_id: number // Icon ID for the event
  todo_name: string // Name of the todo event
  todo_status: "todo" | "completed" | "in_progress" // Enum for event status
}

export interface WeddingPlannerEventWithId extends WeddingPlannerEvent {
  checklists: ChecklistItemWithId[] // Array of checklist items with ids
  todo_id: string
}
