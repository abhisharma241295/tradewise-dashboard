import React, { useState, useEffect, useRef } from "react"
import FilterIcon from "@/components/static/icons/filter"
import TabLayout from "@/components/ui/commons/TabView"
import NewTaskForm from "@/components/ui/forms/NewWeddingTaskForm"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { Button } from "primereact/button"
import { Sidebar } from "primereact/sidebar"
import Planner from "./page"
import TaskList from "./@list/page"
import CalendarView from "./@calendar/page"
import Kanban from "./@kanban/page"
import {
  getWeddingPlannerEvents,
  getWeddingPlannerEventsMetrics,
  plannerApi,
  useGetWeddingPlannerEventsMetricsQuery,
  useGetWeddingPlannerEventsQuery,
} from "@/lib/redux/features/apis/plannerApi"
import {
  updateEvents,
  setCategoriesToFilter,
  setStatusesToFilter,
  clearFilters,
} from "@/lib/redux/features/slices/plannerSlice"
import { mergeTaskLists } from "@/lib/utils/plannerUtil"
import { TodosCategory } from "@/lib/raw-data/todoCategories"
import CustomButton from "@/components/ui/Button"
import { Plus } from "lucide-react"
import { GetServerSideProps } from "next"
import { wrapper } from "@/lib/redux/store"
import { WeddingPlannerEventWithId } from "@/types/WeddingPlannerEvent"
import { TieredMenu } from "primereact/tieredmenu"
import PlannerFilterOptions from "@/components/ui/dashboard/planner/PlannerFilterOptions"
import UpdateChecklistForm from "@/components/ui/forms/UpdateChecklistForm"
import { toast } from "sonner"
const tabs = [
  "List",
  "Kanban",
  // , "Calendar"
]
interface ServerSideProps {
  plannerTodos: WeddingPlannerEventWithId[] | null
  metrics: { [key: string]: any } | null
}

export default function PlannerRootLayout({ metrics }: ServerSideProps) {
  const dispatch = useAppDispatch()
  const filterRef = useRef<any>()
  const [tab, setTab] = useState("List")
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [newTaskSidePanelVisible, setNewTaskSidePanelVisible] =
    useState<boolean>(false)
  const currentWeddingId = useAppSelector(
    (state) => state.currentWedding.currentWeddingId
  )
  const { data: weddingEvents, error: eventsError } =
    useGetWeddingPlannerEventsQuery(currentWeddingId, {
      skip: !currentWeddingId,
    })

  const { data: metricsData, error: metricsError } =
    useGetWeddingPlannerEventsMetricsQuery(currentWeddingId, {
      skip: !currentWeddingId,
    })

  const ogList = mergeTaskLists(weddingEvents)
  const filters = useAppSelector((state) => state.planner.filters)

  useEffect(() => {
    if (metricsError) {
      toast.error("Failed to fetch metrics. Please try again later.")
    }
  }, [metricsError])

  useEffect(() => {
    const list = mergeTaskLists(weddingEvents) || ogList
    dispatch(
      updateEvents(
        list.map((item) => ({
          id: item.id,
          category: item.category,
          title: item.title,
          date: item.date,
          status: item.status,
          checklist: item.checklist,
          collaborators: [],
        }))
      )
    )
  }, [weddingEvents, dispatch])

  useEffect(() => {
    if (eventsError) {
      toast.error("Failed to fetch events. Please try again later.")
    }
  }, [eventsError])
  // Set "List" tab by default on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setTab("List")
      }
    }

    handleResize() // Initial check on load
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleClearFilters = () => {
    dispatch(clearFilters())
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="hidden w-full p-6 md:block">
        <Planner metrics={metricsData || metrics} />
      </div>
      <div className="flex hidden w-full items-center justify-between px-6 md:flex">
        <div className="flex items-center">
          <TabLayout tabNames={tabs} value={tab} onChange={setTab} />
        </div>
        <div className="flex items-center gap-4">
          <CustomButton
            size="icon"
            variant="ghost"
            onClick={(e) => filterRef.current?.toggle(e)}
          >
            <FilterIcon />
          </CustomButton>
          <TieredMenu
            ref={filterRef}
            popup
            model={[
              {
                label: "Status",
                items: [
                  {
                    label: "To Do",
                    command: () => {
                      if (filters.statuses.includes("todo")) {
                        dispatch(setStatusesToFilter([]))
                      } else {
                        dispatch(setStatusesToFilter(["todo"]))
                      }
                    },
                    icon: (
                      <div className="mr-4 size-3 rounded-full bg-yellow-500" />
                    ),
                    className: filters.statuses.includes("todo")
                      ? "bg-gray-100"
                      : "",
                  },
                  {
                    label: "In Progress",
                    command: () => {
                      if (filters.statuses.includes("inProgress")) {
                        dispatch(setStatusesToFilter([]))
                      } else {
                        dispatch(setStatusesToFilter(["inProgress"]))
                      }
                    },
                    icon: (
                      <div className="mr-4 size-3 rounded-full bg-blue-500" />
                    ),
                    className: filters.statuses.includes("inProgress")
                      ? "bg-gray-100"
                      : "",
                  },
                  {
                    label: "Done",
                    command: () => {
                      if (filters.statuses.includes("done")) {
                        dispatch(setStatusesToFilter([]))
                      } else {
                        dispatch(setStatusesToFilter(["done"]))
                      }
                    },
                    icon: (
                      <div className="mr-4 size-3 rounded-full bg-green-500" />
                    ),
                    className: filters.statuses.includes("done")
                      ? "bg-gray-100"
                      : "",
                  },
                ],
              },
              {
                label: "Task Category",
                items: TodosCategory.map((category) => ({
                  label: category.label,
                  command: () =>
                    dispatch(setCategoriesToFilter([category.value])),
                  className: filters.categories.includes(category.value)
                    ? "bg-gray-100"
                    : "",
                })),
              },
              {
                label: "Clear Filters",
                command: () => handleClearFilters(),
                icon: <div className="mr-4 size-3 rounded-full bg-red-500" />,
                className: "bg-gray-100",
              },
            ]}
          />
          <Button
            size="small"
            onClick={() => {
              setNewTaskSidePanelVisible(true)
            }}
            className="px-4 py-2 !font-semibold"
          >
            Add Task
          </Button>
        </div>
      </div>
      <PlannerFilterOptions
        categories={filters.categories}
        setCategoriesToFilter={(value) =>
          dispatch(setCategoriesToFilter(value))
        }
        statuses={filters.statuses}
        setStatusesToFilter={(value: ("done" | "todo" | "inProgress")[]) => {
          if (value.length === 0) {
            dispatch(clearFilters())
          } else {
            dispatch(setStatusesToFilter(value))
          }
        }}
      />
      <div className="h-full overflow-hidden md:bg-[#ECF4F5]">
        {tab === "List" && <TaskList setSelectedTask={setSelectedTask} />}
        {tab === "Kanban" && (
          <div className="hidden h-screen sm:block sm:h-full">
            <Kanban setSelectedTask={setSelectedTask} />
          </div>
        )}
        {tab === "Calendar" && (
          <div className="hidden sm:block">
            <CalendarView />
          </div>
        )}
      </div>
      <Sidebar
        position="right"
        visible={newTaskSidePanelVisible || selectedTask}
        onHide={() => {
          setNewTaskSidePanelVisible(false)
          setSelectedTask(null)
        }}
        className="max-width-screen w-[450px]"
        content={
          selectedTask ? (
            <UpdateChecklistForm
              onClose={() => {
                setSelectedTask(null)
                setNewTaskSidePanelVisible(false)
              }}
              checklist={selectedTask}
            />
          ) : (
            <NewTaskForm
              onClose={() => {
                setNewTaskSidePanelVisible(false)
                setSelectedTask(null)
              }}
            />
          )
        }
      />
      <CustomButton
        size="fab"
        onClick={() => {
          setNewTaskSidePanelVisible(true)
        }}
        className="fixed bottom-24 right-4 !font-semibold md:hidden"
      >
        <Plus />
      </CustomButton>
    </div>
  )
}
export const getServerSideProps: GetServerSideProps<ServerSideProps> =
  wrapper.getServerSideProps((store) => async (context) => {
    const { req } = context

    // Parse cookies from the request headers
    const cookies = req.headers.cookie || ""

    // Extract `currentWedding` value using a regex
    const currentWeddingMatch = cookies.match(/currentWedding=({.*?})/)

    let currentWeddingId = null

    if (currentWeddingMatch) {
      try {
        const currentWeddingData = JSON.parse(
          decodeURIComponent(currentWeddingMatch[1])
        )
        currentWeddingId = currentWeddingData.current_wedding
      } catch (error) {
        console.error("Failed to parse currentWedding cookie:", error)
      }
    }
    if (currentWeddingId === null) {
      return {
        props: {
          metrics: null,
          plannerTodos: null,
        },
      }
    }

    store.dispatch(getWeddingPlannerEvents.initiate(currentWeddingId))
    store.dispatch(getWeddingPlannerEventsMetrics.initiate(currentWeddingId))
    await Promise.all(store.dispatch(plannerApi.util.getRunningQueriesThunk()))
    const metrics =
      store.getState().plannerApi.queries[
        `getWeddingPlannerEventsMetrics("${currentWeddingId}")`
      ]?.data || null
    const plannerTodos =
      store.getState().plannerApi.queries[
        `getWeddingPlannerEvents("${currentWeddingId}")`
      ]?.data || null
    return {
      props: {
        metrics,
        plannerTodos,
      },
    }
  })
