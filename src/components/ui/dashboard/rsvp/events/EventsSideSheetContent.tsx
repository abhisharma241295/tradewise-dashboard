import { getCurrentWedding } from "@/lib/cookies/currentWeddingCookie"
import { cn } from "@/lib/utils/cn"
import { Dialog } from "primereact/dialog"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import CustomButton from "@/components/ui/Button"
import { useDeleteEventMutation } from "@/lib/redux/features/apis/eventsApi"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import { InputSwitch } from "primereact/inputswitch"
import coverImageUrls from "@/lib/raw-data/eventsCovers"
import NewRsvpEventForm from "@/components/ui/forms/NewRsvpEventForm"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import EventsGuestSection from "./EventsGuestSection"
interface EventsSideSheetProps {
  onClose: () => void
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
}
const EventsSideSheet: React.FC<EventsSideSheetProps> = ({
  event,
  onClose,
}) => {
  const [coverSettingVisible, setCoverSettingVisible] = React.useState(false)
  const [cover, setCover] = React.useState<string | null>(
    event ? event.event_cover_id : null
  )
  const [emoji, setEmoji] = React.useState<any>(null)
  const [isViewMode, setIsViewMode] = useState(event !== null)
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    React.useState(false)
  const currentWeddingId = getCurrentWedding() || ""
  const [deleteEvent, { error: useDeleteEventMutation_error }] =
    useDeleteEventMutation()

  useEffect(() => {
    if (useDeleteEventMutation_error) {
      toast(`Error: ${useDeleteEventMutation_error}`)
    }
  }, [useDeleteEventMutation_error])
  const handleDelete = async () => {
    try {
      await deleteEvent({
        weddingId: currentWeddingId,
        eventId: event?.event_id || "",
      })
      onClose()
    } catch (error) {
      toast(`Error:${error}`)
    }
  }

  const [expandedSections, setExpandedSections] = useState({
    details: true,
    guests: false,
    attire: false,
    note: false,
    meal: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }))
  }

  const EventView = () => (
    <main className="min-h-screen space-y-4 bg-white px-4 py-6">
      {/* Hero Card */}
      <div className="overflow-hidden rounded-2xl bg-[#ECF4F5] p-4 shadow-sm">
        <div className="relative h-48 w-full overflow-hidden rounded-xl">
          {cover ? (
            <Image
              src={cover}
              alt="Event cover"
              className="object-cover"
              fill
            />
          ) : (
            <div className="h-full w-full bg-gray-200" />
          )}
        </div>
        <div className="mt-4 space-y-0.5">
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-[#60647C]">Invitations Sent</div>
              <div className="text-3xl font-semibold text-[#11131C]">
                {event?.guest_count || 150}
              </div>
            </div>
            <div>
              <div className="text-sm text-[#60647C]">Attending</div>
              <div className="text-3xl font-semibold text-[#11131C]">
                {/* TODO: Get the number of attending guests */}
                {150}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="overflow-hidden rounded-2xl border border-[#E3E3E7] bg-white shadow-sm">
        <button
          onClick={() => toggleSection("details")}
          className="flex w-full items-center justify-between p-4 hover:bg-gray-50"
        >
          <span className="text-base font-semibold text-[#11131C]">
            Event Details
          </span>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-[#60647C] transition-transform duration-200",
              expandedSections.details ? "rotate-180 transform" : ""
            )}
          />
        </button>
        <div
          className={cn(
            "text-[#11131C]",
            "transition-all duration-200 ease-in-out",
            expandedSections.details
              ? "max-h-[500px] opacity-100"
              : "max-h-0 overflow-hidden opacity-0"
          )}
        >
          <div className="space-y-6 border-t p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-[#60647C]">Starts On</div>
                <div className="text-base font-semibold">
                  {event?.start_date?.split("T")[0] || "Not set"}
                </div>
                <div className="mt-4 text-sm text-[#60647C]">From</div>
                <div className="text-base font-semibold">
                  {event?.time_from || "Not set"}
                </div>
              </div>
              <div>
                <div className="text-sm text-[#60647C]">Ends On</div>
                <div className="text-base font-semibold">
                  {event?.end_date?.split("T")[0] || "Not set"}
                </div>
                <div className="mt-4 text-sm text-[#60647C]">Till</div>
                <div className="text-base font-semibold">
                  {event?.time_till || "Not set"}
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm text-[#60647C]">Venue</div>
              <div className="text-base font-semibold">
                {event?.venue_name || "Not set"}
              </div>
            </div>
            <div>
              <div className="text-sm text-[#60647C]">Address</div>
              <div className="text-base font-semibold">
                {event?.full_address || "Not set"}
                <br />
                {event?.location || ""}
                <br />
                {event?.city && event?.state
                  ? `${event.city}, ${event.state}`
                  : ""}
                <br />
                {event?.pincode || ""}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Toggle */}
      <div className="overflow-hidden rounded-2xl border border-[#E3E3E7] bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div>
            <span className="text-base font-semibold text-[#11131C]">RSVP</span>
          </div>
          <InputSwitch checked={event?.rsvp || false} />
        </div>
      </div>

      {/* Guests */}
      <EventsGuestSection
        event={event}
        toggleSection={toggleSection}
        expandedSections={expandedSections}
      />

      {/* Attire Suggestion */}
      <div className="overflow-hidden rounded-2xl border border-[#E3E3E7] bg-white shadow-sm">
        <button
          onClick={() => toggleSection("attire")}
          className="flex w-full items-center justify-between p-4 hover:bg-gray-50"
        >
          <span className="text-base font-semibold text-[#11131C]">
            Attire Suggestion
          </span>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-[#60647C] transition-transform duration-200",
              expandedSections.attire ? "rotate-180 transform" : ""
            )}
          />
        </button>
        <div
          className={cn(
            "text-[#11131C]",
            "transition-all duration-200 ease-in-out",
            expandedSections.attire
              ? "max-h-[500px] opacity-100"
              : "max-h-0 overflow-hidden opacity-0"
          )}
        >
          <div className="space-y-4 border-t p-4">
            <div>
              <div className="text-sm text-[#60647C]">Suggested Attire</div>
              <div className="text-base font-semibold">
                {event?.attire_suggestion || "No attire suggestion provided"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="overflow-hidden rounded-2xl border border-[#E3E3E7] bg-white shadow-sm">
        <button
          onClick={() => toggleSection("note")}
          className="flex w-full items-center justify-between p-4 hover:bg-gray-50"
        >
          <span className="text-base font-semibold text-[#11131C]">Note</span>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-[#60647C] transition-transform duration-200",
              expandedSections.note ? "rotate-180 transform" : ""
            )}
          />
        </button>
        <div
          className={cn(
            "text-[#11131C]",
            "transition-all duration-200 ease-in-out",
            expandedSections.note
              ? "max-h-[500px] opacity-100"
              : "max-h-0 overflow-hidden opacity-0"
          )}
        >
          <div className="space-y-4 border-t p-4">
            <div>
              <div className="text-sm text-[#60647C]">Additional Notes</div>
              <div className="text-base font-semibold">
                {event?.notes || "No notes available"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meal Preferences */}
      <div className="overflow-hidden rounded-2xl border border-[#E3E3E7] bg-white shadow-sm">
        <button
          onClick={() => toggleSection("meal")}
          className="flex w-full items-center justify-between p-4 hover:bg-gray-50"
        >
          <span className="text-base font-semibold text-[#11131C]">
            Meal Preferences
          </span>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-[#60647C] transition-transform duration-200",
              expandedSections.meal ? "rotate-180 transform" : ""
            )}
          />
        </button>
        <div
          className={cn(
            "text-[#11131C]",
            "transition-all duration-200 ease-in-out",
            expandedSections.meal
              ? "max-h-[500px] opacity-100"
              : "max-h-0 overflow-hidden opacity-0"
          )}
        >
          <div className="space-y-4 border-t p-4">
            <div>
              <div className="text-sm text-[#60647C]">Meal Options</div>
              <div className="text-base font-semibold">
                {event?.meal_preference || "No meal preferences specified"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
  return (
    <div className="mx-auto h-full w-full max-w-2xl overflow-auto">
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
      <div className="min-h-screen bg-white">
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="container mx-auto flex h-14 items-center px-4">
            <div className="flex flex-1 items-center gap-4">
              <div className="flex items-center gap-2 text-gray-800">
                <ArrowLeft
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => {
                    if (!coverSettingVisible) onClose()
                    else setCoverSettingVisible(false)
                  }}
                />
                <span className="text-xl font-semibold"> Add RSVP Event</span>
              </div>
            </div>
            <div
              className={cn("flex items-center gap-4", !isViewMode && "hidden")}
            >
              <button
                className="p-2 text-gray-600 hover:text-gray-800"
                onClick={() => setDeleteConfirmationVisible(true)}
              >
                <Trash2 className="h-5 w-5" />
                <span className="sr-only">Delete event</span>
              </button>
              <button
                className="p-2 text-gray-600 hover:text-gray-800"
                onClick={() => {
                  setIsViewMode(false)
                }}
              >
                <Edit className="h-5 w-5" />
                <span className="sr-only">Edit event</span>
              </button>
            </div>
          </div>
        </header>
        {isViewMode ? (
          <>
            <EventView />
          </>
        ) : (
          <>
            <div
              className={cn("relative h-[200px] w-full bg-gray-300")}
              style={{
                backgroundImage: `url('${cover != null && cover}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <CustomButton
                  onClick={() => {
                    if (!coverSettingVisible) setCoverSettingVisible(true)
                    else setCover(null)
                  }}
                  className={cn(
                    "border border-white text-white",
                    isViewMode && "hidden"
                  )}
                  variant={"ghost"}
                  size={"sm"}
                >
                  {!coverSettingVisible ? "Choose Image" : "Clear Image"}
                </CustomButton>
              </div>
            </div>
            <div className={cn(!coverSettingVisible && "hidden", "w-full p-4")}>
              <label className="mb-1 block">Presets</label>
              <div className="grid grid-cols-2 gap-4">
                {coverImageUrls.map((url, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setCover(coverImageUrls[index])
                    }}
                    className={cn(
                      "flex items-center justify-center overflow-hidden rounded-xl p-1",
                      cover === coverImageUrls[index] &&
                        "border-2 border-primary"
                    )}
                  >
                    <Image
                      src={url}
                      alt={`Cover Image ${index + 1}`}
                      width={300}
                      height={200}
                      className="h-auto w-full rounded-lg object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <NewRsvpEventForm
              onClose={onClose}
              event={event}
              coverSettingVisible={coverSettingVisible}
              isViewMode={false}
              emoji={emoji}
              setEmoji={setEmoji}
              cover={cover}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default EventsSideSheet
