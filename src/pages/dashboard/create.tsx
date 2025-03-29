import Canvas from "@/components/ui/dashboard/create/Canvas"
import CreateSidePanel from "@/components/ui/dashboard/create/CreateSidePanel"
import ResizablePanel from "@/components/ui/dashboard/create/ResizablePanel"
import SlugCheck from "@/components/ui/dashboard/create/SlugCheck"
import { useState, useEffect } from "react"
import {
  useCreateWebsiteDataMutation,
  getWebsiteData,
  useGetWebsiteDataQuery,
  websiteCreationApis,
} from "@/lib/redux/features/apis/websiteCreationApis"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { getCurrentWedding } from "@/lib/cookies/currentWeddingCookie"
import { updateSlug } from "@/lib/redux/features/slices/custom-wedding-slices/customWebsiteSlugSlice"
import { updateBoilerplateValues } from "@/lib/redux/features/slices/custom-wedding-slices/theme1Slice"
import { toast } from "sonner"
import Theme1MappingValue from "@/components/custom-website-themes/mappings/theme1"
import { useGetInvitesQuery } from "@/lib/redux/features/apis/inviteApi"
import { wrapper } from "@/lib/redux/store"
import {
  updateInviteCardData,
  updatePreviousInviteCardId,
} from "@/lib/redux/features/slices/custom-wedding-slices/inviteCardSlice"

const CreateWebsite: React.FC = () => {
  const [slugCheckVisible, setSlugCheckVisible] = useState(false)
  const [tabMode, setTabMode] = useState<"desktop" | "mobile" | "email">(
    "desktop"
  )
  const currentWeddingId =
    useAppSelector((state) => state.currentWedding.currentWeddingId) ??
    getCurrentWedding()
  const { data: invite } = useGetInvitesQuery(currentWeddingId)
  const [selectedInviteTemplate, setSelectedInviteTemplate] = useState<string>(
    invite ? invite?.template_id : "1"
  )

  const { data, error, isError } = useGetWebsiteDataQuery(
    { weddingId: currentWeddingId },
    { skip: !currentWeddingId }
  )
  const [createWebsiteData] = useCreateWebsiteDataMutation()
  const slug = useAppSelector((state) => state.customWebsiteSlug.slug)
  const dispatch = useAppDispatch()
  async function saveBoilerplateState() {
    try {
      const selectedTemplate = {
        id: 1,
        name: "Template 1",
        image: "/website-layout-images/theme1.png",
        selected: true,
      }
      if (!selectedTemplate) {
        toast.error("Please select a template")
        return
      }
      const templateData = {
        template_id: selectedTemplate.name.toString(),
        website_slug: slug,
        primary_font: Theme1MappingValue.primaryFont,
        secondary_font: Theme1MappingValue.secondaryFont,
        primary_color: Theme1MappingValue.primaryColor, // default color
        secondary_color: Theme1MappingValue.secondaryColor, // default color
        template_json_content: Theme1MappingValue.sections.map((section) => ({
          section_id: section.name,
          children: section.children,
        })),
        custom_utils: {
          tertiaryColor: Theme1MappingValue.custom_utils.tertiaryColor,
          quaternaryColor: Theme1MappingValue.custom_utils.quaternaryColor,
          tertiaryFont: Theme1MappingValue.custom_utils.tertiaryFont,
        },
      }
      const response = await createWebsiteData({
        weddingId: currentWeddingId,
        data: templateData,
      })
    } catch (error) {
      console.error("Error creating website template:", error)
      toast.error("An error occurred while creating the website template")
    }
  }

  useEffect(() => {
    if (error && "status" in error) {
      const httpErrorCode = error.status
      if (httpErrorCode === 404) {
        setSlugCheckVisible(true)
      } else {
        toast.error("An error occurred while fetching the website data")
      }
    }
  }, [isError, error])

  useEffect(() => {
    if (data?.data) {
      dispatch(updateSlug(data.data.website_slug || ""))
      dispatch(updateBoilerplateValues(data.data))

      if (data.data.needs_boilerplate) {
        saveBoilerplateState()
      }
    }
  }, [data?.data, dispatch])

  useEffect(() => {
    if (invite && invite.template_id) {
      dispatch(updateInviteCardData(invite))
      dispatch(updatePreviousInviteCardId(invite.template_id))
      setSelectedInviteTemplate(invite?.template_id)
    }
  }, [invite, dispatch])

  return (
    <div className="flex size-full flex-col">
      <ResizablePanel
        rightPanel={
          <CreateSidePanel
            tabMode={tabMode}
            setSelectedInviteTemplate={setSelectedInviteTemplate}
            selectedInviteTemplate={selectedInviteTemplate}
          />
        }
        defaultRightPanelWidth={30}
        minRightPanelWidth={20}
        maxRightPanelWidth={50}
      >
        <Canvas
          tabMode={tabMode}
          setTabMode={setTabMode}
          selectedInviteTemplate={selectedInviteTemplate}
        />
      </ResizablePanel>
      <SlugCheck
        visible={slugCheckVisible}
        onHide={() => setSlugCheckVisible(false)}
      />
    </div>
  )
}

export default CreateWebsite

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    try {
      const cookieData = context.req.cookies.currentWedding
      let weddingId = cookieData
        ? JSON.parse(cookieData)?.current_wedding
        : null
      if (weddingId) {
        store.dispatch(getWebsiteData.initiate({ weddingId }))
        await Promise.all(
          store.dispatch(websiteCreationApis.util.getRunningQueriesThunk())
        )
      }

      return {
        props: {
          error: "",
        },
      }
    } catch (error) {
      console.error("Error in getServerSideProps:", error)
      return {
        props: {
          error: "Failed to fetch website data",
        },
      }
    }
  }
)
