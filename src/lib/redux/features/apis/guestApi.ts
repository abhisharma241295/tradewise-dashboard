import { HYDRATE } from "next-redux-wrapper"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getCookie, parseCookies } from "../../../cookies"
import { AKITU_DASHBOARD_USER_TOKEN } from "@/lib/raw-data/constants"

export interface PaginationParams {
  page?: number
  perPage?: number
  search?: string
  sortBy?: string
  sortDir?: "asc" | "desc"
}

export const guestApi = createApi({
  reducerPath: "guestApi",
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

  tagTypes: ["Rsvp"],

  endpoints: (builder) => ({
    getGuestList: builder.query({
      query: (params: {
        weddingId: string
        pagination?: Partial<
          PaginationParams & {
            guestBelongsTo?: string
            rsvp?: boolean
            eventId?: string
          }
        >
      }) => {
        const { weddingId, pagination = {} } = params
        const queryParams = new URLSearchParams()

        // Only add parameters if they are defined
        if (pagination.page) {
          queryParams.set("page", pagination.page.toString())
        }

        if (pagination.perPage) {
          queryParams.set("per_page", pagination.perPage.toString())
        }

        if (pagination.sortBy) {
          queryParams.set("sort_by", pagination.sortBy)
        }

        if (pagination.sortDir) {
          queryParams.set("sort_dir", pagination.sortDir)
        }

        if (pagination.search) {
          queryParams.set("search", pagination.search)
        }

        if (pagination.guestBelongsTo) {
          queryParams.set("guest_belongs_to", pagination.guestBelongsTo)
        }

        if (pagination.rsvp !== undefined) {
          queryParams.set("rsvp", pagination.rsvp.toString())
        }

        if (pagination.eventId) {
          queryParams.set("event_id", pagination.eventId)
        }

        const queryString = queryParams.toString()
        return {
          url: `/api/weddings/${weddingId}/guests${queryString ? `?${queryString}` : ""}`,
        }
      },
      transformResponse: (response: any) => {
        console.log(response)
        // Handle pagination metadata if available
        if (response.data) {
          const result = {
            items: response.data.items,
            pagination: {
              currentPage: response.data.pagination.current_page || 1,
              totalPages: response.data.pagination.total_pages || 1,
              totalItems: response.data.pagination.total_items || 0,
              perPage: response.data.pagination.per_page || 10,
            },
          }
          // console.log(result)
          return result
        }
        return {
          items: [],
          pagination: {
            totalItems: 10,
          },
        }
      },
      transformErrorResponse(baseQueryReturnValue) {
        if ((baseQueryReturnValue as any).originalStatus === 404) {
          return { message: "Not Found Error" }
        }
        return baseQueryReturnValue
      },
      providesTags: ["Rsvp"],
    }),

    addGuest: builder.mutation({
      query: ({ weddingId, guestData }) => ({
        url: `/api/weddings/${weddingId}/guests`,
        method: "POST",
        body: guestData,
      }),
      invalidatesTags: ["Rsvp"],
    }),

    updateGuest: builder.mutation({
      query: ({ weddingId, guestId, guestData }) => ({
        url: `/api/weddings/${weddingId}/guests/${guestId}`,
        method: "PUT",
        body: guestData,
      }),
      invalidatesTags: ["Rsvp"],
    }),

    uploadCsv: builder.mutation({
      query: ({ weddingId, formData }) => ({
        url: `/api/weddings/${weddingId}/guests/import-csv`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Rsvp"],
    }),

    bulkDeleteGuests: builder.mutation({
      query: ({
        weddingId,
        listOfGuestIds,
      }: {
        weddingId: string
        listOfGuestIds: any[]
      }) => ({
        url: `api/weddings/${weddingId}/guests/bulk-delete`,
        method: "POST",
        body: {
          guest_ids: listOfGuestIds,
        },
      }),
      invalidatesTags: ["Rsvp"],
    }),
  }),
})

// Export hooks for components
export const {
  useGetGuestListQuery,
  useLazyGetGuestListQuery,
  useAddGuestMutation,
  useUploadCsvMutation,
  useBulkDeleteGuestsMutation,
  useUpdateGuestMutation,
} = guestApi

// Export endpoints for use in SSR
export const { getGuestList, addGuest, uploadCsv } = guestApi.endpoints
