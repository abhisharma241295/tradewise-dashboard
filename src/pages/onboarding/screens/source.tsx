import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"
import { cn } from "@/lib/utils/cn"
import { InputText } from "primereact/inputtext"
import Button from "@/components/ui/Button"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { Checkbox } from "primereact/checkbox"
import ValidationError from "@/components/ui/ValidationError"
import { setSource } from "@/lib/redux/features/ui/onboardingData"
import { moveNext } from "@/lib/redux/features/ui/slider-page-onboarding/OnboardingSliderPageSlice"
import { sendOnboardingData } from "@/lib/auth/authApis"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

const schema = yup.object().shape({
  source: yup.string(),
  other: yup.string().when("source", {
    is: (source: string | undefined) => !source,
    then: () =>
      yup.string().required("Please specify the source if 'Other' is selected"),
    otherwise: () => yup.string().notRequired(),
  }),
})

type FormData = yup.InferType<typeof schema>

const sources = ["Instagram", "Facebook", "TikTok"]

export default function SourcePage() {
  const dispatch = useAppDispatch()
  const [errorMessage, setErrorMessage] = useState<string>("")

  const email = useAppSelector((value) => value.auth.userEmail)
  const city = useAppSelector((value) => value.onboardingDataReducer.city)
  const state = useAppSelector((value) => value.onboardingDataReducer.state)
  const designation = useAppSelector(
    (value) => value.onboardingDataReducer.designation
  )
  const purpose = useAppSelector((value) => value.onboardingDataReducer.purpose)

  const sendOnboardingDataMutation = useMutation({
    mutationFn: async (source: string) => {
      await sendOnboardingData({
        email: email || "",
        city: city || "",
        state: state || "",
        designation: designation || "",
        purpose: purpose || "",
        source: source || "",
      })
    },
    onSuccess: () => {
      setTimeout(() => {
        dispatch(moveNext())
      }, 2000)
    },
    onError: (error: any) => {
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      )
    },
  })

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  })

  const onSubmit = (data: FormData) => {
    const sourceValue = data.source || data.other || ""
    dispatch(setSource(sourceValue))
    sendOnboardingDataMutation.mutate(sourceValue)
  }
  return (
    <div className="m-auto flex h-full w-full max-w-lg flex-col">
      <span className="mb-6 mt-8 text-4xl text-foreground">
        Final question! Where did you hear about us?
      </span>
      <form onSubmit={handleSubmit(onSubmit)} className="text-start">
        <div className="mx-2 mb-5 mt-2 flex flex-col gap-2">
          <Controller
            control={control}
            name="source"
            render={({ field }) => (
              <>
                {sources.map((source, index) => (
                  <div key={index} className="flex items-center">
                    <Checkbox
                      inputId={`source${index + 1}`}
                      name={field.name}
                      value={source}
                      onChange={(e) =>
                        field.onChange(e.checked ? source : null)
                      }
                      checked={field.value === source}
                    />
                    <label htmlFor={`source${index + 1}`} className="ml-2">
                      {source}
                    </label>
                  </div>
                ))}
              </>
            )}
          />
          <label className="mt-3">Other Source:</label>
          <InputText
            {...register("other")}
            id="other"
            className={cn(errors.other && "p-invalid")}
            placeholder="Please specify"
            aria-describedby="other-error"
          />
          {errors.other && (
            <ValidationError
              className="!justify-start"
              error={errors.other.message ?? "Unknown error"}
            />
          )}
        </div>
        {errorMessage && (
          <div className="mb-4 text-sm text-red-500">{errorMessage}</div>
        )}
        <Button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid || sendOnboardingDataMutation.isPending}
          loading={sendOnboardingDataMutation.isPending}
          className="w-full font-semibold"
          size="lg"
        >
          Continue
        </Button>
      </form>
    </div>
  )
}
