import Theme1MappingValue from '@/components/custom-website-themes/mappings/theme1';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Section } from '@/components/custom-website-themes/mappings/theme1';

const theme1Slice = createSlice({
  name: 'theme1',
  initialState: {
    ...Theme1MappingValue, saveButtonVisible: false
  },
  reducers: {
    updateEnableStatus: (state, action: PayloadAction<{
      section: Section,
      enable: boolean
    }>) => {
      const sectionIndex = state.sections.findIndex(section => section.name === action.payload.section);
      if (sectionIndex !== -1) {
        state.sections[sectionIndex].enabled = action.payload.enable;
      }
    },
    updateTheme: (state, action: PayloadAction<any>) => {
      // console.log(action.payload)
      state.primaryColor = action.payload.primary,
        state.secondaryColor = action.payload.secondary,
        state.custom_utils.tertiaryColor = action.payload.tertiary,
        state.custom_utils.quaternaryColor = action.payload.quaternary
    },
    updateFont: (state, action: PayloadAction<any>) => {
      state.primaryFont = action.payload.primary,
        state.secondaryFont = action.payload.secondary
    },
    updateSaveButtonVisibility: (state, action: PayloadAction<boolean>) => {
      state.saveButtonVisible = action.payload
    },
    updateHeroSection: (state, action: PayloadAction<any>) => {
      const sectionIndex = state.sections.findIndex(section => section.name === Section.Hero);
      if (sectionIndex !== -1) {
        state.sections[sectionIndex].children = action.payload;
      }
    },
    updateCoupleInfoSection: (state, action: PayloadAction<any>) => {
      const sectionIndex = state.sections.findIndex(section => section.name === Section.CoupleInfo);
      if (sectionIndex !== -1) {
        state.sections[sectionIndex].children = action.payload;
      }
    },
    updateReverseTimerSection: (state, action: PayloadAction<any>) => {
      const sectionIndex = state.sections.findIndex(section => section.name === Section.ReverseTimer);
      if (sectionIndex !== -1) {
        state.sections[sectionIndex].children = action.payload;
      }
    },
    updateOurStorySection: (state, action: PayloadAction<any>) => {
      const sectionIndex = state.sections.findIndex(section => section.name === Section.OurStory);
      if (sectionIndex !== -1) {
        state.sections[sectionIndex].children = action.payload;
      }
    },
    updateWeddingDateSection: (state, action: PayloadAction<any>) => {
      const sectionIndex = state.sections.findIndex(section => section.name === Section.WeddingDate);
      if (sectionIndex !== -1) {
        state.sections[sectionIndex].children = action.payload;
      }
    },
    updateWeddingTimelineSection: (state, action: PayloadAction<any>) => {
      const sectionIndex = state.sections.findIndex(section => section.name === Section.WeddingTimeline);
      if (sectionIndex !== -1) {
        state.sections[sectionIndex].children = action.payload;
      }
    },
    updateGallerySection: (state, action: PayloadAction<any>) => {
      const sectionIndex = state.sections.findIndex(section => section.name === Section.Gallery);
      if (sectionIndex !== -1) {
        state.sections[sectionIndex].children = action.payload;
      }
    },
    updateQandASection: (state, action: PayloadAction<any>) => {
      const sectionIndex = state.sections.findIndex(section => section.name === Section.QandA);
      if (sectionIndex !== -1) {
        state.sections[sectionIndex].children = action.payload;
      }
    },
    updateFoodMenuSection: (state, action: PayloadAction<any>) => {
      const sectionIndex = state.sections.findIndex(section => section.name === Section.FoodMenu);
      if (sectionIndex !== -1) {
        state.sections[sectionIndex].children = action.payload;
      }
    },
    updateRsvpFormSection: (state, action: PayloadAction<any>) => {
      const sectionIndex = state.sections.findIndex(section => section.name === Section.RsvpForm);
      if (sectionIndex !== -1) {
        state.sections[sectionIndex].children = action.payload;
      }
    },
    updateMarqueeDemoSection: (state, action: PayloadAction<any>) => {
      const sectionIndex = state.sections.findIndex(section => section.name === Section.MarqueeDemo);
      if (sectionIndex !== -1) {
        state.sections[sectionIndex].children = action.payload;
      }
    },
    updateFooterSection: (state, action: PayloadAction<any>) => {
      const sectionIndex = state.sections.findIndex(section => section.name === Section.Footer);
      if (sectionIndex !== -1) {
        state.sections[sectionIndex].children = action.payload;
      }
    },
    updateBoilerplateValues: (state, action: PayloadAction<any>) => {
      console.log("TESTING123", action.payload)
      const templateContent = action.payload?.template_json_content?.[0] ?? {};
      // const { sections = [], ...rest } = templateContent;
      // state.sections = sections;
      // Object.assign(state, rest);
      // console.log(templateContent)
      for (let i = 0; i < state.sections.length; i++) {
        const section = state.sections[i];
        if (templateContent[section.name]) {
          state.sections[i] = {
            ...section,
            ...templateContent[section.name],
          };
          state.sections[i].enabled = templateContent[section.name].children.enabled !== undefined ? templateContent[section.name].children.enabled : true;
        }

      }
      state.primaryColor = action?.payload?.primary_color ?? Theme1MappingValue.primaryColor;
      state.secondaryColor = action?.payload?.secondary_color ?? Theme1MappingValue.secondaryColor;
      state.primaryFont = action?.payload?.primary_font ?? Theme1MappingValue.primaryFont;
      state.secondaryFont = action?.payload?.secondary_font ?? Theme1MappingValue.secondaryFont;
      state.custom_utils.tertiaryColor = action.payload?.custom_utils?.tertiary_color ?? "#E5D4BD";
      state.custom_utils.quaternaryColor = action.payload?.custom_utils?.quaternary_color ?? "#FAF8F7";
      state.custom_utils.tertiaryFont = action.payload?.custom_utils?.tertiary_font ?? {
        name: "Alex Brush",
        url: "https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap",
        cssStyleName: "Alex Brush, cursive"
      };
    },
    updateUtils: (state, action: PayloadAction<any>) => {
      state.custom_utils = {
        ...state.custom_utils,
        ...action.payload
      }

    },
  },
});

export const {
  updateTheme,
  updateHeroSection,
  updateCoupleInfoSection,
  updateReverseTimerSection,
  updateOurStorySection,
  updateWeddingDateSection,
  updateWeddingTimelineSection,
  updateGallerySection,
  updateQandASection,
  updateFoodMenuSection,
  updateRsvpFormSection,
  updateMarqueeDemoSection,
  updateFooterSection,
  updateSaveButtonVisibility,
  updateBoilerplateValues,
  updateEnableStatus,
  updateFont,
  updateUtils,
} = theme1Slice.actions;
export default theme1Slice.reducer;