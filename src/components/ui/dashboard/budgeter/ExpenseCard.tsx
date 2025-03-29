"use client"

import { Coins } from "lucide-react"
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox"

export interface Expense {
  id: string
  title: string
  date: string
  paidAmount: number
  dueAmount: number
  paymentTo: string
  checked: boolean
  forceShow: boolean
  onChange?(event: CheckboxChangeEvent): void
}

export default function ExpenseCard({ expense }: { expense: Expense }) {
  return (
    <div className="group cursor-pointer rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Receipt Icon */}
          <Coins />

          <div>
            <h3 className="font-medium">{expense.title}</h3>
            <p className="text-sm text-gray-500">{expense.date}</p>
          </div>
        </div>
        {/* Check Icon */}
        <Checkbox
          inputId={`checkbox-${expense.id}`}
          className={`p-checkbox ${expense.checked || expense.forceShow ? "" : "invisible group-hover:visible"}`}
          aria-label="Select expense"
          checked={expense.checked} // Default unchecked state
          onChange={expense.onChange}
        />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Paid</p>
          <p className="text-xl font-semibold">${expense.paidAmount}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Due</p>
          <p className="text-xl font-semibold">${expense.dueAmount}</p>
        </div>
        <div className="space-y-1 whitespace-nowrap">
          <p className="text-sm text-gray-500">Paid</p>
          <div className="flex w-min items-center rounded-full bg-accent p-1">
            <span className="mr-1 flex size-6 items-center justify-center rounded-full bg-[#00BCD4] text-white">
              {expense.paymentTo[0].toUpperCase()}
            </span>
            <span className="mr-1 font-semibold">{expense.paymentTo}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
