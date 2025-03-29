import React, { useEffect, useState } from "react"
import Link from "next/link"
import BellIcon from "@/components/static/icons/bell"
import CommunityIcon from "@/components/static/icons/community"
import MessageIcon from "@/components/static/icons/message"
import ProfileIcon from "@/components/static/icons/profile"
import { cn } from "@/lib/utils/cn"
import { cinzelDecorative } from "@/lib/utils/fonts"
import { Popover, PopoverContent, PopoverTrigger } from "../PopOver"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import ValidationError from "../../ValidationError"
import { getCurrentWedding } from "@/lib/cookies/currentWeddingCookie"
import { useSendInviteMutation } from "@/lib/redux/features/apis/collabApi"
import {
  Loader,
  Settings,
  X,
  User,
  HelpCircle,
  LogOut,
  UserPlus,
  LockIcon,
  Bell,
} from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/router"
import { clearWedding } from "@/lib/redux/features/slices/currentWeddingSlice"
import { useAppDispatch } from "@/lib/redux/hooks"
import { logout } from "@/lib/redux/features/slices/authSlice"
import AppBarMenu from "./AppbarMenu"
import { useGetCommunicationGroupMessageQuery } from "@/lib/redux/features/apis/communicationApi"
import { CommunicationGroup } from "@/types/Communication"
import { getInitials, getRelativeDate } from "@/lib/utils/communicationUtil"
import { stringToHexColor } from "@/lib/utils/stringToHexColorConverter"
import { Divider } from "primereact/divider"
import { Skeleton } from "primereact/skeleton"
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
} from "@/lib/redux/features/apis/notificationApi"
import TabView from "@/components/ui/commons/TabView"

const TABS = ["Inbox", "Unread"]
interface Notification {
  created_at: string
  event_date: string
  message: string | null
  notification_id: string
  notification_type: string
}

export default function AppBar() {
  const [showCollabPopup, setShowCollabPopup] = useState(false)
  const [isMessagePopoverOpen, setIsMessagePopoverOpen] = useState(false)
  const [isBellPopoverOpen, setIsBellPopoverOpen] = useState(false)
  const [isProfilePopoverOpen, setIsProfilePopoverOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [tab, setTab] = useState(TABS[0])
  const currentWeddingId = getCurrentWedding() || ""
  const router = useRouter()
  const { data: notifications, isLoading: useGetNotificationsQuery_isLoading } =
    useGetNotificationsQuery({})

  const {
    data: commGroups,
    refetch,
    isLoading: useGetCommunicationGroupMessageQuery_isLoading,
  } = useGetCommunicationGroupMessageQuery(
    { currentWeddingId, pagination: { limit: 3 } },
    {
      skip: !currentWeddingId,
    }
  )
  const [
    sendInvite,
    {
      isLoading: useSendInviteMutuation_isLoading,
      error: useSendInviteMutuation_error,
    },
  ] = useSendInviteMutation()
  const [markAsRead] = useMarkAsReadMutation()

  useEffect(() => {
    if (useSendInviteMutuation_error) {
      toast.error(
        "Failed to send invite: " +
          (useSendInviteMutuation_error as any)?.data?.message ||
          "Something went wrong"
      )
    }
  }, [useSendInviteMutuation_error])

  useEffect(() => {
    if (isMessagePopoverOpen) {
      refetch()
    }
  }, [isMessagePopoverOpen])

  const handleInviteCollab = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (email && emailRegex.test(email)) {
      const response = await sendInvite({
        email,
        weddingId: currentWeddingId,
      })
      if (response?.data?.status === "success") {
        toast(response?.data?.message || "Invite sent successfully!")
      }
      setEmail("")
      setShowCollabPopup(false)
    } else {
      setEmailError(
        "Please add a valid email id to send invite to collaborator!"
      )
    }
  }

  const handleMarkAsReadNotification = async () => {
    try {
      const response = await markAsRead({
        notification_ids:
          notifications && notifications?.notifications.length > 0
            ? notifications?.notifications.map(
                (item: Notification) => item?.notification_id
              )
            : [],
      })
      if (response?.data?.status === "success") {
        toast(response?.data?.message || "Notifications read successfully!")
      } else {
        toast.error("Failed to mark as read all notifications! ")
      }
    } catch (error) {
      throw error
    }
  }

  const renderNotificationsList = () => {
    return notifications && notifications?.notifications?.length > 0 ? (
      notifications.notifications.map((notification: Notification) => (
        <li
          key={notification.notification_id}
          className="mb-1 flex w-full cursor-pointer items-center px-3 py-2 hover:bg-accent"
        >
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
    )
  }

  const dispatch = useAppDispatch()
  return (
    <div className="border-b">
      <div className="pl-4 pr-7">
        <div className="flex h-16 items-center justify-between">
          <h1
            className={cn(
              cinzelDecorative.className,
              "text-2xl text-secondary-foreground md:text-3xl"
            )}
          >
            Akitu Events
          </h1>
          <div className="flex items-center space-x-2">
            <button
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:rounded-lg hover:bg-accent"
              onClick={() => setShowCollabPopup(true)}
            >
              <CommunityIcon className="h-6 w-6" />
            </button>

            <Dialog
              draggable={false}
              visible={showCollabPopup}
              onHide={() => setShowCollabPopup(false)}
              className="relative w-full max-w-md"
              header="Invite Collaborator"
            >
              <X
                className="absolute right-4 top-4 cursor-pointer"
                onClick={() => setShowCollabPopup(false)}
              />
              <InputText
                id="inviteCollaborator"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setEmailError("")
                }}
                className={`mb-5 w-full ${!email ? "p-invalid" : ""}`}
                placeholder="Invite Collaborator via email"
              />
              {emailError && (
                <ValidationError
                  className="!justify-start"
                  error={emailError}
                />
              )}
              <Button
                className="item-center mt-10 flex w-full flex-row justify-center gap-2"
                size="small"
                onClick={handleInviteCollab}
                disabled={useSendInviteMutuation_isLoading}
              >
                {useSendInviteMutuation_isLoading && (
                  <Loader className="animate-spin" />
                )}
                Send Invite
              </Button>
            </Dialog>

            <Popover
              open={isMessagePopoverOpen}
              onOpenChange={setIsMessagePopoverOpen}
            >
              <PopoverTrigger asChild>
                <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:rounded-lg hover:bg-accent">
                  <MessageIcon className="h-6 w-6" />
                </div>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="mr-32 w-[450px] border-primary p-2"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="p-1.5 text-sm font-bold text-[#23273C]">
                    Messages
                  </p>
                  <Link href="/dashboard/communication">
                    <span className="mt-1 p-1.5 text-xs text-[#3264CA]">
                      View All
                    </span>
                  </Link>
                </div>
                <ul>
                  {commGroups &&
                  commGroups?.comm_groups &&
                  commGroups?.comm_groups.length > 0 ? (
                    commGroups?.comm_groups.map(
                      (group: CommunicationGroup, index: number) =>
                        index < 3 && (
                          <div key={group.comm_group_id}>
                            <li className="mb-1 flex w-full cursor-pointer items-center px-3 py-2 hover:bg-accent">
                              <div
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                                style={{
                                  backgroundColor: stringToHexColor(
                                    group.comm_group_name
                                  ),
                                }}
                              >
                                <span className="text-xs font-bold text-white">
                                  {getInitials(group.comm_group_name)}
                                </span>
                              </div>
                              <div className="ml-2 w-full">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-bold text-[#23273C]">
                                    {group.comm_group_name}
                                  </span>
                                  <span className="text-xs text-[#898DA2]">
                                    {group?.last_message_datetime
                                      ? getRelativeDate(
                                          group?.last_message_datetime,
                                          "channel"
                                        )
                                      : ""}
                                  </span>
                                </div>
                                <div className="mt-1 w-[335px] overflow-hidden text-ellipsis whitespace-nowrap text-xs text-[#23273C]">
                                  {group?.last_message || "No Last Message"}
                                </div>
                              </div>
                            </li>
                            <Divider className="m-1" />
                          </div>
                        )
                    )
                  ) : useGetCommunicationGroupMessageQuery_isLoading ? (
                    [0, 1, 2].map((item) => (
                      <div
                        className="mb-2 flex flex-row items-center gap-2"
                        key={item}
                      >
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
                    <p>No messages</p>
                  )}
                </ul>
              </PopoverContent>
            </Popover>

            <Popover
              open={isBellPopoverOpen}
              onOpenChange={setIsBellPopoverOpen}
            >
              <PopoverTrigger asChild>
                <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:rounded-lg hover:bg-accent">
                  <BellIcon className="h-6 w-6" />
                </div>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="mr-20 w-[450px] border-primary px-0 pb-0 pt-2"
              >
                <div className="flex items-center justify-between px-2">
                  <p className="p-1.5 text-sm font-bold text-[#23273C]">
                    Notifications
                  </p>
                  <Link href="" onClick={handleMarkAsReadNotification}>
                    <span className="mt-1 p-1.5 text-xs text-[#3264CA]">
                      Mark all as read
                    </span>
                  </Link>
                </div>
                <Divider className="my-2" />
                <ul>
                  {tab === "Inbox" ? (
                    <div className="ml-2 h-full whitespace-nowrap rounded-full">
                      <TabView
                        tabNames={TABS}
                        value={tab}
                        onChange={setTab}
                        className="text-gray-[600] !text-sm"
                      />
                      {renderNotificationsList()}
                    </div>
                  ) : (
                    <div className="mx-2 h-full whitespace-nowrap rounded-full">
                      <TabView
                        tabNames={TABS}
                        value={tab}
                        onChange={setTab}
                        className="text-gray-[600] !text-sm"
                      />
                      {renderNotificationsList()}
                    </div>
                  )}
                  <div className="flex h-9 items-center justify-center rounded border-t-2 border-t-gray-50 p-7 shadow-md">
                    <Link href="/dashboard/notifications">
                      <span className="mt-1 rounded-full p-1.5 text-xs text-[#3264CA]">
                        View all notifications
                      </span>
                    </Link>
                  </div>
                </ul>
              </PopoverContent>
            </Popover>

            <Popover
              open={isProfilePopoverOpen}
              onOpenChange={setIsProfilePopoverOpen}
            >
              <PopoverTrigger asChild>
                <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:rounded-lg hover:bg-accent">
                  <ProfileIcon className="h-6 w-6" />
                </div>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="mr-7 w-[275px] border-primary p-2"
              >
                <AppBarMenu
                  menuItems={[
                    {
                      icon: <User className="h-4 w-4" />,
                      text: "Profile",
                      onClick: () => router.push("/settings/profile"),
                    },
                    {
                      icon: <Settings className="h-4 w-4" />,
                      text: "User Settings",
                      onClick: () => router.push("/settings/user-settings"),
                    },
                    {
                      icon: <LockIcon className="h-4 w-4" />,
                      text: "Security",
                      onClick: () =>
                        router.push("/settings/privacy-and-security"),
                    },
                    {
                      icon: <Bell className="h-4 w-4" />,
                      text: "Notifications",
                      onClick: () => router.push("/settings/notification"),
                    },
                    {
                      icon: <HelpCircle className="h-4 w-4" />,
                      text: "Help",
                      onClick: () => console.log("Help clicked"),
                    },
                    {
                      icon: <UserPlus className="h-4 w-4" />,
                      text: "Add Another Account",
                      onClick: () => console.log("Add Another Account clicked"),
                    },
                    {
                      icon: <LogOut className="h-4 w-4" />,
                      text: "Log Out",
                      onClick: () => {
                        dispatch(clearWedding())
                        dispatch(logout())
                        router.push("/login")
                      },
                    },
                  ]}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}
