import Search from "@/components/ui/commons/Search"
import { getCurrentWedding } from "@/lib/cookies/currentWeddingCookie"
import { useLazyGetGuestListQuery } from "@/lib/redux/features/apis/guestApi"
import { useAppSelector } from "@/lib/redux/hooks"
import { cn } from "@/lib/utils/cn"
import { stringToHexColor } from "@/lib/utils/stringToHexColorConverter"
import { Checkbox } from "primereact/checkbox"
import { useEffect, useState, useCallback } from "react"
import { toast } from "sonner"
import CustomButton from "../../../Button"
import { useDeleteEventGuestsMutation } from "@/lib/redux/features/apis/eventsApi"
import { ChevronDown, Loader } from "lucide-react"

const GUEST_PAGE_SIZE = 30

interface Props {
  event?: {
    attire_suggestion: string
    city: string
    end_date: string
    event_cover_id: string
    event_icon_id: string | null
    event_id: string
    event_name: string
    event_status: string
    full_address: string
    guest_count: number
    guest_list: Array<{ guest_id: string; guest_name: string }>
    location: string
    meal_preference: string
    notes: string
    pincode: string
    rsvp: boolean
    start_date: string
    state: string
    time_from: string
    time_till: string
    venue_name: string
  }
  toggleSection: (section: string) => void
  expandedSections: {
    details: boolean
    guests: boolean
    attire: boolean
    note: boolean
    meal: boolean
  }
}

export default function EventsGuestSection({
  event,
  toggleSection,
  expandedSections,
}: Props) {
  const [guestList, setGuestList] = useState<
    Array<{ guest_id: string; guest_name: string }>
  >([])
  const [selectedGuests, setSelectedGuests] = useState<string[]>([])
  const [searchInput, setSearchInput] = useState("")

  const currentWeddingId =
    useAppSelector((state) => state.currentWedding.currentWeddingId) ||
    getCurrentWedding() ||
    ""

  const [
    triggerGetGuestList,
    {
      isLoading: useLazyGetGuestListQueryLoading,
      isError: isGetGuestListError,
      error: getGuestListError,
    },
  ] = useLazyGetGuestListQuery()
  const [
    deleteEventGuests,
    { isError: isDeleteEventGuestsError, error: deleteEventGuestsError },
  ] = useDeleteEventGuestsMutation()

  useEffect(() => {
    if (isGetGuestListError) {
      console.error("Get Guest List Error:", getGuestListError)
      toast.error(
        "An error occurred while fetching guest list. Please try again."
      )
    }
    if (isDeleteEventGuestsError) {
      console.error("Delete Event Guests Error:", deleteEventGuestsError)
      toast.error(
        "An error occurred while deleting event guests. Please try again."
      )
    }
  }, [
    isGetGuestListError,
    getGuestListError,
    isDeleteEventGuestsError,
    deleteEventGuestsError,
  ])

  // Initialize guest list from props
  useEffect(() => {
    if (event?.guest_list) {
      setGuestList(event.guest_list)
    }
  }, [event?.guest_list])

  const handleSearch = useCallback(
    async (query: string) => {
      if (!event?.event_id) return

      try {
        const result = await triggerGetGuestList({
          weddingId: currentWeddingId,
          pagination: {
            page: 1,
            perPage: GUEST_PAGE_SIZE,
            eventId: event.event_id,
            ...(query && { search: query }),
          },
        }).unwrap()

        if (result?.items) {
          setGuestList(result.items)
        }
      } catch (error) {
        console.error("Search error:", error)
        toast.error("Failed to search guests")
      }
    },
    [currentWeddingId, event?.event_id, triggerGetGuestList]
  )

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchInput)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchInput, handleSearch])

  const handleGuestSelection = (guestId: string) => {
    setSelectedGuests((prev) =>
      prev.includes(guestId)
        ? prev.filter((id) => id !== guestId)
        : [...prev, guestId]
    )
  }

  const handleDeleteGuests = async () => {
    if (!event?.event_id || selectedGuests.length === 0) return

    try {
      await deleteEventGuests({
        eventId: event.event_id,
        guestIds: selectedGuests,
      }).unwrap()

      setGuestList((prev) =>
        prev.filter((guest) => !selectedGuests.includes(guest.guest_id))
      )
      setSelectedGuests([])
      toast.success("Guests deleted successfully")
    } catch (error) {
      console.error("Delete error:", error)
      toast.error("Failed to delete guests")
    }
  }

  const handleSelectAll = (e: any) => {
    e.stopPropagation()
    setSelectedGuests(
      e.target.checked ? guestList.map((guest) => guest.guest_id) : []
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E3E3E7] bg-white shadow-sm">
      <button
        className={cn(
          "flex w-full items-center justify-between px-4 hover:bg-gray-50",
          expandedSections.guests && selectedGuests.length > 0
            ? "py-1.5"
            : "py-4"
        )}
        onClick={() => toggleSection("guests")}
      >
        <span className="text-base font-semibold text-[#11131C]">Guests</span>
        <div className="flex items-center gap-2">
          {expandedSections.guests && selectedGuests.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#60647C]">Select All</span>
                <Checkbox
                  checked={selectedGuests.length === guestList.length}
                  onChange={(e) => handleSelectAll(e)}
                />
              </div>
              <div className="h-full border-l border-[#E3E3E7]" />
              <CustomButton
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteGuests()
                }}
                variant="link"
                className="text-sm text-red-500 hover:underline"
              >
                Delete Guests
              </CustomButton>
            </div>
          )}
          <ChevronDown
            className={cn(
              "h-5 w-5 text-[#60647C] transition-transform duration-200",
              expandedSections.guests && "rotate-180"
            )}
          />
        </div>
      </button>

      <div
        className={cn(
          "transition-all duration-200 ease-in-out",
          expandedSections.guests
            ? "max-h-[500px] opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        )}
      >
        <div className="border-t">
          <div className="pt-4">
            <Search
              value={searchInput}
              onChange={setSearchInput}
              placeholder="Search guests..."
            />
          </div>
          {useLazyGetGuestListQueryLoading && (
            <Loader className="mx-auto animate-spin" />
          )}
          <div className="max-h-[calc(4*3rem)] overflow-y-auto">
            {guestList.length === 0 ? (
              <div className="m-2 flex items-center justify-center rounded-md bg-[#F8F9FA] p-4">
                <span className="text-sm text-[#60647C]">
                  No guests available
                </span>
              </div>
            ) : (
              guestList.map((guest) => (
                <div
                  key={guest.guest_id}
                  className="group flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-[#F8F9FA]"
                >
                  <div className="flex w-full items-center">
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        selectedGuests.length > 0
                          ? "w-6"
                          : "w-0 group-hover:w-6"
                      )}
                    >
                      <Checkbox
                        checked={selectedGuests.includes(guest.guest_id)}
                        onChange={() => handleGuestSelection(guest.guest_id)}
                      />
                    </div>
                    <div
                      className={cn(
                        "flex items-center gap-3",
                        selectedGuests.length > 0 && "translate-x-2"
                      )}
                    >
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full text-white"
                        style={{
                          backgroundColor: stringToHexColor(guest.guest_name),
                        }}
                      >
                        {guest.guest_name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </div>
                      <span className="text-base text-[#11131C]">
                        {guest.guest_name}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
