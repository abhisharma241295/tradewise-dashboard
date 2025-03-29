import { cn } from "@/lib/utils/cn"
import React, { useRef, useEffect } from "react"

interface TabViewProps {
  tabNames: string[]
  value: string
  onChange: (tab: string) => void
}

const TabView2: React.FC<TabViewProps> = ({ tabNames, value, onChange }) => {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    updateSliderPosition()
  }, [value])

  const updateSliderPosition = () => {
    const activeTabIndex = tabNames.indexOf(value)
    const activeTabElement = tabsRef.current[activeTabIndex]
    if (activeTabElement && sliderRef.current) {
      sliderRef.current.style.width = `${activeTabElement.offsetWidth}px`
      sliderRef.current.style.transform = `translateX(${activeTabElement.offsetLeft}px)`
    }
  }

  return (
    <div
      className={cn(
        "inline-block rounded-full border border-[#006A7F] !font-medium lg:mx-0"
      )}
    >
      <div className="flex">
        {tabNames.map((tab) => (
          <button
            key={tab}
            className={cn(
              `rounded-full px-2 py-1 transition-colors md:px-4 ${
                value === tab ? "bg-[#006A7F] text-white" : "text-[#006A7F]"
              }`
            )}
            onClick={() => onChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TabView2
