import React, { useEffect, useState } from "react"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd"

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  Event,
  updateEventStatus,
  selectFilteredEvents,
} from "@/lib/redux/features/slices/plannerSlice"
import { plannerApi } from "@/lib/redux/features/apis/plannerApi"
import { toast } from "sonner"
import NoListViewPlannerTodos from "@/components/static/illustrations/NoListViewPlannerTodos"
import ListViewCard from "@/components/ui/dashboard/planner/ListViewCard"

interface Props {
  setSelectedTask: React.Dispatch<React.SetStateAction<any>>
}
const TaskList: React.FC<Props> = ({ setSelectedTask }) => {
  const filteredEvents = useAppSelector(selectFilteredEvents)

  const dispatch = useAppDispatch()
  const [expandedEvents, setExpandedEvents] = useState<{
    [key: string]: boolean
  }>({})

  const [
    updateTodoStatus,
    { isError: updateTodoIsError, error: updateTodoError },
  ] = plannerApi.useUpdateTodoStatusMutation()

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result
    if (!destination) {
      return
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }
    // toast(`Event has been created ${draggableId}`)
    // console.log(draggableId, destination.droppableId as Event["status"]);
    const sourceStatus = source.droppableId as Event["status"]
    const status = destination.droppableId as Event["status"]
    dispatch(
      updateEventStatus({
        id: draggableId,
        status: status,
      })
    )

    try {
      // Perform the API call
      await updateTodoStatus({
        weddingId: currentWeddingId,
        todoId: draggableId,
        // todo, in_progress, completed
        body: {
          todo_status:
            status == "done"
              ? "completed"
              : status == "inProgress"
                ? "in_progress"
                : "todo",
        },
      }).unwrap()
    } catch (error) {
      console.error("Failed to update checklist item:", error)
      // Optionally revert the optimistic update if API call fails
      dispatch(
        updateEventStatus({
          id: draggableId,
          status: sourceStatus,
        })
      )
      // console.log(error)
      toast(`ERROR OCCURED${error}`)
      // Handle the error, e.g., show an error message to the user
    }
  }

  const toggleExpand = (id: string) => {
    setExpandedEvents((prev) => ({ ...prev, [id]: !prev[id] }))
  }
  const currentWeddingId = useAppSelector(
    (state) => state.currentWedding.currentWeddingId
  )

  const renderTasks = (
    status: Event["status"],
    isDraggable: boolean = true
  ) => (
    <Droppable droppableId={status}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="space-y-2 border border-transparent"
        >
          {filteredEvents
            .filter((event: Event) => event.status === status)
            .map((event: Event, index: number) => (
              <Draggable
                key={event.id}
                draggableId={event.id}
                index={index}
                isDragDisabled={!isDraggable}
              >
                {(provided) => (
                  <ListViewCard
                    event={event}
                    provided={provided}
                    setSelectedTask={setSelectedTask}
                    status={status}
                    expandedEvents={expandedEvents}
                    toggleExpand={toggleExpand}
                    currentWeddingId={currentWeddingId}
                  />
                )}
              </Draggable>
            ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )

  useEffect(() => {
    if (updateTodoIsError) {
      toast.error("Failed to update todo status", {
        description:
          (updateTodoError as any)?.data?.message || "An error occurred",
      })
    }
  }, [updateTodoIsError, updateTodoError])
  if (!filteredEvents || filteredEvents.length == 0) {
    return (
      <div className="mx-auto my-12 flex h-full max-w-3xl items-center justify-center rounded-lg bg-white p-4">
        <NoListViewPlannerTodos />
      </div>
    )
  }

  return (
    <div className="m-2 h-full overflow-auto md:m-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="mx-auto w-full rounded-lg bg-white py-4 pr-5 md:max-w-3xl">
          <h2 className="mb-4 pl-5 text-xl font-bold">Tasks to-do</h2>
          {renderTasks("todo")}
          <h2 className="my-4 pl-5 text-xl font-bold">Tasks in-progress</h2>
          {renderTasks("inProgress")}
          <h2 className="my-4 pl-5 text-xl font-bold">Tasks Completed</h2>
          {renderTasks("done")}
        </div>
      </DragDropContext>
    </div>
  )
}

export default TaskList
