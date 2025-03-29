import { HYDRATE } from "next-redux-wrapper"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getCookie, parseCookies } from "../../../cookies"
import { AKITU_DASHBOARD_USER_TOKEN } from "@/lib/raw-data/constants"
import { weddingApi } from "./weddingApi"

export interface Contact {
  contact_name: string
  contact_number: string
}

export const contactsApi = createApi({
  reducerPath: "contactsApi",
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
      headers.set("content-type", "application/json")
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

  tagTypes: ["Contact"],

  endpoints: (builder) => ({
    getContacts: builder.query({
      query: (weddingId: string) => ({
        url: `/api/weddings/${weddingId}/contacts`,
        method: "GET",
      }),
      providesTags: ["Contact"],
    }),

    createContact: builder.mutation({
      query: ({ weddingId, contactData }: { weddingId: string; contactData: Contact }) => ({
        url: `/api/weddings/${weddingId}/contacts`,
        method: "POST",
        body: contactData,
      }),
      invalidatesTags: ["Contact"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          // Manually invalidate the wedding overview
          dispatch(
            weddingApi.util.invalidateTags(['Wedding'])
          )
        } catch {}
      }
    }),

    updateContact: builder.mutation({
      query: ({ weddingId, contactId, contactData }: { weddingId: string; contactId: string; contactData: Partial<Contact> }) => ({
        url: `/api/weddings/${weddingId}/contacts/${contactId}`,
        method: "PUT",
        body: contactData,
      }),
      invalidatesTags: ["Contact"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            weddingApi.util.invalidateTags(['Wedding'])
          )
        } catch {}
      }
    }),

    deleteContact: builder.mutation({
      query: ({ weddingId, contactId }: { weddingId: string; contactId: string }) => ({
        url: `/api/weddings/${weddingId}/contacts/${contactId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            weddingApi.util.invalidateTags(['Wedding'])
          )
        } catch {}
      }
    }),
  }),
})

export const {
  useGetContactsQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactsApi
