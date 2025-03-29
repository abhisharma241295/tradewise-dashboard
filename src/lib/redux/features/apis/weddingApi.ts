import { HYDRATE } from "next-redux-wrapper"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiResponse } from "@/types/generic_wrapper_response/GenericWrapperResponse"
import { NewWeddingType } from "@/lib/form-schema/newWeddingForm"
import { GenericSuccessResponse } from "@/types/GenericPostResponse"
import { getCookie, parseCookies } from "../../../cookies"
import { AKITU_DASHBOARD_USER_TOKEN } from "@/lib/raw-data/constants"
import WeddingOverview from "@/types/WeddingOverview"
import { WeddingCouple } from "@/types/WeddingCouple"

// Define a type for mutation requests that include a token
type MutationRequest<T> = {
  data: T
  userToken?: string
}

export const weddingApi = createApi({
  reducerPath: "weddingApi",
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

  tagTypes: ["Wedding"],

  endpoints: (builder) => ({
    // Query to get a list of weddings
    getWeddingOverview: builder.query<WeddingOverview, string>({
      query: (weddingId: string) => ({
        url: `/api/wedding/${weddingId}/overview`,
      }),
      transformErrorResponse(baseQueryReturnValue) {
        if ((baseQueryReturnValue as any).originalStatus === 404) {
          return { message: "Not Found Error" }
        }
        return baseQueryReturnValue
      },
      providesTags: ["Wedding"],
    }),

    getWeddings: builder.query({
      query: () => {
        return {
          url: "api/dashboard/wedding",
        }
      },
      transformResponse: (response: ApiResponse<{
        completed?: Array<WeddingCouple>;
        live?: Array<WeddingCouple>;
        upcoming?: Array<WeddingCouple>;
      }>) => {
        if (response.data) return response.data;
        return { completed: [], live: [], upcoming: [] };
      },
      transformErrorResponse(baseQueryReturnValue) {
        // console.log(baseQueryReturnValue)
        if ((baseQueryReturnValue as any).originalStatus === 404) {
          return { message: "Not Found Error" }
        }
        return baseQueryReturnValue
      },
      providesTags: ["Wedding"],
    }),

    // Updated mutation to add a new wedding with optional user token
    addWedding: builder.mutation<
      GenericSuccessResponse,
      MutationRequest<NewWeddingType>
    >({
      query: ({ data }) => ({
        url: "api/dashboard/wedding",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: GenericSuccessResponse) => {
        return response
      },
      invalidatesTags: ["Wedding"],
    }),
    updateWedding: builder.mutation({
      query: ({ data, weddingId }: { data: any; weddingId: string }) => ({
        url: `api/dashboard/wedding/${weddingId}`,
        method: "PUT",
        body: data,
      }),
      transformResponse: (response: GenericSuccessResponse) => response,
      invalidatesTags: ["Wedding"],
    }),
  }),
})

// Export hooks for functional components
export const {
  useGetWeddingOverviewQuery,
  useGetWeddingsQuery,
  useAddWeddingMutation,
  useUpdateWeddingMutation,
} = weddingApi

// Export endpoints for use in SSR
export const { getWeddingOverview, getWeddings, addWedding } =
  weddingApi.endpoints
