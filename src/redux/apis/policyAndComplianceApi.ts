import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie, parseCookies } from "@/lib/cookies";
import { TRADEWISE_USER_TOKEN } from "@/lib/constants";

export const policyAndComplianceApi = createApi({
  reducerPath: "policyAndComplianceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepareHeaders: (headers: any, { extra }: any) => {
      const { userToken } = parseCookies(extra?.ctx)
      headers.set(
        "user-token",
        userToken ||
        getCookie(TRADEWISE_USER_TOKEN) ||
        "NO-TOKEN-AVAILABLE"
      )
      headers.set("Authorization-Token", process.env.NEXT_PUBLIC_AUTH_TOKEN)
      return headers
    },
  }),
  tagTypes: ['PolicyAndCompliances'],
  endpoints: (builder) => ({
    getPolicyAndCompliances: builder.query({
      query: ({ category, period }: { category: string, period: string }) => ({
        url: `/api/updates?category=${category}&period=${period}`,
        method: "GET",
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: any) => {
        if (response.data) return response.data
        return []
      },
      providesTags: ['PolicyAndCompliances'],
    })
  }),
});

export const {
  useGetPolicyAndCompliancesQuery,
  // useRefreshPolicyAndCompliancesMutation
} = policyAndComplianceApi
