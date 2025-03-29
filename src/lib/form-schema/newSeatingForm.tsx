import * as yup from "yup"

export const SeatingFormSchema = yup.object().shape({
  total_tables: yup
    .number()
    .transform((value, originalValue) =>
      typeof originalValue === "string" && originalValue.trim() === ""
        ? null
        : value
    )
    .nullable()
    .integer()
    .positive()
    .required("Total tables is required"),
  seat_limit: yup
    .number()
    .transform((value, originalValue) =>
      typeof originalValue === "string" && originalValue.trim() === ""
        ? null
        : value
    )
    .nullable()
    .integer()
    .positive()
    .required("Seat limit is required"),
  restrict_limit: yup.boolean(),
  table_info: yup
    .array()
    .of(
      yup.object().shape({
        guests: yup.array().of(
          yup.object().shape({
            guestId: yup.string().required("Guest ID is required"),
            guestLabel: yup.string().required("Guest name is required"),
          })
        ),
      })
    )
    .required("Table info is required"),
  event: yup
    .object()
    .shape({
      eventName: yup.string().required("Event name is required"),
      eventId: yup.string().required("Event ID is required"),
      eventIcon: yup.string().nullable().default(null),
    })
    .required("Event is required"),
})

export type SeatingFormType = yup.InferType<typeof SeatingFormSchema>
