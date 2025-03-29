import CheckList2Icon from "@/components/static/icons/checkList2"
import { plannerApi } from "@/lib/redux/features/apis/plannerApi"
import { updateCheckBoxStatus } from "@/lib/redux/features/slices/plannerSlice"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { cn } from "@/lib/utils/cn"
import {
  GripHorizontal,
  Lightbulb,
  Map,
  ChevronDown,
  Trash2,
  Edit,
} from "lucide-react"
import { Checkbox } from "primereact/checkbox"
import React, { useState, useMemo } from "react"
import { Draggable } from "react-beautiful-dnd"
import { toast } from "sonner"
import { Event } from "@/lib/redux/features/slices/plannerSlice"
import { motion, AnimatePresence } from "framer-motion"
import CustomButton from "../../Button"
import { Dialog } from "primereact/dialog"
import { getCurrentWedding } from "@/lib/cookies/currentWeddingCookie"

interface EventCardProps {
  event: Event
  index: number
  setSelectedTask: React.Dispatch<React.SetStateAction<any>>
}

export default function EventCard({
  event,
  index,
  setSelectedTask,
}: EventCardProps) {
  const dispatch = useAppDispatch()
  const [isHovered, setIsHovered] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false)
  const [updateCheckListStatus] = plannerApi.useUpdateCheckListStatusMutation()
  const currentWeddingId = useAppSelector(
    (state) => state.currentWedding.currentWeddingId
  )

  const toggleExpanded = () => setExpanded(!expanded)
  const [deletePlannerEvent, { isLoading: isDeleteLoading }] =
    plannerApi.useDeleteTodoMutation()
  const totalChecked = useMemo(() => {
    return event.checklist.filter((item) => item.checked).length
  }, [event.checklist])

  const handleDelete = async (id: string) => {
    try {
      await deletePlannerEvent({
        weddingId: getCurrentWedding() || "",
        todoId: id,
      }).unwrap()
      toast.success("Event deleted successfully")
      setDeleteConfirmationVisible(false)
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete event")
    }
  }

  return (
    <>
      <Dialog
        draggable={false}
        visible={deleteConfirmationVisible}
        onHide={() => {
          if (!deleteConfirmationVisible) return
          setDeleteConfirmationVisible(false)
        }}
        className="w-full max-w-md"
        header="Delete Confirmation"
      >
        <p className="mb-6 border-t px-2 pt-4">
          Are you sure you want to remove this event?
        </p>
        <div className="flex justify-end space-x-4 border-t pt-4">
          <CustomButton
            variant={"outline"}
            size="sm"
            className="rounded-md border border-primary px-6 py-2 !font-medium text-primary"
            onClick={() => {
              setDeleteConfirmationVisible(false)
            }}
          >
            No
          </CustomButton>
          <CustomButton
            loading={isDeleteLoading}
            size="sm"
            className="!hover:bg-red-700 rounded-[8px] !border-red-600 !bg-red-600 px-6 py-2 !font-medium"
            onClick={async () => {
              await handleDelete(event.id)
            }}
          >
            Yes, Delete
          </CustomButton>
        </div>
      </Dialog>
      <Draggable draggableId={event.id} index={index}>
        {(provided) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              className="relative rounded-xl border-2 bg-white p-4"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Drag handle */}
              <div
                {...provided.dragHandleProps}
                className={`absolute left-0 right-0 top-0 flex h-8 cursor-move items-center justify-center ${
                  isHovered ? "opacity-100" : "opacity-0"
                } transition-opacity duration-200`}
              >
                <GripHorizontal className="text-gray-400" />
              </div>

              {/* Category Badge */}
              <div className="mb-2 flex items-center">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-1 text-sm font-semibold",
                    event.status === "todo"
                      ? "bg-[#FFC933]"
                      : event.status === "inProgress"
                        ? "bg-[#B3CDFF]"
                        : "bg-[#74DB97]"
                  )}
                >
                  {event.category === "Work" ? (
                    <Map className="mr-1.5 text-current" size={16} />
                  ) : (
                    <Lightbulb className="mr-1.5 text-current" size={16} />
                  )}
                  {event.category}
                </span>
              </div>

              {/* Event title and date */}
              <div className="flex flex-row justify-between">
                <div>
                  <h3 className="mb-1 text-lg font-semibold">{event.title}</h3>
                  <p className="mb-3 text-sm text-gray-500">{event.date}</p>
                </div>
                <div className="flex gap-2">
                  <CustomButton
                    variant={"ghost"}
                    size={"icon"}
                    className={cn(
                      "size-8 text-gray-400 transition-opacity duration-200",
                      isHovered ? "opacity-100" : "opacity-0"
                    )}
                    onClick={() => setSelectedTask(event)}
                  >
                    <Edit size={18} />
                  </CustomButton>
                  <CustomButton
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => setDeleteConfirmationVisible(true)}
                    className={cn(
                      "size-8 text-gray-400 transition-opacity duration-200",
                      isHovered ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <Trash2 size={18} />
                  </CustomButton>
                </div>
              </div>

              {/* Checklist header transition */}
              <div
                onClick={toggleExpanded}
                className="mb-2 flex cursor-pointer items-center text-[#60647C]"
              >
                <AnimatePresence mode="wait">
                  {expanded ? (
                    <motion.h4
                      key="checklist-text"
                      className={cn(
                        "flex flex-row items-center gap-1 text-base font-medium",
                        event.checklist.length === 0 && "hidden"
                      )}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CheckList2Icon />
                      Checklist
                    </motion.h4>
                  ) : (
                    <motion.span
                      key="checklist-count"
                      className="flex flex-row items-center gap-1 text-sm font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CheckList2Icon />
                      {totalChecked}/{event.checklist.length} Completed
                    </motion.span>
                  )}
                </AnimatePresence>
                <ChevronDown
                  className={`ml-auto transition-transform ${
                    expanded ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>

              {/* Checklist area with animation */}
              <motion.div
                initial={false}
                animate={{ height: expanded ? "auto" : 0 }}
                className="overflow-hidden"
              >
                {event.checklist.map((item, i) => (
                  <div key={i} className="mb-2.5 flex items-center">
                    <Checkbox
                      checked={item.checked}
                      onChange={async (e) => {
                        dispatch(
                          updateCheckBoxStatus({
                            eventId: event.id,
                            checklistItemId: item.id,
                            checked: e.checked ?? false,
                          })
                        )

                        try {
                          // Perform the API call
                          await updateCheckListStatus({
                            weddingId: currentWeddingId,
                            todoId: event.id,
                            checkListItemId: item.id,
                            body: {
                              checklist_status: e.checked
                                ? "completed"
                                : "pending",
                            },
                          }).unwrap()
                        } catch (error) {
                          console.error(
                            "Failed to update checklist item:",
                            error
                          )
                          dispatch(
                            updateCheckBoxStatus({
                              eventId: event.id,
                              checklistItemId: item.id,
                              checked: !e.checked, // Revert to previous state
                            })
                          )
                          toast(`Error Updating Todo: ${error}`)
                        }
                      }}
                      className="h-4 w-6 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      className={`ml-2 text-sm ${item.checked ? "text-gray-500 line-through" : "text-gray-700"}`}
                    >
                      {item.text}
                    </label>
                  </div>
                ))}
              </motion.div>

              {/* Collaborators */}
              <div>
                <h4 className="mb-2 hidden text-sm font-medium text-gray-700">
                  Collaborators
                </h4>
                <div className="flex -space-x-2">
                  {event.collaborators.map((collaborator, i) => (
                    <div
                      key={i}
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium text-white`}
                      style={{ backgroundColor: collaborator.color }}
                    >
                      {collaborator.initials}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        }}
      </Draggable>
    </>
  )
}
