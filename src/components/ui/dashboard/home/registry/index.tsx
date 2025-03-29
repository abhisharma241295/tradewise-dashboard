import React from "react"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import WeddingOverview from "@/types/WeddingOverview"
import Button from "@/components/ui/Button"

const TaskListItem = () => {
  return (
    <div className="flex cursor-pointer items-center bg-white p-3 hover:bg-hover">
      <Image
        src={"/sofa.png"}
        alt={""}
        width={65}
        height={65}
        className="mr-3 overflow-hidden rounded-md"
      />
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-800">Title</h3>
        <p className="text-sm text-gray-500">OTY:24</p>
        <p className="text-sm text-gray-500">Contributors:</p>
      </div>
    </div>
  )
}

interface Props {
  data: WeddingOverview | undefined
}

const HomeRegistry: React.FC<Props> = ({ data }) => {
  if (Object.keys(data?.registry ?? {}).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center overflow-hidden rounded-xl border">
        <svg
          className="flex-shrink-0"
          width="82"
          height="82"
          viewBox="0 0 82 82"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M68.3333 41V58.0833M13.6667 41V74.5667C13.6667 74.898 13.9353 75.1667 14.2667 75.1667H55"
            stroke="#118FA8"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M74.5667 23.9166H7.43333C7.10196 23.9166 6.83333 24.1853 6.83333 24.5166V40.4C6.83333 40.7313 7.10196 41 7.43333 41H74.5667C74.898 41 75.1667 40.7313 75.1667 40.4V24.5166C75.1667 24.1853 74.898 23.9166 74.5667 23.9166Z"
            stroke="#118FA8"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M41 75.1666V23.9166"
            stroke="#118FA8"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M41 23.9167H25.625C23.3596 23.9167 21.187 23.0168 19.5851 21.4149C17.9833 19.813 17.0833 17.6404 17.0833 15.375C17.0833 13.1096 17.9833 10.937 19.5851 9.33517C21.187 7.7333 23.3596 6.83337 25.625 6.83337C37.5833 6.83337 41 23.9167 41 23.9167Z"
            stroke="#118FA8"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M41 23.9167H56.375C58.6404 23.9167 60.813 23.0168 62.4149 21.4149C64.0167 19.813 64.9167 17.6404 64.9167 15.375C64.9167 13.1096 64.0167 10.937 62.4149 9.33517C60.813 7.7333 58.6404 6.83337 56.375 6.83337C44.4167 6.83337 41 23.9167 41 23.9167Z"
            stroke="#118FA8"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M65 64V76"
            stroke="#118FA8"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M59 70H71"
            stroke="#118FA8"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
        <Button variant={"link"} className="mt-4 text-sm font-semibold">
          Add a registry
        </Button>
      </div>
    )
  }
  return (
    <div>
      <div className="overflow-hidden rounded-xl border">
        <div className="flex items-center justify-between p-4">
          <p className="text-lg font-bold">Registry</p>
        </div>
        <div className="border-t pt-4">
          <div className="flex space-x-4 px-5">
            <div className="flex-1">
              <div className="mb-2 flex items-center text-sm text-gray-500">
                <span className="mr-1">$</span>
                Gifts received
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold">10</span>
                <ArrowUpRight className="text-green-500" size={20} />
              </div>
            </div>
            {/* Vertical Divider */}
            <div className="w-px bg-gray-200"></div>
            <div className="flex-1">
              <div className="mb-2 flex items-center text-sm text-gray-500">
                <span className="mr-1">$</span>
                Funds
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold">$10.5k</span>
                <ArrowUpRight className="text-green-500" size={20} />
              </div>
            </div>
          </div>
          {/* Horizontal Divider */}
          <div className="mt-4 h-px bg-gray-200"></div>
          <TaskListItem />
          <TaskListItem />
          <TaskListItem />
        </div>
      </div>
    </div>
  )
}

export default HomeRegistry
