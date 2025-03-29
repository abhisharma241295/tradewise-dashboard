import { createSlice } from "@reduxjs/toolkit"

// const [page, setPage] = useState(0);
//   const [direction, setDirection] = useState(0);
interface OnboardingSliderPageState {
  page: number
  direction: number
}

const initialState: OnboardingSliderPageState = {
  page: 0,
  direction: 0,
}

const onboardingSliderPageSlice = createSlice({
  name: "onboardingSliderPage",
  initialState,
  reducers: {
    moveNext: (state) => {
      state.direction = 1
      state.page = Math.min(state.page + 1, 3)
    },
    movePrev: (state) => {
      state.direction = -1
      state.page = Math.max(state.page - 1, 0)
    },
  },
})

export const { moveNext, movePrev } = onboardingSliderPageSlice.actions

export default onboardingSliderPageSlice.reducer
