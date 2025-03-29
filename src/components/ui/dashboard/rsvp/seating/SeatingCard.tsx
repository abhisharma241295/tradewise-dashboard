import React from "react"
import Image from "next/image"

interface SeatingCardProps {
  seating: any
  index: number
  onClick: (seating: any) => void
}

const SeatingCard: React.FC<SeatingCardProps> = ({ seating, onClick }) => {
  return (
    <div
      className="w-full max-w-xs overflow-hidden rounded-2xl border bg-white hover:shadow-md"
      onClick={() => {
        onClick(seating)
      }}
    >
      <div className="space-y-2 p-3">
        <Image
          src="/image.png"
          alt="Seating Image"
          layout="responsive"
          width={400}
          height={300}
          className="aspect-[4/3] cursor-pointer rounded-lg object-cover"
        />
        <div className="flex items-center gap-1">
          <div className="size-3 rounded-full bg-rose-400" />
          <span className="text-xl font-semibold text-gray-900">
            {seating.name}
          </span>
        </div>
      </div>
    </div>
  )
}

export default SeatingCard
