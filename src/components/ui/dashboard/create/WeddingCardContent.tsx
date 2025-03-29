import Invite1 from "@/components/invite-cards/invite1"
import Invite2 from "@/components/invite-cards/invite2"
import Invite3 from "@/components/invite-cards/invite3"
import Invite4 from "@/components/invite-cards/invite4"
import Invite5 from "@/components/invite-cards/invite5"
import { useAppSelector } from "@/lib/redux/hooks"

interface Props {
  selectedInviteTemplate: string
}

export default function WeddingCardContent({ selectedInviteTemplate }: Props) {
  const inviteCardData = useAppSelector(
    (state) => state.inviteCard.inviteCardData
  )
  console.log(selectedInviteTemplate)
  return (
    <div className="relative flex size-full items-start justify-center !overflow-auto pb-4 pt-20">
      <div className="relative flex select-none items-center justify-center overflow-hidden bg-white p-2 shadow-md">
        <div className="aspect-[607/860] w-auto overflow-hidden rounded-md">
          {selectedInviteTemplate ? (
            selectedInviteTemplate === "1" ? (
              <Invite1 invite={inviteCardData} />
            ) : selectedInviteTemplate === "2" ? (
              <Invite2 invite={inviteCardData} />
            ) : selectedInviteTemplate === "3" ? (
              <Invite3 invite={inviteCardData} />
            ) : selectedInviteTemplate === "4" ? (
              <Invite4 invite={inviteCardData} />
            ) : selectedInviteTemplate === "5" ? (
              <Invite5 invite={inviteCardData} />
            ) : null
          ) : null}
        </div>
      </div>
    </div>
  )
}
