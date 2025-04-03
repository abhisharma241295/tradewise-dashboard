"use client"

import * as React from "react"
import { ChevronRightIcon, ChevronsUpDown, Plus } from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuShortcut, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel } from "../common/dropdown-menu"

interface SwitcherItem {
  name: string
  icon: React.ElementType
  description?: string
}

interface SwitcherProps<T extends SwitcherItem> {
  items: T[]
  label: string
  onItemSelect?: (item: T) => void
  showAddButton?: boolean
  onAddClick?: () => void
  className?: string
}

export function Switcher<T extends SwitcherItem>({
  items,
  label,
  onItemSelect,
  showAddButton = false,
  onAddClick,
  className,
}: SwitcherProps<T>) {
  const { isMobile } = useSidebar()
  const [activeItem, setActiveItem] = React.useState(items[0])

  if (!activeItem) {
    return null
  }

  const handleItemSelect = (item: T) => {
    setActiveItem(item)
    onItemSelect?.(item)
  }

  return (
    <SidebarMenu className={className}>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-primary text-sidebar-primary-foreground !p-1">
                <activeItem.icon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeItem.name}
                </span>
                {activeItem.description && (
                  <span className="truncate text-xs">{activeItem.description}</span>
                )}
              </div>
              <ChevronRightIcon className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              {label}
            </DropdownMenuLabel>
            {items.map((item, index) => (
              <DropdownMenuItem
                key={item.name}
                onClick={() => handleItemSelect(item)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <item.icon className="size-4 shrink-0" />
                </div>
                {item.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            {showAddButton && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2" onClick={onAddClick}>
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">Add {label.toLowerCase()}</div>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}       