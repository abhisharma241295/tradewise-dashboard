import { HYDRATE } from "next-redux-wrapper"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getCookie, parseCookies } from "../../../cookies"
import { AKITU_DASHBOARD_USER_TOKEN } from "@/lib/raw-data/constants"
import { ApiResponse } from "@/types/generic_wrapper_response/GenericWrapperResponse"
import { GenericSuccessResponse } from "@/types/GenericPostResponse"


export interface PaginationParams {
    page?: number
    perPage?: number
    search?: string
    sortBy?: string
    sortDir?: "asc" | "desc"
}

export const groupApi = createApi({
    reducerPath: "groupApi",
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
        getGroupList: builder.query({
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

        addGroup: builder.mutation({
            query: ({ currentWeddingId, group_name, guest_list }) => ({
                url: `/api/weddings/${currentWeddingId}/groups`,
                method: "POST",
                body: {
                    group_name,
                    guest_list
                },
            }),
            transformResponse: (response: GenericSuccessResponse) => {
                return response
            },
            invalidatesTags: ["Rsvp"],
        }),

        updateGroup: builder.mutation({
            query: ({ currentWeddingId, groupId, group_name, guest_list }) => ({
                url: `/api/weddings/${currentWeddingId}/groups/${groupId}`,
                method: "PUT",
                body: {
                    group_name,
                    guest_list,
                },
            }),
            invalidatesTags: ["Rsvp"]
        }),

        deleteGroup: builder.mutation({
            query: ({
                currentWeddingId,
                groupId
            }: {
                currentWeddingId: string,
                groupId: string
            }) => ({
                url: `api/weddings/${currentWeddingId}/groups/${groupId}`,
                method: "DELETE",
            }),
            transformResponse: (response: GenericSuccessResponse) => {
                return response
            },
            invalidatesTags: ["Rsvp"]
        }),
        getGroups: builder.query({
            query: (currentWeddingId) => ({
                url: `api/weddings/${currentWeddingId}/groups`,
                method: "GET",
            }),
            transformResponse: (response: ApiResponse<any>) => {
                if (response.data) return response.data
                return []
            },

            providesTags: ["Rsvp"],
        }),




    }),
})

// Export hooks for components
export const {
    useAddGroupMutation,
    useUpdateGroupMutation,
    useDeleteGroupMutation,
    useGetGroupsQuery,
} = groupApi

// Export endpoints for use in SSR
export const { getGroups, addGroup, updateGroup, deleteGroup } = groupApi.endpoints
