import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"
import AppearanceOptions from "./sidepanel-components/AppearanceOptions"
import WebsiteTemplateChooser from "./sidepanel-components/WebsiteTemplateChooser"
import ContentOptions from "./sidepanel-components/ContentOptions"
import { Divider } from "primereact/divider"
import { SingleSelect } from "../../commons/SingleSelect"
import HeroOptions from "./sidepanel-components/theme1/1HeroOptions"
import CoupleInfoOptions from "./sidepanel-components/theme1/2CoupleInfoOptions"
import ReverseTimerOptions from "./sidepanel-components/theme1/3ReverseTimerOptions"
import OurStoryOptions from "./sidepanel-components/theme1/4OurStoryOptions"
import WeddingDateOptions from "./sidepanel-components/theme1/5WeddingDateOptions"
import WeddingTimelineOptions from "./sidepanel-components/theme1/6WeddingTimelineOptions"
import GalleryOptions from "./sidepanel-components/theme1/7GalleryOptions"
import QandAOptions from "./sidepanel-components/theme1/8QandAOptions"
import FoodMenuOptions from "./sidepanel-components/theme1/9FoodMenuOptions"
import RsvpFormOptions from "./sidepanel-components/theme1/10RsvpFormOptions"
import MarqueeDemoOptions from "./sidepanel-components/theme1/11MarqueeDemoOptions"
import FooterOptions from "./sidepanel-components/theme1/12FooterOptions"
import { Button } from "primereact/button"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { cn } from "@/lib/utils/cn"
import {
  updateSaveButtonVisibility,
  updateTheme,
  updateFont,
  updateUtils,
} from "@/lib/redux/features/slices/custom-wedding-slices/theme1Slice"
import { useUpdateWebsiteDataMutation } from "@/lib/redux/features/apis/websiteCreationApis"
import { getCurrentWedding } from "@/lib/cookies/currentWeddingCookie"
import { theme1Colors } from "@/components/custom-website-themes/mappings/theme1/colors"
import {
  fontOptions,
  fontPrimaryOptionsForInvite,
  fontSecondaryOptionsForInvite,
} from "@/components/custom-website-themes/mappings/theme1/fontsOptions"
import { toast } from "sonner"
import InviteTemplateChooser from "./sidepanel-components/InviteTemplateChooser"
import ContentOptionsForInvites from "./sidepanel-components/ContentOptionsForInvites"
import CoupleInfoOptionsForInvite from "./sidepanel-components/invites/1CoupleInfoOptionsForInvite"
import WeddingInfoOptionsForInvite from "./sidepanel-components/invites/2WeddingInfoOptionsForInvite"
import {
  useCreateInviteMutation,
  useUpdateInviteMutation,
} from "@/lib/redux/features/apis/inviteApi"
import AppearanceOptionsForInvite from "./sidepanel-components/AppearanceOptionsForInvite"
import {
  updateSaveButtonVisibilityForInvite,
  updateFontForInvite,
} from "@/lib/redux/features/slices/custom-wedding-slices/inviteCardSlice"

type NavigationState = {
  currentPage: string
  previousPage: string | null
  title: string
}

interface Props {
  tabMode: "desktop" | "mobile" | "email"
  setSelectedInviteTemplate: (string) => void
  selectedInviteTemplate: string
}

export default function CreateSidePanel({
  tabMode,
  setSelectedInviteTemplate,
  selectedInviteTemplate,
}: Props) {
  const [navigation, setNavigation] = useState<NavigationState>({
    currentPage: "main",
    previousPage: null,
    title: "",
  })

  const inviteCardData = useAppSelector(
    (state) => state.inviteCard.inviteCardData
  )

  const selectedInviteCard = useAppSelector(
    (state) => state.inviteCard.selectedInviteCard
  )

  const navigateTo = (page: string, title: string) => {
    setNavigation({
      currentPage: page,
      previousPage: navigation.currentPage,
      title,
    })
  }
  const dispatch = useAppDispatch()
  const goBack = () => {
    if (navigation.previousPage) {
      setNavigation({
        currentPage: navigation.previousPage,
        previousPage: null,
        title: "",
      })
    }
  }
  const saveStatus = useAppSelector((state) => state.theme1.saveButtonVisible)
  const saveStatusForInvite = useAppSelector(
    (state) => state.inviteCard.saveButtonForInviteVisible
  )

  const [updateWebsiteData, { isLoading, error, isError }] =
    useUpdateWebsiteDataMutation()
  const [createInvite] = useCreateInviteMutation()
  const [updateInvite] = useUpdateInviteMutation()

  const weddingId =
    useAppSelector((state: any) => state.currentWedding.currentWeddingId) ||
    getCurrentWedding()
  const websiteSlug = useAppSelector((state) => state.customWebsiteSlug.slug)
  const theme1Data = useAppSelector((state) => state.theme1)
  async function saveData(currentPage: string) {
    if (currentPage === "appearance") {
      //update theme and font only.
      const body = {
        section_id: " ",
        section_content: {
          temp: "",
        },
        primary_color: theme1Data.primaryColor,
        secondary_color: theme1Data.secondaryColor,
        custom_utils: {
          tertiary_color: theme1Data.custom_utils.tertiaryColor,
          quaternary_color: theme1Data.custom_utils.quaternaryColor,
          tertiary_font: theme1Data.custom_utils.tertiaryFont,
        },
        primary_font: theme1Data.primaryFont,
        secondary_font: theme1Data.secondaryFont,
      }
      try {
        await updateWebsiteData({
          weddingId,
          websiteSlug,
          status: "draft",
          data: body,
        }).unwrap()
        // dispatch(updateSaveButtonVisibility(false));
      } catch (error) {
        console.error("Failed to save data:", error)
      }
      return
    }
    let data = {}
    const sectionData = theme1Data.sections.find(
      (section: { name: string; children: any }) => section.name === currentPage
    )
    if (sectionData) {
      data = { ...sectionData.children, enabled: sectionData.enabled }
    }
    // data.enabled=(sectionData.children.enabled==="enabled");
    if (Object.keys(data).length !== 0) {
      try {
        await updateWebsiteData({
          weddingId,
          websiteSlug,
          status: "draft",
          data: {
            section_id: currentPage,
            section_content: data,
          },
        }).unwrap()
        // dispatch(updateSaveButtonVisibility(false));
      } catch (error) {
        console.error("Failed to save data:", error)
      }
    }
  }

  function handleThemeSelect(theme: {
    primary: string
    secondary: string
    tertiary: string
    quaternary: string
  }): void {
    dispatch(updateTheme(theme))
    dispatch(updateSaveButtonVisibility(true))
  }

  function handleFontSelect(selectedFont: any) {
    dispatch(
      updateFont({
        primary: {
          name: selectedFont.raw.name,
          url: selectedFont.raw.url,
          cssStyleName: selectedFont.raw.cssStyleName,
        },
        secondary: theme1Data.secondaryFont, // Keep existing secondary font
      })
    )
    dispatch(updateSaveButtonVisibility(true))
  }

  function handleFontSelectForInvite(selectedFont: any) {
    dispatch(
      updateFontForInvite({
        primary: {
          name: selectedFont.raw.name,
          url: selectedFont.raw.url,
          cssStyleName: selectedFont.raw.cssStyleName,
        },
        secondary: inviteCardData.secondary_font, // Keep existing secondary font
      })
    )
    dispatch(updateSaveButtonVisibilityForInvite(true))
  }

  useEffect(() => {
    if (isError && error) {
      toast.error("Failed to update website data. Please try again.")
    }
  }, [isError, error])

  function handleSecondaryFontSelect(selectedOption: any): void {
    dispatch(
      updateFont({
        secondary: {
          name: selectedOption.raw.name,
          url: selectedOption.raw.url,
          cssStyleName: selectedOption.raw.cssStyleName,
        },
        primary: theme1Data.primaryFont, // Keep existing primary font
      })
    )
    dispatch(updateSaveButtonVisibility(true))
  }

  function handleSecondaryFontSelectForInvite(selectedOption: any): void {
    dispatch(
      updateFontForInvite({
        secondary: {
          name: selectedOption.raw.name,
          url: selectedOption.raw.url,
          cssStyleName: selectedOption.raw.cssStyleName,
        },
        primary: inviteCardData.primary_font, // Keep existing primary font
      })
    )
    dispatch(updateSaveButtonVisibilityForInvite(true))
  }

  function handleTertiaryFontSelect(selectedOption: any): void {
    dispatch(
      updateUtils({
        tertiaryFont: selectedOption.raw,
      })
    )
    dispatch(updateSaveButtonVisibility(true))
  }

  const handleCreateInviteCard = async () => {
    if (selectedInviteCard) {
      await updateInvite({
        weddingId,
        body: {
          ...inviteCardData,
          primary_font: inviteCardData.primary_font,
          secondary_font: inviteCardData.secondary_font,
          template_id: selectedInviteTemplate,
        },
      })
    } else {
      await createInvite({
        weddingId,
        body: {
          ...inviteCardData,
          primary_font: inviteCardData.primary_font,
          secondary_font: inviteCardData.secondary_font,
          template_id: selectedInviteTemplate,
        },
      })
    }
  }
  console.log("&&&", saveStatusForInvite)
  return (
    <div className="h-full">
      <div className="relative h-full overflow-hidden">
        {/* Main Page */}
        <div
          className={`absolute inset-0 transform transition-transform duration-300 ease-in-out ${
            navigation.currentPage === "main"
              ? "translate-x-0"
              : "-translate-x-full"
          }`}
        >
          <div className="editor h-full overflow-auto p-2">
            {tabMode === "email" ? (
              <InviteTemplateChooser
                setSelectedInviteTemplate={setSelectedInviteTemplate}
                selectedInviteTemplate={selectedInviteTemplate}
              />
            ) : (
              <WebsiteTemplateChooser />
            )}
            <Divider />
            {tabMode === "email" ? (
              <AppearanceOptionsForInvite
                onNavigate={(title) => navigateTo("appearance_invite", title)}
              />
            ) : (
              <AppearanceOptions
                onNavigate={(title) => navigateTo("appearance", title)}
              />
            )}
            <Divider />
            {tabMode === "email" ? (
              <ContentOptionsForInvites
                onNavigate={(title, section) => navigateTo(section, title)}
              />
            ) : (
              <ContentOptions
                onNavigate={(title, section) => navigateTo(section, title)}
              />
            )}{" "}
          </div>
        </div>

        {/* Secondary Page */}
        <div
          className={`absolute inset-0 transform bg-white transition-transform duration-300 ease-in-out ${
            navigation.currentPage !== "main"
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center space-x-3 border-b p-4">
              <button
                onClick={goBack}
                className="text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-lg font-semibold">{navigation.title}</h2>
            </div>
            <div className="flex-1 overflow-auto p-4">
              {navigation.currentPage === "appearance" ? (
                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Color Theme
                    </label>
                    <div className="flex gap-4">
                      <div className="flex flex-row justify-center gap-2 md:gap-4">
                        {theme1Colors.map((theme, index) => (
                          <button
                            onClick={() => handleThemeSelect(theme)}
                            key={index}
                            className={cn(
                              `h-min !cursor-pointer rounded-full border-4 transition-all`,
                              theme.primary === theme1Data.primaryColor &&
                                theme.secondary === theme1Data.secondaryColor
                                ? "border-primary"
                                : "border-transparent"
                            )}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 34 34"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="md:h-[34px] md:w-[34px]"
                            >
                              <path
                                d="M8.50002 31.7225C12.4047 33.9768 17.0449 34.5877 21.3999 33.4208C25.755 32.2538 29.4681 29.4047 31.7225 25.5C33.9768 21.5954 34.5877 16.9552 33.4208 12.6001C32.2538 8.24507 29.4047 4.53195 25.5 2.27761L8.50002 31.7225Z"
                                fill={theme.primary}
                              />
                              <path
                                d="M25.5 2.27761C21.5954 0.0232718 16.9551 -0.587628 12.6001 0.579304C8.24501 1.74624 4.53189 4.59541 2.27755 8.50004C0.0232112 12.4047 -0.587689 17.0449 0.579242 21.4C1.74617 25.755 4.59539 29.4681 8.50002 31.7225L25.5 2.27761Z"
                                fill={theme.secondary}
                              />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Primary Font
                    </label>
                    <SingleSelect
                      options={fontOptions.map((option) => ({
                        label: option.name,
                        value: option.cssStyleName,
                        raw: option,
                      }))}
                      value={{
                        label: theme1Data.primaryFont.name,
                        value: theme1Data.primaryFont.cssStyleName,
                        raw: theme1Data.primaryFont,
                      }}
                      setValue={handleFontSelect}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Secondary Font
                    </label>
                    <SingleSelect
                      options={fontOptions.map((option) => ({
                        label: option.name,
                        value: option.cssStyleName,
                        raw: option,
                      }))}
                      value={{
                        label: theme1Data.secondaryFont.name,
                        value: theme1Data.secondaryFont.cssStyleName,
                        raw: theme1Data.secondaryFont,
                      }}
                      setValue={handleSecondaryFontSelect}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Tertiary Font
                    </label>
                    <SingleSelect
                      options={fontOptions.map((option) => ({
                        label: option.name,
                        value: option.cssStyleName,
                        raw: option,
                      }))}
                      value={{
                        label: theme1Data.custom_utils.tertiaryFont.name,
                        value:
                          theme1Data.custom_utils.tertiaryFont.cssStyleName,
                        raw: theme1Data.custom_utils.tertiaryFont,
                      }}
                      setValue={handleTertiaryFontSelect}
                    />
                  </div>
                </div>
              ) : navigation.currentPage === "appearance_invite" ? (
                <div className="space-y-6">
                  {/* <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Color Theme
                    </label>
                    <div className="flex gap-4">
                      <div className="flex flex-row justify-center gap-2 md:gap-4">
                        {theme1Colors.map((theme, index) => (
                          <button
                            onClick={() => handleThemeSelect(theme)}
                            key={index}
                            className={cn(
                              `h-min !cursor-pointer rounded-full border-4 transition-all`,
                              theme.primary === theme1Data.primaryColor &&
                                theme.secondary === theme1Data.secondaryColor
                                ? "border-primary"
                                : "border-transparent"
                            )}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 34 34"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="md:h-[34px] md:w-[34px]"
                            >
                              <path
                                d="M8.50002 31.7225C12.4047 33.9768 17.0449 34.5877 21.3999 33.4208C25.755 32.2538 29.4681 29.4047 31.7225 25.5C33.9768 21.5954 34.5877 16.9552 33.4208 12.6001C32.2538 8.24507 29.4047 4.53195 25.5 2.27761L8.50002 31.7225Z"
                                fill={theme.primary}
                              />
                              <path
                                d="M25.5 2.27761C21.5954 0.0232718 16.9551 -0.587628 12.6001 0.579304C8.24501 1.74624 4.53189 4.59541 2.27755 8.50004C0.0232112 12.4047 -0.587689 17.0449 0.579242 21.4C1.74617 25.755 4.59539 29.4681 8.50002 31.7225L25.5 2.27761Z"
                                fill={theme.secondary}
                              />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div> */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Primary Font
                    </label>
                    <SingleSelect
                      options={fontPrimaryOptionsForInvite.map((option) => ({
                        label: option.name,
                        value: option.cssStyleName,
                        raw: option,
                      }))}
                      value={{
                        label: inviteCardData.primary_font.name,
                        value: inviteCardData.primary_font.cssStyleName,
                        raw: inviteCardData.primary_font,
                      }}
                      setValue={handleFontSelectForInvite}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Secondary Font
                    </label>
                    <SingleSelect
                      options={fontSecondaryOptionsForInvite.map((option) => ({
                        label: option.name,
                        value: option.cssStyleName,
                        raw: option,
                      }))}
                      value={{
                        label: inviteCardData.secondary_font.name,
                        value: inviteCardData.secondary_font.cssStyleName,
                        raw: inviteCardData.secondary_font,
                      }}
                      setValue={handleSecondaryFontSelectForInvite}
                    />
                  </div>
                </div>
              ) : navigation.currentPage === "theme1_hero" ? (
                <HeroOptions onNavigate={(title, section) => {}} />
              ) : navigation.currentPage === "theme1_couple_info" ? (
                <CoupleInfoOptions onNavigate={(title, section) => {}} />
              ) : navigation.currentPage === "theme1_reverse_timer" ? (
                <ReverseTimerOptions onNavigate={(title, section) => {}} />
              ) : navigation.currentPage === "theme1_our_story" ? (
                <OurStoryOptions onNavigate={(title, section) => {}} />
              ) : navigation.currentPage === "theme1_wedding_date" ? (
                <WeddingDateOptions onNavigate={(title, section) => {}} />
              ) : navigation.currentPage === "theme1_wedding_timeline" ? (
                <WeddingTimelineOptions onNavigate={(title, section) => {}} />
              ) : navigation.currentPage === "theme1_gallery" ? (
                <GalleryOptions onNavigate={(title, section) => {}} />
              ) : navigation.currentPage === "theme1_q_and_a" ? (
                <QandAOptions onNavigate={(title, section) => {}} />
              ) : navigation.currentPage === "theme1_food_menu" ? (
                <FoodMenuOptions onNavigate={(title, section) => {}} />
              ) : navigation.currentPage === "theme1_rsvp_form" ? (
                <RsvpFormOptions onNavigate={(title, section) => {}} />
              ) : navigation.currentPage === "theme1_marquee_demo" ? (
                <MarqueeDemoOptions onNavigate={(title, section) => {}} />
              ) : navigation.currentPage === "theme1_footer" ? (
                <FooterOptions onNavigate={(title, section) => {}} />
              ) : navigation.currentPage === "invite1_couple_info" ? (
                <CoupleInfoOptionsForInvite
                  onNavigate={(title, section) => {}}
                />
              ) : navigation.currentPage === "invite1_wedding_info" ? (
                <WeddingInfoOptionsForInvite
                  onNavigate={(title, section) => {}}
                />
              ) : null}
            </div>
            <Button
              loading={isLoading}
              label="Save"
              icon="pi pi-save"
              className={cn("p-button-success m-4")}
              disabled={
                tabMode === "email" ? !saveStatusForInvite : !saveStatus
              }
              onClick={async () => {
                tabMode === "email"
                  ? handleCreateInviteCard()
                  : await saveData(navigation.currentPage)
                dispatch(updateSaveButtonVisibility(false))
                dispatch(updateSaveButtonVisibilityForInvite(false))
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
