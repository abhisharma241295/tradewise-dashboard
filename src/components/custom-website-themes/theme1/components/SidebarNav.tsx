import { cn } from '@/lib/utils/cn'
import React from 'react'

interface NavItem {
  title: string
  href: string
}

const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Couple", href: "/couple" },
  { title: "Our Story", href: "/our-story" },
  { title: "Friends", href: "/friends" },
  { title: "Organization", href: "/organization" },
  { title: "Gallery", href: "/gallery" },
  { title: "When & Where", href: "/when-and-where" },
  { title: "R.S.V.P", href: "/rsvp" },
  { title: "Gift Registry", href: "/gift-registry" },
  { title: "Blog", href: "/blog" },
]

export const SidebarNav: React.FC = () => {
  return (
    <nav className="flex flex-col items-center space-y-2">
      {navItems.map((item) => (
        <div
          key={item.href}
          // href={item.href}
          className={cn("text-sm transition-colors", "font-light")}
        >
          {item.title}
        </div>
      ))}
    </nav>
  )
}
