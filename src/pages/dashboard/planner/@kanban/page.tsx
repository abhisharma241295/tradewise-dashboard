import React from "react"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import Column from "@/components/ui/dashboard/planner/KanbanColumn"
import {
  Event,
  updateEventStatus,
  selectFilteredEvents,
} from "@/lib/redux/features/slices/plannerSlice"
import { toast } from "sonner"
import { plannerApi } from "@/lib/redux/features/apis/plannerApi"

interface Props {
  setSelectedTask: React.Dispatch<React.SetStateAction<any>>
}

export default function Kanban({ setSelectedTask }: Props) {
  const events = useAppSelector(selectFilteredEvents)
  const dispatch = useAppDispatch()

  const currentWeddingId = useAppSelector(
    (state) => state.currentWedding.currentWeddingId
  )
  const [
    updateTodoStatus,
    { isError: updateTodoIsError, error: updateTodoError },
  ] = plannerApi.useUpdateTodoStatusMutation()

  React.useEffect(() => {
    if (updateTodoIsError) {
      toast.error(
        `Failed to update task status: ` + (updateTodoError || "Unknown error")
      )
    }
  }, [updateTodoIsError, updateTodoError])

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
    const sourceStatus = source.droppableId as Event["status"]
    const status = destination.droppableId as Event["status"]
    dispatch(
      updateEventStatus({
        id: draggableId,
        status,
      })
    )

    try {
      await updateTodoStatus({
        weddingId: currentWeddingId,
        todoId: draggableId,
        body: {
          todo_status:
            status == "done"
              ? "completed"
              : status == "todo"
                ? "todo"
                : "in_progress",
        },
      }).unwrap()
      toast.success("Task status updated successfully")
    } catch (error) {
      console.error("Failed to update task status:", error)
      toast.error("Failed to update task status")
      // Revert the state
      dispatch(
        updateEventStatus({
          id: draggableId,
          status: sourceStatus,
        })
      )
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="text-no-wrap m-2 flex h-full w-full max-w-7xl overflow-y-auto">
        <Column
          title="To Do"
          status="todo"
          events={events.filter((e: any) => e.status === "todo")}
          setSelectedTask={setSelectedTask}
        />
        <Column
          title="In Progress"
          status="inProgress"
          events={events.filter((e: any) => e.status === "inProgress")}
          setSelectedTask={setSelectedTask}
        />
        <Column
          title="Done"
          status="done"
          events={events.filter((e: any) => e.status === "done")}
          setSelectedTask={setSelectedTask}
        />
      </div>
    </DragDropContext>
  )
}
