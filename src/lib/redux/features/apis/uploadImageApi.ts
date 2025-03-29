import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getCookie, parseCookies } from "../../../cookies"
import { AKITU_DASHBOARD_USER_TOKEN } from "@/lib/raw-data/constants"
import { HYDRATE } from "next-redux-wrapper"

export const uploadImageApi = createApi({
  reducerPath: "uploadImageApi",
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

  tagTypes: ["UploadImage"],

  endpoints: (builder) => ({
    // Add your endpoints here
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: "/api/wedding/upload-image",
        method: "POST",
        body: formData,
        formData: true,
      }),
      transformResponse: (response: {
        status: string
        message: string
        timestamp: string
        data: {
          image_url: string
        }
      }) => {
        console.log(response)
        return response.data.image_url || ""
      },
    }),
  }),
})

// Export hooks for functional components
export const {
  // Add your hooks here
  useUploadImageMutation,
} = uploadImageApi

// Export endpoints for use in SSR
export const {
  // Add your endpoints here
  uploadImage,
} = uploadImageApi.endpoints
