import * as yup from "yup"

export const newCollabFormSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  password: yup.string().required("Password is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be a valid Email"),
})

export type NewCollabFormType = yup.InferType<typeof newCollabFormSchema>
