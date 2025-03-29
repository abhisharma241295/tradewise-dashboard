"use client"

import { InputText } from "primereact/inputtext"
import { OverlayPanel } from "primereact/overlaypanel"
import { useRef } from "react"
import Image from "next/image"
import icon1 from "@/components/static/icons/event-icons/1.svg"
import icon2 from "@/components/static/icons/event-icons/2.svg"
import icon3 from "@/components/static/icons/event-icons/3.svg"
import icon4 from "@/components/static/icons/event-icons/4.svg"
import icon5 from "@/components/static/icons/event-icons/5.svg"
import icon6 from "@/components/static/icons/event-icons/6.svg"
import icon7 from "@/components/static/icons/event-icons/7.svg"
import icon8 from "@/components/static/icons/event-icons/8.svg"
import icon9 from "@/components/static/icons/event-icons/9.svg"
import icon10 from "@/components/static/icons/event-icons/10.svg"
import icon11 from "@/components/static/icons/event-icons/11.svg"
import icon12 from "@/components/static/icons/event-icons/12.svg"
import icon13 from "@/components/static/icons/event-icons/13.svg"
import icon14 from "@/components/static/icons/event-icons/14.svg"
import icon15 from "@/components/static/icons/event-icons/15.svg"
import icon16 from "@/components/static/icons/event-icons/16.svg"
import icon17 from "@/components/static/icons/event-icons/17.svg"
import icon18 from "@/components/static/icons/event-icons/18.svg"
import icon19 from "@/components/static/icons/event-icons/19.svg"
import icon20 from "@/components/static/icons/event-icons/20.svg"
import icon21 from "@/components/static/icons/event-icons/21.svg"
import icon22 from "@/components/static/icons/event-icons/22.svg"
import icon23 from "@/components/static/icons/event-icons/23.svg"
import icon24 from "@/components/static/icons/event-icons/24.svg"
import icon25 from "@/components/static/icons/event-icons/25.svg"
import icon26 from "@/components/static/icons/event-icons/26.svg"
import icon27 from "@/components/static/icons/event-icons/27.svg"
import icon28 from "@/components/static/icons/event-icons/28.svg"
export const EVENT_ICONS = [
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon7,
  icon8,
  icon9,
  icon10,
  icon11,
  icon12,
  icon13,
  icon14,
  icon15,
  icon16,
  icon17,
  icon18,
  icon19,
  icon20,
  icon21,
  icon22,
  icon23,
  icon24,
  icon25,
  icon26,
  icon27,
  icon28,
]

interface EventInputProps {
  value: string
  onChange: (value: string) => void
  icon: string
  onIconChange: (icon: string) => void
}

export default function InputBoxWithEmoji({
  value,
  onChange,
  icon,
  onIconChange,
}: EventInputProps) {
  const op = useRef<OverlayPanel>(null)

  return (
    <div className="relative w-full">
      <span className="p-input-icon-right w-full">
        <InputText
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pr-12" // Extra padding for the icon
          placeholder="Enter event name"
        />
        <button
          onClick={(e) => op.current?.toggle(e)}
          className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
          type="button"
        >
          <Image src={icon ?? icon12} alt="Event icon" width={16} height={16} />
        </button>
      </span>

      <OverlayPanel ref={op} className="w-[320px]">
        <div className="grid grid-cols-7 gap-2 rounded-[6px] border border-[var(--primary)] p-2">
          {EVENT_ICONS.map((IconSrc, index) => (
            <button
              key={index}
              onClick={() => {
                onIconChange(IconSrc)
                op.current?.hide()
              }}
              className="flex h-8 w-8 items-center justify-center overflow-hidden rounded transition-colors hover:bg-gray-100"
            >
              <Image
                src={IconSrc}
                alt="Event icon"
                width={20}
                height={20}
                className="h-[20px] w-auto"
              />
            </button>
          ))}
        </div>
      </OverlayPanel>
    </div>
  )
}
