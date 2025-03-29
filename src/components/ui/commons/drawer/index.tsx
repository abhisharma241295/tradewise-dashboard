import React, { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "../PopOver"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { useGetWeddingsQuery } from "@/lib/redux/features/apis/weddingApi"
import { WeddingCouple } from "@/types/WeddingCouple"
import { HomeIcon, MailOpenIcon } from "lucide-react"
import PlannerIcon from "@/components/static/icons/planner"
import { NewProjectPopup } from "./NewProjectPopup"
import WalletIcon from "@/components/static/icons/wallet"
import {
  getCurrentWedding,
  saveCurrentWedding,
} from "@/lib/cookies/currentWeddingCookie"
import { setCurrentWedding } from "@/lib/redux/features/slices/currentWeddingSlice"
import { stringToHexColor } from "@/lib/utils/stringToHexColorConverter"
import { Avatar } from "primereact/avatar"
import { getWeddingInfo, mergeWeddingLists } from "@/lib/utils/weddingUtil"
import CreateIcon from "@/components/static/icons/create"

interface DrawerProps {
  showNewProjectPopup: (show: boolean) => void
}

export default function Drawer(props: DrawerProps) {
  const pathname = usePathname()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const currentWeddingId = useAppSelector(
    (state) => state.currentWedding.currentWeddingId
  )
  const currentWeddingCookie = getCurrentWedding()
  const { data: weddings } = useGetWeddingsQuery(undefined)
  const dispatch = useAppDispatch()

  if (currentWeddingCookie == null) {
    const allWeddings = mergeWeddingLists(weddings)
    if (allWeddings[0]?.wedding_id) {
      dispatch(setCurrentWedding(allWeddings[0].wedding_id))
      saveCurrentWedding(allWeddings[0].wedding_id)
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const getWeddingInitials = (wedding: WeddingCouple | undefined): string => {
    if (!wedding) return "CS"
    const couple = wedding.couple
    if (couple.length === 2) {
      return `${couple[0].first_name[0]}${couple[1].first_name[0]}`
    } else if (couple.length === 1) {
      return `${couple[0].first_name[0]}${couple[0].last_name[0]}`
    }
    return "CS"
  }

  const selectedWedding =
    weddings && getWeddingInfo(weddings, currentWeddingId || "")
  const weddingInitials = getWeddingInitials(selectedWedding)

  const menuItems = [
    { icon: HomeIcon, label: "Home", path: "/dashboard" },
    { icon: PlannerIcon, label: "Planner", path: "/dashboard/planner" },
    { icon: CreateIcon, label: "Create", path: "/dashboard/create" },
    { icon: WalletIcon, label: "Budgeter", path: "/dashboard/budgeter" },
    { icon: MailOpenIcon, label: "RSVP", path: "/dashboard/rsvp" },
    // { icon: GiftIcon, label: "Registry", path: "/dashboard/registry" },
  ]

  console.log(selectedWedding)
  return (
    <>
      {/* Side Drawer for Desktop */}
      <div className="hidden h-full w-16 flex-col items-center justify-between border-r bg-white py-4 md:flex">
        <div className="flex flex-col items-center space-y-4">
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <div
                className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full"
                onMouseEnter={() => setIsPopoverOpen(true)}
                onMouseLeave={() => setIsPopoverOpen(false)}
              >
                {selectedWedding?.image_url ? (
                  <div className="flex flex-col gap-1">
                    <Avatar
                      image={selectedWedding.image_url}
                      shape="circle"
                      size="large"
                      // onError={(e) => {
                      //   (e.target as any).src =
                      //     "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png";
                      // }}
                    />
                  </div>
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center"
                    style={{
                      backgroundColor: stringToHexColor(
                        `${selectedWedding?.couple[0]?.first_name || ""} ${selectedWedding?.couple[0]?.last_name || ""} and ${selectedWedding?.couple[1]?.first_name || ""} ${selectedWedding?.couple[1]?.last_name || ""}`
                      ),
                    }}
                  >
                    <span className="text-xs font-bold text-white">
                      {weddingInitials}
                    </span>
                  </div>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="-mt-12 ml-16 p-0"
              onMouseEnter={() => setIsPopoverOpen(true)}
              onMouseLeave={() => setIsPopoverOpen(false)}
            >
              <NewProjectPopup
                showNewProjectPopup={props.showNewProjectPopup}
                closePopover={() => setIsPopoverOpen(false)}
              />
            </PopoverContent>
          </Popover>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex w-full flex-col items-center rounded-md p-2 transition hover:bg-accent ${
                mounted && pathname === item.path
                  ? "bg-secondary !text-black"
                  : ""
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="mt-1 text-[10px]">{item.label}</span>
            </Link>
          ))}
        </div>
        {/* <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500">
          <span className="text-xs font-bold text-white">MK</span>
        </div> */}
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex w-full justify-around bg-white p-2 md:hidden">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex flex-col items-center ${
              mounted && pathname === item.path ? "text-black" : "text-gray-500"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px]">{item.label}</span>
          </Link>
        ))}
      </div>
    </>
  )
}
