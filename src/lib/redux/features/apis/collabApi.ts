import { HYDRATE } from "next-redux-wrapper"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiResponse } from "@/types/generic_wrapper_response/GenericWrapperResponse"
import { GenericSuccessResponse } from "@/types/GenericPostResponse"
import { getCookie, parseCookies } from "../../../cookies"
import { AKITU_DASHBOARD_USER_TOKEN } from "@/lib/raw-data/constants"

export const collabApi = createApi({
  reducerPath: "collabApi",
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

  tagTypes: ["Collabs"],

  endpoints: (builder) => ({
    getCollabs: builder.query({
      query: () => {
        return {
          url: `api/weddings/collaborators`,
        }
      },
      transformResponse: (response: ApiResponse<any>) => {
        console.log(response)
        if (response.data) return response.data
        return []
      },
      transformErrorResponse(baseQueryReturnValue) {
        if ((baseQueryReturnValue as any).originalStatus === 404) {
          return { message: "Not Found Error" }
        }
        return baseQueryReturnValue
      },
      providesTags: ["Collabs"],
    }),
    sendInvite: builder.mutation({
      query: ({ email, weddingId }: { email: string; weddingId: string }) => ({
        url: `api/weddings/${weddingId}/collaborators`,
        method: "POST",
        body: { email },
      }),
      transformResponse: (response: GenericSuccessResponse) => {
        return response
      },
      invalidatesTags: ["Collabs"],
    }),
    acceptInvite: builder.mutation({
      query: ({
        email,
        token,
        first_name,
        last_name,
        password,
      }: {
        email: string
        token: string
        first_name: string
        last_name: string
        password: string
      }) => ({
        url: `api/collab-invite?token=${token}`,
        method: "POST",
        body: { email, first_name, last_name, password },
      }),
      transformResponse: (response: GenericSuccessResponse) => {
        return response
      },
    }),
  }),
})

// Export hooks for functional components
export const {
  useGetCollabsQuery,
  useSendInviteMutation,
  useAcceptInviteMutation,
} = collabApi

// Export endpoints for use in SSR
export const { getCollabs, sendInvite, acceptInvite } = collabApi.endpoints
