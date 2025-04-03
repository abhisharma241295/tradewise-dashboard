import { createApi, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { getCookie, parseCookies } from "@/lib/cookies";
import { TRADEWISE_USER_TOKEN } from "@/lib/constants";
interface ErrorResponse {
  message: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
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
      return headers
    },
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "/api/auth/signup",
        method: "POST",
        body: {
          // TODO: add phone number
          email: data.email,
          full_name: data.fullName,
          department: data.department,
          designation: data.designation,
          biography: data.biography,
          password: data.password,
        },
      }),
      transformErrorResponse: (response: FetchBaseQueryError) =>
        response.data as ErrorResponse,
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/api/auth/login",
        method: "POST",
        body: {
          email: data.email,
          password: data.password,
        },
      }),
      transformErrorResponse: (response: FetchBaseQueryError) =>
        response.data as ErrorResponse,
    }),
    sendVerificationCode: builder.mutation({
      query: (data) => ({
        url: "/api/auth/send-verification-code",
        method: "POST",
        body: {
          email: data.email,
        },
      }),
      transformErrorResponse: (response: FetchBaseQueryError) =>
        response.data as ErrorResponse,
    }),
    verifyCode: builder.mutation({
      query: (data) => ({
        url: "/api/auth/verify-code",
        method: "POST",
        body: {
          email: data.email,
          verification_code: data.otp,
        },
      }),
      transformErrorResponse: (response: FetchBaseQueryError) =>
        response.data as ErrorResponse,
    }),
    passwordManager: builder.mutation({
      query: (data) => ({
        url: "/api/auth/password-manager",
        method: "POST",
        body: {
          action: data.action,
          password: data.password,
        },
        headers: {
          'authToken': data.token,
        },
      }),
      transformErrorResponse: (response: FetchBaseQueryError) =>
        response.data as ErrorResponse,
    }),
    passwordResetEmail: builder.mutation({
      query: (data) => ({
        url: "/api/auth/password-reset-email",
        method: "POST",
        body: {
          email: data.email,
        },
      }), transformErrorResponse: (response: FetchBaseQueryError) =>
        response.data as ErrorResponse,
    }),
    checkEmailExist: builder.mutation({
      query: (email) => ({
        url: "/api/auth/email-exists",
        method: "POST",
        body: email
      }),
      transformErrorResponse: (response: FetchBaseQueryError) =>
        response.data as ErrorResponse,
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useSendVerificationCodeMutation,
  useVerifyCodeMutation,
  usePasswordManagerMutation,
  usePasswordResetEmailMutation,
  useCheckEmailExistMutation
} = userApi;
