import React from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { InputText } from "primereact/inputtext"
import { Calendar } from "primereact/calendar"
import { Checkbox } from "primereact/checkbox"
import { Button } from "primereact/button"
import { InputTextarea } from "primereact/inputtextarea"
import { Check, Plus, Loader, XCircle } from "lucide-react"
import {
  rsvpEventFormSchema,
  RsvpEventFormType,
} from "@/lib/form-schema/newRsvpEventForm"
import { toast } from "sonner"
import { getCurrentWedding } from "@/lib/cookies/currentWeddingCookie"
import {
  useAddEventMutation,
  useUpdateEventMutation,
} from "@/lib/redux/features/apis/eventsApi"
import { cn } from "@/lib/utils/cn"
import { useGetGuestListQuery } from "@/lib/redux/features/apis/guestApi"
import InputBoxWithEmoji from "../commons/InputBoxWithEmoji"
import { stringToHexColor } from "@/lib/utils/stringToHexColorConverter"
import { MultiSelect } from "../commons/MultiselectorUI"

interface RsvpEventFormProps {
  onClose: () => void
  event: any
  coverSettingVisible: boolean
  isViewMode: boolean
  emoji: any
  setEmoji: (emoji: any) => void
  cover: any
}

export default function NewRsvpEventForm({
  onClose,
  event,
  coverSettingVisible,
  isViewMode,
  emoji,
  setEmoji,
  cover,
}: RsvpEventFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RsvpEventFormType>({
    resolver: yupResolver(rsvpEventFormSchema),
    defaultValues: event
      ? {
          eventName: event.event_name,
          startDate: new Date(event.start_date),
          endDate: new Date(event.end_date),
          from: event.time_from,
          till: event.time_till,
          venueName: event.venue_name,
          fullAddress: event.full_address,
          location: event.location,
          state: event.state,
          city: event.city,
          zipCode: event.pincode,
          rsvp: event.rsvp,
          attireSuggestion: event.attire_suggestion,
          note: event.notes,
          mealPreferences: event.meal_preference,
        }
      : undefined,
  })
  const currentWeddingId = getCurrentWedding() || ""
  const [
    addEvent,
    {
      isLoading: useAddEventMutation_isLoading,
      error: useAddEventMutation_error,
    },
  ] = useAddEventMutation()
  const [
    updateEvent,
    {
      isLoading: useUpdateEventMutation_isLoading,
      error: useUpdateEventMutation_error,
    },
  ] = useUpdateEventMutation()

  React.useEffect(() => {
    if (useAddEventMutation_error) {
      toast.error(
        "Failed to add event: " +
          (useAddEventMutation_error as any)?.data?.message ||
          "Something went wrong"
      )
    }
  }, [useAddEventMutation_error])

  React.useEffect(() => {
    if (useUpdateEventMutation_error) {
      toast.error(
        "Failed to update event: " +
          (useUpdateEventMutation_error as any)?.data?.message ||
          "Something went wrong"
      )
    }
  }, [useUpdateEventMutation_error])

  const onSubmit = async (data: RsvpEventFormType) => {
    try {
      if (event) {
        await updateEvent({
          weddingId: currentWeddingId,
          eventId: event.event_id,
          body: {
            event_name: data.eventName,
            event_icon_id: emoji?.src?.match(/\/(\d+)\./)?.[1],
            event_cover_id: cover,
            start_date: data.startDate,
            end_date: data.endDate,
            time_from: `${data.from}`,
            time_till: `${data.till}`,
            venue_name: data.venueName,
            full_address: data.fullAddress,
            location: data.location,
            state: data.state,
            city: data.city,
            pincode: data.zipCode,
            rsvp: data.rsvp,
            attire_suggestion: data.attireSuggestion,
            notes: data.note,
            meal_preference: data.mealPreferences,
            guests: data?.guests?.map((guest: any) => guest.guestId),
          },
        })
      } else {
        await addEvent({
          weddingId: currentWeddingId,
          body: {
            event_name: data.eventName,
            event_icon_id: emoji?.src?.match(/\/(\d+)\./)?.[1],
            event_cover_id: cover,
            start_date: data.startDate,
            end_date: data.endDate,
            time_from: `${data.from}`,
            time_till: `${data.till}`,
            venue_name: data.venueName,
            full_address: data.fullAddress,
            location: data.location,
            state: data.state,
            city: data.city,
            pincode: data.zipCode,
            rsvp: data.rsvp,
            attire_suggestion: data.attireSuggestion,
            notes: data.note,
            meal_preference: data.mealPreferences,
            guests: data?.guests?.map((guest: any) => guest.guestId),
          },
        })
      }
      onClose()
    } catch (error) {
      toast(`Error:${error}`)
    }
  }
  const [guestSearchQ, setGuestSearchQ] = React.useState<string>("")
  const {
    data: useGetGuestListQuery_data,
    isFetching: useGetGuestListQuery_isFetching,
    error: useGetGuestListQuery_error,
  } = useGetGuestListQuery({
    weddingId: currentWeddingId,
    pagination: {
      page: 1,
      perPage: 40,
      sortDir: "asc",
      search: guestSearchQ,
    },
  })

  React.useEffect(() => {
    if (useGetGuestListQuery_error) {
      toast.error(
        "Failed to get guest list: " +
          (useGetGuestListQuery_error as any)?.data?.message ||
          "Something went wrong"
      )
    }
  }, [useGetGuestListQuery_error])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "space-y-3 p-4",
        coverSettingVisible && "hidden",
        isViewMode && "hidden"
      )}
    >
      <div>
        <label htmlFor="eventName" className="mb-1 block">
          Event Name
        </label>
        <Controller
          name="eventName"
          control={control}
          render={({ field }) => (
            <InputBoxWithEmoji
              value={field.value}
              onChange={field.onChange}
              icon={emoji}
              onIconChange={setEmoji}
            />
          )}
        />
        {errors.eventName && (
          <small className="p-error">{errors.eventName.message}</small>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="mb-1 block">
            Start Date
          </label>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <Calendar
                id="startDate"
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                dateFormat="mm/dd/yy"
                placeholder="MM/DD/YYYY"
                className={`no-border w-full ${
                  errors.startDate ? "p-invalid" : ""
                }`}
                panelClassName=""
              />
            )}
          />
          {errors.startDate && (
            <small className="p-error">{errors.startDate.message}</small>
          )}
        </div>

        <div>
          <label htmlFor="endDate" className="mb-1 block">
            End Date
          </label>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <Calendar
                id="endDate"
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                dateFormat="mm/dd/yy"
                placeholder="MM/DD/YYYY"
                className={`no-border w-full ${errors.endDate ? "p-invalid" : ""}`}
              />
            )}
          />
          {errors.endDate && (
            <small className="p-error">{errors.endDate.message}</small>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="from" className="mb-1 block">
            From Time
          </label>
          <InputText
            id="from"
            {...register("from")}
            className={`w-full ${errors.from ? "p-invalid" : ""}`}
            placeholder="HH:MM"
          />
          {errors.from && (
            <small className="p-error">{errors.from.message}</small>
          )}
        </div>

        <div>
          <label htmlFor="till" className="mb-1 block">
            Till Time
          </label>
          <InputText
            id="till"
            {...register("till")}
            className={`w-full ${errors.till ? "p-invalid" : ""}`}
            placeholder="HH:MM"
          />
          {errors.till && (
            <small className="p-error">{errors.till.message}</small>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="venueName" className="mb-1 block">
          Venue Name
        </label>
        <InputText
          id="venueName"
          {...register("venueName")}
          className={`w-full ${errors.venueName ? "p-invalid" : ""}`}
          placeholder="Venue Name"
        />
        {errors.venueName && (
          <small className="p-error">{errors.venueName.message}</small>
        )}
      </div>

      <div>
        <label htmlFor="fullAddress" className="mb-1 block">
          Full Address
        </label>
        <InputText
          id="fullAddress"
          {...register("fullAddress")}
          className={`w-full ${errors.fullAddress ? "p-invalid" : ""}`}
          placeholder="Full Address"
        />
        {errors.fullAddress && (
          <small className="p-error">{errors.fullAddress.message}</small>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="location" className="mb-1 block">
            Location
          </label>
          <InputText
            id="location"
            {...register("location")}
            className={`w-full ${errors.location ? "p-invalid" : ""}`}
            placeholder="Location"
          />
          {errors.location && (
            <small className="p-error">{errors.location.message}</small>
          )}
        </div>
        <div>
          <label htmlFor="city" className="mb-1 block">
            City
          </label>
          <InputText
            id="city"
            {...register("city")}
            className={`w-full ${errors.city ? "p-invalid" : ""}`}
            placeholder="City"
          />
          {errors.city && (
            <small className="p-error">{errors.city.message}</small>
          )}
        </div>

        <div>
          <label htmlFor="state" className="mb-1 block">
            State
          </label>
          <InputText
            id="state"
            {...register("state")}
            className={`w-full ${errors.state ? "p-invalid" : ""}`}
            placeholder="State"
          />
          {errors.state && (
            <small className="p-error">{errors.state.message}</small>
          )}
        </div>

        <div>
          <label htmlFor="zipCode" className="mb-1 block">
            ZIP Code
          </label>
          <InputText
            id="zipCode"
            {...register("zipCode")}
            className={`w-full ${errors.zipCode ? "p-invalid" : ""}`}
            placeholder="ZIP Code"
          />
          {errors.zipCode && (
            <small className="p-error">{errors.zipCode.message}</small>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <Controller
          name="rsvp"
          control={control}
          render={({ field }) => (
            <Checkbox
              inputId="rsvp"
              checked={field.value || false}
              onChange={(e) => field.onChange(e.checked)}
              className={errors.rsvp ? "p-invalid" : ""}
            />
          )}
        />
        <label htmlFor="rsvp" className="ml-2">
          RSVP Required
        </label>
      </div>

      <div>
        <label htmlFor="guests" className="mb-1 block">
          Guests
        </label>
        <Controller
          name="guests"
          control={control}
          render={({ field }) => (
            <MultiSelect
              itemTemplate={(option) => {
                if (option === undefined) {
                  return null
                }
                const hexColor = stringToHexColor(option.value)
                return (
                  <div className="flex w-full items-center gap-2">
                    <div
                      className={cn(
                        "mr-2 flex h-8 w-8 items-center justify-center rounded-full text-white"
                      )}
                      style={{ backgroundColor: hexColor }}
                    >
                      {option.label[0]}
                    </div>
                    <div className="flex-grow">{option.label}</div>
                    {field.value?.some(
                      (selected) => selected.guestId === option.value
                    ) ? (
                      <Check className="text-green-500" />
                    ) : (
                      <Plus />
                    )}
                  </div>
                )
              }}
              chip
              selectedItemTemplate={(value, onRemove) => {
                // if (!option) {
                //   return null;
                // }
                return (
                  <div className="my-auto flex items-center gap-1 rounded-full border bg-white px-0.5">
                    <div
                      className="size-4 rounded-full"
                      style={{ backgroundColor: stringToHexColor(value.value) }}
                    />
                    <span className="text-sm">{value.label}</span>
                    <i className="pi pi-times cursor-pointer text-xs" />
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
              querying={useGetGuestListQuery_isFetching}
              onQueryChange={(value) => {
                setGuestSearchQ(value)
              }}
              options={
                useGetGuestListQuery_data?.items?.map((guest: any) => ({
                  value: guest.guest_id,
                  label: guest.guest_name,
                })) || []
              }
              value={(field.value ?? []).map((_) => ({
                value: _.guestId,
                label: _.guestLabel,
                raw: null,
              }))}
              setValue={(selectedOptions) => {
                field.onChange(
                  selectedOptions.map((_) => ({
                    guestId: _.value,
                    guestLabel: _.label,
                  }))
                )
              }}
            />
          )}
        />
        {errors.guests &&
          Array.isArray(errors.guests) &&
          errors.guests.map((error: any, index: number) => (
            <small key={index} className="p-error">
              {error.message}
            </small>
          ))}
      </div>

      <div>
        <label htmlFor="attireSuggestion" className="mb-1 block">
          Attire Suggestion
        </label>
        <InputText
          id="attireSuggestion"
          {...register("attireSuggestion")}
          className={`w-full ${errors.attireSuggestion ? "p-invalid" : ""}`}
          placeholder="Attire Suggestion"
        />
        {errors.attireSuggestion && (
          <small className="p-error">{errors.attireSuggestion.message}</small>
        )}
      </div>

      <div>
        <label htmlFor="note" className="mb-1 block">
          Note
        </label>
        <InputTextarea
          id="note"
          {...register("note")}
          className={`w-full ${errors.note ? "p-invalid" : ""}`}
          placeholder="Add a note"
          rows={3}
        />
        {errors.note && (
          <small className="p-error">{errors.note.message}</small>
        )}
      </div>

      <div>
        <label htmlFor="mealPreferences" className="mb-1 block">
          Meal Preferences
        </label>
        <InputText
          {...register("mealPreferences")}
          placeholder="Enter meal preference"
          className={`w-full ${errors.mealPreferences ? "p-invalid" : ""}`}
        />
        {errors.mealPreferences && (
          <small className="p-error">{errors.mealPreferences.message}</small>
        )}
      </div>

      <Button
        type="submit"
        disabled={useAddEventMutation_isLoading}
        className="item-center flex w-full flex-row justify-center gap-2"
      >
        {(useAddEventMutation_isLoading ||
          useUpdateEventMutation_isLoading) && (
          <Loader className="animate-spin" />
        )}
        {!useAddEventMutation_isLoading ? (
          <p>{event ? "Update Event" : "Add Event"}</p>
        ) : (
          <p>{event ? "Updating Event..." : "Adding Event..."}</p>
        )}
      </Button>
    </form>
  )
}
