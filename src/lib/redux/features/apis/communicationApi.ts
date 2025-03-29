import { HYDRATE } from "next-redux-wrapper"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiResponse } from "@/types/generic_wrapper_response/GenericWrapperResponse"
import { GenericSuccessResponse } from "@/types/GenericPostResponse"
import { getCookie, parseCookies } from "../../../cookies"
import { AKITU_DASHBOARD_USER_TOKEN } from "@/lib/raw-data/constants"

export const communicationApi = createApi({
    reducerPath: "communicationApi",
    keepUnusedDataFor: Infinity,

    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
        prepareHeaders: (headers: any, { extra }: any) => {
            // console.log()
            const { userToken } = parseCookies(extra?.ctx)
            headers.set("user-token", userToken || getCookie(AKITU_DASHBOARD_USER_TOKEN) || "NO-TOKEN-AVAILABLE")
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

    tagTypes: ["communication"],

    endpoints: (builder) => ({
        getCommunicationGroupMessage: builder.query({
            query: (params: {
                currentWeddingId: string
                pagination?: Partial<{
                    limit?: number
                }>
            }) => {
                const { currentWeddingId, pagination = {} } = params
                const queryParams = new URLSearchParams()
                if (pagination.limit)
                    queryParams.set("limit", pagination.limit.toString())
                const queryString = queryParams.toString()
                return {
                    url: `api/weddings/${currentWeddingId}/communication-groups${queryString ? `?${queryString}` : ""}`,
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
            providesTags: ["communication"],
        }),
        addCommGroup: builder.mutation({
            query: ({ weddingId, body }: { weddingId: string; body: any }) => ({
                url: `api/weddings/${weddingId}/communication-groups`,
                method: 'POST',
                body: body,
            }),
            transformResponse: (response: ApiResponse<any>) => {
                return response
            },
            invalidatesTags: ["communication"],
        }),
        updateCommGroup: builder.mutation({
            query: ({
                weddingId,
                groupId,
                body
            }: {
                weddingId: string,
                groupId: string,
                body: any
            }) => ({
                url: `api/weddings/${weddingId}/communication-groups/${groupId}`,
                method: "PUT",
                body: body,
            }),
            transformResponse: (response: GenericSuccessResponse) => {
                return response
            },
            invalidatesTags: ["communication"],
        }),
        deleteCommGroup: builder.mutation({
            query: ({
                weddingId,
                groupId
            }: {
                weddingId: string,
                groupId: string
            }) => ({
                url: `api/weddings/${weddingId}/communication-groups/${groupId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["communication"]
        }),

        addMessage: builder.mutation({
            query: ({
                groupId,
                message_content
            }: {
                groupId: string,
                message_content: string
            }) => ({
                url: `api/comm-groups/${groupId}/messages`,
                method: "POST",
                body: { message_content },
            }),
            transformResponse: (response: ApiResponse<any>) => {
                if (response.data) return response.data
                return []
            },
            invalidatesTags: ["communication"],
        }),
        deleteMessage: builder.mutation({
            query: ({
                groupId,

            }: {
                groupId: string

            }) => ({
                url: `api/comm-groups/${groupId}`,
                method: "DELETE",
            }),
            transformResponse: (response: GenericSuccessResponse) => {
                return response
            },
            invalidatesTags: ["communication"],
        }),
        getMessages: builder.query({
            query: (groupId) => ({
                url: `api/comm-groups/${groupId}/messages`,
                method: "GET",
            }),
            transformResponse: (response: ApiResponse<any>) => {
                if (response.data) return response.data
                return []
            },
            providesTags: ["communication"],
        }),
        deleteConversation: builder.mutation({
            query: ({
                groupId,
            }: {
                groupId: string
            }) => ({
                url: `api/comm-groups/${groupId}/messages`,
                method: "DELETE",
            }),
            transformResponse: (response: GenericSuccessResponse) => {
                return response
            },
            invalidatesTags: ["communication"],
        }),
    }),
})
export const {
    useGetCommunicationGroupMessageQuery,
    useAddCommGroupMutation,
    useUpdateCommGroupMutation,
    useDeleteCommGroupMutation,
    useAddMessageMutation,
    useDeleteMessageMutation,
    useGetMessagesQuery,
    useDeleteConversationMutation
} = communicationApi;

export const { getCommunicationGroupMessage, addCommGroup, updateCommGroup, deleteCommGroup, addMessage, deleteMessage, getMessages, deleteConversation } = communicationApi.endpoints;
