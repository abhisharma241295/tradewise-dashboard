import React from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { InputText } from "primereact/inputtext"
import { Calendar } from "primereact/calendar"
import { Button } from "primereact/button"
import {
  newExpenseFormSchema,
  NewExpenseFormType,
} from "@/lib/form-schema/newExpenseForm"
import { ArrowLeft, Loader } from "lucide-react"
import { toast } from "sonner"
import { useAppSelector } from "@/lib/redux/hooks"
import { expenseApi } from "@/lib/redux/features/apis/expenseApi"
import { SingleSelect } from "../commons/SingleSelect"
import { ExpenseCategory } from "@/lib/raw-data/expenseCategory"

interface ExpenseFormProps {
  onClose: () => void
  expenseInfo?: any
}

export default function ExpenseForm({
  onClose,
  expenseInfo,
}: ExpenseFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewExpenseFormType>({
    resolver: yupResolver(newExpenseFormSchema),
    defaultValues: expenseInfo?.raw
      ? {
          expenseName: expenseInfo.raw.title || "",
          cost: expenseInfo.raw.amount || 0,
          category: {
            label: expenseInfo.raw.category,
            value: expenseInfo.raw.category,
          },
          paid: expenseInfo.raw.paid_amount || 0,
          paymentTo: expenseInfo.raw.payment_to || "",
          description: expenseInfo.raw.title || "",
          dueDate: expenseInfo.raw.due_date
            ? new Date(expenseInfo.raw.due_date)
            : undefined,
          reminder: expenseInfo.raw.reminder
            ? new Date(expenseInfo.raw.reminder)
            : undefined,
        }
      : {},
  })
  const currentWeddingId = useAppSelector(
    (state) => state.currentWedding.currentWeddingId
  )
  const [addWeddingExpense, { isLoading: isCreateLoading }] =
    expenseApi.useCreateExpenseMutation()
  const [updateWeddingExpense, { isLoading: isUpdateLoading }] =
    expenseApi.useUpdateExpenseMutation()

  const onSubmit = async (data: NewExpenseFormType) => {
    try {
      const expenseData = {
        expense_name: data.expenseName,
        expense_total_amount: data.cost,
        expense_category: data.category.label,
        expense_paid_amount: data.paid ?? 0,
        expense_payment_to: data.paymentTo,
        expense_description: data.description,
        expense_due_date: data.dueDate
          ? data.dueDate.toISOString().split("T")[0]
          : undefined,
        reminder: data.reminder
          ? data.reminder.toISOString().split("T")[0]
          : undefined,
      }

      if (expenseInfo) {
        await updateWeddingExpense({
          weddingId: currentWeddingId,
          expenseId: expenseInfo.id,
          body: expenseData,
        })
        toast("Expense updated successfully")
      } else {
        await addWeddingExpense({
          weddingId: currentWeddingId,
          expense: expenseData,
        })
        toast("Expense created successfully")
      }
      onClose()
    } catch (error) {
      toast(`Error: ${error}`)
    }
  }

  return (
    <div className="mx-auto max-w-2xl overflow-auto">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-14 items-center px-4">
          <div className="flex flex-1 items-center gap-4">
            <div className="flex items-center gap-2 text-gray-800">
              <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={onClose} />
              <span className="text-xl font-semibold">
                {expenseInfo ? "Edit" : "Add"} Expense
              </span>
            </div>
          </div>
        </div>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        {/* Expense Name */}
        <div>
          <label htmlFor="expenseName" className="mb-1 block">
            Expense Name
          </label>
          <InputText
            id="expenseName"
            {...register("expenseName")}
            className={`w-full ${errors.expenseName ? "p-invalid" : ""}`}
            placeholder="Name"
          />
          {errors.expenseName && (
            <small className="p-error">{errors.expenseName.message}</small>
          )}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="mb-1 block">
            Category
          </label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <SingleSelect
                value={{
                  label: field.value?.label,
                  value: field.value?.value,
                  raw: undefined,
                }}
                setValue={(e) =>
                  field.onChange({
                    label: e?.label,
                    value: e?.value,
                    raw: undefined,
                  })
                }
                options={ExpenseCategory.map((cat) => ({
                  label: cat,
                  value: cat,
                  raw: undefined,
                }))}
                placeholder="Select a category"
                // className={`w-full ${errors.category ? "p-invalid" : ""}`}
              />
            )}
          />
          {errors.category && (
            <small className="p-error">{errors.category.message}</small>
          )}
        </div>

        {/* Due Date */}
        <div>
          <label htmlFor="dueDate" className="mb-1 block">
            Due Date
          </label>
          <Controller
            name="dueDate"
            control={control}
            render={({ field }) => (
              <Calendar
                id="dueDate"
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                dateFormat="mm/dd/yy"
                placeholder="MM/DD/YYYY"
                className={`w-full ${errors.dueDate ? "p-invalid" : ""}`}
              />
            )}
          />
          {errors.dueDate && (
            <small className="p-error">{errors.dueDate.message}</small>
          )}
        </div>

        {/* Cost and Paid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="cost" className="mb-1 block">
              Cost
            </label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">$</span>
              <InputText
                id="cost"
                type="number"
                defaultValue={0}
                {...register("cost")}
                className={`w-full !rounded-l-none ${errors.cost ? "p-invalid" : ""}`}
                placeholder="Cost"
              />
            </div>
            {errors.cost && (
              <small className="p-error">{errors.cost.message}</small>
            )}
          </div>
          <div>
            <label htmlFor="paid" className="mb-1 block">
              Paid
            </label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">$</span>
              <InputText
                id="paid"
                type="number"
                defaultValue={0}
                {...register("paid")}
                className={`w-full !rounded-l-none ${errors.paid ? "p-invalid" : ""}`}
                placeholder="Paid"
              />
            </div>
            {errors.paid && (
              <small className="p-error">{errors.paid.message}</small>
            )}
          </div>
        </div>

        {/* Reminder */}
        <div>
          <label htmlFor="reminder" className="mb-1 block">
            Reminder
          </label>
          <Controller
            name="reminder"
            control={control}
            render={({ field }) => (
              <Calendar
                id="reminder"
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                dateFormat="mm/dd/yy"
                placeholder="MM/DD/YYYY"
                className={`w-full ${errors.reminder ? "p-invalid" : ""}`}
              />
            )}
          />
          {errors.reminder && (
            <small className="p-error">{errors.reminder.message}</small>
          )}
        </div>

        {/* Payment To */}
        <div>
          <label htmlFor="paymentTo" className="mb-1 block">
            Payment To
          </label>
          <InputText
            id="paymentTo"
            {...register("paymentTo")}
            className={`w-full ${errors.paymentTo ? "p-invalid" : ""}`}
            placeholder="Payment to"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="mb-1 block">
            Description
          </label>
          <InputText
            id="description"
            {...register("description")}
            className={`w-full ${errors.description ? "p-invalid" : ""}`}
            placeholder="Message..."
          />
          {errors.description && (
            <small className="p-error">{errors.description.message}</small>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isCreateLoading || isUpdateLoading}
          className="item-center flex w-full flex-row justify-center gap-2"
        >
          {(isCreateLoading || isUpdateLoading) && (
            <Loader className="animate-spin" />
          )}
          {!isCreateLoading && !isUpdateLoading ? (
            <p>{expenseInfo ? "Update" : "Add"} Expense</p>
          ) : (
            <p>{expenseInfo ? "Updating" : "Adding"} Expense...</p>
          )}
        </Button>
      </form>
    </div>
  )
}
