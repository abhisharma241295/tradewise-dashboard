import React from "react"
import { Map } from "lucide-react"
import TotalTaskIcon from "@/components/static/icons/totalTask"
import TaskCompletedIcon from "@/components/static/icons/taskCompleted"
import TaskPendingIcon from "@/components/static/icons/taskPending"
import { useGetWeddingPlannerEventsMetricsQuery } from "@/lib/redux/features/apis/plannerApi"
import { getCurrentWedding } from "@/lib/cookies/currentWeddingCookie"
import { cn } from "@/lib/utils/cn"

export default function Planner({
  metrics,
}: {
  metrics?: { [key: string]: any }
}) {
  const currentWeddingId = getCurrentWedding() || ""
  const { data } = useGetWeddingPlannerEventsMetricsQuery(currentWeddingId)
  const isLoading = !data && !metrics

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex flex-col items-stretch space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          {/* Upcoming Task Card */}
          <div
            className={cn(
              "flex flex-grow items-start justify-between rounded-xl p-5",
              isLoading
                ? "border border-[#CCCDD6] bg-[#F2F2F2] p-5 text-[#AAAEBF]"
                : "border border-[#B6D3D6] bg-[#E4EFF0] p-5 text-foreground"
            )}
          >
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold md:text-2xl">
                No Upcoming task
              </h3>
              <div className="flex flex-row items-center gap-2">
                <Map />
                <div className="flex flex-col font-medium">
                  <p className="text-sm md:text-base">Everything is done</p>
                </div>
              </div>
            </div>
          </div>

          {/* Task Statistics */}
          <div className="grid grid-cols-3 gap-4 text-center">
            {/* Total Tasks */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-[#CCCDD6] px-10 py-2 sm:px-16">
              <TotalTaskIcon />
              <h4 className="mt-2 text-sm md:text-base">Total Tasks</h4>
              <p className="text-xl font-bold md:text-2xl">{0}</p>
            </div>
            {/* Completed Tasks */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-[#CCCDD6] px-10 py-2 sm:px-16">
              <TaskCompletedIcon />
              <h4 className="mt-2 text-sm md:text-base">Completed</h4>
              <p className="text-xl font-bold md:text-2xl">{0}</p>
            </div>
            {/* Pending Tasks */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-[#CCCDD6] px-10 py-2 sm:px-16">
              <TaskPendingIcon />
              <h4 className="mt-2 text-sm md:text-base">Pending Tasks</h4>
              <p className="text-xl font-bold md:text-2xl">{0}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-stretch space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          {/* Upcoming Task Card */}
          <div className="flex flex-grow items-start justify-between rounded-xl border border-[#B6D3D6] bg-[#E4EFF0] p-5">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold md:text-2xl">Upcoming task</h3>
              <div className="flex flex-row items-center gap-2">
                <Map />
                <div className="flex flex-col font-medium">
                  <p className="text-sm text-foreground md:text-base">
                    {(data || metrics)?.upcoming_todo?.todo_name ||
                      "No Upcoming Task"}
                  </p>
                  <p className="text-sm text-muted-foreground md:text-base">
                    {(data || metrics)?.upcoming_todo?.todo_due_date || "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <span className="rounded bg-primary px-2 py-1 text-sm font-bold text-white">
              3+
            </span>
          </div>

          {/* Task Statistics */}
          <div className="grid grid-cols-3 gap-4 text-center">
            {/* Total Tasks */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-[#3264CA] px-10 py-2 sm:px-16">
              <TotalTaskIcon />
              <h4 className="mt-2 text-sm md:text-base">Total Tasks</h4>
              <p className="text-xl font-bold md:text-2xl">
                {data?.total || metrics?.total || 0}
              </p>
            </div>
            {/* Completed Tasks */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-[#007F2A] px-10 py-2 sm:px-16">
              <TaskCompletedIcon />
              <h4 className="mt-2 text-sm md:text-base">Completed</h4>
              <p className="text-xl font-bold md:text-2xl">
                {data?.completed || metrics?.completed || 0}
              </p>
            </div>
            {/* Pending Tasks */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-[#898DA2] px-10 py-2 sm:px-16">
              <TaskPendingIcon />
              <h4 className="mt-2 text-sm md:text-base">Pending Tasks</h4>
              <p className="text-xl font-bold md:text-2xl">
                {data?.pending || metrics?.pending || 0}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
