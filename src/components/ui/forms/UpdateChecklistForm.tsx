import React, { useState } from "react"
import { InputText } from "primereact/inputtext"
import { ArrowLeft, Plus, Trash2, Save, Loader2 } from "lucide-react"
import { toast } from "sonner"
import CustomButton from "../Button"
import { plannerApi } from "@/lib/redux/features/apis/plannerApi"
import { useAppSelector } from "@/lib/redux/hooks"

interface UpdateChecklistFormProps {
  onClose: () => void
  checklist?: {
    id: string
    category: string
    title: string
    date: string
    status: string
    checklist: Array<{
      id: string
      text: string
      checked: boolean
    }>
    collaborators: any[]
  }
  isViewMode?: boolean
}

export default function UpdateChecklistForm({
  onClose,
  checklist,
  isViewMode = false,
}: UpdateChecklistFormProps) {
  const [newItemText, setNewItemText] = useState("")
  const [editingItem, setEditingItem] = useState<{
    index: number
    text: string
  } | null>(null)
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null)

  const currentWeddingId = useAppSelector(
    (state) => state.currentWedding.currentWeddingId
  )

  const { data: plannerEvents } =
    plannerApi.useGetWeddingPlannerEventsQuery(currentWeddingId)

  const items =
    [
      ...plannerEvents!["todo"],
      ...plannerEvents!["in_progress"],
      ...plannerEvents!["completed"],
    ].find((event) => event.todo_id === checklist?.id)?.checklists ||
    checklist?.checklist ||
    []

  const [addChecklistItem, { isLoading: isAdding }] =
    plannerApi.useAddCheckListItemMutation()
  const [deleteChecklistItem] = plannerApi.useDeleteChecklistItemMutation()
  const [updateCheckListStatus, { isLoading: isUpdating }] =
    plannerApi.useUpdateCheckListStatusMutation()

  const handleAddItem = async () => {
    if (newItemText.trim()) {
      try {
        await addChecklistItem({
          weddingId: currentWeddingId,
          todoId: checklist?.id || "",
          body: {
            checklist_name: newItemText,
            checklist_status: "pending",
            checklist_icon_id: 1,
          },
        }).unwrap()
        setNewItemText("")
        toast.success("Checklist item added successfully")
      } catch (error) {
        console.error("Failed to add checklist item:", error)
        toast.error("Failed to add checklist item")
      }
    }
  }

  const handleDeleteItem = async (index: number) => {
    try {
      setDeletingIndex(index)
      await deleteChecklistItem({
        weddingId: currentWeddingId,
        todoId: checklist?.id || "",
        checklistItemId:
          (items[index] as any).checklist_id || (items[index] as any).id,
      }).unwrap()
      toast.success("Checklist item deleted successfully")
    } catch (error) {
      console.error("Failed to delete checklist item:", error)
      toast.error("Failed to delete checklist item")
    } finally {
      setDeletingIndex(null)
    }
  }

  const handleUpdateItem = (index: number, text: string) => {
    setEditingItem({ index, text })
  }

  const handleSaveUpdate = async () => {
    if (!editingItem) return

    try {
      const item = items[editingItem.index]
      const itemId = (item as any).checklist_id || (item as any).id

      await updateCheckListStatus({
        weddingId: currentWeddingId,
        todoId: checklist?.id || "",
        checkListItemId: itemId,
        body: {
          checklist_name: editingItem.text,
          checklist_status: (item as any).checklist_status || "pending",
          checklist_icon_id: (item as any).checklist_icon_id || 1,
        },
      }).unwrap()

      setEditingItem(null)
      toast.success("Checklist item updated successfully")
    } catch (error) {
      console.error("Failed to update checklist item:", error)
      toast.error("Failed to update checklist item")
    }
  }

  return (
    <div className="space-y-4">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-14 items-center px-4">
          <div className="flex flex-1 items-center gap-4">
            <div className="flex items-center gap-2 text-gray-800">
              <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={onClose} />
              <span className="text-xl font-semibold">Update Checklist</span>
            </div>
          </div>
        </div>
      </header>

      {/* Add new item section */}
      <div className="mx-4 flex gap-2">
        <InputText
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Add new item"
          className="flex-1"
          disabled={isViewMode || isAdding}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              handleAddItem()
            }
          }}
        />
        <CustomButton
          onClick={handleAddItem}
          disabled={isViewMode || isAdding}
          variant="ghost"
          size="icon"
        >
          {isAdding ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </CustomButton>
      </div>

      {/* Checklist items */}
      <div className="mx-4 space-y-2">
        {items.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <InputText
              value={
                editingItem?.index === index
                  ? editingItem.text
                  : item.text || item.checklist_name
              }
              onChange={(e) => handleUpdateItem(index, e.target.value)}
              className="flex-1"
              disabled={
                isViewMode ||
                deletingIndex === index ||
                (isUpdating && editingItem?.index === index)
              }
            />
            {editingItem?.index === index ? (
              <CustomButton
                onClick={handleSaveUpdate}
                disabled={isViewMode || isUpdating}
                variant="ghost"
                size="icon"
              >
                {isUpdating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
              </CustomButton>
            ) : (
              <CustomButton
                onClick={() => handleDeleteItem(index)}
                disabled={isViewMode || deletingIndex === index}
                variant="ghost"
                size="icon"
              >
                {deletingIndex === index ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </CustomButton>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
