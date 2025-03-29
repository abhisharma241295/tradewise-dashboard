import * as yup from "yup"
export const GroupFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  guests: yup
    .array()
    .of(
      yup.object().shape({
        guest_name: yup.string().required("Guest name is required"),
        guest_id: yup.string().required("Guest ID is required"),
      })
    )
    .min(1, "Guest is required")
    .required("Guest is required"),
})

export type GroupFormType = yup.InferType<typeof GroupFormSchema>
