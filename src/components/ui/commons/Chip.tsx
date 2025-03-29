import { cn } from "@/lib/utils/cn"
import React from "react"

interface ChipProps {
  label: string
}

const Chip: React.FC<ChipProps> = ({ label }) => {
  return (
    <div
      className={cn(
        "flex w-min items-center rounded-full border bg-white px-3 py-1 text-gray-700",
        label === "Coming" ? "border-green-500" : "border-gray-400"
      )}
    >
      <div
        className={cn(
          "mr-2 h-2 w-2 rounded-full",
          label === "Coming" ? "bg-green-500" : "bg-gray-400"
        )}
      ></div>
      <span>{label}</span>
    </div>
  )
}

export default Chip
