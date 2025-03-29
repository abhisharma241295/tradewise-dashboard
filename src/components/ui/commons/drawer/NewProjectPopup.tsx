import React from "react"
import { Plus, Calendar, Activity, CheckSquare } from "lucide-react"
import { useGetWeddingsQuery } from "@/lib/redux/features/apis/weddingApi"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { WeddingCouple } from "@/types/WeddingCouple"
import { setCurrentWedding } from "@/lib/redux/features/slices/currentWeddingSlice"
import { cn } from "@/lib/utils/cn"
import { Button } from "primereact/button"
import { Avatar } from "primereact/avatar"
// import { useAppSelector } from "@/lib/redux/hooks";

interface NewProjectProps {
  showNewProjectPopup: (show: boolean) => void
  closePopover: () => void
}

export function NewProjectPopup(props: NewProjectProps) {
  return (
    <>
      <div className="w-full p-2">
        <Button
          size="small"
          className="flex w-full flex-row items-center justify-center"
          onClick={() => props.showNewProjectPopup(true)}
        >
          <Plus className="mr-2" size={20} />
          Add wedding
        </Button>
      </div>

      <div className="px-2 py-4">
        <h2 className="mb-1 flex items-center p-1 font-semibold text-orange-400">
          <Calendar className="mr-2" size={20} />
          Upcoming
        </h2>
        <WeddingList type="upcoming" closePopover={props.closePopover} />
        <h2 className="mb-1 mt-4 flex items-center p-1 font-semibold text-green-500">
          <Activity className="mr-2" size={20} />
          Live
        </h2>
        <WeddingList type="live" closePopover={props.closePopover} />
        <h2 className="mb-1 mt-4 flex items-center p-1 font-semibold text-blue-500">
          <CheckSquare className="mr-2" size={20} />
          Completed
        </h2>
        <WeddingList type="completed" closePopover={props.closePopover} />
      </div>
    </>
  )
}

function WeddingList({
  type,
  closePopover,
}: {
  type: string
  closePopover: () => void
}) {
  const { data: weddings } = useGetWeddingsQuery(undefined) as {
    data?: {
      live?: WeddingCouple[]
      completed?: WeddingCouple[]
      upcoming?: WeddingCouple[]
    }
  }
  const dispatch = useAppDispatch()
  const currentWeddingId = useAppSelector(
    (state) => state.currentWedding.currentWeddingId
  )
  return (
    <ul>
      {weddings &&
        (
          (weddings[type as keyof typeof weddings] as WeddingCouple[]) || []
        ).map((wedding: WeddingCouple, index: number) => (
          <li
            key={index}
            onClick={() => {
              dispatch(setCurrentWedding(wedding.wedding_id.toString()))
              closePopover() // Add this line to close the popover
            }}
            className={cn(
              "mb-1 flex cursor-pointer items-center rounded-md p-1.5",
              wedding.wedding_id == currentWeddingId && "bg-secondary",
              "hover:bg-accent"
            )}
          >
            {wedding.image_url ? (
              <Avatar
                image={wedding.image_url}
                shape="circle"
                className="mr-2"
              />
            ) : (
              <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-white">
                {wedding.couple[0].first_name[0]}
              </span>
            )}
            <span>{`${wedding?.couple[0].first_name.toString()} and ${wedding?.couple[1].first_name.toString()}`}</span>
          </li>
        ))}
    </ul>
  )
}
