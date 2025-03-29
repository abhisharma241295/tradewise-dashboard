import React, { useMemo } from "react"
import {
  Calendar,
  momentLocalizer,
  Event as CalendarEvent,
} from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import {
  Event,
  updateEventStatus,
} from "@/lib/redux/features/slices/plannerSlice"
import CalendarTodoCard from "@/components/ui/dashboard/planner/CalendarTodoCard"
import DropdownSelector from "@/components/ui/commons/Selector"
import { months, years } from "@/lib/raw-data/moenthYearRawData"
const localizer = momentLocalizer(moment)

interface SidebarProps {
  todos: Event[]
  inProgress: Event[]
}

const Sidebar: React.FC<SidebarProps> = ({ todos, inProgress }) => {
  return (
    <div className="w h-full flex-shrink-0 overflow-auto py-4 pl-6">
      <h2 className="mb-2 border-b px-2 py-2 text-xl font-medium">
        {moment().format("MMMM Do, YYYY")}
      </h2>
      <div className="mr-4 space-y-4">
        <CalendarTodoCard
          title="Todo(s)"
          todos={todos.map((event) => ({
            id: event.id,
            title: event.title,
          }))}
        />
        <CalendarTodoCard
          title="In-Progress(s)"
          todos={inProgress.map((event) => ({
            id: event.id,
            title: event.title,
          }))}
        />
      </div>
    </div>
  )
}

const CalendarView: React.FC = () => {
  var events = useAppSelector((state) => state.planner.events) as Event[]

  const dispatch = useAppDispatch()

  const calendarEvents: CalendarEvent[] = useMemo(
    () =>
      events?.map((event) => ({
        id: event.id,
        title: event.title,
        start: new Date(event.date),
        end: new Date(event.date),
        allDay: true,
        resource: event,
      })),
    [events]
  )

  const todos = useMemo(
    () => events.filter((event) => event.status === "todo"),
    [events]
  )
  const inProgress = useMemo(
    () => events.filter((event) => event.status === "inProgress"),
    [events]
  )

  const handleEventChange = (event: CalendarEvent) => {
    if (event.resource) {
      const newStatus: Event["status"] =
        event.resource.status === "todo"
          ? "inProgress"
          : event.resource.status === "inProgress"
            ? "done"
            : "todo"

      dispatch(updateEventStatus({ id: event.resource.id, status: newStatus }))
    }
  }

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = "#3174ad"
    if (event.resource) {
      switch (event.resource.status) {
        case "todo":
          backgroundColor = "#ffa500"
          break
        case "inProgress":
          backgroundColor = "#32cd32"
          break
        case "done":
          backgroundColor = "#808080"
          break
      }
    }
    return { style: { backgroundColor } }
  }

  return (
    <div className="flex h-full w-full bg-white">
      <div className="w-1/4 border-r">
        <Sidebar todos={todos} inProgress={inProgress} />
      </div>
      <div className="flex h-full w-3/4 flex-col space-y-2 p-4">
        <div className="flex-shrink-0 space-x-3">
          <DropdownSelector options={months} />
          <DropdownSelector options={years} />
        </div>
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          toolbar={false}
          startAccessor="start"
          endAccessor="end"
          className="flex-grow"
          defaultView="month"
          defaultDate={new Date()}
          onSelectEvent={handleEventChange}
          eventPropGetter={eventStyleGetter}
        />
      </div>
    </div>
  )
}

export default CalendarView
