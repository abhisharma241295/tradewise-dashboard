import { cn } from "@/lib/utils/cn"
import React, { useRef, useEffect } from "react"

interface TabViewProps {
  tabNames: string[]
  value: string
  onChange: (tab: string) => void
  className?: string
}

const TabView: React.FC<TabViewProps> = ({
  tabNames,
  value,
  onChange,
  className,
}) => {
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
    <div className="relative mb-2 block">
      <div className="flex">
        {tabNames.map((tab, index) => (
          <button
            key={tab}
            ref={(el) => {
              tabsRef.current[index] = el
            }}
            className={cn(
              "px-4 py-2 text-lg transition-colors duration-200",
              className,
              value === tab
                ? "font-semibold text-[hsl(var(--foreground))]"
                : "font-regular text-[#949597] hover:text-gray-700"
            )}
            onClick={() => onChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div
        ref={sliderRef}
        className="absolute bottom-0 left-0 h-0.5 bg-[#118FA8] transition-all duration-300 ease-in-out"
      />
    </div>
  )
}

export default TabView
