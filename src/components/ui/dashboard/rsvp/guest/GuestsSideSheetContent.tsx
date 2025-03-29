import NewGuestForm from "@/components/ui/forms/NewGuestForm"
import { cn } from "@/lib/utils/cn"
import { ArrowLeft, ChevronDown, PencilLine } from "lucide-react"
import { Avatar } from "primereact/avatar"
import { InputSwitch } from "primereact/inputswitch"
import { useState } from "react"

interface GuestsSideSheetContentProps {
  onClose: () => void
  data?: {
    id: string
    name: string
    contact: {
      email: string
      phone: string
    }
    address: string
    rsvpStatus: string
    events: Array<{
      event_id: string
      event_name: string
      icon_id: string | null
    }>
    relation: string | null
    plusOne: boolean
    rawData:
      | any
      | {
          address: string
          city: string
          contact_number: string
          country: string
          email: string
          event_list: Array<{
            event_id: string
            event_name: string
            icon_id: string | null
          }>
          guest_belongs_to: string | null
          guest_id: string
          guest_name: string
          pk_wedding_guest: number
          plus_one: boolean
          rsvp: boolean
          state: string
          zip_code: string
        }
  }
}

export default function GuestsSideSheetContent({
  onClose,
  data,
}: GuestsSideSheetContentProps) {
  const [viewMode, setViewMode] = useState(data ? true : false)
  const [expandedSections, setExpandedSections] = useState(true)
  if (!viewMode) {
    return <NewGuestForm onClose={onClose} data={data} />
  }

  return (
    <div className="w-full overflow-auto">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-14 items-center px-4">
          <div className="flex flex-1 items-center gap-4">
            <div className="flex cursor-pointer items-center gap-2 text-gray-800">
              <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={onClose} />
              <span className="text-xl font-semibold"> Guest Details</span>
            </div>
          </div>
          <div className={cn("flex items-center gap-4", !viewMode && "hidden")}>
            <button
              className="p-2 text-gray-600 hover:text-gray-800"
              onClick={() => {
                setViewMode(!viewMode)
              }}
            >
              <PencilLine className="h-5 w-5" />
              <span className="sr-only">Edit event</span>
            </button>
          </div>
        </div>
      </header>
      <div className="space-y-4 p-4">
        <div className="mx-auto flex flex-col items-center rounded-xl bg-[#ECF4F5] p-4">
          <Avatar
            shape="circle"
            size="large"
            className="mb-4 size-24"
            label={data?.name ? data.name[0].toUpperCase() : ""}
          />
          <div className="text-center">
            <p className="text-sm font-normal text-[#60647C]">Guest Name</p>
            <p className="text-lg font-semibold text-[#11131C]">
              {data?.name || "N/A"}
            </p>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-[#E3E3E7] bg-white shadow-sm">
          <button
            onClick={() => setExpandedSections(!expandedSections)}
            className="flex w-full items-center justify-between p-4 hover:bg-gray-50"
          >
            <span className="text-base font-semibold text-[#11131C]">
              Guest Details
            </span>
            <ChevronDown
              className={cn(
                "h-5 w-5 text-[#60647C] transition-transform duration-200",
                expandedSections ? "rotate-180 transform" : ""
              )}
            />
          </button>
          <div
            className={cn(
              "text-[#11131C]",
              "transition-all duration-200 ease-in-out",
              expandedSections
                ? "max-h-[500px] opacity-100"
                : "max-h-0 overflow-hidden opacity-0"
            )}
          >
            <div className="space-y-6 border-t p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-[#60647C]">Event</div>
                  <div className="text-base font-semibold">
                    {data?.events[0]?.event_name || "Not set"}
                  </div>
                  <div className="mt-4 text-sm text-[#60647C]">Phone No.</div>
                  <div className="text-base font-semibold">
                    {data?.contact?.phone || "Not set"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-[#60647C]">Email</div>
                  <div className="text-base font-semibold">
                    {data?.contact?.email || "Not set"}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm text-[#60647C]">Address</div>
                <div className="text-base font-semibold">
                  {data?.address || "Not set"}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* RSVP Toggle */}
        <div className="overflow-hidden rounded-2xl border border-[#E3E3E7] bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div>
              <span className="text-base font-semibold text-[#11131C]">
                RSVP
              </span>
            </div>
            <InputSwitch checked={data?.rawData?.rsvp || false} />
          </div>
        </div>
        {/* Plus One Toggle */}
        <div className="overflow-hidden rounded-2xl border border-[#E3E3E7] bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div>
              <span className="text-base font-semibold text-[#11131C]">
                Plus One
              </span>
            </div>
            <InputSwitch checked={data?.rawData?.plusOne || false} />
          </div>
        </div>
      </div>
    </div>
  )
}
