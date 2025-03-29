import React, { useState } from "react"
import ExpenseForm from "@/components/ui/forms/NewExpenseForm"
import { ArrowLeft, PencilLine, Trash2, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils/cn"
import CustomButton from "@/components/ui/Button"
import { Dialog } from "primereact/dialog"
import Image from "next/image"
import { TodosCategory } from "@/lib/raw-data/todoCategories"

interface ExpenseSidesheetContentProps {
  onClose: () => void
  expenseInfo?: any
  handleDelete: () => void
}

const ExpenseSidesheetContent: React.FC<ExpenseSidesheetContentProps> = ({
  onClose,
  expenseInfo,
  handleDelete,
}) => {
  const [viewMode, setViewMode] = useState(expenseInfo ? true : false)
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false)
  const [expandedSections, setExpandedSections] = useState({
    details: true,
    description: false,
  })

  const toggleSection = (section: "details" | "description") => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const ExpenseDetails = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="flex h-14 items-center px-4">
          <div className="flex flex-1 items-center gap-4">
            <div className="flex items-center gap-2 text-gray-800">
              <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={onClose} />
              <span className="text-xl font-semibold">Expense Details</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="p-2 text-gray-600 hover:text-gray-800"
              onClick={() => setDeleteConfirmationVisible(true)}
            >
              <Trash2 className="h-5 w-5" />
              <span className="sr-only">Delete expense</span>
            </button>
            <button
              className="p-2 text-blue-600 hover:text-blue-700"
              onClick={() => setViewMode(false)}
            >
              <PencilLine className="h-5 w-5" />
              <span className="sr-only">Edit expense</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="space-y-4 px-4 py-6">
        {/* Image Card */}
        <div className="overflow-hidden rounded-2xl bg-[#ECF4F5] p-4 shadow-sm">
          <div className="relative h-48 w-full overflow-hidden rounded-xl">
            <Image
              src={
                TodosCategory.find((cat) => cat.label === expenseInfo?.category)
                  ?.image_url ||
                TodosCategory.find((cat) => cat.label === "Other")?.image_url ||
                ""
              }
              alt={`${expenseInfo?.category} category illustration`}
              className="object-cover"
              fill
            />
          </div>
          <div className="mt-4 space-y-0.5">
            <div className="text-sm text-[#60647C]">Category</div>
            <div className="text-lg font-semibold text-[#11131C]">
              {expenseInfo?.category || "Uncategorized"}
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="overflow-hidden rounded-2xl border border-[#E3E3E7] bg-white shadow-sm">
          <button
            onClick={() => toggleSection("details")}
            className="flex w-full items-center justify-between p-4 hover:bg-gray-50"
          >
            <span className="text-base font-semibold text-[#11131C]">
              Details
            </span>
            <ChevronDown
              className={cn(
                "h-5 w-5 text-[#60647C] transition-transform duration-200",
                expandedSections.details ? "rotate-180 transform" : ""
              )}
            />
          </button>
          <div
            className={cn(
              "text-[#11131C]",
              "transition-all duration-200 ease-in-out",
              expandedSections.details
                ? "max-h-[500px] opacity-100"
                : "max-h-0 overflow-hidden opacity-0"
            )}
          >
            <div className="space-y-6 border-t p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-[#60647C]">Payment To</div>
                  <div className="text-base font-semibold">
                    {expenseInfo?.paymentTo || "Not specified"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-[#60647C]">Due Date</div>
                  <div className="text-base font-semibold">
                    {expenseInfo?.dueDate
                      ? new Date(expenseInfo.dueDate).toLocaleDateString(
                          "en-US",
                          { day: "2-digit", month: "2-digit", year: "numeric" }
                        )
                      : "No due date"}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-[#60647C]">Total Amount</div>
                  <div className="text-base font-semibold">
                    ${expenseInfo?.paid || "0"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-[#60647C]">Due Amount</div>
                  <div className="text-base font-semibold">
                    ${expenseInfo?.due || "0"}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm text-[#60647C]">Reminder</div>
                <div className="text-base font-semibold">{"Yes"}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="overflow-hidden rounded-2xl border border-[#E3E3E7] bg-white shadow-sm">
          <button
            onClick={() => toggleSection("description")}
            className="flex w-full items-center justify-between p-4 hover:bg-gray-50"
          >
            <span className="text-base font-semibold text-[#11131C]">
              Description
            </span>
            <ChevronDown
              className={cn(
                "h-5 w-5 text-[#60647C] transition-transform duration-200",
                expandedSections.description ? "rotate-180 transform" : ""
              )}
            />
          </button>
          <div
            className={cn(
              "text-[#11131C]",
              "transition-all duration-200 ease-in-out",
              expandedSections.description
                ? "max-h-[500px] opacity-100"
                : "max-h-0 overflow-hidden opacity-0"
            )}
          >
            <div className="border-t p-4">
              {expenseInfo?.description || "No description provided."}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        draggable={false}
        visible={deleteConfirmationVisible}
        onHide={() => setDeleteConfirmationVisible(false)}
        className="w-full max-w-md"
        header="Delete Confirmation"
      >
        <p className="mb-6 border-t px-2 pt-4">
          Are you sure you want to delete this expense?
        </p>
        <div className="flex justify-end space-x-4 border-t pt-4">
          <CustomButton
            variant={"outline"}
            size="sm"
            className="rounded-md border border-primary px-6 py-2 !font-medium text-primary"
            onClick={() => setDeleteConfirmationVisible(false)}
          >
            No
          </CustomButton>
          <CustomButton
            size="sm"
            className="!hover:bg-red-700 rounded-[8px] !border-red-600 !bg-red-600 px-6 py-2 !font-medium"
            onClick={() => {
              handleDelete()
              setDeleteConfirmationVisible(false)
            }}
          >
            Yes, Delete
          </CustomButton>
        </div>
      </Dialog>
    </div>
  )

  return (
    <div className="overflow-auto">
      {viewMode ? (
        <ExpenseDetails />
      ) : (
        <ExpenseForm
          expenseInfo={expenseInfo}
          onClose={() => {
            onClose()
            setViewMode(false)
          }}
        />
      )}
    </div>
  )
}

export default ExpenseSidesheetContent
