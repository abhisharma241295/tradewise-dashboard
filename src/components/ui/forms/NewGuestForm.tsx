import React, { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { ArrowLeft, Check, Loader, Plus, XCircle } from "lucide-react"
import { toast } from "sonner"
import { GuestFormSchema, GuestFormType } from "@/lib/form-schema/newGuestForm"
import { useAppSelector } from "@/lib/redux/hooks"
import { guestApi } from "@/lib/redux/features/apis/guestApi"
import { InputSwitch } from "primereact/inputswitch"
import { useGetWeddingsQuery } from "@/lib/redux/features/apis/weddingApi"
import { useGetEventsQuery } from "@/lib/redux/features/apis/eventsApi"
import Image from "next/image"
import { EVENT_ICONS } from "../commons/InputBoxWithEmoji"
import { MultiSelect } from "../commons/MultiselectorUI"
import { SingleSelect } from "../commons/SingleSelect"
import { getWeddingInfo } from "@/lib/utils/weddingUtil"
interface NewGuestFormProps {
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

export default function NewGuestForm({ onClose, data }: NewGuestFormProps) {
  // console.log(data.events)
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<GuestFormType>({
    resolver: yupResolver(GuestFormSchema),
    defaultValues: data
      ? {
          name: data.name,
          email: data.contact.email,
          phone: data.contact.phone,
          relation: data.rawData.guest_belongs_to,
          event: data.events.map(
            (_: {
              event_id: string
              event_name: string
              icon_id: string | null
            }) => ({
              eventId: _.event_id,
              eventName: _.event_name,
              iconId: _.icon_id,
            })
          ),
          rsvp: data.rsvpStatus === "Coming",
          plusOne: data.rawData.plus_one,
          address: {
            address: data.rawData.address,
            city: data.rawData.city,
            state: data.rawData.state,
            country: data.rawData.country,
            zipCode: data.rawData.zip_code,
          },
        }
      : undefined,
  })
  const currentWeddingId = useAppSelector(
    (state) => state.currentWedding.currentWeddingId
  )
  const { data: weddings } = useGetWeddingsQuery(undefined)
  const { data: eventsData = { events: [] }, isError: eventsError } =
    useGetEventsQuery(currentWeddingId)

  const [addGuestMutation, { isLoading, isError, error }] =
    guestApi.useAddGuestMutation()
  const [
    updateGuestMutation,
    {
      isLoading: updateGuestMutation_isLoading,
      isError: updateGuestMutation_isError,
      error: updateGuestMutation_error,
    },
  ] = guestApi.useUpdateGuestMutation()

  const [currentCouple, setCurrentCouple] = useState<
    { label: string; value: any }[]
  >([])
  useEffect(() => {
    if (eventsError) {
      // toast(`Error Occured: ${eventsError}`);
      setError("event", { type: "manual", message: "Failed to load events" })
    }
  }, [eventsError, setError])
  useEffect(() => {
    if (error) toast(`Error Occured:${error}`)
  }, [isError, error])

  useEffect(() => {
    if (updateGuestMutation_error)
      toast(`Error Occured:${updateGuestMutation_error}`)
  }, [updateGuestMutation_isError, updateGuestMutation_error])

  useEffect(() => {
    const foundWedding = getWeddingInfo(weddings, currentWeddingId)
    if (foundWedding)
      setCurrentCouple([
        {
          label: `${foundWedding.couple[0].first_name} ${foundWedding.couple[0].last_name}`,
          value: `${foundWedding.couple[0].first_name} ${foundWedding.couple[0].last_name}`,
        },
        {
          label: `${foundWedding.couple[1].first_name} ${foundWedding.couple[1].last_name}`,
          value: `${foundWedding.couple[1].first_name} ${foundWedding.couple[1].last_name}`,
        },
      ])
  }, [currentWeddingId, weddings])

  const onSubmit = async (_data: GuestFormType) => {
    try {
      if (data) {
        await updateGuestMutation({
          weddingId: currentWeddingId,
          guestId: data.rawData.guest_id,
          guestData: {
            guest_name: _data.name,
            contact_number: _data.phone,
            guest_belongs_to: _data.relation,
            email: _data.email,
            rsvp: _data.rsvp || false,
            plus_one: _data.plusOne || false,
            address: _data.address.address,
            city: _data.address.city,
            state: _data.address.state,
            zip_code: _data.address.zipCode,
            country: _data.address.country,
            events: _data.event.map((_) => _.eventId),
          },
        })
      } else {
        await addGuestMutation({
          weddingId: currentWeddingId,
          guestData: {
            guest_name: _data.name,
            contact_number: _data.phone,
            guest_belongs_to: _data.relation,
            email: _data.email,
            rsvp: _data.rsvp || false,
            plus_one: _data.plusOne || false,
            address: _data.address.address,
            city: _data.address.city,
            state: _data.address.state,
            zip_code: _data.address.zipCode,
            country: _data.address.country,
            events: _data.event.map((_) => _.eventId),
          },
        })
      }

      onClose()
    } catch (error) {
      toast(`Error: ${error}`)
    }
  }

  return (
    <div className="mx-auto max-w-2xl overflow-auto">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-14 items-center px-4">
          <div className="flex flex-1 items-center gap-4">
            <div className="flex cursor-pointer items-center gap-2 text-gray-800">
              <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={onClose} />
              <span className="text-xl font-semibold"> Guest Details</span>
            </div>
          </div>
        </div>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-4">
        <div>
          <label htmlFor="name" className="mb-1 block">
            Name
          </label>
          <InputText
            id="name"
            {...register("name")}
            className={`w-full ${errors.name ? "p-invalid" : ""}`}
            placeholder="Enter name"
          />
          {errors.name && (
            <small className="text-red-500">{errors.name.message}</small>
          )}
        </div>
        <div>
          <label htmlFor="event" className="mb-1 block">
            Event
          </label>
          <Controller
            name="event"
            control={control}
            render={({ field }) => (
              <MultiSelect
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
                    <Image
                      src={EVENT_ICONS[parseInt(option.raw.event_icon_id) || 0]}
                      alt="Event icon"
                      width={20}
                      height={20}
                      className="h-[20px] w-[20px]"
                    />
                    <span className="custom-dropdown-item-label">
                      {option.label}
                    </span>
                  </div>
                )}
                options={(eventsData?.events ?? []).map((event: any) => ({
                  value: event.event_id,
                  label: event.event_name,
                  raw: event,
                }))}
                value={(field.value ?? []).map((event) => {
                  // if (typeof event === "string") {
                  //   const foundEvent = eventsData?.events.find(
                  //     (e: any) => e.event_id === event
                  //   )
                  //   return {
                  //     value: foundEvent?.event_id,
                  //     label: foundEvent?.event_name,
                  //     raw: foundEvent,
                  //   }
                  // }
                  return {
                    value: event.eventId,
                    label: event.eventName,
                    raw: event,
                  }
                })}
                setValue={(selectedOptions) =>
                  field.onChange(
                    selectedOptions.map((option) => ({
                      eventName: option.label,
                      eventId: option.value,
                      eventIcon: option.raw.event_icon_id ?? null,
                    }))
                  )
                }
              />
            )}
          />
          {errors.event && (
            <small className="text-red-500">{errors.event.message}</small>
          )}
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="" className="mb-1 block">
              Email
            </label>
            <InputText
              id="email"
              {...register("email")}
              className={`w-full ${errors.email ? "p-invalid" : ""}`}
              placeholder="Enter email"
            />
            {errors.email && (
              <small className="text-red-500">{errors.email.message}</small>
            )}
          </div>

          <div className="flex-1">
            <label htmlFor="phone" className="mb-1 block">
              Phone
            </label>
            <InputText
              id="phone"
              type="number"
              {...register("phone")}
              className={`w-full ${errors.phone ? "p-invalid" : ""}`}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <small className="text-red-500">{errors.phone.message}</small>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="guest_belongs_to" className="mb-1 block">
            Guest Belongs to
          </label>
          <Controller
            name="relation"
            control={control}
            render={({ field }) => (
              <SingleSelect
                itemTemplate={(option) => {
                  return (
                    <div className="custom-dropdown-item flex w-full items-center justify-between gap-2 whitespace-nowrap">
                      <div className="w-min rounded-full border border-pink-500 px-2 py-0.5 text-sm text-gray-700">
                        {option.label}
                      </div>
                      <div className="ml-auto">
                        {field.value?.includes(option.value) ? (
                          <Check className="text-green-500" />
                        ) : (
                          <Plus />
                        )}
                      </div>
                    </div>
                  )
                }}
                options={currentCouple.map((option) => ({
                  label: option.label,
                  value: option.value,
                  raw: undefined,
                }))}
                value={{
                  label: field.value,
                  value: field.value,
                  raw: undefined,
                }}
                setValue={(e) => field.onChange(e ? e.value : null)}
              />
            )}
          />
          {errors.relation && (
            <small className="p-error">{errors.relation.message}</small>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="address" className="mb-1 block">
              Address
            </label>
            <InputText
              id="address"
              {...register("address.address")}
              className={`w-full ${errors.address?.address ? "p-invalid" : ""}`}
              placeholder="Enter address"
            />
            {errors.address?.address && (
              <small className="text-red-500">
                {errors.address.address.message}
              </small>
            )}
          </div>
          <div>
            <label htmlFor="city" className="mb-1 block">
              City
            </label>
            <InputText
              id="city"
              {...register("address.city")}
              className={`w-full ${errors.address?.city ? "p-invalid" : ""}`}
              placeholder="Enter city"
            />
            {errors.address?.city && (
              <small className="text-red-500">
                {errors.address.city.message}
              </small>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="state" className="mb-1 block">
              State
            </label>
            <InputText
              id="state"
              {...register("address.state")}
              className={`w-full ${errors.address?.state ? "p-invalid" : ""}`}
              placeholder="Enter state"
            />
            {errors.address?.state && (
              <small className="text-red-500">
                {errors.address.state.message}
              </small>
            )}
          </div>
          <div>
            <label htmlFor="country" className="mb-1 block">
              Country
            </label>
            <InputText
              id="country"
              {...register("address.country")}
              className={`w-full ${errors.address?.country ? "p-invalid" : ""}`}
              placeholder="Enter country"
            />
            {errors.address?.country && (
              <small className="text-red-500">
                {errors.address.country.message}
              </small>
            )}
          </div>
          <div>
            <label htmlFor="zipCode" className="mb-1 block">
              Zip Code
            </label>
            <InputText
              id="zipCode"
              {...register("address.zipCode")}
              className={`w-full ${errors.address?.zipCode ? "p-invalid" : ""}`}
              placeholder="Enter zip code"
            />
            {errors.address?.zipCode && (
              <small className="text-red-500">
                {errors.address.zipCode.message}
              </small>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="rsvp">RSVP</label>
          <Controller
            name="rsvp"
            control={control}
            render={({ field }) => (
              <InputSwitch
                className={errors.rsvp ? "p-invalid" : ""}
                checked={field.value || false}
                onChange={(e) => field.onChange(e.value)}
              />
            )}
          />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="plusOne">Plus One</label>
          <Controller
            name="plusOne"
            control={control}
            render={({ field }) => (
              <InputSwitch
                className={errors.rsvp ? "p-invalid" : ""}
                checked={field.value || false}
                onChange={(e) => field.onChange(e.value)}
              />
            )}
          />
        </div>

        <Button
          type="submit"
          className="flex w-full items-center justify-center gap-2"
        >
          {(isLoading || updateGuestMutation_isLoading) && (
            <Loader className="animate-spin" />
          )}
          {!(isLoading || updateGuestMutation_isLoading) ? (
            <p>{!data ? "Add" : "Update"} Guest</p>
          ) : (
            <p>{!data ? "Adding" : "Updating"} Guest...</p>
          )}
        </Button>
      </form>
    </div>
  )
}
