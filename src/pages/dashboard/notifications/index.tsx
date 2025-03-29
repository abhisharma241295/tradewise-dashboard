import { useGetNotificationsQuery } from "@/lib/redux/features/apis/notificationApi"
import { getRelativeDate } from "@/lib/utils/communicationUtil"
import { Skeleton } from "primereact/skeleton"
import React from "react"

interface Notification {
  created_at: string
  event_date: string
  message: string | null
  notification_id: string
  notification_type: string
}

export default function Notifications() {
  const { data: notifications, isLoading: useGetNotificationsQuery_isLoading } =
    useGetNotificationsQuery({})

  return (
    <div className="w-full bg-[#ECF4F5] p-2">
      <h1 className="mb-6 text-2xl font-bold">Notifications</h1>
      <div className="rounded-md border bg-white shadow-md">
        <ul>
          {notifications && notifications?.notifications?.length > 0 ? (
            notifications.notifications.map((notification: Notification) => (
              <div key={notification.notification_id}>
                <li className="mb-1 flex w-full cursor-pointer items-center px-3 py-2 hover:bg-accent">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D9D9D9]" />

                  <div className="ml-2 w-full">
                    <div className="mt-1 w-[335px] overflow-hidden text-ellipsis whitespace-nowrap text-xs text-[#23273C]">
                      {notification.message}
                    </div>
                    <span className="text-xs text-[#898DA2]">
                      {getRelativeDate(notification.created_at, "notification")}
                    </span>
                  </div>
                </li>
              </div>
            ))
          ) : useGetNotificationsQuery_isLoading ? (
            [0, 1, 2].map((item) => (
              <div className="mb-2 flex flex-row items-center gap-2" key={item}>
                <span className="mr-1">
                  <Skeleton shape="circle" size="3rem" />
                </span>
                <div className="flex w-full flex-col gap-0.5">
                  <Skeleton width="150px" height="1.2rem" />
                  <Skeleton width="80px" height="1rem" />
                </div>
              </div>
            ))
          ) : (
            <div className="flex min-h-[100px] items-center justify-center">
              <div>
                <p className="text-center">You are all set</p>
                <span className="flex items-end text-xs text-[#898DA2]">
                  We will keep you updated on any future notifications
                </span>
              </div>
            </div>
          )}
        </ul>
      </div>
    </div>
  )
}
