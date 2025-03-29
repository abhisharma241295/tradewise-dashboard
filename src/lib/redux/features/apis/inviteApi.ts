import { HYDRATE } from "next-redux-wrapper"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiResponse } from "@/types/generic_wrapper_response/GenericWrapperResponse"
import { GenericSuccessResponse } from "@/types/GenericPostResponse"
import { getCookie, parseCookies } from "../../../cookies"
import { AKITU_DASHBOARD_USER_TOKEN } from "@/lib/raw-data/constants"

export const invitesApi = createApi({
  reducerPath: "invitesApi",
  keepUnusedDataFor: Infinity,

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers: any, { extra }: any) => {
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

  tagTypes: ["Invites"],

  endpoints: (builder) => ({
    getInvites: builder.query({
      query: (weddingId) => {
        return {
          url: `api/weddings/${weddingId}/invites`,
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
      providesTags: ["Invites"],
    }),
    createInvite: builder.mutation({
      query: ({ weddingId, body }: { weddingId: string; body: any }) => ({
        url: `api/weddings/${weddingId}/invites`,
        method: "POST",
        body: body,
      }),
      transformResponse: (response: GenericSuccessResponse) => {
        return response
      },
      invalidatesTags: ["Invites"],
    }),
    updateInvite: builder.mutation({
      query: ({
        weddingId,
        body,
      }: {
        weddingId: string
        body: any
      }) => ({
        url: `api/weddings/${weddingId}/invites`,
        method: "PUT",
        body: body,
      }),
      transformResponse: (response: GenericSuccessResponse) => {
        return response
      },
      invalidatesTags: ["Invites"],
    }),
  }),
})

// Export hooks for functional components
export const {
  useGetInvitesQuery,
  useCreateInviteMutation,
  useUpdateInviteMutation,
} = invitesApi

// Export endpoints for use in SSR
export const { getInvites, createInvite, updateInvite, } =
  invitesApi.endpoints
