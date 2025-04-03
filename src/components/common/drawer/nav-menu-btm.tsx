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

export function NavMenuBtm({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const pathname = usePathname()
  
  return (
    <SidebarGroup className="!pl-0">
      {/* <SidebarGroupLabel>MAIN</SidebarGroupLabel> */}
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
              <a href={item.url}>
                <SidebarMenuButton tooltip={item.name} isActive={pathname === item.url} className="!mx-2 ">
                  {item.icon && <item.icon />}
                  <span>{item.name}</span>
                  {/* <ChevronRight className="ml-auto" /> */}
                </SidebarMenuButton>
              </a>
            </SidebarMenuItem>
          </Collapsible>
        ))}

      </SidebarMenu>
    </SidebarGroup>
  )
}
