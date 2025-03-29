import * as yup from "yup"

export const rsvpEventFormSchema = yup.object().shape({
  eventName: yup.string().required("Event name is required"),
  startDate: yup.date().required("Start date is required").nullable(),
  endDate: yup
    .date()
    .required("End date is required")
    .nullable()
    .min(yup.ref("startDate"), "End date must be after start date"),
  from: yup
    .string()
    .required("From time is required")
    .matches(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Time must be in HH:mm format"
    ),
  till: yup
    .string()
    .required("Till time is required")
    .matches(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Time must be in HH:mm format"
    )
    .test(
      "is-after-from",
      "End time must be after start time",
      function (till) {
        const { from, startDate, endDate } = this.parent
        if (!till || !from || !startDate || !endDate) return true

        const startDateTime = new Date(startDate)
        const endDateTime = new Date(endDate)

        const [fromHours, fromMinutes] = from.split(":").map(Number)
        const [tillHours, tillMinutes] = till.split(":").map(Number)

        startDateTime.setHours(fromHours, fromMinutes)
        endDateTime.setHours(tillHours, tillMinutes)

        return endDateTime > startDateTime
      }
    ),
  venueName: yup.string().required("Venue name is required"),
  fullAddress: yup.string().required("Full address is required"),
  location: yup.string().required("Location is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("state is required"),
  zipCode: yup.string().required("ZIP code is required"),
  rsvp: yup.boolean(),
  guests: yup.array().of(
    yup.object().shape({
      guestId: yup.string().required("Guest ID is required"),
      guestLabel: yup.string().required("Guest name is required"),
    })
  ),
  attireSuggestion: yup.string(),
  note: yup.string().max(250, "Note cannot exceed 250 characters"),
  mealPreferences: yup.string(),
})

export type RsvpEventFormType = yup.InferType<typeof rsvpEventFormSchema>
