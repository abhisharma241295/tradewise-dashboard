import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getCookie, parseCookies } from "../../../cookies"
import { AKITU_DASHBOARD_USER_TOKEN } from "@/lib/raw-data/constants"
import { HYDRATE } from "next-redux-wrapper"

export const websiteCreationApis = createApi({
  reducerPath: "websiteCreationApis",
  keepUnusedDataFor: Infinity,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers: any, { extra }: any) => {
      const { userToken } = parseCookies(extra?.ctx)
      headers.set(
        "user-token",
        userToken || getCookie(AKITU_DASHBOARD_USER_TOKEN) || "NO-TOKEN-AVAILABLE"
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
  tagTypes: ["WebsiteCreation"],
  endpoints: (builder) => ({
    createWebsiteUrl: builder.mutation<any, { weddingId: string; websiteSlug: string }>({
      query: ({ weddingId, websiteSlug }) => ({
        url: `/api/weddings/${weddingId}/couple-website`,
        method: 'POST',
        body: { website_slug: websiteSlug },
      }),
      invalidatesTags: ['WebsiteCreation'],
    }),

    checkWebsiteSlug: builder.query<any, string>({
      query: (slug: string) => ({
        url: `/api/weddings/check-slug?slug=${slug}`,
        method: 'GET',
      }),
      providesTags: [],
    }),

    uploadWebsiteImage: builder.mutation<any, { formData: FormData; slug: string }>({
      query: ({ formData, slug }) => ({
        url: `/api/weddings/custom-websites/upload-image?slug=${slug}`,
        method: 'POST',
        body: formData,
      }),
    }),

    uploadWebsitePdf: builder.mutation<any, { formData: FormData; slug: string }>({
      query: ({ formData, slug }) => ({
        url: `/api/weddings/custom-websites/upload-pdf?slug=${slug}`,
        method: 'POST',
        body: formData,
      }),
    }),

    createWebsiteData: builder.mutation<
      any,
      {
        weddingId: string;
        data: {
          template_id: string;
          website_slug: string;
          primary_font: string;
          secondary_font: string;
          primary_color: string;
          secondary_color: string;
          template_json_content: Array<{ section_id: string; children: any }>;
          custom_utils: any;
        };
      }
    >({
      query: ({ weddingId, data }) => ({
        url: `/api/weddings/${weddingId}/custom-websites`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['WebsiteCreation'],
    }),

    getWebsiteData: builder.query<any, { weddingId: string }>({
      query: ({ weddingId }) => ({
        url: `/api/weddings/${weddingId}/custom-websites?status=draft`,
        method: 'GET',
      }),
      providesTags: ['WebsiteCreation'],
    }),

    updateWebsiteData: builder.mutation<
      any,
      {
        weddingId: string;
        websiteSlug: string;
        status: 'draft' | 'live';
        data: {
          section_id?: string;
          section_content?: any;
          primary_color?: string;
          primary_font?: string;
        };
      }
    >({
      query: ({ weddingId, websiteSlug, status, data }) => ({
        url: `/api/weddings/${weddingId}/custom-websites?website_slug=${websiteSlug}&status=${status}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['WebsiteCreation'],
    }),
  }),
})

// Export hooks for functional components
export const {
  useCreateWebsiteUrlMutation,
  useCheckWebsiteSlugQuery,
  useUploadWebsiteImageMutation,
  useUploadWebsitePdfMutation,
  useCreateWebsiteDataMutation,
  useGetWebsiteDataQuery,
  useUpdateWebsiteDataMutation,
} = websiteCreationApis

// Export endpoints for use in SSR
export const {
  createWebsiteUrl,
  checkWebsiteSlug,
  uploadWebsiteImage,
  uploadWebsitePdf,
  createWebsiteData,
  getWebsiteData,
  updateWebsiteData,
} = websiteCreationApis.endpoints
