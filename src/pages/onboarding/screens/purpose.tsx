import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"
import Button from "@/components/ui/Button"
import { useAppDispatch } from "@/lib/redux/hooks"
// import { moveNext } from "@/lib/redux/features/ui/slider-page-onboarding/OnboardingSliderPageSlice"
// import { setPurpose } from "@/lib/redux/features/ui/onboardingData"
import { Checkbox } from "primereact/checkbox"
import ValidationError from "@/components/ui/ValidationError"
import { setPurpose } from "@/lib/redux/features/ui/onboardingData"
import { moveNext } from "@/lib/redux/features/ui/slider-page-onboarding/OnboardingSliderPageSlice"

const schema = yup.object().shape({
  purpose: yup.string().required("Purpose is required"),
})

type FormData = yup.InferType<typeof schema>

const purposes = ["Organize Events", "Attend Events", "Both"]

export default function Purpose() {
  const dispatch = useAppDispatch()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
    dispatch(setPurpose(data.purpose))
    dispatch(moveNext())
  }

  return (
    <div className="m-auto flex h-full w-full max-w-lg flex-col">
      <strong className="mb-6 mt-8 text-4xl text-foreground">
        Purpose for using Eventistries
      </strong>
      <form onSubmit={handleSubmit(onSubmit)} className="text-start">
        <label>You want to use this platform for</label>
        <div className="mx-2 mb-5 mt-2 flex flex-col gap-2">
          <Controller
            control={control}
            name="purpose"
            render={({ field }) => (
              <>
                {purposes.map((purpose, index) => (
                  <div key={index} className="flex items-center">
                    <Checkbox
                      inputId={`purpose${index + 1}`}
                      name={field.name}
                      value={purpose}
                      onChange={(e) =>
                        field.onChange(e.checked ? purpose : null)
                      }
                      checked={field.value === purpose}
                    />
                    <label htmlFor={`purpose${index + 1}`} className="ml-2">
                      {purpose}
                    </label>
                  </div>
                ))}
              </>
            )}
          />
        </div>
        {errors.purpose && (
          <ValidationError
            className="!justify-start"
            error={errors.purpose.message ?? "Unknown error"}
          />
        )}
        <Button type="submit" className="w-full font-semibold" size="lg">
          Proceed
        </Button>
      </form>
    </div>
  )
}
