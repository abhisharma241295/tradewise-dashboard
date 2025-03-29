import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface OnboardingDataState {
  country: string | null
  city: string | null
  state: string | null
  designation: string | null
  purpose: string | null
  source: string | null
}

const initialState: OnboardingDataState = {
  country: null,
  city: null,
  designation: null,
  state: null,
  purpose: null,
  source: null,
}

const onboardingDataSlice = createSlice({
  name: "onboardingData",
  initialState,
  reducers: {
    setBasicInformation: (
      state,
      action: PayloadAction<{
        country: string
        city: string
        state: string
        designation: string
      }>
    ) => {
      state.country = action.payload.country
      state.city = action.payload.city
      state.state = action.payload.state
      state.designation = action.payload.designation
    },
    setPurpose: (state, action: PayloadAction<string>) => {
      state.purpose = action.payload
    },
    setSource: (state, action: PayloadAction<string>) => {
      state.source = action.payload
    },
  },
})

export const { setBasicInformation, setPurpose, setSource } =
  onboardingDataSlice.actions

export default onboardingDataSlice.reducer
