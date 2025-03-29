import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { MultiSelect } from "../commons/MultiselectorUI"
import { ArrowLeft, Loader, Trash2, Edit, XCircle } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils/cn"
import { GroupFormSchema, GroupFormType } from "@/lib/form-schema/newGroupForm "
import { groupApi } from "@/lib/redux/features/apis/groupApi"
import { useAppSelector } from "@/lib/redux/hooks"
import { Dialog } from "primereact/dialog"
import CustomButton from "@/components/ui/Button"
import { useGetGuestListQuery } from "@/lib/redux/features/apis/guestApi"
import { Group } from "@/pages/dashboard/rsvp"
import { Guest } from "../dashboard/rsvp/guest"

interface NewGroupFormProps {
  onClose: () => void
  viewData: Group | null
}

export default function NewGroupForm({ onClose, viewData }: NewGroupFormProps) {
  const [editMode, setEditMode] = useState(false)
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false)

  const currentWeddingId = useAppSelector(
    (state) => state.currentWedding.currentWeddingId
  )
  const { data: guestList } = useGetGuestListQuery(
    {
      weddingId: currentWeddingId,
    },
    {
      skip: !currentWeddingId,
    }
  )
  console.log(viewData)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<GroupFormType>({
    resolver: yupResolver(GroupFormSchema),
    defaultValues: viewData
      ? {
          name: viewData.group_name,
          // TODO: need to fix this.
          guests: (viewData as any).guests.map(
            (guest: { guest_name: string; guest_id: string }) => ({
              guest_name: guest.guest_name,
              guest_id: guest.guest_id,
            })
          ),
        }
      : { name: "", guests: [] },
  })

  const [addGroupMutation, { isLoading: addGroupMutation_isLoading }] =
    groupApi.useAddGroupMutation()
  const [updateGroupMutation, { isLoading: updateGroupMutation_isLoading }] =
    groupApi.useUpdateGroupMutation()
  const [DeleteGroupMutation] = groupApi.useDeleteGroupMutation()

  const onSubmit = async (data: GroupFormType) => {
    try {
      if (editMode) {
        const response = await updateGroupMutation({
          currentWeddingId: currentWeddingId,
          groupId: viewData?.group_id,
          group_name: data.name,
          guest_list: data.guests.map((item) => item.guest_id),
        })
        if (response?.data?.status === "success") {
          toast(response?.data?.message || "Group updated successfully!")
        }
      } else {
        const response = await addGroupMutation({
          currentWeddingId: currentWeddingId,
          group_name: data.name,
          guest_list: data.guests.map((item) => item.guest_id),
        })
        if (response?.data?.status === "success") {
          toast(response?.data?.message || "Group created successfully!")
        }
      }
      onClose()
    } catch (error) {
      toast(`Error: ${error}`)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await DeleteGroupMutation({
        currentWeddingId: currentWeddingId,
        groupId: viewData?.group_id || "",
      })
      if (response?.data?.status === "success") {
        toast(response?.data?.message || "Group deleted successfully!")
      }
      onClose()
    } catch (error) {
      toast(`Error:${error}`)
    }
  }

  return (
    <div className="w-full max-w-2xl">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-14 items-center px-4">
          <div className="flex flex-1 items-center gap-4">
            <div className="flex cursor-pointer items-center gap-2 text-gray-800">
              <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={onClose} />
              <span className="text-xl font-semibold">
                {viewData ? (editMode ? "Edit" : "View") : "Add"} Group
              </span>
            </div>
          </div>
          <div className={cn("flex items-center gap-4", !viewData && "hidden")}>
            <button
              className="p-2 text-gray-600 hover:text-gray-800"
              onClick={() => setDeleteConfirmationVisible(true)}
            >
              <Trash2 className="h-5 w-5" />
              <span className="sr-only">Delete Group</span>
            </button>
            <button
              className="p-2 text-gray-600 hover:text-gray-800"
              onClick={() => setEditMode(true)}
            >
              <Edit className="h-5 w-5" />
              <span className="sr-only">Edit Group</span>
            </button>
          </div>
        </div>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-4">
        <div>
          <label htmlFor="name" className="mb-1 block">
            Group Name*
          </label>
          <InputText
            id="name"
            {...register("name")}
            disabled={(viewData || false) && !editMode}
            className={`w-full ${errors.name ? "p-invalid" : ""}`}
            placeholder="Enter Group name"
          />
          {errors.name && (
            <small className="text-red-500">{errors.name.message}</small>
          )}
        </div>
        <div>
          <label htmlFor="guest" className="mb-1 block">
            Guests*
          </label>
          <Controller
            name="guests"
            control={control}
            render={({ field }) => (
              <MultiSelect
                disabled={(viewData || false) && !editMode}
                chip
                selectedItemTemplate={(value, onRemove) => {
                  return (
                    <div className="my-auto flex items-center gap-1 rounded-full border bg-white px-0.5">
                      <span className="pl-1 text-sm">{value.label}</span>
                      <XCircle
                        size={18}
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          onRemove()
                        }}
                      />
                    </div>
                  )
                }}
                itemTemplate={(option) => (
                  <div className="custom-dropdown-item flex items-center gap-2">
                    <span className="custom-dropdown-item-label">
                      {option.label}
                    </span>
                  </div>
                )}
                options={(guestList?.items ?? []).map((guest: Guest) => ({
                  value: guest.guest_id,
                  label: guest.guest_name,
                  raw: guest,
                }))}
                value={(field.value ?? []).map((guest: Guest) => {
                  return {
                    value: guest.guest_id,
                    label: guest.guest_name,
                    raw: guest,
                  }
                })}
                setValue={(selectedOptions) =>
                  field.onChange(
                    selectedOptions.map((option) => ({
                      guest_name: option.label,
                      guest_id: option.value,
                    }))
                  )
                }
              />
            )}
          />
          {errors.guests && (
            <small className="text-red-500">{errors.guests.message}</small>
          )}
        </div>
        {(!viewData || editMode) && (
          <Button
            type="submit"
            className="flex w-full items-center justify-center gap-2"
          >
            {(addGroupMutation_isLoading || updateGroupMutation_isLoading) && (
              <Loader className="animate-spin" />
            )}
            {!(addGroupMutation_isLoading || updateGroupMutation_isLoading) ? (
              <p>{!viewData ? "Add" : "Update"} Group</p>
            ) : (
              <p>{!viewData ? "Adding" : "Updating"} Group...</p>
            )}
          </Button>
        )}
      </form>
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
          Are you sure you want to remove them?
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
            size="sm"
            className="!hover:bg-red-700 rounded-[8px] !border-red-600 !bg-red-600 px-6 py-2 !font-medium"
            onClick={() => {
              handleDelete()
              setDeleteConfirmationVisible(false)
            }}
          >
            Yes, Delete
          </CustomButton>
        </div>
      </Dialog>
    </div>
  )
}
