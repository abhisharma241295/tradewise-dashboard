import { HYDRATE } from "next-redux-wrapper"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiResponse } from "@/types/generic_wrapper_response/GenericWrapperResponse"
import { GenericSuccessResponse } from "@/types/GenericPostResponse"
import { getCookie, parseCookies } from "../../../cookies"
import { AKITU_DASHBOARD_USER_TOKEN } from "@/lib/raw-data/constants"

export const notificationApi = createApi({
    reducerPath: "notificationApi",
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

    tagTypes: ["notifications"],

    endpoints: (builder) => ({
        getNotifications: builder.query({
            query: () => {
                return {
                    url: `api/notifications`,
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
            providesTags: ["notifications"],
        }),

        markAsRead: builder.mutation({
            query: ({
                notification_ids
            }) => ({
                url: `api/notifications`,
                method: "PUT",
                body: {
                    notification_ids
                }
            }),
            transformResponse: (response: GenericSuccessResponse) => {
                return response
            },
            invalidatesTags: ["notifications"],
        }),

    }),
})

// Export hooks for functional components
export const {
    useGetNotificationsQuery,
    useMarkAsReadMutation,


} = notificationApi

// Export endpoints for use in SSR
export const { getNotifications, markAsRead } = notificationApi.endpoints