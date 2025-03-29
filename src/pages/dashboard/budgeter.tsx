import React, { useState } from "react"
import { ExpenseSummary } from "@/components/ui/dashboard/budgeter/ExpenseSummary"
import ExpenseTable from "@/components/ui/dashboard/budgeter/ExpenseTable"
import { GetServerSideProps } from "next"
import { wrapper } from "@/lib/redux/store"
import {
  expenseApi,
  getExpenses,
  getMetrics,
} from "@/lib/redux/features/apis/expenseApi"
import { getWeddings, weddingApi } from "@/lib/redux/features/apis/weddingApi"
// Define proper types for the props
interface BudgeterProps {
  expenses: any | null
  metrics: any | null
  error: string | null
}

export default function Budgeter({ expenses, metrics }: BudgeterProps) {
  const [showEmptyState, setShowEmptyState] = useState(false)
  return (
    <div className="h-full w-full overflow-auto lg:overflow-hidden">
      <div className="flex h-full flex-col lg:flex-row">
        <div className="flex-none border-b lg:w-[24rem] lg:overflow-auto lg:border-b-0 lg:border-r">
          <ExpenseSummary
            metrics={metrics}
            noExpensesAvailable={showEmptyState}
            setNoExpensesAvailable={setShowEmptyState}
          />
        </div>
        <div className="min-w-0 flex-1 lg:overflow-auto">
          <ExpenseTable
            data={expenses?.data}
            noExpensesAvailable={showEmptyState}
            setNoExpensesAvailable={setShowEmptyState}
          />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    try {
      // Safe parsing of cookie with fallback
      const cookieData = context.req.cookies.currentWedding
      let weddingId = cookieData
        ? JSON.parse(cookieData)?.current_wedding
        : null

      if (!weddingId) {
        // Try to get weddings if no wedding ID is found
        store.dispatch(getWeddings.initiate(undefined))
        await Promise.all(
          store.dispatch(weddingApi.util.getRunningQueriesThunk())
        )

        const weddingData =
          store.getState().weddingApi.queries["getWeddings(undefined)"]?.data

        if (!weddingData?.length) {
          return {
            props: {
              expenses: null,
              metrics: null,
              error: "No wedding data found",
            },
          }
        }

        weddingId = weddingData[0].wedding_id
      }

      // Fetch expenses and metrics
      store.dispatch(
        getExpenses.initiate({
          weddingId,
          pagination: { page: 1, perPage: 20 },
        })
      )
      store.dispatch(getMetrics.initiate(weddingId))
      await Promise.all(
        store.dispatch(expenseApi.util.getRunningQueriesThunk())
      )
      // console.log(store.getState().expenseApi.queries)
      const expenses =
        store.getState().expenseApi.queries[
          `getExpenses({"pagination":{"page":1,"perPage":20},"weddingId":"${weddingId}"})`
        ]
      const metrics =
        store.getState().expenseApi.queries[`getMetrics("${weddingId}")`]

      if (!expenses || !metrics) {
        return {
          props: {
            expenses: null,
            metrics: null,
            error: "Failed to fetch expenses or metrics",
          },
        }
      }

      return {
        props: {
          expenses: expenses || null,
          metrics: metrics || null,
          error: "No error found!",
        },
      }
    } catch (error) {
      console.error("Error in getServerSideProps:", error)
      return {
        props: {
          expenses: null,
          metrics: null,
          error: "An unexpected error occurred",
        },
      }
    }
  })
