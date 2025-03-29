import React from "react"
import { cn } from "@/lib/utils/cn"

interface TabViewProps {
  tabs: { id: string; icon: React.ReactNode }[]
  value: string
  onChange: (value: string) => void
}

const TabView3: React.FC<TabViewProps> = ({ tabs, value, onChange }) => {
  return (
    <div className="inline-flex rounded-lg bg-gray-100 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "transform rounded-lg p-2 transition-all duration-300 ease-in-out",
            value === tab.id ? "bg-white shadow-sm" : ""
          )}
        >
          {tab.icon}
        </button>
      ))}
    </div>
  )
}

export default TabView3
