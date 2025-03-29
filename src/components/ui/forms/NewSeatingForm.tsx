import React, { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { ArrowLeft, Check, Loader, Plus, XCircle } from "lucide-react"
import { toast } from "sonner"
import {
  SeatingFormSchema,
  SeatingFormType,
} from "@/lib/form-schema/newSeatingForm"
import { useAppSelector } from "@/lib/redux/hooks"
import {
  useAddSeatingMutation,
  useGetSeatingPerEventQuery,
  useUpdateSeatingMutation,
} from "@/lib/redux/features/apis/seatingApi"
import { useGetEventsQuery } from "@/lib/redux/features/apis/eventsApi"
import { InputSwitch } from "primereact/inputswitch"
import { cn } from "@/lib/utils/cn"
import { useGetGuestListQuery } from "@/lib/redux/features/apis/guestApi"
import { stringToHexColor } from "@/lib/utils/stringToHexColorConverter"
import { EVENT_ICONS } from "../commons/InputBoxWithEmoji"
import Image from "next/image"
import { SingleSelect } from "../commons/SingleSelect"
import { MultiSelect } from "../commons/MultiselectorUI"

interface NewSeatingFormProps {
  onClose: () => void
  data?: {
    event_id: string
    name: string
    seating_id: string
    table_info: {
      guests: {
        guest_id: string
        guest_name: string
      }[]
      table_id: string
      table_number: number
    }[]
    total_seats: number
    total_tables: number
  }
}

export default function NewSeatingForm({ onClose, data }: NewSeatingFormProps) {
  const [guestIds, setGuestIds] = useState<string[]>([])
  const {
    data: seatingData,
    isError: seatingError,
    error: seatingFetchError,
  } = useGetSeatingPerEventQuery({ eventId: data?.event_id || "" })
  useEffect(() => {
    if (seatingError) {
      toast.error(
        `Error fetching seating data: ${seatingFetchError || "Unknown error"}`
      )
    }
  }, [seatingError, seatingFetchError])

  const currentWeddingId = useAppSelector(
    (state) => state.currentWedding.currentWeddingId
  )
  const {
    data: eventsData = { events: [] },
    isLoading: eventsLoading,
    isError: eventsError,
    error: eventsFetchError,
  } = useGetEventsQuery(currentWeddingId)
  // let useGetSeatingPerEventQuery_data=undefined
  useEffect(() => {
    if (eventsError) {
      toast.error(
        `Error fetching events: ${eventsFetchError || "Unknown error"}`
      )
    }
  }, [eventsError, eventsFetchError])

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SeatingFormType>({
    resolver: yupResolver(SeatingFormSchema),
    defaultValues: data
      ? {
          total_tables: data.total_tables,
          seat_limit: data.total_seats,
          restrict_limit: false,
          table_info: data.table_info.map((table: any) => ({
            guests: table.guests.map((guest: any) => ({
              guestId: guest.guest_id,
              guestLabel: guest.guest_name,
            })),
          })),
          event: {
            eventId: data.event_id,
            eventName: data.name,
          },
        }
      : undefined,
  })
  useEffect(() => {
    if (seatingData && seatingData.data.seatings) {
      const tableInfo = seatingData.data.seatings[0].table_info.map(
        (table: any) => ({
          guests: table.guests.map((guest: any) => ({
            guestId: guest.guest_id,
            guestLabel: guest.guest_name,
          })),
        })
      )

      setValue("table_info", tableInfo)
    }
  }, [seatingData, data])
  const [addSeatingMutation, { isLoading, isError, error }] =
    useAddSeatingMutation()
  const [
    updateSeatingMutation,
    {
      isLoading: updateSeatingMutation_isLoading,
      isError: updateSeatingMutation_isError,
      error: updateSeatingMutation_error,
    },
  ] = useUpdateSeatingMutation()
  useEffect(() => {
    if (error) toast(`Error Occurred: ${error}`)
  }, [isError, error])

  useEffect(() => {
    if (updateSeatingMutation_error)
      toast(`Error Occurred: ${updateSeatingMutation_error}`)
  }, [updateSeatingMutation_isError, updateSeatingMutation_error])
  const [guestSearchQ, setGuestSearchQ] = React.useState<string>("")
  const eventValue = watch("event")
  // console.log("Current event value:", eventValue);
  const {
    data: useGetGuestListQuery_data,
    isFetching: useGetGuestListQuery_isFetching,
    isError: useGetGuestListQuery_isError,
    error: useGetGuestListQuery_error,
  } = useGetGuestListQuery({
    weddingId: currentWeddingId,
    pagination: {
      page: 1,
      perPage: 20,
      sortDir: "asc",
      search: guestSearchQ,
      eventId: eventValue?.eventId || "",
    },
  })

  useEffect(() => {
    if (useGetGuestListQuery_isError) {
      toast.error(
        `Error fetching guest list: ${useGetGuestListQuery_error || "Unknown error"}`
      )
    }
  }, [useGetGuestListQuery_isError, useGetGuestListQuery_error])

  const onSubmit = async (formData: SeatingFormType) => {
    try {
      let table_info: any = {}
      formData.table_info
        .slice(0, formData.total_tables)
        .forEach((table, index) => {
          table_info[(index + 1).toString()] =
            table.guests?.map((guest) => guest.guestId) || []
        })
      if (data) {
        await updateSeatingMutation({
          eventId: formData.event.eventId,
          seatingId: data.seating_id ?? "",
          data: {
            total_tables: formData.total_tables,
            seat_limit: formData.seat_limit,
            restrict_limit: formData.restrict_limit || false,
            wedding_id: currentWeddingId,
            table_info: table_info,
          },
        })
        toast("Seating updated successfully")
      } else {
        await addSeatingMutation({
          eventId: formData.event.eventId,
          data: {
            total_tables: formData.total_tables,
            seat_limit: formData.seat_limit,
            restrict_limit: formData.restrict_limit || false,
            wedding_id: currentWeddingId,
            table_info: table_info,
          },
        })
        toast("Seating added successfully")
      }
      onClose()
    } catch (error) {
      console.error("Failed to add seating:", error)
      toast(`Error Occurred: ${error}`)
    }
  }

  return (
    <div className="h-full w-full overflow-auto">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-14 items-center px-4">
          <div className="flex flex-1 items-center gap-4">
            <div className="flex items-center gap-2 text-gray-800">
              <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={onClose} />
              <span className="text-xl font-semibold"> Add Seating</span>
            </div>
          </div>
        </div>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        {
          <div>
            <label htmlFor="event" className="mb-1 block">
              Event
            </label>
            <Controller
              name="event"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  querying={eventsLoading || false}
                  value={{
                    label: field.value?.eventName,
                    value: field.value?.eventId,
                    raw: field.value,
                  }}
                  setValue={(e) =>
                    field.onChange({
                      eventName: e?.label,
                      eventId: e?.value,
                    })
                  }
                  options={
                    eventsData?.events?.map((event: any) => ({
                      label: event.event_name,
                      value: event.event_id,
                      raw: event,
                    })) || []
                  }
                  placeholder="Select an event"
                  // className={`w-full ${errors.event ? "p-invalid" : ""}`}
                  itemTemplate={(option) => {
                    return (
                      <div className="custom-dropdown-item flex items-center gap-2">
                        <Image
                          src={
                            EVENT_ICONS[parseInt(option.raw?.eventIcon) || 0]
                          }
                          alt="Event icon"
                          width={20}
                          height={20}
                          className="h-[20px] w-[20px]"
                        />
                        <span className="custom-dropdown-item-label">
                          {option.label}
                        </span>
                      </div>
                    )
                  }}
                  // panelClassName="hide-multiselect-header"
                />
              )}
            />
            {errors.event?.message && (
              <small className="text-red-500">
                {errors.event.message.toString()}
              </small>
            )}
          </div>
        }
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="total_tables" className="mb-1 block">
              Total Tables
            </label>
            <InputText
              id="total_tables"
              type="number"
              {...register("total_tables")}
              className={`w-full ${errors.total_tables ? "p-invalid" : ""}`}
              placeholder="Enter total tables"
            />
            {errors.total_tables && (
              <small className="text-red-500">
                {errors.total_tables.message}
              </small>
            )}
          </div>

          <div className="flex-1">
            <label htmlFor="seat_limit" className="mb-1 block">
              Seat Limit
            </label>
            <InputText
              id="seat_limit"
              type="number"
              {...register("seat_limit")}
              className={`w-full ${errors.seat_limit ? "p-invalid" : ""}`}
              placeholder="Enter seat limit"
            />
            {errors.seat_limit && (
              <small className="text-red-500">
                {errors.seat_limit.message}
              </small>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="restrict_limit">Restrict Limit</label>
          <Controller
            name="restrict_limit"
            control={control}
            render={({ field }) => (
              <InputSwitch
                className={errors.restrict_limit ? "p-invalid" : ""}
                checked={field.value || false}
                onChange={(e) => {
                  if (e.value) {
                    const seatLimit = watch("seat_limit")
                    const tableInfo = watch("table_info") || []
                    const tablesExceedingLimit = tableInfo
                      .map((table: any, index: number) => ({
                        tableNum: index + 1,
                        guestCount: (table?.guests || []).length,
                      }))
                      .filter((table: any) => table.guestCount > seatLimit)

                    if (tablesExceedingLimit.length > 0) {
                      const tableList = tablesExceedingLimit
                        .map(
                          (t) => `Table ${t.tableNum} (${t.guestCount} guests)`
                        )
                        .join(", ")
                      toast.error(
                        `Cannot enable seat limit restriction. Following tables exceed the limit of ${seatLimit}: ${tableList}`
                      )
                      return
                    }
                  }
                  field.onChange(e.value)
                }}
              />
            )}
          />
        </div>

        {Array.from({ length: watch("total_tables") || 0 }).map((_, index) => (
          <div key={index}>
            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  htmlFor={`table_info.${index}.guests`}
                  className="mb-1 block"
                >
                  Table {index + 1}
                </label>
                <Controller
                  name={`table_info.${index}.guests`}
                  control={control}
                  render={({ field }) => {
                    return (
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
                          return (
                            <div className="my-auto flex items-center gap-1 rounded-full border bg-white px-0.5">
                              <div
                                className="size-4 rounded-full"
                                style={{
                                  backgroundColor: stringToHexColor(
                                    value.value
                                  ),
                                }}
                              />
                              <span className="text-sm">{value.label}</span>
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
                          useGetGuestListQuery_data?.items
                            ?.filter(
                              (guest: any) => !guestIds.includes(guest.guest_id)
                            )
                            .map((guest: any) => ({
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
                          const selectedUserIds = selectedOptions.map(
                            (option) => option.value
                          )

                          const restrictLimit = watch("restrict_limit")
                          const seatLimit = watch("seat_limit")

                          if (
                            restrictLimit &&
                            selectedOptions.length > seatLimit
                          ) {
                            toast.error(
                              `Cannot add more than ${seatLimit} guests per table when seat limit is restricted`
                            )
                            return
                          }

                          setGuestIds(selectedUserIds)
                          field.onChange(
                            selectedOptions.map((_) => ({
                              guestId: _.value,
                              guestLabel: _.label,
                            }))
                          )
                        }}
                        placeholder="Select Guests"
                      />
                    )
                  }}
                />
                {errors.table_info?.[index]?.guests && (
                  <small className="text-red-500">
                    {errors.table_info[index].guests.message}
                  </small>
                )}
              </div>
            </div>
          </div>
        ))}

        <Button
          type="submit"
          className="flex w-full items-center justify-center gap-2"
        >
          {(isLoading || updateSeatingMutation_isLoading) && (
            <Loader className="animate-spin" />
          )}
          {!(isLoading || updateSeatingMutation_isLoading) ? (
            <p>{!data ? "Add" : "Update"} Seating</p>
          ) : (
            <p>{!data ? "Adding" : "Updating"} Seating...</p>
          )}
        </Button>
      </form>
    </div>
  )
}
