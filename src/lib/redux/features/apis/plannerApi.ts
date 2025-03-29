import { HYDRATE } from "next-redux-wrapper"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiResponse } from "@/types/generic_wrapper_response/GenericWrapperResponse"
import { GenericSuccessResponse } from "@/types/GenericPostResponse"
import { getCookie, parseCookies } from "../../../cookies"
import {
  WeddingPlannerEvent,
  WeddingPlannerEventWithId,
} from "@/types/WeddingPlannerEvent"
import { AKITU_DASHBOARD_USER_TOKEN } from "@/lib/raw-data/constants"

// Create the Planner API
export const plannerApi = createApi({
  reducerPath: "plannerApi",
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

  // Rehydration logic for SSR
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

  tagTypes: ["Planner"],

  endpoints: (builder) => ({
    // Query to get a list of wedding planner events
    getWeddingPlannerEvents: builder.query({
      query: (weddingId: string) => `api/weddings/${weddingId}/todo`,
      transformResponse: (
        response: ApiResponse<{
          [progress: string]: WeddingPlannerEventWithId[]
        }>
      ) => {
        return response.data // Return only the data
      },
      transformErrorResponse(baseQueryReturnValue) {
        if ((baseQueryReturnValue as any).originalStatus === 404) {
          return { message: "Not Found Error" }
        }
        return baseQueryReturnValue
      },
      providesTags: ["Planner"],
    }),
    // "/api/weddings/<uuid:wedding_id>/todo/metrics",
    getWeddingPlannerEventsMetrics: builder.query({
      query: (weddingId: string) => `api/weddings/${weddingId}/todo/metrics`,
      transformResponse: (response: ApiResponse<any>) => {
        console.log(response)
        return response.data || {} // Return only the data
      },
      transformErrorResponse(baseQueryReturnValue) {
        if ((baseQueryReturnValue as any).originalStatus === 404) {
          return { message: "Not Found Error" }
        }
        return baseQueryReturnValue
      },
      providesTags: ["Planner"],
    }),

    // Mutation to add a wedding planner event
    addWeddingPlannerEvent: builder.mutation({
      query: ({
        weddingId,
        body,
      }: {
        weddingId: string
        body: WeddingPlannerEvent
      }) => ({
        url: `api/weddings/${weddingId}/todo`,
        method: "POST",
        body,
      }),
      transformResponse: (response: GenericSuccessResponse) => {
        return response // Return the success response
      },
      invalidatesTags: ["Planner"], // Invalidate Planner tag to refresh data
    }),
    updateTodoStatus: builder.mutation({
      query: ({
        weddingId,
        todoId,
        body,
      }: {
        weddingId: string
        todoId: string
        body: any
      }) => ({
        url: `api/weddings/${weddingId}/todo/${todoId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Planner"],
    }),
    updateCheckListStatus: builder.mutation({
      query: ({
        weddingId,
        todoId,
        checkListItemId,
        body,
      }: {
        weddingId: string
        todoId: string
        checkListItemId: string
        body: any
      }) => ({
        url: `api/weddings/${weddingId}/todo/${todoId}/checklists/${checkListItemId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Planner"], // Invalidate Planner tag to refresh data
    }),
    deleteTodo: builder.mutation({
      query: ({
        weddingId,
        todoId,
      }: {
        weddingId: string
        todoId: string
      }) => ({
        url: `api/weddings/${weddingId}/todo/${todoId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Planner"], // Invalidate Planner tag to refresh data
    }),
    addCheckListItem: builder.mutation({
      query: ({
        weddingId,
        todoId,
        body,
      }: {
        weddingId: string
        todoId: string
        body: {
          checklist_name: string
          checklist_status: string
          checklist_icon_id: number
        }
      }) => ({
        url: `api/weddings/${weddingId}/todo/${todoId}/checklists`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Planner"],
    }),
    deleteChecklistItem: builder.mutation({
      query: ({
        weddingId,
        todoId,
        checklistItemId,
      }: {
        weddingId: string
        todoId: string
        checklistItemId: string
      }) => ({
        url: `api/weddings/${weddingId}/todo/${todoId}/checklists/${checklistItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Planner"],
    }),
  }),
})

// Export hooks for functional components
export const {
  useGetWeddingPlannerEventsQuery,
  useGetWeddingPlannerEventsMetricsQuery,
  useAddWeddingPlannerEventMutation,
  useUpdateTodoStatusMutation,
  useUpdateCheckListStatusMutation,
} = plannerApi

// Export endpoints for use in SSR
export const {
  getWeddingPlannerEvents,
  getWeddingPlannerEventsMetrics,
  addWeddingPlannerEvent,
  updateTodoStatus,
  updateCheckListStatus,
} = plannerApi.endpoints
