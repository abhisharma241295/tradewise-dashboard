// src/redux/eventSlice.ts
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ChecklistItem {
  text: string
  id: string
  checked: boolean
}

interface Collaborator {
  initials: string
  color: string
}

export interface Event {
  id: string
  category: string
  title: string
  date: string
  status: "todo" | "inProgress" | "done"
  checklist: ChecklistItem[]
  collaborators: Collaborator[]
}

interface PlannerEventState {
  events: Event[]
  filters: {
    categories: string[]
    statuses: Event["status"][]
  }
}
const initialState: PlannerEventState = {
  events: [],
  filters: {
    categories: [],
    statuses: [],
  },
}
const plannerSlice = createSlice({
  name: "planner",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload)
    },
    updateEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload
    },
    updateEventStatus: (
      state,
      action: PayloadAction<{ id: string; status: Event["status"] }>
    ) => {
      try {
        const event = state.events.find((e) => e.id === action.payload.id)
        if (event) {
          event.status = action.payload.status
        }
      } catch (e) {
        console.log(e)
      }
    },
    updateCheckBoxStatus: (
      state,
      action: PayloadAction<{
        eventId: string
        checklistItemId: string
        checked: boolean
      }>
    ) => {
      try {
        const event = state.events.find((e) => e.id === action.payload.eventId)
        if (event) {
          const checklistItem = event.checklist.find(
            (item) => item.id === action.payload.checklistItemId
          )
          if (checklistItem) {
            checklistItem.checked = action.payload.checked
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    updateEventDate: (
      state,
      action: PayloadAction<{
        id: string
        date: string
      }>
    ) => {
      try {
        const event = state.events.find((e) => e.id === action.payload.id)
        if (event) {
          event.date = action.payload.date
        }
      } catch (e) {
        console.log(e)
      }
    },
    setCategoriesToFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.categories = action.payload
    },
    setStatusesToFilter: (state, action: PayloadAction<Event["status"][]>) => {
      state.filters.statuses = action.payload
    },
    clearFilters: (state) => {
      state.filters.categories = []
      state.filters.statuses = []
    },
  },
})

export const {
  updateEvents,
  addEvent,
  updateEventStatus,
  updateCheckBoxStatus,
  updateEventDate,
  setCategoriesToFilter,
  setStatusesToFilter,
  clearFilters,
} = plannerSlice.actions
export const selectAllEvents = (state: { planner: PlannerEventState }) =>
  state.planner.events
export const selectFilters = (state: { planner: PlannerEventState }) =>
  state.planner.filters

export const selectFilteredEvents = createSelector(
  [selectAllEvents, selectFilters],
  (events, filters) => {
    return events.filter((event) => {
      const categoryMatch =
        filters.categories.length === 0 ||
        filters.categories.includes(event.category)
      const statusMatch =
        filters.statuses.length === 0 || filters.statuses.includes(event.status)
      return categoryMatch && statusMatch
    })
  }
)

export default plannerSlice.reducer
