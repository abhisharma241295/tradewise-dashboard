import * as yup from "yup"

export const newExpenseFormSchema = yup.object().shape({
  expenseName: yup.string().required("Expense name is required"),
  category: yup
    .object()
    .shape({
      label: yup.string().required("Category label is required"),
      value: yup.string().required("Category value is required"),
    })
    .required("Category is required"),
  dueDate: yup.date().required("Due date is required").nullable(),
  cost: yup
    .number()
    .required("Cost is required")
    .min(0, "Cost cannot be negative")
    .default(0),
  paid: yup
    .number()
    .required("Paid is required")
    .min(0, "Paid amount cannot be negative")
    .default(0)
    .test(
      "is-valid-payment",
      "Paid cannot be greater than cost",
      function (value) {
        const { cost } = this.parent // Access the cost field value
        return value <= cost // Ensure paid is less than or equal to cost
      }
    ),
  reminder: yup.date().required("Reminder date is required"),
  paymentTo: yup.string().optional(),
  description: yup
    .string()
    .max(250, "Description cannot exceed 250 characters"),
})

export type NewExpenseFormType = yup.InferType<typeof newExpenseFormSchema>
