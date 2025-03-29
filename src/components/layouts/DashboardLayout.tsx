// components/DashboardLayout.tsx
import React, { ReactNode, useState } from "react"
import AppBar from "../ui/commons/appbar"
import Drawer from "../ui/commons/drawer"
import WeddingForm from "../ui/forms/NewWeddingForm"
import { Sidebar } from "primereact/sidebar"
import { Toaster } from "sonner"
import EmptyDashboard from "../ui/EmptyDashboard"
import { useAppSelector } from "@/lib/redux/hooks"
import { WeddingCouple } from "@/types/WeddingCouple"
import { mergeWeddingLists } from "@/lib/utils/weddingUtil"
import { useRouter } from "next/router"

type DashboardLayoutProps = {
  children: ReactNode
  weddingInfo?: {
    completed?: WeddingCouple[]
    live?: WeddingCouple[]
    upcoming?: WeddingCouple[]
  }
}

export default function DashboardLayout({
  children,
  weddingInfo,
}: DashboardLayoutProps) {
  const [visible, setVisible] = useState(false)
  const currentWeddingId = useAppSelector(
    (state) => state.currentWedding.currentWeddingId
  )
  const router = useRouter()
  return (
    <div className="flex h-screen flex-col">
      <AppBar />
      <div className="flex grow flex-row overflow-auto">
        <Drawer showNewProjectPopup={setVisible} />
        {currentWeddingId ||
        (weddingInfo && mergeWeddingLists(weddingInfo).length > 0) ||
        !router.pathname.includes("/dashboard") ? (
          <div className="flex h-full grow overflow-y-auto">{children}</div>
        ) : (
          <EmptyDashboard showNewProjectPopup={setVisible} />
        )}
      </div>
      <Sidebar
        position="right"
        visible={visible}
        onHide={() => setVisible(false)}
        className="max-width-screen w-[450px]"
        content={
          <WeddingForm
            onClose={() => {
              setVisible(false)
            }}
          />
        }
      />
      <Toaster position="top-center" />
    </div>
  )
}
