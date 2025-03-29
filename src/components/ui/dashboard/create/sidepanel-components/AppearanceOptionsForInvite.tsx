import { SidebarButton } from "@/components/ui/commons/SidebarButton"

interface AppearanceOptionsForInviteProps {
  onNavigate: (title: string) => void
}
const theme1AppearanceOptions = [
  {
    primary: "#E5D4BD",
    secondary: "#BD945A",
    tertiary: "#F6F1F0",
    quaternary: "#FAF8F7",
  },
  {
    primary: "#009D69",
    secondary: "#97C1B3",
    tertiary: "#F1FFFA",
    quaternary: "#F7FAF9",
  },
  {
    primary: "#A700B9",
    secondary: "#B98BBE",
    tertiary: "#FDECFF",
    quaternary: "#FEF5FF",
  },
  {
    primary: "#004BBC",
    secondary: "#7694C1",
    tertiary: "#E9F2FF",
    quaternary: "#F5F9FF",
  },
]

export default function AppearanceOptionsForInvite({
  onNavigate,
}: AppearanceOptionsForInviteProps) {
  return (
    <div className="overflow-y-auto bg-white px-2">
      <h1 className="mb-2 font-semibold text-gray-700">Appearance Options</h1>

      <div className="overflow-x-auto">
        <div className="flex space-x-6">
          <div className="w-full overflow-hidden rounded-md border">
            <SidebarButton onClick={() => onNavigate("Theme & Font")}>
              Theme & Font
            </SidebarButton>
          </div>
        </div>
      </div>
    </div>
  )
}
