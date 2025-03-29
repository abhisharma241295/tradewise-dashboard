import { setCookie, getCookie, eraseCookie } from "@/lib/cookies"
import {
  AKITU_DASHBOARD_USER_DATA,
  AKITU_DASHBOARD_USER_TOKEN,
} from "@/lib/raw-data/constants"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Onboarding {
  designation: string | null
  purpose: string | null
  source: string | null
}

interface Address {
  state: string | null
  city: string | null
}

export interface AuthState {
  isVerified: boolean
  isOnboarded: boolean
  userName: string
  userEmail: string
  days: number
  token: string
  onboardingData: Onboarding | null
  address: Address | null
}

const initialState: AuthState = {
  isVerified: false,
  isOnboarded: false,
  userName: "",
  userEmail: "",
  days: 0,
  token: "",
  onboardingData: {
    designation: null,
    purpose: null,
    source: null,
  },
  address: {
    state: null,
    city: null,
  },
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      setCookie(
        AKITU_DASHBOARD_USER_TOKEN,
        action.payload.token,
        action.payload.days
      )
      setCookie(
        AKITU_DASHBOARD_USER_DATA,
        {
          userName: action.payload.userName,
          userEmail: action.payload.userEmail,
          isOnboarded: action.payload.isOnboarded,
          isVerified: action.payload.isVerified,
        },
        action.payload.days
      )
      state.isVerified = action.payload.isVerified
      state.isOnboarded = action.payload.isOnboarded
      state.userName = action.payload.userName
      state.userEmail = action.payload.userEmail
      state.token = action.payload.token
    },
    updateCredentials: (state, action: PayloadAction<AuthState>) => {
      const userPrevData = getCookie(AKITU_DASHBOARD_USER_DATA)
      setCookie(
        AKITU_DASHBOARD_USER_DATA,
        {
          ...userPrevData,
          onboardingData: action.payload.onboardingData
            ? action.payload.onboardingData
            : state.onboardingData,
          address: action.payload.address
            ? action.payload.address
            : state.address,
          isOnboarded: action.payload.isOnboarded
            ? action.payload.isOnboarded
            : state.isOnboarded,
          isVerified: action.payload.isVerified
            ? action.payload.isVerified
            : state.isVerified,
        },
        action.payload.days
      )
      state.isVerified = action.payload.isVerified
        ? action.payload.isVerified
        : state.isVerified
      state.isOnboarded = action.payload.isOnboarded
        ? action.payload.isOnboarded
        : state.isOnboarded
      state.onboardingData = action.payload.onboardingData
        ? action.payload.onboardingData
        : state.onboardingData
      state.address = action.payload.address
        ? action.payload.address
        : state.address
      state.token = action.payload.token ? action.payload.token : state.token
    },

    setVerificationStatus: (state, action: PayloadAction<boolean>) => {
      state.isVerified = action.payload
    },

    setOnboardingStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnboarded = action.payload
    },
    logout: (state) => {
      localStorage.removeItem("persist:root")
      eraseCookie(AKITU_DASHBOARD_USER_TOKEN)
      eraseCookie(AKITU_DASHBOARD_USER_DATA)
      eraseCookie("currentWedding")
      Object.assign(state, initialState)
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload
    },
  },
})

export const {
  setCredentials,
  updateCredentials,
  logout,
  setEmail,
  setVerificationStatus,
  setOnboardingStatus,
} = authSlice.actions

export default authSlice.reducer
