import React from "react"
import { ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { cn } from "@/lib/utils/cn"
import { UserRound, SettingsIcon, BellDot, ShieldIcon } from "lucide-react"

interface UserSettingsLayoutProps {
  children: ReactNode
}

const UserSettingsLayout: React.FC<UserSettingsLayoutProps> = ({
  children,
}) => {
  const router = useRouter()

  return (
    <div className="flex h-full w-full">
      <div className="w-64 bg-[#ECF4F5] p-2">
        <nav>
          <ul className="space-y-2">
            {[
              { href: "/settings/profile", icon: UserRound, label: "Profile" },
              {
                href: "/settings/user-settings",
                icon: SettingsIcon,
                label: "Settings",
              },
              {
                href: "/settings/notifications",
                icon: BellDot,
                label: "Notifications",
              },
              {
                href: "/settings/privacy-and-security",
                icon: ShieldIcon,
                label: "Privacy & Security",
              },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "mb-1 flex cursor-pointer items-center rounded-md p-2",
                    "hover:bg-white",
                    router.pathname === item.href ? "bg-white" : ""
                  )}
                >
                  <item.icon className="h-4 w-4 text-[#11131C]" />
                  <span className="ml-2 text-sm font-[500] text-[#11131C]">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex-1 p-6">{children}</div>
    </div>
  )
}

export default UserSettingsLayout
