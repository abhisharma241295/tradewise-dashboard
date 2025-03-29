import DoughnutChartWithText from "../../commons/DoughnutChartWithText"
import { Coins } from "lucide-react"
import { useGetMetricsQuery } from "@/lib/redux/features/apis/expenseApi"
import { useAppSelector } from "@/lib/redux/hooks"
import { getCurrentWedding } from "@/lib/cookies/currentWeddingCookie"
import { cn } from "@/lib/utils/cn"
import DoughnutChart2 from "../../commons/DoughnutChart2"

interface ExpenseSummaryInformation {
  metrics: any
  noExpensesAvailable: boolean
  setNoExpensesAvailable: (value: boolean) => void
}

export const ExpenseSummary: React.FC<ExpenseSummaryInformation> = ({
  metrics,
  noExpensesAvailable,
}) => {
  const currentWeddingId =
    useAppSelector((state) => state.currentWedding.currentWeddingId) ??
    getCurrentWedding()
  const { data: expenses } = useGetMetricsQuery(currentWeddingId)
  const expenseData = expenses ? expenses.data : metrics?.data?.data

  interface SummaryCardProps {
    label: string
    amount: string
    color: string
  }

  const SummaryCard: React.FC<SummaryCardProps> = ({
    label,
    amount,
    color,
  }) => {
    return (
      <div className="mb-4 flex items-stretch overflow-hidden rounded-lg border">
        <div className={`w-2 ${color}`} />
        <div className="flex w-full items-center justify-between bg-gray-100 px-4 py-2">
          <span className="font-medium text-gray-600">{label}</span>
          <span className="font-semibold text-gray-800">${amount}</span>
        </div>
      </div>
    )
  }

  // Calculate the same values for summary cards
  const totalBudget = expenseData?.total_expenses || 0
  const topHeader = () => (
    <div
      className={cn(
        "mb-6 flex flex-grow items-start justify-between rounded-xl",
        noExpensesAvailable
          ? "border border-[#CCCDD6] bg-[#F2F2F2] p-5 text-[#AAAEBF]"
          : "border border-[#B6D3D6] bg-[#E4EFF0] p-5 text-foreground"
      )}
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold md:text-2xl">
          {noExpensesAvailable ? "No upcoming payments" : "Upcoming Payment"}
        </h3>
        <div className="flex flex-row items-center gap-4">
          {noExpensesAvailable ? (
            <div className="flex flex-col font-medium">
              <p className="text-sm md:text-base">{"You’re all updated!"}</p>
            </div>
          ) : (
            <>
              <Coins />
              <div className="flex flex-col font-medium">
                <p className="text-sm md:text-base">
                  {expenseData?.upcoming_payments?.overdue?.name ||
                    "No Upcoming Payment"}
                </p>
                <p className="text-sm text-muted-foreground md:text-base">
                  Total Expense of $
                  {expenseData?.upcoming_payments?.overdue?.amount || "N/A"}
                </p>
                {/* <p className="text-xs text-muted-foreground">
                  Due: {expenseData?.upcoming_payments?.upcoming?.due_date?.split('T')[0] || "N/A"}
                </p> */}
              </div>
            </>
          )}
        </div>
      </div>
      <span
        className={cn(
          "rounded bg-primary px-2 py-1 text-sm font-bold text-white",
          noExpensesAvailable && "hidden"
        )}
      >
        {expenseData?.upcoming_payment
          ? Object.keys(expenseData?.upcoming_payment).length
          : 0}
      </span>
    </div>
  )
  return (
    <div className="w-full p-4 lg:overflow-y-auto lg:p-6">
      {topHeader()}
      {/* Expenses in Charts Section */}
      <div className="w-full">
        <h3 className="p-1 py-2 text-lg font-bold md:text-xl">Expenses</h3>
        <div className="mb-6 hidden w-full max-w-xs items-center justify-center px-12 py-4 lg:flex">
          <DoughnutChartWithText
            showEmptyState={noExpensesAvailable}
            expenseData={expenseData}
            centerText={totalBudget}
          />
        </div>
        <div className="mt-6 lg:hidden">
          <DoughnutChart2
            expenseData={expenseData}
            showEmptyState={noExpensesAvailable}
          />
        </div>
      </div>

      {/* Summary Cards Section */}
      <div className="mx-auto hidden max-w-md lg:block">
        <SummaryCard
          label={"Total Due"}
          amount={expenseData?.total_due || 0}
          color={!noExpensesAvailable ? "bg-[#02746e]" : "bg-[#AAAEBF]"}
        />
        <SummaryCard
          label={"Total Left"}
          amount={expenseData?.total_left || 0}
          color={!noExpensesAvailable ? "bg-[#77c6c0]" : "bg-[#AAAEBF]"}
        />
        <SummaryCard
          label={"Total Spent"}
          amount={expenseData?.total_spent || 0}
          color={!noExpensesAvailable ? "bg-[#b5b5b5]" : "bg-[#AAAEBF]"}
        />
      </div>
    </div>
  )
}
