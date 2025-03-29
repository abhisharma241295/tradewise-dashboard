import {
  useDeleteGuestFromSeatingTableMutation,
  useGetSeatingPerEventQuery,
} from "@/lib/redux/features/apis/seatingApi"
import { useDeleteSeatingTableMutation } from "@/lib/redux/features/apis/seatingApi"
import { useDeleteSeatingMutation } from "@/lib/redux/features/apis/seatingApi"
import { cn } from "@/lib/utils/cn"
import { PencilLine, Trash } from "lucide-react"
import { ArrowLeft } from "lucide-react"
import { Dialog } from "primereact/dialog"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import CustomButton from "@/components/ui/Button"
import SeatingTable from "./SeatingTable"
import NewSeatingForm from "@/components/ui/forms/NewSeatingForm"

interface SeatingSidesheetContentProps {
  onClose: () => void
  data?: any
}

interface DeleteArgs {
  eventId?: string
  seatingId?: string
  tableId?: string
  guestIds?: string[]
}
type DeleteFunction = (params: DeleteArgs) => Promise<void>

interface DeleteInterface {
  function: DeleteFunction
  args: DeleteArgs
  tag: "deleteSeating" | "deleteTablePerSeating" | "deleteGuestPerTable"
}

const SeatingSidesheetContent: React.FC<SeatingSidesheetContentProps> = ({
  onClose,
  data,
}) => {
  const [viewMode, setViewMode] = useState(data ? true : false)
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false)

  const [deleteInterface, setDeleteInterface] = useState<
    DeleteInterface | undefined
  >(undefined)
  const [
    deleteSeating,
    {
      isLoading: useDeleteEventMutation_isLoading,
      isError: useDeleteEventMutation_isError,
      error: useDeleteEventMutation_error,
    },
  ] = useDeleteSeatingMutation()
  // deleteSeatingTable
  useEffect(() => {
    if (useDeleteEventMutation_isError) {
      toast.error(
        `Failed to delete seating: ${useDeleteEventMutation_error || "Unknown error"}`
      )
    }
  }, [useDeleteEventMutation_isError, useDeleteEventMutation_error])

  const [
    deleteSeatingTable,
    {
      isLoading: useDeleteSeatingTableMutation_isLoading,
      isError: useDeleteSeatingTableMutation_isError,
      error: useDeleteSeatingTableMutation_error,
    },
  ] = useDeleteSeatingTableMutation()

  useEffect(() => {
    if (useDeleteSeatingTableMutation_isError) {
      toast.error(
        `Failed to delete table: ${useDeleteSeatingTableMutation_error || "Unknown error"}`
      )
    }
  }, [
    useDeleteSeatingTableMutation_isError,
    useDeleteSeatingTableMutation_error,
  ])
  const [
    deleteGuestFromSeatingTable,
    {
      isLoading: useDeleteGuestFromSeatingTableMutation_isLoading,
      isError: useDeleteGuestFromSeatingTableMutation_isError,
      error: useDeleteGuestFromSeatingTableMutation_error,
    },
  ] = useDeleteGuestFromSeatingTableMutation()
  useEffect(() => {
    if (useDeleteGuestFromSeatingTableMutation_isError) {
      toast.error(
        `Failed to remove guest(s): ${useDeleteGuestFromSeatingTableMutation_error || "Unknown error"}`
      )
    }
  }, [
    useDeleteGuestFromSeatingTableMutation_isError,
    useDeleteGuestFromSeatingTableMutation_error,
  ])
  const {
    data: seatingData,
    isError: seatingError,
    error: seatingFetchError,
  } = useGetSeatingPerEventQuery({ eventId: data?.event_id })

  useEffect(() => {
    if (seatingError) {
      toast.error(
        `Failed to fetch seating: ${seatingFetchError || "Unknown error"}`
      )
    }
  }, [seatingError, seatingFetchError])
  async function deleteCurrentSeating(args: DeleteArgs) {
    try {
      await deleteSeating({
        eventId: args?.eventId || "",
        seatingId: args?.seatingId || "",
      })
      toast("Seating deleted successfully")
      onClose()
    } catch (error) {
      console.error("Failed to delete seating:", error)
      toast(`Error Occurred: ${error}`)
    }
  }

  async function deleteTableFromSeating(args: DeleteArgs) {
    // Implement the logic for deleting a table from seating\
    try {
      await deleteSeatingTable({
        // seatingId: args?.seatingId || ""
        seatingTableId: args?.tableId || "",
      })
      toast("Table deleted successfully")
    } catch (error) {
      console.error("Failed to delete seating:", error)
      toast(`Error Occurred: ${error}`)
    }
  }

  async function deleteGuestFromSeating(args: DeleteArgs) {
    // Implement the logic for deleting a guest from seating
    try {
      await deleteGuestFromSeatingTable({
        tableAssignmentId: args.tableId ?? "",
        data: {
          guest_ids: args.guestIds ?? [],
        },
      })
      toast("Guest(s) removed from seating successfully")
    } catch (error) {
      console.error("Failed to remove guest(s) from seating:", error)
      toast(`An error occurred while removing guest(s): ${error}`)
    }
  }
  if (!viewMode) {
    return <NewSeatingForm onClose={onClose} data={data} />
  }
  return (
    <div className="w-full overflow-auto">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-14 items-center px-4">
          <div className="flex flex-1 items-center gap-4">
            <div className="flex items-center gap-2 text-gray-800">
              <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={onClose} />
              <span className="text-xl font-semibold"> {data.name}</span>
            </div>
          </div>
          <div className={cn("flex items-center gap-4", !viewMode && "hidden")}>
            <button
              className="p-2 text-gray-600 hover:text-gray-800"
              onClick={() => setViewMode(false)}
            >
              <PencilLine className="h-5 w-5" />
              <span className="sr-only">Edit event</span>
            </button>
            <button
              className="p-2 text-gray-600 hover:text-gray-800"
              onClick={() => {
                setDeleteInterface({
                  function: deleteCurrentSeating,
                  args: {
                    eventId: data.event_id,
                    seatingId: data.seating_id,
                  },
                  tag: "deleteSeating",
                })
                setDeleteConfirmationVisible(true)
              }}
            >
              <Trash className="h-5 w-5" />
              <span className="sr-only">Delete event</span>
            </button>
          </div>
        </div>
      </header>
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
            loading={
              useDeleteEventMutation_isLoading ||
              useDeleteSeatingTableMutation_isLoading ||
              useDeleteGuestFromSeatingTableMutation_isLoading
            }
            size="sm"
            className="!hover:bg-red-700 rounded-[8px] !border-red-600 !bg-red-600 px-6 py-2 !font-medium"
            onClick={async () => {
              if (deleteInterface != undefined) {
                await deleteInterface.function(deleteInterface.args)
              }
              setDeleteConfirmationVisible(false)
            }}
          >
            Yes, Delete
          </CustomButton>
        </div>
      </Dialog>
      <main className={cn("container mx-auto space-y-8 px-4 py-6")}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center rounded-lg border bg-white p-6 shadow-sm">
            <svg
              width="44"
              height="28"
              viewBox="0 0 44 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="Vector"
                d="M42.3077 0H1.69231C1.24348 0 0.813035 0.1838 0.495665 0.510967C0.178296 0.838133 0 1.28187 0 1.74455C0 2.20723 0.178296 2.65096 0.495665 2.97813C0.813035 3.3053 1.24348 3.4891 1.69231 3.4891H5.07692V26.1682C5.07692 26.6309 5.25522 27.0746 5.57259 27.4018C5.88996 27.729 6.3204 27.9128 6.76923 27.9128C7.21806 27.9128 7.6485 27.729 7.96587 27.4018C8.28324 27.0746 8.46154 26.6309 8.46154 26.1682V10.5545H35.5385V26.2555C35.5385 26.7181 35.7168 27.1619 36.0341 27.489C36.3515 27.8162 36.7819 28 37.2308 28C37.6796 28 38.11 27.8162 38.4274 27.489C38.7448 27.1619 38.9231 26.7181 38.9231 26.2555V3.4891H42.3077C42.7565 3.4891 43.187 3.3053 43.5043 2.97813C43.8217 2.65096 44 2.20723 44 1.74455C44 1.28187 43.8217 0.838133 43.5043 0.510967C43.187 0.1838 42.7565 0 42.3077 0ZM35.5385 7.06542H8.46154V3.4891H35.5385V7.06542Z"
                fill="#23273C"
              />
            </svg>

            <div className="text-sm text-gray-600">Tables</div>
            <div className="text-2xl font-bold">{data.total_tables}</div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border bg-white p-6 shadow-sm">
            <svg
              width="18"
              height="30"
              viewBox="0 0 18 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="Vector"
                d="M18 2.60186C18 0.125572 10.503 0 9 0C7.497 0 0 0.125572 0 2.60186C0 2.62243 0.0013501 2.64257 0.0045001 2.66271L2.19555 17.238C1.94618 17.3337 1.73249 17.4982 1.58185 17.7103C1.43121 17.9224 1.35048 18.1725 1.35 18.4286V29.5714C1.35 29.6851 1.39741 29.7941 1.4818 29.8745C1.56619 29.9548 1.68065 30 1.8 30H3.6C3.71607 30 3.82764 29.9573 3.91141 29.8808C3.99518 29.8042 4.04468 29.6999 4.04955 29.5894L4.36905 22.2857H13.6309L13.95 29.5894C13.9549 29.6999 14.0044 29.8044 14.0883 29.8809C14.1722 29.9574 14.2839 30.0001 14.4 30H16.2C16.3193 30 16.4338 29.9548 16.5182 29.8745C16.6026 29.7941 16.65 29.6851 16.65 29.5714V18.4286C16.6496 18.1725 16.5689 17.9224 16.4182 17.7102C16.2676 17.4981 16.0539 17.3337 15.8044 17.238L17.9955 2.66229C17.9985 2.64241 18 2.62193 18 2.60186ZM1.16505 4.335C1.5957 3.978 2.47365 3.672 3.6513 3.44314L4.47345 17.1429H3.09015L1.16505 4.335ZM3.168 29.1429H2.25V19.7143H3.5811L3.168 29.1429ZM4.40595 21.4286L4.4811 19.7143H13.518L13.5932 21.4286H4.40595ZM15.75 29.1429H14.8315L14.4189 19.7143H15.75V29.1429ZM15.75 18.8571H2.25V18.4286C2.25 18.192 2.45205 18 2.7 18H15.3C15.5479 18 15.75 18.192 15.75 18.4286V18.8571ZM4.5441 3.29271C5.7069 3.12386 7.0758 3.02186 8.55 3.00429V17.1429H5.37525L4.5441 3.29271ZM9.45 17.1429V3.00429C10.9251 3.02143 12.294 3.12343 13.4559 3.29143L12.6248 17.1429H9.45ZM14.9098 17.1429H13.527L14.3491 3.44186C15.5264 3.67071 16.4038 3.97714 16.8354 4.335L14.9098 17.1429ZM16.9762 3.39386C15.3315 2.48314 11.9389 2.14286 9 2.14286H8.9505C6.03765 2.14714 2.6622 2.48871 1.02375 3.39429L0.9009 2.57786C0.963 1.74214 4.20165 0.857143 9 0.857143C11.2059 0.857143 13.2565 1.04571 14.7744 1.389C16.4484 1.76743 17.0707 2.24657 17.0991 2.57829L16.9762 3.39386Z"
                fill="black"
              />
            </svg>

            {/* <div className="text-4xl font-bold">18</div> */}
            <div className="text-sm text-gray-600">Seats</div>
            <div className="text-2xl font-bold">{data.total_seats}</div>
          </div>
        </div>
        {/* {JSON.stringify(data)} */}
        <div className="space-y-4">
          {(seatingData?.data?.seatings[0] ?? data).table_info
            .slice() // Create a shallow copy of the array to avoid modifying the original
            // .sort((a: { table_number: number, table_id: string }, b: { table_number: number, table_id: string }) => a.table_number - b.table_number)
            .map(
              (table: {
                guests: {
                  guest_id: string
                  guest_name: string
                }[]
                table_number: number
                table_id: string
              }) => (
                <SeatingTable
                  key={table.table_id}
                  table={table}
                  onDeleteTable={() => {
                    setDeleteInterface({
                      function: deleteTableFromSeating,
                      args: {
                        tableId: table.table_id,
                      },
                      tag: "deleteTablePerSeating",
                    })
                    setDeleteConfirmationVisible(true)
                  }}
                  onDeleteTableGuest={(guestIds) => {
                    setDeleteInterface({
                      function: deleteGuestFromSeating,
                      args: {
                        tableId: table.table_id,
                        guestIds,
                      },
                      tag: "deleteGuestPerTable",
                    })
                    setDeleteConfirmationVisible(true)
                  }}
                />
              )
            )}
        </div>
      </main>
    </div>
  )
}

export default SeatingSidesheetContent
