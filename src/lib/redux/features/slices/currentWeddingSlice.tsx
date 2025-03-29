import { saveCurrentWedding } from "@/lib/cookies/currentWeddingCookie"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  currentWeddingId: string | null
}

const initialState: AuthState = {
  currentWeddingId: null,
}

const currentWeddingSlice = createSlice({
  name: "currentWedding",
  initialState,
  reducers: {
    setCurrentWedding: (state, action: PayloadAction<string | null>) => {
      saveCurrentWedding(action.payload)
      state.currentWeddingId = action.payload
    },
    clearWedding: (state) => {
      state.currentWeddingId = null
      saveCurrentWedding(null)
    },
  },
})

export const { setCurrentWedding, clearWedding } = currentWeddingSlice.actions

export default currentWeddingSlice.reducer
