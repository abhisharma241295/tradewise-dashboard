import React from "react"
import { DraggableProvided } from "react-beautiful-dnd"
import {
  GripVertical,
  Map,
  Lightbulb,
  ChevronUp,
  ChevronDown,
  Edit,
  Trash2,
} from "lucide-react"
import { cn } from "@/lib/utils/cn"
import {
  Event,
  updateCheckBoxStatus,
} from "@/lib/redux/features/slices/plannerSlice"
import { Checkbox } from "primereact/checkbox"
import { plannerApi } from "@/lib/redux/features/apis/plannerApi"
import { useAppDispatch } from "@/lib/redux/hooks"
import CheckListIcon from "@/components/static/icons/checklist"
import Button from "../../Button"
import { getCurrentWedding } from "@/lib/cookies/currentWeddingCookie"
import CustomButton from "../../Button"
import { Dialog } from "primereact/dialog"
interface DraggableEventComponentProps {
  event: Event
  provided: DraggableProvided
  status: "todo" | "inProgress" | "done"
  expandedEvents: Record<string, boolean>
  toggleExpand: (id: string) => void
  currentWeddingId: string
  setSelectedTask: React.Dispatch<React.SetStateAction<any>>
}

const ListViewCard: React.FC<DraggableEventComponentProps> = ({
  event,
  provided,
  status,
  expandedEvents,
  toggleExpand,
  currentWeddingId,
  setSelectedTask,
}) => {
  const [updateCheckListStatus] = plannerApi.useUpdateCheckListStatusMutation()
  const dispatch = useAppDispatch()
  const [deletePlannerEvent, { isLoading: isDeleting }] =
    plannerApi.useDeleteTodoMutation()
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    React.useState(false)

  const ListViewCheckbox = ({ index, item }: { index: number; item: any }) => {
    return (
      <li
        key={index}
        className="flex items-center px-4 py-3 hover:bg-[#E4EFF0]"
      >
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
              await updateCheckListStatus({
                weddingId: currentWeddingId,
                todoId: event.id,
                checkListItemId: item.id,
                body: {
                  checklist_status: e.checked ? "completed" : "pending",
                },
              }).unwrap()
            } catch (error) {
              console.error("Failed to update checklist item:", error)
              dispatch(
                updateCheckBoxStatus({
                  eventId: event.id,
                  checklistItemId: item.id,
                  checked: !e.checked,
                })
              )
            }
          }}
          className="mr-2"
        />
        <span className={item.checked ? "text-gray-500 line-through" : ""}>
          {item.text}
        </span>
      </li>
    )
  }
  const accept = (id: string) => {
    deletePlannerEvent({
      weddingId: getCurrentWedding() || "",
      todoId: id,
    })
  }

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      className="group flex flex-row items-start" // Changed to items-start
    >
      <div
        {...provided.dragHandleProps}
        className="pt-6 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        <GripVertical className="text-gray-400" />
      </div>
      <div className="flex-grow overflow-hidden rounded-lg border">
        <div className="flex items-center">
          <div
            className={cn(
              "mr-3 h-full px-4 py-6",
              status === "todo"
                ? "bg-[#FFC933]"
                : status === "inProgress"
                  ? "bg-[#B3CDFF]"
                  : "bg-[#74DB97]"
            )}
          >
            {event.category === "Work" ? (
              <Map className="text-black" />
            ) : (
              <Lightbulb className="text-black" />
            )}
          </div>

          <div className="flex-grow">
            <h3 className="font-semibold">{event.title}</h3>
            <p className="flex flex-row items-center gap-1 text-sm text-gray-500">
              <CheckListIcon />
              {
                event.checklist.filter((element) => element.checked || false)
                  .length
              }
              /{event.checklist.length}
            </p>
          </div>
          <div className="mr-2 flex -space-x-2">
            {event.collaborators.map((collaborator, i) => (
              <div
                key={i}
                className="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                style={{ backgroundColor: collaborator.color }}
              >
                {collaborator.initials}
              </div>
            ))}
          </div>
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
                loading={isDeleting}
                size="sm"
                className="!hover:bg-red-700 rounded-[8px] !border-red-600 !bg-red-600 px-6 py-2 !font-medium"
                onClick={async () => {
                  await accept(event.id)
                  setDeleteConfirmationVisible(false)
                }}
              >
                Yes, Delete
              </CustomButton>
            </div>
          </Dialog>
          <div className="flex gap-2">
            <Button
              variant={"ghost"}
              size={"icon"}
              className={cn(
                "size-8 text-gray-400 transition-opacity duration-200",
                "opacity-0 group-hover:opacity-100"
              )}
              onClick={() => {
                setSelectedTask(event)
              }}
            >
              <Edit size={18} />
            </Button>
            <Button
              onClick={() => {
                setDeleteConfirmationVisible(true)
              }}
              variant={"ghost"}
              size={"icon"}
              className={cn(
                "size-8 text-gray-400 transition-opacity duration-200",
                "opacity-0 group-hover:opacity-100"
              )}
            >
              <Trash2 size={18} />
            </Button>
          </div>
          <button className="mr-4" onClick={() => toggleExpand(event.id)}>
            {expandedEvents[event.id] ? (
              <ChevronUp className="text-gray-400" />
            ) : (
              <ChevronDown className="text-gray-400" />
            )}
          </button>
        </div>
        {expandedEvents[event.id] && (
          <div className="border-t">
            <ul className="space-y-1">
              {event.checklist.map((item, index) => (
                <ListViewCheckbox key={index} item={item} index={index} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default ListViewCard
