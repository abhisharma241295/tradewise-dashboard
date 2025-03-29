import { cn } from "@/lib/utils/cn"
import { UserRound, MailSearch, DownloadIcon } from "lucide-react"
import { Event } from "@/types/rsvp/Event"
import Image from "next/image"
import Button from "@/components/ui/Button"
import { useState, useRef } from "react"
import { Dialog } from "primereact/dialog"
import Invite1 from "@/components/invite-cards/invite1"
import html2canvas from "html2canvas"
import Invite5 from "@/components/invite-cards/invite5"
import Invite3 from "@/components/invite-cards/invite3"
import Invite2 from "@/components/invite-cards/invite2"
import Invite4 from "@/components/invite-cards/invite4"
import { useGetInvitesQuery } from "@/lib/redux/features/apis/inviteApi"
import { useAppSelector } from "@/lib/redux/hooks"

interface EventCardProps {
  event: Event
  className?: string
  onClick?: () => void
}

export function EventCard({ event, className, onClick }: EventCardProps) {
  const [showInviteCard, setShowInviteCard] = useState(false)
  const captureRef = useRef(null)

  const currentWeddingId = useAppSelector(
    (state) => state.currentWedding.currentWeddingId
  )

  const { data: invite } = useGetInvitesQuery(currentWeddingId)

  const handleViewInvite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setShowInviteCard(true)
  }

  const handleDownloadInvite = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation()
    if (!captureRef.current) return
    const canvas = await html2canvas(captureRef.current, {
      scale: 2,
      useCORS: true,
    })
    const image = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = image
    link.download = "downloaded-image.png"
    link.click()
  }

  return (
    <div
      className={cn(
        "group relative w-[300px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border shadow-lg",
        className,
        event.selected && "ring-2 ring-primary"
      )}
      onClick={onClick}
    >
      <div className="p-0">
        <div className="relative">
          {event.image ? (
            <Image
              src={event.image}
              alt={event.type}
              className="h-[150px] w-full bg-gray-200 object-cover"
              width={300}
              height={200}
            />
          ) : (
            <div className="h-[150px] w-full bg-gray-200"></div>
          )}
          <div className="absolute right-3 top-3">
            <div className="flex size-9 flex-col items-center justify-center rounded-[5px] border-[0.5px] border-[#53AFC2] bg-gradient-to-r from-[#006A7F] to-[rgba(17,143,168,0.10)] backdrop-blur-[2.5px] [background-position:100%_0] [background-size:200%_200%]">
              <UserRound className="h-4 w-4 text-white" />
              <span className="text-xs font-medium text-white">
                {event.guestCount || "N/A"}
              </span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between">
            <div className="mb-2 flex items-center gap-2">
              <div className={cn("size-4 rounded-full", "bg-pink-500")} />
              <span className="text-xl font-bold">{event.type}</span>
            </div>
            {invite && invite.template_id && (
              <Button size="sm" variant="ghost" onClick={handleViewInvite}>
                <MailSearch />
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg
              width="15"
              height="15"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1438_12259)">
                <path
                  d="M1.25 4.16671V7.91671C1.25 8.37696 1.6231 8.75004 2.08333 8.75004H7.91667C8.37692 8.75004 8.75 8.37696 8.75 7.91671V4.16671M1.25 4.16671H8.75M1.25 4.16671V2.50004C1.25 2.0398 1.6231 1.66671 2.08333 1.66671H2.91667M8.75 4.16671V2.50004C8.75 2.0398 8.37692 1.66671 7.91667 1.66671H7.70833M6.25 1.66671V0.833374M6.25 1.66671V2.50004M6.25 1.66671H4.375M2.91667 2.50004V0.833374"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1438_12259">
                  <rect width="10" height="10" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span>{event.date}</span>
            <span> </span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1438_12483)">
                <path
                  d="M5 3L5 5.5L7.5 5.5"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.99967 9.66671C7.30086 9.66671 9.16634 7.80123 9.16634 5.50004C9.16634 3.19885 7.30086 1.33337 4.99967 1.33337C2.69849 1.33337 0.833008 3.19885 0.833008 5.50004C0.833008 7.80123 2.69849 9.66671 4.99967 9.66671Z"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1438_12483">
                  <rect
                    width="10"
                    height="10"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>

            <span>{event.time}</span>
          </div>{" "}
          <div className="mt-2 text-sm text-muted-foreground">
            {event.location}
          </div>
        </div>
      </div>
      <Dialog
        draggable={false}
        visible={showInviteCard}
        onHide={() => setShowInviteCard(false)}
        className="w-full max-w-xl"
        header={
          <div className="flex justify-between">
            <div>View Invitation</div>
            <Button size="sm" variant="ghost" onClick={handleDownloadInvite}>
              <DownloadIcon />
            </Button>
          </div>
        }
      >
        <div className="aspect-[607/860]" ref={captureRef} id="capture">
          {invite ? (
            invite?.template_id === "1" ? (
              <Invite1 invite={invite} />
            ) : invite?.template_id === "2" ? (
              <Invite2 invite={invite} />
            ) : invite?.template_id === "3" ? (
              <Invite3 invite={invite} />
            ) : invite?.template_id === "4" ? (
              <Invite4 invite={invite} />
            ) : invite?.template_id === "5" ? (
              <Invite5 invite={invite} />
            ) : null
          ) : null}
        </div>
      </Dialog>
    </div>
  )
}
