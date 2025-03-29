import React from "react"
import HomeSummary from "@/components/ui/dashboard/home/summary"
import HomeGallery from "@/components/ui/dashboard/home/gallery"
import HomeContacts from "@/components/ui/dashboard/home/contacts"
import HomePlanner from "@/components/ui/dashboard/home/planner"
import HomeEvents from "@/components/ui/dashboard/home/events"
import HomeRegistry from "@/components/ui/dashboard/home/registry"
import {
  getWeddingOverview,
  getWeddings,
  useGetWeddingOverviewQuery,
  useGetWeddingsQuery,
  weddingApi,
} from "@/lib/redux/features/apis/weddingApi"
import { useAppSelector } from "@/lib/redux/hooks"
import { getCurrentWedding } from "@/lib/cookies/currentWeddingCookie"
import { GetServerSideProps } from "next/types"
import { wrapper } from "@/lib/redux/store"
import { Sidebar } from "primereact/sidebar"
import WeddingOverview from "@/types/WeddingOverview"
import NewWeddingForm from "@/components/ui/forms/NewWeddingForm"
import { getWeddingInfo } from "@/lib/utils/weddingUtil"

type Props = {
  overview: any | null
}

const Home: React.FC<Props> = ({ overview }) => {
  const currentWeddingId =
    useAppSelector((state) => state.currentWedding.currentWeddingId) ||
    getCurrentWedding()
  const {
    data: useGetWeddingOverviewQuery_data,
    isLoading: useGetWeddingOverviewQuery_isLoading,
  } = useGetWeddingOverviewQuery(currentWeddingId)
  const data = (useGetWeddingOverviewQuery_data || overview) as WeddingOverview
  const { data: useGetWeddingsQuery_data } = useGetWeddingsQuery(undefined)
  const weddingInfo =
    useGetWeddingsQuery_data &&
    getWeddingInfo(useGetWeddingsQuery_data, currentWeddingId)

  // useEffect(() => {
  //   if (useGetWeddingOverviewQuery_error) {
  //     toast(JSON.stringify(useGetWeddingOverviewQuery_error))
  //   }
  // }, [useGetWeddingOverviewQuery_error])

  // useEffect(() => {
  //   if (useGetWeddingsQuery_error) {
  //     toast(JSON.stringify(useGetWeddingsQuery_error))
  //   }
  // }, [useGetWeddingsQuery_error])
  const [isWeddingEditVisible, setIsWeddingEditVisible] = React.useState(false)

  return (
    <div className="h-full w-full overflow-y-auto p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <HomeSummary
          data={data}
          weddingInfo={weddingInfo}
          setIsWeddingEditVisible={setIsWeddingEditVisible}
          loading={useGetWeddingOverviewQuery_isLoading}
        />
        <HomeGallery data={data} />
        <HomeEvents data={data} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <HomePlanner data={data} />
            <HomeContacts data={data} />
          </div>
          <HomeRegistry data={data} />
        </div>
      </div>
      <Sidebar
        position="right"
        visible={isWeddingEditVisible}
        onHide={() => setIsWeddingEditVisible(false)}
        className="max-width-screen w-[450px]"
        content={
          <NewWeddingForm
            data={{
              imageUrl: weddingInfo?.image_url || '',
              groomFirstName: weddingInfo?.couple?.[0]?.first_name || '',
              groomLastName: weddingInfo?.couple?.[0]?.last_name || '',
              brideFirstName: weddingInfo?.couple?.[1]?.first_name || '',
              brideLastName: weddingInfo?.couple?.[1]?.last_name || '',
              weddingDate: weddingInfo?.wedding_date
                ? new Date(weddingInfo.wedding_date.replace(/(\d+)\s+(\w+),\s+(\d+)/, "$3-$2-$1"))
                : new Date(),
              weddingLocation: weddingInfo?.wedding_location || '',
              weddingBudget: useGetWeddingOverviewQuery_data?.budget_overview?.total_budget?.toString() || '0',
            }}
            onClose={() => setIsWeddingEditVisible(false)}
          />
        }
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    try {
      // Safe parsing of cookie with fallback
      const cookieData = context.req.cookies.currentWedding
      let weddingId = cookieData
        ? JSON.parse(cookieData)?.current_wedding
        : null

      if (!weddingId) {
        // Try to get weddings if no wedding ID is found
        store.dispatch(getWeddings.initiate(undefined))
        await Promise.all(
          store.dispatch(weddingApi.util.getRunningQueriesThunk())
        )

        const weddingData =
          store.getState().weddingApi.queries["getWeddings(undefined)"]?.data

        if (!weddingData?.length) {
          return {
            props: {
              overview: null,
              error: "No wedding data found",
            },
          }
        }

        weddingId = weddingData[0].wedding_id
      }

      store.dispatch(getWeddingOverview.initiate(weddingId))
      await Promise.all(
        store.dispatch(weddingApi.util.getRunningQueriesThunk())
      )

      const overview =
        store.getState().weddingApi.queries[
          `getWeddingOverview("${weddingId}")`
        ]?.data

      if (overview) {
        return {
          props: {
            error: "",
            overview: overview || null,
          },
        }
      }
      return {
        props: {
          overview: null,
          error: "Failed to fetch expenses or metrics",
        },
      }
    } catch (error) {
      console.error("Error in getServerSideProps:", error)
      return {
        props: {
          overview: null,
          error: "An unexpected error occurred",
        },
      }
    }
  })

export default Home
