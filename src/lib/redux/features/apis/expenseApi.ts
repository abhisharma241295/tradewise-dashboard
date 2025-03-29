import { HYDRATE } from "next-redux-wrapper"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiResponse } from "@/types/generic_wrapper_response/GenericWrapperResponse"
import { getCookie, parseCookies } from "../../../cookies"
import { ExpenseDto } from "@/types/Expense"
import { AKITU_DASHBOARD_USER_TOKEN } from "@/lib/raw-data/constants"

export const expenseApi = createApi({
  reducerPath: "expenseApi",
  keepUnusedDataFor: Infinity,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers: any, { extra }: any) => {
      // console.log()
      const { userToken } = parseCookies(extra?.ctx)
      headers.set(
        "user-token",
        userToken ||
          getCookie(AKITU_DASHBOARD_USER_TOKEN) ||
          "NO-TOKEN-AVAILABLE"
      )
      headers.set("Authorization-Token", process.env.NEXT_PUBLIC_AUTH_TOKEN)
      return headers
    },
  }),

  extractRehydrationInfo(action: unknown, { reducerPath }) {
    if (
      action &&
      typeof action === "object" &&
      "type" in action &&
      action.type === HYDRATE
    ) {
      return (action as any).payload[reducerPath]
    }
  },

  tagTypes: ["Expense"],

  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: (params: {
        weddingId: string
        pagination?: Partial<{
          page?: number
          perPage?: number
          search?: string
          sortBy?: string
          sortDir?: "asc" | "desc"
          expenseCategory?: string
          expensePaymentTo?: string
        }>
      }) => {
        const { weddingId, pagination = {} } = params
        const queryParams = new URLSearchParams()

        if (pagination.page) queryParams.set("page", pagination.page.toString())
        if (pagination.perPage)
          queryParams.set("per_page", pagination.perPage.toString())
        if (pagination.search) queryParams.set("search", pagination.search)
        if (pagination.sortBy) queryParams.set("sort_by", pagination.sortBy)
        if (pagination.sortDir) queryParams.set("sort_dir", pagination.sortDir)
        if (pagination.expenseCategory)
          queryParams.set("expense_category", pagination.expenseCategory)
        if (pagination.expensePaymentTo)
          queryParams.set("expense_payment_to", pagination.expensePaymentTo)

        const queryString = queryParams.toString()
        return {
          url: `/api/weddings/${weddingId}/expenses${queryString ? `?${queryString}` : ""}`,
        }
      },
      transformResponse: (
        response: ApiResponse<{ expenses: ExpenseDto[] }>
      ) => {
        if (response.data) return response.data.expenses
        return []
      },
      transformErrorResponse(baseQueryReturnValue) {
        if ((baseQueryReturnValue as any).originalStatus === 404) {
          return { message: "Not Found Error" }
        }
        return baseQueryReturnValue
      },
      providesTags: ["Expense"],
    }),

    createExpense: builder.mutation({
      query: ({ weddingId, expense }: { weddingId: string; expense: any }) => ({
        url: `api/weddings/${weddingId}/expenses`,
        method: "POST",
        body: expense,
      }),
      invalidatesTags: ["Expense"],
    }),
    updateExpense: builder.mutation({
      query: ({
        weddingId,
        expenseId,
        body,
      }: {
        weddingId: string
        expenseId: string
        body: any
      }) => ({
        url: `api/weddings/${weddingId}/expenses/${expenseId}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Expense"],
    }),

    bulkDeleteExpenses: builder.mutation({
      query: ({
        weddingId,
        listOfExpenseIds,
      }: {
        weddingId: string
        listOfExpenseIds: any[]
      }) => ({
        url: `api/weddings/${weddingId}/expenses/bulk-delete`,
        method: "POST",
        body: {
          expense_ids: listOfExpenseIds,
        },
      }),
      invalidatesTags: ["Expense"],
    }),
    getMetrics: builder.query({
      query: (weddingId: string) => ({
        url: "api/weddings/" + weddingId + "/expenses/metrics",
      }),
      providesTags: ["Expense"],
    }),
  }),
})

export const {
  useGetExpensesQuery,
  useCreateExpenseMutation,
  useGetMetricsQuery,
  useBulkDeleteExpensesMutation,
} = expenseApi

// Export endpoints for use in SSR
export const { getExpenses, createExpense, getMetrics, bulkDeleteExpenses } =
  expenseApi.endpoints
