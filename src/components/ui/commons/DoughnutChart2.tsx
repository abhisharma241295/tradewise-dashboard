import React, { FC } from "react"
import { Chart } from "primereact/chart"

interface DoughnutChartProps {
  expenseData: {
    total_due: number
    total_left: number
    total_spent: number
  }
  showEmptyState: boolean
}

export const expenseChartColors = ["#02746e", "#77c6c0", "#b5b5b5"]

const DoughnutChart2: FC<DoughnutChartProps> = ({
  expenseData,
  showEmptyState,
}) => {
  const total = showEmptyState
    ? 1
    : expenseData?.total_due +
      expenseData?.total_left +
      expenseData?.total_spent

  const chartData = {
    labels: ["total_due", "total_left", "total_spent"],
    datasets: [
      {
        data: showEmptyState
          ? [1]
          : [
              (expenseData?.total_due || 0) / total,
              (expenseData?.total_left || 0) / total,
              (expenseData?.total_spent || 0) / total,
            ],
        backgroundColor: showEmptyState ? ["#E3E3E7"] : expenseChartColors,
        hoverBackgroundColor: showEmptyState ? ["#E3E3E7"] : expenseChartColors,
      },
    ],
  }

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    cutout: "75%",
    responsive: true,
    maintainAspectRatio: true,
  }

  return (
    <div className="flex flex-row items-center gap-4 md:items-start md:gap-8">
      {/* Doughnut Chart */}
      <div className="w-1/2">
        <div className="mx-auto h-48 w-48 md:mx-0 md:h-64 md:w-64 lg:h-80 lg:w-80">
          <Chart type="doughnut" data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Text Labels */}
      <div className="flex w-1/2 flex-col gap-4 text-center md:text-left">
        <div>
          <p className="text-sm text-gray-500">Total Spent</p>
          <p className="text-xl font-bold">${expenseData?.total_spent || 0}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Left</p>
          <p className="text-xl font-bold">${expenseData?.total_left || 0}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Due</p>
          <p className="text-xl font-bold">${expenseData?.total_due || 0}</p>
        </div>
      </div>
    </div>
  )
}

export default DoughnutChart2
