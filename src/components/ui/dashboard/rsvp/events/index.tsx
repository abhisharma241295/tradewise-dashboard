import React, { useEffect, useState } from "react"
import { EventCard } from "./EventsCard"
import { Sidebar } from "primereact/sidebar"
// import NewRsvpEventForm from '@/components/ui/forms/NewRsvpEventForm';
import { useGetEventsQuery } from "@/lib/redux/features/apis/eventsApi"
import { useAppSelector } from "@/lib/redux/hooks"
import { getCurrentWedding } from "@/lib/cookies/currentWeddingCookie"
import { ConfirmDialog } from "primereact/confirmdialog"
import SearchButton from "@/components/ui/commons/SearchButton"
import EventsSideSheet from "./EventsSideSheetContent"
import { Skeleton } from "primereact/skeleton"
import { toast } from "sonner"

interface RsvpEventProps {
  visible: boolean
  setVisible: (visible: boolean) => void

  clear: boolean
  setClear: (visible: boolean) => void
}

const RsvpEvent: React.FC<RsvpEventProps> = ({
  visible,
  setVisible,
  setClear,
  clear,
}) => {
  const currentWeddingId =
    useAppSelector((state) => state.currentWedding.currentWeddingId) ||
    getCurrentWedding()
  const {
    data = { events: [] },
    isLoading,
    isError: useGetEventsQuery_isError,
    error: useGetEventsQuery_error,
  } = useGetEventsQuery(currentWeddingId)
  const [currentFocussedEvent, setCurrentFocussedEvent] = useState<any>(null)
  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY === 0) return
    e.preventDefault()
    e.currentTarget.scrollLeft += e.deltaY
  }
  const [q, setQ] = useState<string>("")
  //clear currentFocussedEvent if the parent's clear is true
  useEffect(() => {
    if (clear) {
      setCurrentFocussedEvent(null)
    }
  }, [setClear, clear])

  useEffect(() => {
    if (useGetEventsQuery_isError) {
      toast.error(`Error fetching events: 'Unknown error'}`)
    }
  }, [useGetEventsQuery_isError, useGetEventsQuery_error])

  //clear currentFocussedEvent if the parent's clear is true
  useEffect(() => {
    if (currentFocussedEvent) {
      setClear(false)
    }
  }, [currentFocussedEvent])

  const EventSection = ({
    title,
    events,
    filterFn,
  }: {
    title: string
    events: any[]
    filterFn: (event: any) => boolean
    handleScroll: (e: React.WheelEvent<HTMLDivElement>) => void
  }) => {
    const filteredEvents = events.filter(filterFn)
    if (filteredEvents.length === 0 && !isLoading) return null

    return (
      <div className="rounded-lg">
        <h2 className="mb-4 text-xl font-medium">{title}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="group relative w-[300px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border shadow-lg"
                  >
                    <div className="p-0">
                      <div className="relative">
                        <Skeleton className="min-h-[150px] w-full" />
                        <div className="absolute right-3 top-3">
                          <Skeleton className="size-9 rounded-[5px]" />
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <Skeleton className="size-4 rounded-full" />
                          <Skeleton className="h-6 w-24" />
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Skeleton className="h-4 w-4" />
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-4" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                        <div className="mt-2">
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            : filteredEvents.map((event: any) => (
                <EventCard
                  key={event.event_id}
                  event={{
                    id: event.event_id,
                    type: event.event_name,
                    date: event.start_date.split("T")[0],
                    time: event.time_from,
                    location: event.venue_name,
                    image: event.event_cover_id || "",
                    status: title.toLowerCase().split(" ")[0] as
                      | "upcoming"
                      | "ongoing"
                      | "completed",
                    guestCount: event.guest_count,
                  }}
                  onClick={() => {
                    setCurrentFocussedEvent(event)
                    setVisible(true)
                  }}
                />
              ))}
        </div>
      </div>
    )
  }
  if (data.events.length === 0 && !isLoading)
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 text-gray-400">
          <svg
            width="180"
            height="213"
            viewBox="0 0 180 213"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              opacity="0.2"
              cx="90"
              cy="174.6"
              rx="90"
              ry="5.4"
              fill="#B6D3D6"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.1996 43.2C16.1996 31.2706 25.8703 21.6 37.7996 21.6C49.729 21.6 59.3996 31.2706 59.3996 43.2C59.3996 55.1294 49.729 64.8 37.7996 64.8C25.8703 64.8 16.1996 55.1294 16.1996 43.2ZM37.7996 18C23.882 18 12.5996 29.2824 12.5996 43.2C12.5996 55.8953 21.9874 66.398 34.1996 68.1448V122.4C34.1996 130.353 40.6467 136.8 48.5996 136.8H131.4C139.353 136.8 145.8 130.353 145.8 122.4V106.2H147.6C151.576 106.2 154.8 102.976 154.8 99V90C154.8 86.0236 151.576 82.8 147.6 82.8H145.8V66.6C145.8 58.6471 139.353 52.2 131.4 52.2H127.8V48.6C127.8 41.6412 122.158 36 115.2 36H61.956C58.8581 25.5906 49.2153 18 37.7996 18ZM62.7444 39.6C62.9126 40.7758 62.9996 41.9777 62.9996 43.2C62.9996 46.3709 62.414 49.405 61.3449 52.2H124.2V48.6C124.2 43.6294 120.17 39.6 115.2 39.6H62.7444ZM59.6283 55.8C55.2711 63.3323 47.1272 68.4 37.7996 68.4V122.4C37.7996 128.365 42.6349 133.2 48.5996 133.2H131.4C137.364 133.2 142.2 128.365 142.2 122.4V106.2H117C113.023 106.2 109.8 102.976 109.8 99V90C109.8 86.0236 113.023 82.8 117 82.8H142.2V66.6C142.2 60.6353 137.364 55.8 131.4 55.8H59.6283ZM67.0714 82.8C65.5005 82.8 64.1587 83.1 63.0078 83.6583L62.9994 83.6624C61.8455 84.2148 60.972 84.9682 60.3312 85.9221C59.7267 86.8339 59.3996 87.9225 59.3996 89.2559C59.3996 90.8616 59.8743 91.9784 60.6996 92.7965C61.6653 93.7357 63.0503 94.5074 64.9601 95.0398L64.9612 95.0401L67.8907 95.8588L67.8935 95.8596C68.8879 96.1344 69.7916 96.4577 70.5917 96.8378C71.4767 97.2447 72.2594 97.7984 72.855 98.5407C73.542 99.3867 73.8343 100.403 73.8464 101.455L73.8465 101.495C73.8345 102.639 73.5093 103.71 72.8356 104.638L72.8279 104.649C72.1777 105.531 71.3048 106.18 70.2853 106.625L70.2754 106.629C69.243 107.072 68.1024 107.267 66.895 107.267C66.1085 107.267 65.0945 106.998 64.359 106.777C64.3027 106.76 64.2466 106.743 64.1906 106.725L63.9155 107.658C64.7996 107.881 65.8013 108 66.9328 108C68.8024 108 70.2813 107.686 71.4332 107.138C72.619 106.568 73.4596 105.817 74.0315 104.9C74.6069 103.969 74.9195 102.862 74.9195 101.517C74.9195 100.511 74.7454 99.7233 74.4578 99.1051C74.139 98.4202 73.7153 97.853 73.1851 97.3847L73.1772 97.3777C72.602 96.8637 71.9428 96.4316 71.1906 96.0839L71.1848 96.0812C70.3906 95.7107 69.5616 95.416 68.6962 95.1974L68.6657 95.1894L66.2576 94.5361C65.6642 94.3823 65.0774 94.1935 64.4974 93.9701C63.8576 93.7237 63.2588 93.4152 62.7079 93.0401L62.6866 93.0254C62.0593 92.5849 61.5384 92.033 61.1492 91.3713L61.136 91.3484C60.7122 90.603 60.5355 89.7791 60.5355 88.9415V88.92H60.5356C60.5479 87.8899 60.8317 86.9182 61.4109 86.0611C61.9935 85.1988 62.8047 84.5675 63.7529 84.1336C64.7395 83.6822 65.8435 83.492 67.0084 83.492C67.8273 83.492 68.6149 83.5889 69.3529 83.8011L69.6007 83.0982C68.8482 82.9034 68.0085 82.8 67.0714 82.8ZM61.4406 80.4173C62.4946 79.9065 63.62 79.5617 64.8078 79.3731C64.8024 79.3161 64.7996 79.2584 64.7996 79.2V77.4C64.7996 76.4059 65.6055 75.6 66.5996 75.6C67.5937 75.6 68.3996 76.4059 68.3996 77.4V79.2C68.3996 79.219 68.3993 79.2379 68.3987 79.2567C69.9474 79.3925 71.3864 79.7744 72.6915 80.4307C73.5009 80.8378 73.8816 81.783 73.5804 82.6374L72.0815 86.8883C71.8897 87.4325 71.4486 87.8517 70.8954 88.0156C70.3422 88.1796 69.7439 88.0684 69.2866 87.7166C68.8127 87.3521 68.1054 87.092 67.0084 87.092C66.2252 87.092 65.6582 87.2207 65.2509 87.4072C64.8052 87.6111 64.5499 87.8455 64.3937 88.0767C64.2355 88.3109 64.1416 88.5845 64.1355 88.9524C64.1369 89.2648 64.1991 89.448 64.2599 89.559C64.3723 89.7461 64.5265 89.9166 64.7455 90.0722C65.0483 90.277 65.3947 90.458 65.7911 90.6106C66.2488 90.7869 66.708 90.9342 67.169 91.0534L67.19 91.0588L67.19 91.0589L69.5935 91.711C70.6695 91.9838 71.707 92.3526 72.704 92.8175C73.7627 93.3072 74.7218 93.9306 75.5723 94.69C76.4845 95.4967 77.2014 96.4684 77.7216 97.5861C78.2736 98.7722 78.5195 100.098 78.5195 101.517C78.5195 103.451 78.06 105.231 77.0913 106.797L77.0882 106.802C76.1155 108.362 74.7236 109.551 72.9895 110.384L72.9849 110.386C71.6194 111.037 70.0806 111.41 68.3987 111.544C68.3993 111.562 68.3996 111.581 68.3996 111.6V113.4C68.3996 114.394 67.5937 115.2 66.5996 115.2C65.6055 115.2 64.7996 114.394 64.7996 113.4V111.6C64.7996 111.558 64.801 111.516 64.8039 111.475C63.4216 111.306 62.1349 110.963 60.9585 110.426C60.1432 110.054 59.7258 109.139 59.9792 108.279L61.2731 103.891C61.4167 103.404 61.7594 103 62.2166 102.779C62.6739 102.558 63.2031 102.541 63.674 102.731C64.0194 102.871 64.6979 103.119 65.3971 103.33C66.1685 103.562 66.7075 103.667 66.895 103.667C67.717 103.667 68.3551 103.535 68.8503 103.323C69.3698 103.095 69.7038 102.818 69.9262 102.518C70.1206 102.248 70.2384 101.923 70.2464 101.477C70.2387 101.087 70.1399 100.908 70.0594 100.809L70.0488 100.796L70.0488 100.796C69.8755 100.579 69.5818 100.335 69.0807 100.105L69.0556 100.094C68.4824 99.8205 67.779 99.5628 66.9322 99.3288L66.927 99.3274L63.9933 98.5076C61.6574 97.8563 59.6851 96.8345 58.1823 95.3701L58.173 95.3611C56.5491 93.7556 55.7996 91.6568 55.7996 89.2559C55.7996 87.2923 56.2946 85.4933 57.3344 83.9272L57.3391 83.9202C58.3599 82.3984 59.743 81.231 61.4406 80.4173ZM148.92 136.143C148.92 138.762 151.043 140.885 153.662 140.885H163.418C166.037 140.885 168.16 138.762 168.16 136.143C168.16 133.524 166.037 131.401 163.418 131.401H153.662C151.043 131.401 148.92 133.524 148.92 136.143ZM153.662 137.285C153.031 137.285 152.52 136.774 152.52 136.143C152.52 135.512 153.031 135.001 153.662 135.001H163.418C164.049 135.001 164.56 135.512 164.56 136.143C164.56 136.774 164.049 137.285 163.418 137.285H153.662ZM138.6 155.692C138.6 158.311 140.723 160.434 143.342 160.434C145.961 160.434 148.084 158.311 148.084 155.692V145.936C148.084 143.317 145.961 141.194 143.342 141.194C140.723 141.194 138.6 143.317 138.6 145.936V155.692ZM143.342 156.834C142.711 156.834 142.2 156.322 142.2 155.692V145.936C142.2 145.305 142.711 144.794 143.342 144.794C143.973 144.794 144.484 145.305 144.484 145.936V155.692C144.484 156.322 143.973 156.834 143.342 156.834ZM33.2996 31.5C33.2996 29.0147 35.3143 27 37.7996 27C40.2849 27 42.2996 29.0147 42.2996 31.5V42.3C42.2996 44.7853 40.2849 46.8 37.7996 46.8C35.3143 46.8 33.2996 44.7853 33.2996 42.3V31.5ZM37.7996 30.6C37.3026 30.6 36.8996 31.0029 36.8996 31.5V42.3C36.8996 42.7971 37.3026 43.2 37.7996 43.2C38.2967 43.2 38.6996 42.7971 38.6996 42.3V31.5C38.6996 31.0029 38.2967 30.6 37.7996 30.6ZM37.7996 59.4C35.3143 59.4 33.2996 57.3853 33.2996 54.9C33.2996 52.4147 35.3143 50.4 37.7996 50.4C40.2849 50.4 42.2996 52.4147 42.2996 54.9C42.2996 57.3853 40.2849 59.4 37.7996 59.4ZM36.8996 54.9C36.8996 55.3971 37.3026 55.8 37.7996 55.8C38.2967 55.8 38.6996 55.3971 38.6996 54.9C38.6996 54.4029 38.2967 54 37.7996 54C37.3026 54 36.8996 54.4029 36.8996 54.9Z"
              fill="#ECF4F5"
            />
          </svg>
        </div>
        <Sidebar
          position="right"
          visible={visible}
          onHide={() => setVisible(false)}
          className="max-width-screen w-[450px]"
          content={
            <>
              <EventsSideSheet
                onClose={() => {
                  setVisible(false)
                }}
                event={clear ? null : currentFocussedEvent}
              />
            </>
          }
        />
      </div>
    )

  return (
    <>
      <ConfirmDialog />
      <div className="flex items-center justify-between px-2 py-3">
        <div className="flex items-center"></div>
        <div className="flex gap-2">
          <SearchButton value={q} setValue={setQ} />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <EventSection
          title="Upcoming Events"
          events={data.events.filter((event: any) =>
            event.event_name.toLowerCase().includes(q.toLowerCase())
          )}
          filterFn={(event) => event.event_status === "upcoming"}
          handleScroll={handleScroll}
        />

        <EventSection
          title="Ongoing Events"
          // events={data.events}
          events={data.events.filter((event: any) =>
            event.event_name.toLowerCase().includes(q.toLowerCase())
          )}
          filterFn={(event) => event.event_status === "live"}
          handleScroll={handleScroll}
        />

        <EventSection
          title="Completed Events"
          events={data.events.filter((event: any) =>
            event.event_name.toLowerCase().includes(q.toLowerCase())
          )}
          filterFn={(event) => event.event_status === "completed"}
          handleScroll={handleScroll}
        />
      </div>
      <Sidebar
        position="right"
        visible={visible}
        onHide={() => setVisible(false)}
        className="max-width-screen w-[450px]"
        content={
          <>
            <EventsSideSheet
              onClose={() => {
                setVisible(false)
              }}
              event={clear ? null : currentFocussedEvent}
            />
          </>
        }
      />
    </>
  )
}

export default RsvpEvent
