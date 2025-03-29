import React from "react"
import { Droppable } from "react-beautiful-dnd"
import { Event } from "@/lib/redux/features/slices/plannerSlice"
import EventCard from "./KanbanEventCard"

interface ColumnProps {
  title: string
  status: string
  events: Event[]
  setSelectedTask: React.Dispatch<React.SetStateAction<any>>
}

export default function Column({
  title,
  status,
  events,
  setSelectedTask,
}: ColumnProps) {
  function getColor(): string | undefined {
    if (status === "todo") {
      return "#FFC312"
    }
    if (status === "done") {
      return "#28A745"
    } else return "#3264CA"
  }

  return (
    <div className="flex h-full flex-1 flex-col rounded-lg p-2">
      <h2 className="mb-4 flex items-center gap-2 rounded-lg bg-white p-3 text-lg font-bold shadow">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="7.5" cy="7.5" r="7.5" fill={getColor()} />
        </svg>
        {title}
      </h2>
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex-1 space-y-2 overflow-y-auto border border-transparent pr-2"
          >
            {events.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
                setSelectedTask={setSelectedTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
