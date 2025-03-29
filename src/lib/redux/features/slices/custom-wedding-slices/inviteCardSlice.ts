import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const inviteCardSlice = createSlice({
  name: 'inviteCard',
  initialState: {
    saveButtonForInviteVisible: false,
    inviteCardData: {
      groom_name: "Leigh A",
      bride_name: "Samuel B",
      wedding_date: "2025-03-10T18:30:00.000Z",
      venue: "Summer Banquet",
      location: "New York",
      primary_font: {
        name: "Ephesis",
        url: "https://fonts.googleapis.com/css2?family=Ephesis&display=swap",
        cssStyleName: "Ephesis, serif"
      },
      secondary_font: {
        name: "Montserrat",
        url: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
        cssStyleName: "Montserrat, serif"
      },
      primary_color: '',
      secondary_color: '',
      template_id: "1",
      couple_image: ''
    },
    selectedInviteCard: ''
  },
  reducers: {
    updateInviteCardData: (state, action: PayloadAction<any>) => {
      state.inviteCardData = action.payload
    },
    updateFontForInvite: (state, action: PayloadAction<any>) => {
      state.inviteCardData.primary_font = action.payload.primary,
        state.inviteCardData.secondary_font = action.payload.secondary
    },
    updatePreviousInviteCardId: (state, action: PayloadAction<any>) => {
      state.selectedInviteCard = action.payload
    },
    updateSaveButtonVisibilityForInvite: (state, action: PayloadAction<boolean>) => {
      state.saveButtonForInviteVisible = action.payload
    },
  },
});

export const {
  updateInviteCardData,
  updateFontForInvite,
  updatePreviousInviteCardId,
  updateSaveButtonVisibilityForInvite
} = inviteCardSlice.actions;
export default inviteCardSlice.reducer;