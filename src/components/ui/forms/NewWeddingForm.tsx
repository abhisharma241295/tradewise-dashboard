import React from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { InputText } from "primereact/inputtext"
import { Calendar } from "primereact/calendar"
import { Button } from "primereact/button"
import {
  NewWeddingFormSchema,
  NewWeddingType,
  SerializeWedding,
} from "@/lib/form-schema/newWeddingForm"
import { ArrowLeft, Loader } from "lucide-react"
import {
  useAddWeddingMutation,
  useUpdateWeddingMutation,
} from "@/lib/redux/features/apis/weddingApi"
import ValidationError from "../ValidationError"
import { toast } from "sonner"
import ImageUploadView from "../commons/ImageUploadView"
import { cn } from "@/lib/utils/cn"
import { stringToHexColor } from "@/lib/utils/stringToHexColorConverter"
import { useAppSelector } from "@/lib/redux/hooks"
import { getCurrentWedding } from "@/lib/cookies/currentWeddingCookie"

interface WeddingFormProps {
  onClose: () => void
  data?: NewWeddingType
}
export default function WeddingForm({ onClose, data }: WeddingFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<NewWeddingType>({
    resolver: yupResolver(NewWeddingFormSchema),
    defaultValues: data,
  })
  const currentWeddingId =
    useAppSelector((state) => state.currentWedding.currentWeddingId) ||
    getCurrentWedding()

  const [
    addWedding,
    {
      isLoading: useAddWeddingMutation_isLoading,
      isError: useAddWeddingMutation_isError,
      error: useAddWeddingMutation_error,
    },
  ] = useAddWeddingMutation()
  const [
    updateWedding,
    {
      isLoading: useUpdateWeddingMutation_isLoading,
      isError: useUpdateWeddingMutation_isError,
      error: useUpdateWeddingMutation_error,
    },
  ] = useUpdateWeddingMutation()

  const onSubmit = async (formData: NewWeddingType) => {
    try {
      if (data) {
        await updateWedding({
          data: {
            ...SerializeWedding(formData),
            wedding_date: formData.weddingDate.toISOString().split("T")[0],
          },
          weddingId: currentWeddingId,
        }).unwrap()
        toast.success("Wedding updated successfully!")
        onClose()
      } else {
        await addWedding({
          data: {
            ...SerializeWedding(formData),
            wedding_date: formData.weddingDate.toISOString().split("T")[0],
          },
        }).unwrap()
        toast.success("Wedding added successfully!")
        onClose()
      }
    } catch (error: any) {
      const errorMessage =
        error?.toString() || "An error occurred while saving the wedding"
      toast.error(errorMessage)
    }
  }

  const fullName = `${watch("groomFirstName") || ""}${watch("groomLastName") || ""}${watch("brideFirstName") || ""}${watch("brideLastName") || ""}`
  const coupleInitials =
    `${(watch("groomFirstName") || "")[0] || ""}${(watch("brideFirstName") || "")[0] || ""}`.toUpperCase()
  const bgColorFromFullCoupleName = stringToHexColor(fullName)
  const imageUrl = watch("imageUrl")

  return (
    <div className="mx-auto max-w-2xl overflow-auto">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-14 items-center px-4">
          <div className="flex flex-1 items-center gap-4">
            <div className="flex items-center gap-2 text-gray-800">
              <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={onClose} />
              {data ? (
                <span className="text-xl font-semibold">Edit wedding</span>
              ) : (
                <span className="text-xl font-semibold">Add a wedding</span>
              )}
            </div>
          </div>
        </div>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        <div className="flex justify-center">
          <Controller
            control={control}
            name="imageUrl"
            render={({ field }) => (
              <ImageUploadView
                url={field.value}
                placeholder={
                  coupleInitials.length !== 0 &&
                  (!imageUrl || imageUrl?.length > 0) ? (
                    <div
                      className={cn(
                        "flex size-24 cursor-pointer items-center justify-center rounded-full"
                      )}
                      style={{ backgroundColor: bgColorFromFullCoupleName }}
                    >
                      <span className="text-2xl text-white">
                        {coupleInitials}
                      </span>
                    </div>
                  ) : null
                }
                onChangeUrl={(url) => {
                  field.onChange(url)
                  console.log("Image URL changed:", url)
                }}
                onError={(error) => {
                  toast(`Image upload didn't went successful.`)
                  console.error("Image upload error:", error)
                }}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="groomFirstName" className="mb-1 block">
              {"First Person's First Name"}
            </label>
            <InputText
              id="groomFirstName"
              {...register("groomFirstName")}
              className={`w-full ${errors.groomFirstName ? "p-invalid" : ""}`}
              placeholder="First Name"
            />
            {errors.groomFirstName && (
              <small className="p-error">{errors.groomFirstName.message}</small>
            )}
          </div>
          <div>
            <label htmlFor="groomLastName" className="mb-1 block">
              {"First Person's Last Name"}
            </label>
            <InputText
              id="groomLastName"
              {...register("groomLastName")}
              className={`w-full ${errors.groomLastName ? "p-invalid" : ""}`}
              placeholder="Last Name"
            />
            {errors.groomLastName && (
              <small className="p-error">{errors.groomLastName.message}</small>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="brideFirstName" className="mb-1 block">
              {"Second Person's First Name"}
            </label>
            <InputText
              id="brideFirstName"
              {...register("brideFirstName")}
              className={`w-full ${errors.brideFirstName ? "p-invalid" : ""}`}
              placeholder="First Name"
            />
            {errors.brideFirstName && (
              <small className="p-error">{errors.brideFirstName.message}</small>
            )}
          </div>
          <div>
            <label htmlFor="brideLastName" className="mb-1 block">
              {"Second Person's Last Name"}
            </label>
            <InputText
              id="brideLastName"
              {...register("brideLastName")}
              className={`w-full ${errors.brideLastName ? "p-invalid" : ""}`}
              placeholder="Last Name"
            />
            {errors.brideLastName && (
              <small className="p-error">{errors.brideLastName.message}</small>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="weddingDate" className="mb-1 block">
            Wedding Date
          </label>
          <Controller
            name="weddingDate"
            control={control}
            render={({ field }) => (
              <Calendar
                id="weddingDate"
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                dateFormat="mm/dd/yy"
                placeholder="MM/DD/YYYY"
                className={`w-full ${errors.weddingDate ? "p-invalid" : ""}`}
              />
            )}
          />
          {errors.weddingDate && (
            <small className="p-error">{errors.weddingDate.message}</small>
          )}
        </div>

        <div>
          <label htmlFor="weddingLocation" className="mb-1 block">
            Wedding Location
          </label>
          <InputText
            id="weddingLocation"
            {...register("weddingLocation")}
            className={`w-full ${errors.weddingLocation ? "p-invalid" : ""}`}
            placeholder="Wedding Location"
          />

          {errors.weddingLocation && (
            <small className="p-error">{errors.weddingLocation.message}</small>
          )}
        </div>

        <div>
          <label htmlFor="weddingBudget" className="mb-1 block">
            Wedding Budget
          </label>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">$</span>
            <InputText
              id="weddingBudget"
              type="number"
              {...register("weddingBudget")}
              className={`w-full !rounded-l-none ${errors.weddingBudget ? "p-invalid" : ""}`}
              placeholder="Budget"
            />
          </div>
          {errors.weddingBudget && (
            <small className="p-error">{errors.weddingBudget.message}</small>
          )}
        </div>
        {/* Error Display Section */}
        {(useAddWeddingMutation_isError ||
          useUpdateWeddingMutation_isError) && (
          <ValidationError
            error={(
              useAddWeddingMutation_error ||
              useUpdateWeddingMutation_error ||
              JSON.stringify(
                useAddWeddingMutation_error || useUpdateWeddingMutation_error
              ) ||
              "An error occurred while saving the wedding"
            ).toString()}
          />
        )}
        <Button
          type="submit"
          disabled={
            useAddWeddingMutation_isLoading ||
            useUpdateWeddingMutation_isLoading
          }
          className="item-center flex w-full flex-row justify-center gap-2"
        >
          {(useAddWeddingMutation_isLoading ||
            useUpdateWeddingMutation_isLoading) && (
            <Loader className="animate-spin" />
          )}
          {!useAddWeddingMutation_isLoading &&
          !useUpdateWeddingMutation_isLoading ? (
            <p>{data ? "Update Wedding" : "Add Wedding"}</p>
          ) : (
            <p>{data ? "Updating Wedding..." : "Adding Wedding..."}</p>
          )}
        </Button>
      </form>
    </div>
  )
}
