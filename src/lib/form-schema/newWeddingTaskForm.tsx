import * as yup from "yup"

export const StatusEnum = {
  TODO: "Todo",
  IN_PROGRESS: "Inprogress",
  DONE: "Done",
} as const

type StatusType = (typeof StatusEnum)[keyof typeof StatusEnum]

export const NewTaskFormSchema = yup.object().shape({
  task: yup.string().required("Task is required"),
  category: yup.string().required("Category is required"),
  dateCreated: yup.date().required("Date created is required"),
  status: yup
    .mixed<StatusType>()
    .oneOf(Object.values(StatusEnum), "Invalid status")
    .required("Status is required"),
  // collaborators: yup.array().of(
  //   yup.object().shape({
  //     email: yup.string().email("Invalid email").required("Email is required"),
  //     image: yup.string().url("Invalid image URL"),
  //     uid: yup.string().required("User ID is required"),
  //   })
  // ),
  // reminder: yup.boolean(),
  checklist: yup
    .array()
    .of(
      yup.object().shape({
        text: yup.string().required("Checklist item is required"),
        completed: yup.boolean().default(false),
      })
    )
    .required(),
})

export type NewTaskFormType = yup.InferType<typeof NewTaskFormSchema>
