import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { getCookie, parseCookies } from "@/lib/cookies";
import { TRADEWISE_USER_TOKEN } from "@/lib/constants";
interface ErrorResponse {
  message: string;
}

export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepareHeaders: (headers: any, { extra }: any) => {
      const { userToken } = parseCookies(extra?.ctx);
      headers.set(
        "user-token",
        userToken || getCookie(TRADEWISE_USER_TOKEN) || "NO-TOKEN-AVAILABLE"
      );
      return headers;
    },
  }),
  tagTypes: ["subscription"],
  endpoints: (builder) => ({
    getSubscriptionDetails: builder.query({
      query: () => ({
        url: "/api/subscriptions/details",
        method: "GET",
      }),
      // transformResponse: (response: ApiResponse<any>) => {
      //     if (response.data) return response.data
      //     return []
      // },
      providesTags: ["subscription"],
    }),
    createCheckoutSession: builder.mutation({
      query: (data) => ({
        url: "/api/subscriptions/checkout-session",
        method: "POST",
        body: data,
      }),
      transformErrorResponse: (response: FetchBaseQueryError) =>
        response.data as ErrorResponse,
      invalidatesTags: ["subscription"],
    }),
    upgradeBilling: builder.mutation({
      query: (data) => ({
        url: "/api/subscriptions/billing-upgrade",
        method: "PUT",
        body: data,
      }),
      transformErrorResponse: (response: FetchBaseQueryError) =>
        response.data as ErrorResponse,
      invalidatesTags: ["subscription"],
    }),

  }),
});

export const {
  useGetSubscriptionDetailsQuery,
  useCreateCheckoutSessionMutation,
  useUpgradeBillingMutation
} = subscriptionApi;
