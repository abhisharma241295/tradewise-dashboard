import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiResponse } from "@/types/generic_wrapper_response/GenericWrapperResponse"
import { getCookie, parseCookies } from "../../../cookies"
import { AKITU_DASHBOARD_USER_TOKEN } from "@/lib/raw-data/constants"
interface UserProfile {
  profile: {
    email: string
    first_name: string
    last_name: string
    password: string
  }
}
export const userApi = createApi({
  reducerPath: "userApi",
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

  tagTypes: ["User"],

  endpoints: (builder) => ({
    // Add your endpoints here
    getCurrentUser: builder.query<ApiResponse<UserProfile>, void>({
      query: () => ({
        url: "/api/profile",
        method: "GET",
      }),
      providesTags: ["User"],
      transformResponse: (response: ApiResponse<UserProfile>) => response,
    }),
    updateUser: builder.mutation<
      ApiResponse<any>,
      Partial<{
        email: string
        first_name: string
        last_name: string
        password: string
        role: string
      }>
    >({
      query: (userData) => ({
        url: "/api/profile",
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<ApiResponse<any>, void>({
      query: () => ({
        url: "/api/profile",
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
})

// Export hooks for functional components
export const {
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi

// Export endpoints for use in SSR
export const {
  getCurrentUser,
  updateUser,
  deleteUser,
  // Add your endpoints here
} = userApi.endpoints
