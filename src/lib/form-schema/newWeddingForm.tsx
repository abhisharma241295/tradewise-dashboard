import * as yup from "yup"

// Assuming the new names based on your WeddingCouple structure
export const NewWeddingFormSchema = yup.object().shape({
  groomFirstName: yup
    .string()
    .required("First Person's first name is required"),
  groomLastName: yup.string().required("First Person's last name is required"),
  brideFirstName: yup
    .string()
    .required("Second Person's first name is required"),
  brideLastName: yup.string().required("Second Person's last name is required"),
  weddingDate: yup.date().required("Wedding date is required"),
  weddingLocation: yup.string().required("Wedding location is required"),
  weddingBudget: yup.string().required("Budget is required"),
  imageUrl: yup.string().default(""),
})

// Type inference based on the updated schema
export type NewWeddingType = yup.InferType<typeof NewWeddingFormSchema>

// Function to transform camelCase to snake_case
const camelToSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)

// Function to transform the data to snake_case
export const SerializeWedding = (data: NewWeddingType) => {
  const entries = Object.entries(data)
  const snakeCaseEntries = entries.map(([key, value]) => [
    camelToSnakeCase(key),
    value,
  ])
  return Object.fromEntries(snakeCaseEntries)
}

// The type for the serialized data
export type SerializedNewProjectType = {
  groom_first_name: string
  groom_last_name: string
  bride_first_name: string
  bride_last_name: string
  wedding_date: Date
  wedding_location: string
  wedding_budget: number
  image_url: string
}
