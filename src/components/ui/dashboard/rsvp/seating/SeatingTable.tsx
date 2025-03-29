import React, { useEffect, useState } from "react"
import CustomButton from "@/components/ui/Button"
import { cn } from "@/lib/utils/cn"
import { Trash2 } from "lucide-react"
import { Checkbox } from "primereact/checkbox"
import { stringToHexColor } from "@/lib/utils/stringToHexColorConverter"

interface Guest {
  guest_name: string
  guest_id: string
}

interface Table {
  table_id: string
  table_number: number
  guests: Guest[]
}

interface SeatingTableProps {
  table: Table
  onDeleteTable: () => void
  onDeleteTableGuest: (guestIds: string[]) => void
}

const SeatingTable: React.FC<SeatingTableProps> = ({
  table,
  onDeleteTable,
  onDeleteTableGuest,
}) => {
  const [selectedGuests, setSelectedGuests] = useState<string[]>([])
  useEffect(() => {
    setSelectedGuests(
      selectedGuests.filter((guestId) =>
        table.guests.some((guest) => guest.guest_id === guestId)
      )
    )
  }, [table.guests])
  return (
    <>
      <div key={table.table_id}>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="mb-2 text-lg font-semibold">
            Table {table.table_number}
          </h3>
          {selectedGuests.length > 0 ? (
            <div className="flex transform items-center gap-2 transition-transform duration-300">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Select All</span>
                <Checkbox
                  checked={
                    selectedGuests.length === table.guests.length &&
                    table.guests.length > 0
                  }
                  onChange={() => {
                    if (selectedGuests.length === table.guests.length) {
                      setSelectedGuests([])
                    } else {
                      setSelectedGuests(
                        table.guests.map((guest) => guest.guest_id)
                      )
                    }
                  }}
                />
              </div>
              <div className="h-full border-l border-gray-300"></div>
              <CustomButton
                onClick={() => onDeleteTableGuest(selectedGuests)}
                variant={"link"}
                className="text-sm text-red-500 hover:underline"
              >
                Delete Guests
              </CustomButton>
            </div>
          ) : (
            <div className="flex translate-x-0 transform items-center gap-2 transition-transform duration-300">
              <CustomButton
                variant={"link"}
                className="text-sm text-blue-500 hover:underline"
              >
                {""}
              </CustomButton>
              <CustomButton
                onClick={() => {
                  onDeleteTable()
                }}
                variant={"ghost"}
                size={"icon"}
                className={cn(
                  "size-8 text-gray-400 transition-opacity duration-200"
                )}
              >
                <Trash2 size={18} />
              </CustomButton>
            </div>
          )}
        </div>
        <div className="w-full max-w-md overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="">
            {table.guests.length === 0 ? (
              <div className="m-2 flex items-center justify-center rounded-md bg-gray-100 p-4">
                <span className="text-base font-normal text-gray-600">
                  No guests available
                </span>
              </div>
            ) : (
              <div className="max-h-[calc(4*3rem)] overflow-y-auto">
                {table.guests.map((user) => (
                  <div
                    key={user.guest_name}
                    className="group flex cursor-pointer items-center gap-3 p-2 hover:bg-secondary"
                  >
                    <div className="flex w-full items-center">
                      <div
                        className={`overflow-hidden transition-all duration-300 ${selectedGuests.length > 0 ? "w-6" : "w-0 group-hover:w-6"}`}
                      >
                        <Checkbox
                          className="transition-all duration-300"
                          checked={
                            selectedGuests.includes(user.guest_id) || false
                          }
                          onChange={() => {
                            if (selectedGuests.includes(user.guest_id)) {
                              setSelectedGuests(
                                selectedGuests.filter(
                                  (id) => id !== user.guest_id
                                )
                              )
                            } else {
                              setSelectedGuests([
                                ...selectedGuests,
                                user.guest_id,
                              ])
                            }
                          }}
                        />
                      </div>

                      <div
                        className={cn(
                          "flex items-center gap-3 transition-all duration-300 group-hover:translate-x-2",
                          selectedGuests.length > 0 && "translate-x-2"
                        )}
                      >
                        <div
                          className="flex size-8 items-center justify-center rounded-full"
                          style={{
                            backgroundColor: stringToHexColor(user.guest_name),
                          }}
                        >
                          <span className="font-medium text-white">
                            {user.guest_name[0]}
                          </span>
                        </div>
                        <span className="flex-grow text-base font-normal text-gray-900">
                          {user.guest_name}
                        </span>
                      </div>
                    </div>

                    <CustomButton
                      onClick={() => {
                        onDeleteTableGuest([user.guest_id])
                      }}
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "size-8 text-gray-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      )}
                    >
                      <Trash2 size={18} />
                    </CustomButton>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SeatingTable
