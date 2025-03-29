import { useState, useRef, useEffect } from "react"
import { Loader, MessageCircleX, SquarePen, X, AlignLeft } from "lucide-react"
import { cn } from "@/lib/utils/cn"
import EmojiIcon from "@/components/static/icons/emoji"
import SendIcon from "@/components/static/icons/send"
import EmptyStateIcon from "@/components/static/icons/emptyState"
import {
  useGetMessagesQuery,
  useGetCommunicationGroupMessageQuery,
  useAddMessageMutation,
  useAddCommGroupMutation,
  useDeleteCommGroupMutation,
  useDeleteConversationMutation,
} from "@/lib/redux/features/apis/communicationApi"
import { useAppSelector } from "@/lib/redux/hooks"
import Button from "@/components/ui/Button"
import { InputText } from "primereact/inputtext"
import { useGetEventsQuery } from "@/lib/redux/features/apis/eventsApi"
import { toast } from "sonner"
import { useGetGroupsQuery } from "@/lib/redux/features/apis/groupApi"
import EmojiPicker, { EmojiClickData } from "emoji-picker-react"
import { Search, Ellipsis, Trash2 } from "lucide-react"
import CustomButton from "@/components/ui/Button"
import { Dialog } from "primereact/dialog"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/commons/PopOver"
import AppBarMenu from "@/components/ui/commons/appbar/AppbarMenu"
import { Dropdown } from "primereact/dropdown"
import { stringToHexColor } from "@/lib/utils/stringToHexColorConverter"
import {
  CommunicationGroup,
  EventsType,
  Group,
  Message,
} from "@/types/Communication"
import {
  getGroupsEventsGuestsArray,
  getInitials,
  getRelativeDate,
  getTimeInAMPMFormat,
} from "@/lib/utils/communicationUtil"
import { Skeleton } from "primereact/skeleton"
import { InputTextarea } from "primereact/inputtextarea"

export default function Communication() {
  const [message, setMessage] = useState("")
  const [groupName, setGroupName] = useState("")
  const [showModal, setShowModal] = useState("")
  const [showCreateSection, setShowCreateSection] = useState(true)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [searchCommunicationGroup, setSearchCommunicationGroup] = useState("")
  const [selectedGroup, setSelectedGroup] = useState<CommunicationGroup | null>(
    null
  )
  const [isEllipsisPopoverOpen, setIsEllipsisPopoverOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [checkSelectedgroup, setCheckSelectedGroup] = useState(false)
  const currentWeddingId = useAppSelector(
    (state) => state.currentWedding.currentWeddingId
  )

  const {
    data: commGroups,
    isLoading: useGetCommunicationGroupMessageQuery_isLoading,
  } = useGetCommunicationGroupMessageQuery(
    { currentWeddingId },
    {
      skip: !currentWeddingId,
    }
  )
  const { data: groupsList } = useGetGroupsQuery(currentWeddingId, {
    skip: !currentWeddingId,
  })

  const { data: eventsList } = useGetEventsQuery(currentWeddingId, {
    skip: !currentWeddingId,
  })
  const { data: messages } = useGetMessagesQuery(selectedGroup?.comm_group_id, {
    skip: selectedGroup === null,
  })
  const [addMessage, { isLoading: addMessageMutation_isLoading }] =
    useAddMessageMutation()
  const [addCommGroup, { isLoading: addCommGroupMutation_isLoading }] =
    useAddCommGroupMutation()
  const [deleteCommGroup, { isLoading: deleteCommMutation_isLoading }] =
    useDeleteCommGroupMutation()
  const [
    deleteConversation,
    { isLoading: deleteConversationMutation_isLoading },
  ] = useDeleteConversationMutation()

  const groupedOptions = [
    {
      label: "Events",
      items:
        eventsList && eventsList?.events?.length > 0
          ? eventsList?.events.map((event: EventsType) => ({
              label: event.event_name,
              value: event.event_id,
            }))
          : [],
    },
    {
      label: "Groups",
      items:
        groupsList && groupsList?.groups?.length > 0
          ? groupsList?.groups.map((group: Group) => ({
              label: group.group_name,
              value: group.group_id,
            }))
          : [],
    },
  ]

  const handleCreateGroup = async () => {
    try {
      if (groupName) {
        const selectedEvent = []
        const selectedGroup = []
        const isEventSelected = eventsList?.events.some(
          (event: EventsType) => event.event_id === selectedOption
        )

        if (isEventSelected) {
          selectedEvent.push(selectedOption)
        } else {
          const isGroupSelected = groupsList?.groups.some(
            (group: Group) => group.group_id === selectedOption
          )
          if (isGroupSelected) {
            selectedGroup.push(selectedOption)
          }
        }
        const response = await addCommGroup({
          body: {
            comm_group_name: groupName,
            fk_guest: [],
            fk_event: selectedEvent,
            fk_group: selectedGroup,
          },
          weddingId: currentWeddingId,
        })
        if (response?.data?.status === "success") {
          toast(
            response?.data?.message ||
              "Communication group created successfully!"
          )
          setShowCreateSection(false)
          setSelectedGroup(response?.data?.data)
          setCheckSelectedGroup(true)
        } else {
          toast.error("Failed to create communication group! ")
        }
        setSelectedOption(null)
        setShowModal("")
      } else {
        toast.error("Please enter a Group Name! ")
      }
    } catch (error) {
      throw error
    }
  }

  const handleSendMessage = async () => {
    try {
      if (message) {
        const response = await addMessage({
          message_content: message,
          groupId: selectedGroup?.comm_group_id || "",
        })
        if (response?.error) {
          toast.error("Failed to send a message!")
        } else {
          setMessage("")
        }
      } else {
        toast.error("Please write a message to send! ")
      }
    } catch (error) {
      throw error
    }
  }

  const groupedMessages =
    messages &&
    messages?.messages.length &&
    messages?.messages.reduce((acc: any, message: Message) => {
      const relativeDate = getRelativeDate(message.created_at, "message")
      if (!acc[relativeDate]) {
        acc[relativeDate] = []
      }
      acc[relativeDate].push(message)
      return acc
    }, {})

  const handleDelete = async () => {
    try {
      const response = await deleteCommGroup({
        weddingId: currentWeddingId,
        groupId: selectedGroup?.comm_group_id || "",
      })
      if (response?.data?.status === "success") {
        toast(response?.data?.message || "Conversation deleted successfully!")
        setSelectedGroup(null)
      }
      setShowModal("")
    } catch (error) {
      toast(`Error:${error}`)
    }
  }
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom() // Scroll to bottom on component mount or messages update
  }, [groupedMessages])

  useEffect(() => {
    if (checkSelectedgroup) {
      const foundGroup =
        commGroups &&
        commGroups?.comm_groups &&
        commGroups?.comm_groups.length > 0 &&
        commGroups?.comm_groups.find(
          (group: CommunicationGroup) =>
            group.comm_group_id === selectedGroup?.comm_group_id
        )
      setSelectedGroup(foundGroup)
      setCheckSelectedGroup(false)
    }
  }, [checkSelectedgroup])

  const handleClearConversation = async () => {
    try {
      const response = await deleteConversation({
        groupId: selectedGroup?.comm_group_id || "",
      })
      if (response?.data?.status === "success") {
        toast(response?.data?.message || "Conversation cleared successfully!")
      }
      setShowModal("")
    } catch (error) {
      toast(`Error:${error}`)
    }
  }

  const getPopoverSection = () => {
    return (
      <div className="flex items-center justify-between">
        <Popover
          open={isEllipsisPopoverOpen}
          onOpenChange={setIsEllipsisPopoverOpen}
        >
          <PopoverTrigger asChild>
            <div
              className="flex h-10 w-10 cursor-pointer items-center justify-center !rounded-[50%] hover:rounded-lg hover:bg-accent"
              onMouseEnter={() => setIsEllipsisPopoverOpen(true)}
              onMouseLeave={() => setIsEllipsisPopoverOpen(false)}
            >
              <Ellipsis className="h-4 w-4 text-gray-600" />
            </div>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="mr-5 border-primary p-2"
            onMouseEnter={() => setIsEllipsisPopoverOpen(true)}
            onMouseLeave={() => setIsEllipsisPopoverOpen(false)}
          >
            <AppBarMenu
              menuItems={[
                {
                  icon: <MessageCircleX className="h-4 w-4 text-gray-600" />,
                  text: "Clear Conversation",
                  onClick: () => setShowModal("clear-conversation"),
                },
              ]}
            />
          </PopoverContent>
        </Popover>
      </div>
    )
  }

  const getLeftPanel = () => {
    return (
      <div className="h-full overflow-auto">
        <div className="relative mb-2 flex items-center justify-between gap-2">
          <Search className="absolute left-2 h-4 w-4 text-gray-600" />
          <InputText
            id="search"
            placeholder="Search"
            className="w-full pl-8"
            onChange={(e) => setSearchCommunicationGroup(e.target.value)}
          />
          <Button
            variant="ghost"
            className="ml-2 h-0 rounded-[50%] px-2 py-4"
            onClick={() => {
              setShowCreateSection(true)
              setSelectedGroup(null)
              setIsSidebarOpen(false)
            }}
          >
            <SquarePen className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
        <div className="text-md my-4 w-full font-medium text-[#23273C]">
          Direct Message
        </div>

        <div>
          <ul>
            {commGroups &&
            commGroups?.comm_groups &&
            commGroups?.comm_groups.length > 0 ? (
              commGroups?.comm_groups
                ?.filter((group: CommunicationGroup) => {
                  return group?.comm_group_name
                    .toLowerCase()
                    .includes(searchCommunicationGroup.toLowerCase())
                })
                ?.map((group: CommunicationGroup) => (
                  <li
                    key={group.comm_group_id}
                    className={cn(
                      "group mb-3 flex cursor-pointer items-center rounded-md px-2 py-1",
                      "hover:bg-[#ECF4F5]",
                      selectedGroup?.comm_group_id === group.comm_group_id &&
                        "bg-[#ECF4F5]"
                    )}
                    onClick={() => {
                      setSelectedGroup(group)
                      setIsSidebarOpen(false)
                    }}
                  >
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

                    <div className="ml-2 min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="text-md truncate font-medium">
                          {group.comm_group_name}
                        </div>
                        <span className="ml-2 shrink-0 text-xs text-[#60647C]">
                          {group?.last_message_datetime
                            ? getRelativeDate(
                                group?.last_message_datetime,
                                "channel"
                              )
                            : ""}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="truncate text-xs font-medium">
                          {group?.last_message || "No Last Message"}
                        </span>
                        <button
                          className="ml-2 shrink-0 p-2 text-gray-600 hover:text-gray-800"
                          onClick={() => setShowModal("delete")}
                        >
                          <Trash2 className="h-4 w-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))
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
              <span className="flex-gap-5 text-md text-gray-500">
                No Communication history found!
              </span>
            )}
          </ul>
        </div>
      </div>
    )
  }

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji) // Append emoji to the message
  }

  const SidePanelComponent = () => {
    return (
      <div className="relative">
        <div
          className={`overflow-y:scroll fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-md transition-transform duration-300 sm:hidden ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="p-4">{getLeftPanel()}</nav>
        </div>
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 sm:hidden"
          ></div>
        )}
      </div>
    )
  }

  const groupedItemTemplate = (option: any) => {
    return (
      <div className="flex items-center">
        <div
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
          style={{
            backgroundColor: stringToHexColor(option.label),
          }}
        >
          <span className="text-xs font-bold text-white">
            {getInitials(option.label)}
          </span>
        </div>
        <span className="ml-3">{option.label}</span>
      </div>
    )
  }

  return (
    <div className="font-mulish flex h-full w-full flex-col">
      <SidePanelComponent />
      <div className="flex h-full grow flex-row">
        <div className="flex h-full w-full">
          <div className="hidden h-full w-1/4 border-r border-[#E4E7EC] p-3 md:block">
            {getLeftPanel()}
          </div>
          <div
            className={`relative h-full w-full ${!showCreateSection && !selectedGroup ? "bg-white" : "bg-[#ECF4F5]"} p-4 md:w-3/4`}
          >
            {showCreateSection && (
              <div className="absolute left-0 right-0 top-0 bg-white p-2">
                <div className="flex items-center justify-between bg-white p-2">
                  <div className="w2/4 flex items-center">
                    <Button
                      variant="ghost"
                      className="h-0 rounded-[50%] px-2 py-4 text-gray-600 md:hidden"
                      onClick={() => setIsSidebarOpen(true)}
                    >
                      <AlignLeft />
                    </Button>
                    <label htmlFor="guest" className="mb-1 mr-2 block">
                      To
                    </label>
                    <Dropdown
                      value={selectedOption}
                      options={groupedOptions}
                      onChange={(e) => {
                        setSelectedOption(e.value)
                        setShowModal("create")
                      }}
                      optionGroupLabel="label"
                      optionGroupChildren="items"
                      optionLabel="label"
                      placeholder="Select an option"
                      className="w-[300px] rounded-none border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0"
                      itemTemplate={groupedItemTemplate}
                    />
                  </div>
                </div>
              </div>
            )}
            {selectedGroup && (
              <div className="absolute left-0 right-0 top-0 bg-white p-2">
                <div className="flex items-center justify-between bg-white p-2">
                  <div className="w2/4 flex items-center">
                    <Button
                      variant="ghost"
                      className="h-0 rounded-[50%] px-2 py-4 text-gray-600 md:hidden"
                      onClick={() => setIsSidebarOpen(true)}
                    >
                      <AlignLeft />
                    </Button>
                    <div
                      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
                      style={{
                        backgroundColor: stringToHexColor(
                          selectedGroup?.comm_group_name
                        ),
                      }}
                    >
                      <span className="text-xs font-bold text-white">
                        {getInitials(selectedGroup?.comm_group_name)}
                      </span>
                    </div>
                    <span className="border-r border-[#E3E3E7] pl-2 pr-8 text-lg font-[500]">
                      {selectedGroup?.comm_group_name}
                    </span>
                    <div className="relative ml-8">
                      {getGroupsEventsGuestsArray(selectedGroup).map(
                        (item, index) => {
                          return (
                            <div key={item}>
                              {index < 5 && (
                                <div
                                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
                                  style={{
                                    backgroundColor: stringToHexColor(
                                      selectedGroup?.comm_group_name
                                    ),
                                    position: "absolute", // For overlapping
                                    left: `${index * 20}px`, // Adjust spacing between avatars
                                    top: "-20px",
                                    zIndex:
                                      getGroupsEventsGuestsArray(selectedGroup)
                                        .length - index, // Layering based on index
                                  }}
                                >
                                  <span className="text-xs font-bold text-white">
                                    {getInitials(item || "Unknown Group")}
                                  </span>
                                </div>
                              )}
                              {index > 5 && (
                                <span className="text-[#3C415A]">
                                  +{" "}
                                  {getGroupsEventsGuestsArray(selectedGroup)
                                    .length - 5}{" "}
                                  more
                                </span>
                              )}
                            </div>
                          )
                        }
                      )}
                    </div>
                  </div>
                  {getPopoverSection()}
                </div>
              </div>
            )}
            {!showCreateSection && !selectedGroup && (
              <div className="flex h-full w-full flex-col items-center justify-center bg-white text-center">
                <div className="mb-4 text-gray-400">
                  <EmptyStateIcon className="text-black" />
                </div>
              </div>
            )}
            {selectedGroup && (
              <div className="h-full overflow-auto bg-[#ECF4F5]">
                {groupedMessages ? (
                  Object.entries(groupedMessages).map(
                    ([date, messages]: [string, any], index: number) => {
                      return (
                        <div key={index} className="my-2">
                          <div className="text-md my-6 text-center font-[500] text-[#60647C]">
                            {date}
                          </div>
                          {messages.map((message: Message) => {
                            return (
                              <div
                                key={message.message_id}
                                className="mb-6 flex items-start gap-4"
                              >
                                <div
                                  className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center !whitespace-nowrap rounded-full"
                                  style={{
                                    backgroundColor: stringToHexColor(
                                      message.message_id
                                    ),
                                  }}
                                >
                                  <span className="text-xs font-bold text-white">
                                    {getInitials(
                                      // message?.sender ||
                                      "Unknown Sender"
                                    )}
                                  </span>
                                </div>
                                <div>
                                  <div className="text-sm font-bold">
                                    {
                                      // message?.sender ||
                                      "Unknown Sender"
                                    }
                                    {"  "}
                                    <span className="text-[10px] text-[#60647C]">
                                      {getTimeInAMPMFormat(message.created_at)}
                                    </span>
                                  </div>
                                  <div className="text-sm">
                                    {message.message_content}
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )
                    }
                  )
                ) : (
                  <div className="flex h-full flex-col items-center justify-center">
                    <EmptyStateIcon />
                    <p className="text-gray-500">No Chats Found.</p>
                  </div>
                )}
                <div ref={messagesEndRef} className="mb-40 md:mb-20" />
              </div>
            )}
            {selectedGroup && (
              <div className="absolute bottom-14 left-0 right-0 mx-4 mb-2 rounded-md bg-white md:bottom-0">
                <div className="flex items-center gap-4 rounded bg-white p-2 shadow-md">
                  <Button
                    variant="ghost"
                    className="relative ml-2 h-0 rounded-[50%] px-2 py-4"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <EmojiIcon className="h-4 w-4 text-gray-600" />
                    {showEmojiPicker && (
                      <div className="absolute bottom-14 z-10">
                        <EmojiPicker
                          onEmojiClick={handleEmojiClick}
                          height={350}
                          width={300}
                        />
                      </div>
                    )}
                  </Button>

                  <InputTextarea
                    id="message"
                    placeholder="Type message..."
                    className="w-full pr-10"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    rows={2}
                  />
                  <Button
                    variant="ghost"
                    className="absolute right-4 h-0 rounded-[50%] px-2 py-4"
                    onClick={handleSendMessage}
                  >
                    {addMessageMutation_isLoading ? (
                      <Loader className="animate-spin text-[#118FA8]" />
                    ) : (
                      <SendIcon className="h-4 w-4 text-[#118FA8]" />
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Dialog
        draggable={false}
        visible={showModal === "delete"}
        onHide={() => {
          setShowModal("")
        }}
        className="w-full max-w-md"
        header="Delete Confirmation"
      >
        <p className="mb-6 border-t px-2 pt-4">
          Are you sure you want to remove them?
        </p>
        <div className="flex justify-end space-x-4 border-t pt-4">
          <CustomButton
            variant={"outline"}
            size="sm"
            className="rounded-md border border-primary px-6 py-2 !font-medium text-primary"
            onClick={() => {
              setShowModal("")
            }}
          >
            No
          </CustomButton>
          <CustomButton
            size="sm"
            className="!hover:bg-red-700 rounded-[8px] !border-red-600 !bg-red-600 px-6 py-2 !font-medium"
            onClick={handleDelete}
            disabled={deleteCommMutation_isLoading}
          >
            {deleteCommMutation_isLoading && (
              <Loader className="animate-spin" />
            )}
            {deleteCommMutation_isLoading ? "Deleting" : "Yes, Delete"}
          </CustomButton>
        </div>
      </Dialog>
      <Dialog
        draggable={false}
        visible={showModal === "create"}
        onHide={() => setShowModal("")}
        className="relative w-full max-w-md"
        header="Create Communication Channel"
      >
        <X
          className="absolute right-4 top-4 cursor-pointer"
          onClick={() => setShowModal("")}
        />
        <InputText
          id="groupName"
          placeholder="Enter Group Name"
          onChange={(e) => setGroupName(e.target.value)}
          className={`mb-5 w-full ${!groupName ? "p-invalid" : ""}`}
        />
        <Button
          className="item-center mt-10 flex w-full flex-row justify-center gap-2"
          onClick={handleCreateGroup}
          disabled={!groupName || addCommGroupMutation_isLoading}
        >
          {addCommGroupMutation_isLoading && (
            <Loader className="animate-spin" />
          )}
          {addCommGroupMutation_isLoading ? "Creating" : "Create Group"}
        </Button>
      </Dialog>
      <Dialog
        draggable={false}
        visible={showModal === "clear-conversation"}
        onHide={() => {
          setShowModal("")
        }}
        className="w-full max-w-md"
        header="Delete Confirmation"
      >
        <p className="mb-6 border-t px-2 pt-4">
          Are you sure you want to clear the conversation?
        </p>
        <div className="flex justify-end space-x-4 border-t pt-4">
          <CustomButton
            variant={"outline"}
            size="sm"
            className="rounded-md border border-primary px-6 py-2 !font-medium text-primary"
            onClick={() => {
              setShowModal("")
            }}
          >
            No
          </CustomButton>
          <CustomButton
            size="sm"
            className="!hover:bg-red-700 rounded-[8px] !border-red-600 !bg-red-600 px-6 py-2 !font-medium"
            onClick={handleClearConversation}
            disabled={deleteConversationMutation_isLoading}
          >
            {deleteConversationMutation_isLoading && (
              <Loader className="animate-spin" />
            )}
            {deleteConversationMutation_isLoading ? "Clearing" : "Yes, Clear"}
          </CustomButton>
        </div>
      </Dialog>
    </div>
  )
}
