import { Theme1 } from "@/components/custom-website-themes/theme1"

interface Props {
  tabMode: "desktop" | "mobile" | "email"
}

export default function WebsiteContent({ tabMode }: Props) {
  return (
    <div className="relative flex size-full items-start justify-center !overflow-auto p-20">
      <div
        style={{
          maxWidth: tabMode == "desktop" ? "1500px" : "450px",
        }}
        className="flex min-h-screen w-screen select-none items-center justify-center overflow-hidden rounded-lg bg-white p-4 shadow-md"
      >
        <div className="overflow-hidden rounded-md">
          <Theme1 compactMode={tabMode == "mobile"} />
        </div>
      </div>
    </div>
  )
}
