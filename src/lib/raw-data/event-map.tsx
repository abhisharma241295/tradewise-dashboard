import Dining from "@/components/static/marriage-icons/Dining"
import Reception from "@/components/static/marriage-icons/Reception"
import Wedding from "@/components/static/marriage-icons/Wedding"
import { Tooltip } from "primereact/tooltip"
import React from "react"

const eventMap: Record<string, string> = {
  dining: "Dining",
  reception: "Reception",
  wedding: "Wedding",
}
export const eventIconMap: Record<string, React.ReactNode> = {
  dining: (
    <div>
      <Tooltip target=".dining-icon" position="bottom">
        Dining
      </Tooltip>
      <Dining className="dining-icon" />
    </div>
  ),
  reception: (
    <div>
      <Tooltip target=".reception-icon" position="bottom">
        Reception
      </Tooltip>
      <Reception className="reception-icon" />
    </div>
  ),
  wedding: (
    <div>
      <Tooltip target=".wedding-icon" position="bottom">
        Wedding
      </Tooltip>
      <Wedding className="wedding-icon" />
    </div>
  ),
}
export const eventList = [
  { label: "Dining", value: "dining", icon: <Dining /> },
  { label: "Reception", value: "reception", icon: <Reception /> },
  { label: "Wedding", value: "wedding", icon: <Wedding /> },
]
export default eventMap
