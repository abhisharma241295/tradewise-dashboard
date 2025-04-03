"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { usePathname } from "next/navigation"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
    isUpcoming: boolean
  }[]
}) {
  const pathname = usePathname()
  
  return (
    <SidebarGroup className="!pl-0">
      <SidebarGroupLabel className="ml-2">MAIN</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <Collapsible
            key={item.name}
            asChild
            className="group/collapsible relative"
          >
            <SidebarMenuItem>
              <div 
                className={`absolute left-0 top-1 h-[calc(100%-8px)] w-1 transition-colors duration-200 rounded-r-sm ${
                  pathname === item.url ? 'bg-primary' : 'bg-transparent'
                }`}
              />
              <a href={item.url} className={item.isUpcoming ? "pointer-events-none" : ""}>
                <SidebarMenuButton 
                  tooltip={item.name} 
                  isActive={pathname === item.url} 
                  className={`!mx-2 ${item.isUpcoming ? "opacity-70" : ""}`}
                >
                  {item.icon && <item.icon className={pathname === item.url ? 'text-primary' : ''} />}
                  <span className="whitespace-nowrap">{item.name}</span>
                  {item.isUpcoming && (
                    <span className="ml-auto bg-gray-100 text-gray-700 px-1.5 py-[1px] rounded-full font-medium !text-[10px]">
                      UPCOMING
                    </span>
                  )}
                </SidebarMenuButton>
              </a>
            </SidebarMenuItem>
          </Collapsible>
        ))}

      </SidebarMenu>
    </SidebarGroup>
  )
}
