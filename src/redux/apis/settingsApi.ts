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

export const settingsApi = createApi({
  reducerPath: "settingsApi",
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
  tagTypes: ["notificationPerference"],
  endpoints: (builder) => ({
    getNotificationPreferences: builder.query({
      query: () => ({
        url: "/api/settings/notification-preferences",
        method: "GET",
      }),
      // transformResponse: (response: ApiResponse<any>) => {
      //     if (response.data) return response.data
      //     return []
      // },
      providesTags: ["notificationPerference"],
    }),
    createNotificationPreferences: builder.mutation({
      query: (data) => ({
        url: "/api/settings/notification-preferences",
        method: "POST",
        body: data,
      }),
      transformErrorResponse: (response: FetchBaseQueryError) =>
        response.data as ErrorResponse,
      invalidatesTags: ["notificationPerference"],
    }),
    updateNotificationPreferences: builder.mutation({
      query: (data) => ({
        url: "/api/settings/notification-preferences",
        method: "PUT",
        body: data,
      }),
      transformErrorResponse: (response: FetchBaseQueryError) =>
        response.data as ErrorResponse,
      invalidatesTags: ["notificationPerference"],
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: "/api/settings/update-profile",
        method: "PUT",
        body: data,
      }),
      transformErrorResponse: (response: FetchBaseQueryError) =>
        response.data as ErrorResponse,
    }),
  }),
});

export const {
  useGetNotificationPreferencesQuery,
  useCreateNotificationPreferencesMutation,
  useUpdateNotificationPreferencesMutation,
  useUpdateUserProfileMutation,
} = settingsApi;
