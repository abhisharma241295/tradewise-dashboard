import * as yup from "yup"
export const GuestFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  event: yup
    .array()
    .of(
      yup.object().shape({
        eventName: yup.string().required("Event name is required"),
        eventId: yup.string().required("Event ID is required"),
        eventIcon: yup.string().nullable().default(null),
      })
    )
    .default([]),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  relation: yup.string().required("Relation is required"),
  address: yup.object().shape({
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    country: yup.string().required("Country is required"),
    zipCode: yup.string().required("Zip code is required"),
  }),
  rsvp: yup.boolean(),
  plusOne: yup.boolean(),
})
export type GuestFormType = yup.InferType<typeof GuestFormSchema>
