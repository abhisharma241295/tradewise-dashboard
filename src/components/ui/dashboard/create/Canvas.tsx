import { Computer, Mail, Smartphone } from "lucide-react"
import TabView3 from "../../commons/TabView3"
import WebsiteContent from "./WebsiteContent"
import { InviteProps } from "@/types/InviteCard"
import WeddingCardContent from "./WeddingCardContent"

interface Props {
  tabMode: "desktop" | "mobile" | "email"
  setTabMode: (tabMode: "desktop" | "mobile" | "email") => void
  selectedInviteTemplate: string
  // invite: InviteProps
}

export default function Canvas({
  tabMode,
  setTabMode,
  selectedInviteTemplate,
  // invite,
}: Props) {
  return (
    <div className="relative size-full bg-[#ECF4F5]">
      {tabMode !== "email" ? (
        <WebsiteContent
          tabMode={tabMode}
          // invite={invite}
        />
      ) : (
        <WeddingCardContent selectedInviteTemplate={selectedInviteTemplate} />
      )}

      <div className="absolute left-1/2 top-6 -translate-x-1/2">
        <TabView3
          tabs={[
            { id: "desktop", icon: <Computer className="h-6 w-6" /> },
            { id: "mobile", icon: <Smartphone className="h-6 w-6" /> },
            { id: "email", icon: <Mail className="h-6 w-6" /> },
          ]}
          value={tabMode}
          onChange={(newMode) =>
            setTabMode(newMode as "desktop" | "mobile" | "email")
          }
        />
      </div>
    </div>
  )
}
