import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const customWebsiteSlugSlice = createSlice({
  name: 'customWebsiteSlug',
  initialState: { slug: '' },
  reducers: {
    updateSlug: (state, action: PayloadAction<string>) => {
      state.slug = action.payload;
    },
  },
});

export const { updateSlug } = customWebsiteSlugSlice.actions;
export default customWebsiteSlugSlice.reducer;