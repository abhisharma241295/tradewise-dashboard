import TabView2 from "@/components/ui/commons/TabView2"
import RsvpEvents from "@/components/ui/dashboard/rsvp/events"
import GuestRsvpPage from "@/components/ui/dashboard/rsvp/guest"
import { getGuestList, guestApi } from "@/lib/redux/features/apis/guestApi"
import { getWeddings, weddingApi } from "@/lib/redux/features/apis/weddingApi"
import { wrapper } from "@/lib/redux/store"
import { GetServerSideProps } from "next"
import { Button } from "primereact/button"
import { useState } from "react"
import { eventsApi, getEvents } from "@/lib/redux/features/apis/eventsApi"
import SeatingDashboard from "@/components/ui/dashboard/rsvp/seating"
import { getSeatings, seatingApi } from "@/lib/redux/features/apis/seatingApi"
import { createSelector } from "@reduxjs/toolkit"

const TABS = ["Guest", "Events", "Seating"]

interface ServerSideProps {
  guestList: any | null
  events: any[] | null
  seatings: any | null
  error: string
}

export interface Group {
  group_id: string
  group_name: string
  guest: Guest[]
}
interface Guest {
  guest_id: string
  guest_name: string
}

//Props are required
export default function RsvpPage() {
  const [tab, setTab] = useState(TABS[0])
  const [addGuestFormOpen, setAddGuestFormOpen] = useState(false)
  const [addGroupFormOpen, setAddGroupFormOpen] = useState(false)
  const [clearData, setClearData] = useState(true)
  const [rsvpEventsSideSheetVisible, setRsvpEventsSideSheetVisible] =
    useState(false)
  const [clearRsvpEventSelect, setClearRsvpEventSelect] = useState(false)
  const [seatingSideSheetVisible, setSeatingSideSheetVisible] = useState(false)
  const [clearSeatingSelect, setClearSeatingSelect] = useState(false)
  const [viewData, setViewData] = useState<Group | null>(null)

  function guestPageButtons() {
    return (
      <div className="space-x-4">
        <Button
          size="small"
          className="rounded-xl px-5 py-2 font-bold"
          onClick={() => {
            setClearData(true)
            setAddGuestFormOpen(true)
          }}
        >
          Add Guest
        </Button>
        <Button
          size="small"
          className="rounded-xl px-5 py-2 font-bold"
          onClick={() => {
            setViewData(null)
            setAddGroupFormOpen(true)
          }}
        >
          Add Group
        </Button>
      </div>
    )
  }

  function eventPageButtons() {
    return (
      <div className="space-x-4">
        <Button
          size="small"
          className="rounded-xl px-5 py-2 font-bold"
          onClick={() => {
            setClearRsvpEventSelect(true)
            setRsvpEventsSideSheetVisible(true)
          }}
        >
          Add Events
        </Button>
      </div>
    )
  }
  function seatingPageButtons() {
    return (
      <div className="space-x-4">
        <Button
          size="small"
          className="rounded-xl px-5 py-2 font-bold"
          onClick={() => {
            setClearSeatingSelect(true)
            setSeatingSideSheetVisible(true)
          }}
        >
          Add Seating
        </Button>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-min w-full items-center justify-between border-b p-4">
        <TabView2 tabNames={TABS} value={tab} onChange={setTab} />
        {tab === TABS[0]
          ? guestPageButtons()
          : tab === TABS[1]
            ? eventPageButtons()
            : tab === TABS[2]
              ? seatingPageButtons()
              : null}
      </div>
      <div className="h-full px-4">
        {tab === TABS[0] ? (
          <GuestRsvpPage
            clearData={clearData}
            setClearData={setClearData}
            addGuestFormOpen={addGuestFormOpen}
            setAddGuestFormOpen={setAddGuestFormOpen}
            addGroupFormOpen={addGroupFormOpen}
            setAddGroupFormOpen={setAddGroupFormOpen}
            viewData={viewData}
            setViewData={setViewData}
          />
        ) : tab === TABS[1] ? (
          <RsvpEvents
            visible={rsvpEventsSideSheetVisible}
            setVisible={setRsvpEventsSideSheetVisible}
            clear={clearRsvpEventSelect}
            setClear={setClearRsvpEventSelect}
          />
        ) : tab === TABS[2] ? (
          <SeatingDashboard
            visible={seatingSideSheetVisible}
            setVisible={setSeatingSideSheetVisible}
            clear={clearSeatingSelect}
            setClear={setClearSeatingSelect}
          />
        ) : null}
      </div>
    </div>
  )
}

// Selector to get wedding ID from cookie
const getWeddingIdFromCookie = (
  cookieData: string | undefined
): string | null => {
  try {
    return cookieData ? JSON.parse(cookieData)?.current_wedding : null
  } catch {
    return null
  }
}

// Memoized selectors for Redux state
const selectQueries = createSelector(
  [(state: any) => state, (state: any, weddingId: string) => weddingId],
  (state, weddingId) => ({
    guestList:
      state.guestApi.queries[`getGuestList({"weddingId":"${weddingId}"})`]
        ?.data,
    events: state.eventsApi.queries[`getEvents("${weddingId}")`]?.data?.events,
    seatings:
      state.seatingApi.queries[
        `useGetSeatingsQuery({"weddingId":"${weddingId}"})`
      ]?.data?.data?.seatings,
  })
)

export const getServerSideProps: GetServerSideProps<ServerSideProps> =
  wrapper.getServerSideProps((store) => async (context) => {
    try {
      // Get wedding ID from cookie or fetch weddings
      let weddingId = getWeddingIdFromCookie(context.req.cookies.currentWedding)

      if (!weddingId) {
        store.dispatch(getWeddings.initiate(undefined))
        await Promise.all(
          store.dispatch(weddingApi.util.getRunningQueriesThunk())
        )

        const weddingData = store.getState().weddingApi.queries[
          "getWeddings(undefined)"
        ]?.data as { wedding_id: string }[]

        if (!weddingData?.length) {
          return {
            props: {
              guestList: null,
              events: null,
              seatings: null,
              error: "No wedding data found",
            },
          }
        }

        weddingId = weddingData[0].wedding_id
      }

      // Parallel data fetching
      const defaultPagination: {
        page: number
        perPage: number
        search: string
      } = { page: 1, perPage: 20, search: "" }

      const fetchPromises = [
        store.dispatch(
          getGuestList.initiate({ weddingId, pagination: defaultPagination })
        ),
        store.dispatch(getEvents.initiate(weddingId)),
        store.dispatch(getSeatings.initiate({ weddingId })),
      ]

      // Wait for all API queries to complete
      await Promise.all([
        ...fetchPromises,
        store.dispatch(guestApi.util.getRunningQueriesThunk()),
        store.dispatch(eventsApi.util.getRunningQueriesThunk()),
        store.dispatch(seatingApi.util.getRunningQueriesThunk()),
      ])

      // Get all query results at once using memoized selector
      const { guestList, events, seatings } = selectQueries(
        store.getState(),
        weddingId
      )

      if (!guestList || !events || !seatings) {
        return {
          props: {
            guestList: null,
            events: null,
            seatings: null,
            error: "Failed to fetch data",
          },
        }
      }

      return {
        props: {
          guestList: guestList || null,
          events: events || null,
          seatings: seatings || null,
          error: "No error found!",
        },
      }
    } catch (error) {
      console.error("Error in getServerSideProps:", error)
      return {
        props: {
          guestList: null,
          events: null,
          seatings: null,
          error: "An unexpected error occurred",
        },
      }
    }
  })
