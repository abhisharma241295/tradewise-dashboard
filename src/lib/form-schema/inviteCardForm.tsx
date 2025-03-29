import * as yup from "yup"

export const inviteCardForm = yup.object().shape({
  person1: yup.string().required("Your Full Name is required"),
  person2: yup.string().required("Your partner's Full Name is required"),
  weddingDate: yup.date().required("Wedding Date is required"),
  venue: yup.string().required("Venue is required"),
})

export type InviteCardFormType = yup.InferType<typeof inviteCardForm>
