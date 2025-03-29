import React, { FC } from "react"
import { Chart } from "primereact/chart"

interface DoughnutChartWithTextProps {
  centerText: String
  expenseData: any
  showEmptyState: boolean
}

export const expenseChartColors = ["#02746e", "#77c6c0", "#b5b5b5"]

const DoughnutChartWithText: FC<DoughnutChartWithTextProps> = ({
  centerText,
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
          ? [1] // Single segment for empty state
          : [
              (expenseData?.total_due || 0) / total,
              (expenseData?.total_left || 0) / total,
              (expenseData?.total_spent || 0) / total,
            ],
        backgroundColor: showEmptyState
          ? ["#E3E3E7"] // Empty state color
          : expenseChartColors,
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

  const plugins = [
    {
      id: "centerText",
      beforeDraw: (chart: any) => {
        const {
          ctx,
          chartArea: { top, width, height },
        } = chart
        ctx.save()

        // Calculate font sizes based on chart width
        const baseFontSize = Math.min(width, height) / 10

        // Draw "$18000"
        ctx.font = `bold ${baseFontSize}px Arial`
        ctx.fillStyle = "#000000"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(
          "$" + centerText,
          width / 2,
          top + height / 2 - baseFontSize * 0.5
        )

        // Draw "Total Budget"
        ctx.font = `${baseFontSize * 0.7}px Arial`
        ctx.fillStyle = "#666666"
        ctx.fillText(
          "Total Budget",
          width / 2,
          top + height / 2 + baseFontSize * 0.7
        )

        ctx.restore()
      },
    },
  ]

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        paddingBottom: "100%",
      }}
    >
      <div
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <Chart
          type="doughnut"
          data={chartData}
          options={chartOptions}
          plugins={plugins}
        />
      </div>
    </div>
  )
}

export default DoughnutChartWithText
