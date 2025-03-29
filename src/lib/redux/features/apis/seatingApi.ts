import { HYDRATE } from "next-redux-wrapper"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiResponse } from "@/types/generic_wrapper_response/GenericWrapperResponse"
import { GenericSuccessResponse } from "@/types/GenericPostResponse"
import { getCookie, parseCookies } from "../../../cookies"
import { AKITU_DASHBOARD_USER_TOKEN } from "@/lib/raw-data/constants"

export const seatingApi = createApi({
  reducerPath: "seatingApi",
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

  tagTypes: ["Seatings", "Details"],

  endpoints: (builder) => ({
    getSeatings: builder.query<
      ApiResponse<any>, // Replace 'any' with the appropriate type if available
      { weddingId: string }
    >({
      query: ({ weddingId }) => ({
        url: `/api/weddings/${weddingId}/seatings`,
        method: "GET",
      }),
      providesTags: ["Seatings"],
    }),

    getSeatingPerEvent: builder.query<
      ApiResponse<any>, // Replace 'any' with the appropriate type if available
      { eventId: string }
    >({
      query: ({ eventId }) => ({
        url: `/api/events/${eventId}/seating`,
        method: "GET",
      }),
      providesTags: ["Details"],
    }),
    addSeating: builder.mutation<
      ApiResponse<GenericSuccessResponse>,
      {
        eventId: string
        data: {
          total_tables: number
          seat_limit: number
          restrict_limit: boolean
          wedding_id: string
          table_info: {
            [key: string]: string[]
          }
        }
      }
    >({
      query: ({ eventId, data }) => ({
        url: `/api/events/${eventId}/seating`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Seatings"],
    }),
    deleteSeating: builder.mutation<
      ApiResponse<GenericSuccessResponse>,
      {
        eventId: string
        seatingId: string
      }
    >({
      query: ({ eventId, seatingId }) => ({
        url: `/api/events/${eventId}/seating/${seatingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Seatings"],
    }),
    updateSeating: builder.mutation<
      ApiResponse<GenericSuccessResponse>,
      {
        eventId: string
        seatingId: string
        data: {
          total_tables: number
          seat_limit: number
          restrict_limit: boolean
          wedding_id: string
          table_info: {
            [key: string]: string[]
          }
        }
      }
    >({
      query: ({ eventId, seatingId, data }) => ({
        url: `/api/events/${eventId}/seating/${seatingId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Seatings"],
    }),
    addSeatingTable: builder.mutation<
      ApiResponse<GenericSuccessResponse>,
      {
        eventId: string
        table_info: {
          [key: string]: string[]
        }
      }
    >({
      query: ({ eventId, table_info }) => ({
        url: `/api/seating/${eventId}`,
        method: "POST",
        body: { table_info },
      }),
      invalidatesTags: ["Seatings"],
    }),

    deleteSeatingTable: builder.mutation<
      ApiResponse<GenericSuccessResponse>,
      {
        seatingTableId: string
      }
    >({
      query: ({ seatingTableId }) => ({
        url: `/api/seating_table/${seatingTableId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Details"],
    }),
    deleteGuestFromSeatingTable: builder.mutation<
      ApiResponse<GenericSuccessResponse>,
      {
        tableAssignmentId: string
        data: {
          guest_ids: string[]
        }
      }
    >({
      query: ({ tableAssignmentId, data }) => ({
        url: `/api/table_assignment/${tableAssignmentId}/guests`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Seatings", "Details"],
    }),
    addGuestInSeatingTable: builder.mutation<
      ApiResponse<GenericSuccessResponse>,
      {
        seatingTableId: string
        data: {
          guest_ids: string[]
        }
      }
    >({
      query: ({ seatingTableId, data }) => ({
        url: `/api/seating_table/${seatingTableId}/guests`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Seatings"],
    }),
  }),
})

// Export hooks for functional components
export const {
  useGetSeatingsQuery,
  useAddSeatingMutation,
  useUpdateSeatingMutation,
  useDeleteSeatingMutation,
  useDeleteSeatingTableMutation,
  useDeleteGuestFromSeatingTableMutation,
  useAddGuestInSeatingTableMutation,
  useGetSeatingPerEventQuery,
} = seatingApi

// Export endpoints for use in SSR
export const {
  getSeatings,
  addSeating,
  deleteGuestFromSeatingTable,
  addGuestInSeatingTable,
} = seatingApi.endpoints
