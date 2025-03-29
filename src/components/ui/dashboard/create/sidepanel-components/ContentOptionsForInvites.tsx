import { SidebarButton } from "@/components/ui/commons/SidebarButton"
import { Divider } from "primereact/divider"

interface ContentOptionsForInvitesProps {
  onNavigate: (title: string, section: string) => void
}

export default function ContentOptionsForInvites({
  onNavigate,
}: ContentOptionsForInvitesProps) {
  const contentSections = [
    { title: "Couple Information", section: "invite1_couple_info" },
    { title: "Wedding Information", section: "invite1_wedding_info" },
  ]

  return (
    <div className="overflow-y-auto bg-white p-2">
      <h1 className="mb-2 font-semibold text-gray-700">Content Options</h1>

      <div className="overflow-x-auto">
        <div className="flex space-x-6 pb-0">
          <div className="w-full overflow-hidden rounded-md border">
            {contentSections.map((section, index) => (
              <div key={section.section}>
                <SidebarButton
                  onClick={() => onNavigate(section.title, section.section)}
                >
                  {section.title}
                </SidebarButton>
                {index < contentSections.length - 1 && (
                  <Divider className="m-0 p-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
