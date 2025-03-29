export const months = [
  { label: "January", value: "January" },
  { label: "February", value: "February" },
  { label: "March", value: "March" },
  { label: "April", value: "April" },
  { label: "May", value: "May" },
  { label: "June", value: "June" },
  { label: "July", value: "July" },
  { label: "August", value: "August" },
  { label: "September", value: "September" },
  { label: "October", value: "October" },
  { label: "November", value: "November" },
  { label: "December", value: "December" },
]

// Generate the next 15 years starting from the current year
const currentYear = new Date().getFullYear()
export const years = Array.from({ length: 15 }, (_, index) => ({
  label: `${currentYear + index}`,
  value: `${currentYear + index}`,
}))
