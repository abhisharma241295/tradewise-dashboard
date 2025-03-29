import { HYDRATE } from "next-redux-wrapper"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiResponse } from "@/types/generic_wrapper_response/GenericWrapperResponse"
import { GenericSuccessResponse } from "@/types/GenericPostResponse"
import { getCookie, parseCookies } from "../../../cookies"
import { AKITU_DASHBOARD_USER_TOKEN } from "@/lib/raw-data/constants"

export const eventsApi = createApi({
  reducerPath: "eventsApi",
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

  tagTypes: ["Events"],

  endpoints: (builder) => ({
    getEvents: builder.query({
      query: (weddingId) => {
        return {
          url: `api/weddings/${weddingId}/events`,
        }
      },
      transformResponse: (response: ApiResponse<any>) => {
        if (response.data) return response.data
        return []
      },
      transformErrorResponse(baseQueryReturnValue) {
        if ((baseQueryReturnValue as any).originalStatus === 404) {
          return { message: "Not Found Error" }
        }
        return baseQueryReturnValue
      },
      providesTags: ["Events"],
    }),
    addEvent: builder.mutation({
      query: ({ weddingId, body }: { weddingId: string; body: any }) => ({
        url: `api/weddings/${weddingId}/events`,
        method: "POST",
        body: body,
      }),
      transformResponse: (response: GenericSuccessResponse) => {
        return response
      },
      invalidatesTags: ["Events"],
    }),
    updateEvent: builder.mutation({
      query: ({
        weddingId,
        eventId,
        body,
      }: {
        weddingId: string
        eventId: string
        body: any
      }) => ({
        // query: ({ data }) => ({
        url: `api/weddings/${weddingId}/events/${eventId}`,
        method: "PUT",
        body: body,
      }),
      transformResponse: (response: GenericSuccessResponse) => {
        return response
      },
      invalidatesTags: ["Events"],
    }),

    deleteEvent: builder.mutation({
      query: ({
        weddingId,
        eventId,
      }: {
        weddingId: string
        eventId: string
      }) => ({
        url: `api/weddings/${weddingId}/events/${eventId}`,
        method: "DELETE",
      }),
      transformResponse: (response: GenericSuccessResponse) => {
        return response
      },
      invalidatesTags: ["Events"],
    }),
    deleteEventGuests: builder.mutation({
      query: ({
        eventId,
        guestIds,
      }: {
        eventId: string
        guestIds: string[]
      }) => ({
        // http://127.0.0.1:8000/api/events/4135640d-6e3e-4347-be39-4b2b90093d06/guests
        url: `api/events/${eventId}/guests`,
        method: "DELETE",
        body: { guest_ids: guestIds },
      }),
      transformResponse: (response: GenericSuccessResponse) => {
        return response
      },
      invalidatesTags: ["Events"],
    }),
  }),
})

// Export hooks for functional components
export const {
  useGetEventsQuery,
  useAddEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useDeleteEventGuestsMutation,
} = eventsApi

// Export endpoints for use in SSR
export const { getEvents, addEvent, updateEvent, deleteEvent } =
  eventsApi.endpoints
