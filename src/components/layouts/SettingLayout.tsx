import { BellDot, SettingsIcon, ShieldIcon, UserRound } from "lucide-react"
import Link from "next/link"
import { ReactNode } from "react"
import { cn } from "@/lib/utils/cn"
import { useRouter } from "next/router"

type SettingLayoutProps = {
  children: ReactNode
}

export default function SettingLayout({ children }: SettingLayoutProps) {
  const router = useRouter()
  return (
    <div className="flex h-full w-full">
      <div className="w-64 bg-[#ECF4F5] p-2">
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                href="/settings/profile"
                className={cn(
                  "mb-1 flex cursor-pointer items-center rounded-md p-2",
                  "hover:bg-white",
                  router.pathname === "/settings/profile" ? "bg-white" : ""
                )}
              >
                <UserRound className="h-4 w-4 text-[#11131C]" />
                <span className="ml-2 text-sm font-[500] text-[#11131C]">
                  Profile
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/settings/user-settings"
                className={cn(
                  "mb-1 flex cursor-pointer items-center rounded-md p-2",
                  "hover:bg-white",
                  router.pathname === "/settings/user-settings"
                    ? "bg-white"
                    : ""
                )}
              >
                <SettingsIcon className="h-4 w-4 text-[#11131C]" />
                <span className="ml-2 text-sm font-[500] text-[#11131C]">
                  Settings
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/settings/privacy-and-security"
                className={cn(
                  "mb-1 flex cursor-pointer items-center rounded-md p-2",
                  "hover:bg-white",
                  router.pathname === "/settings/privacy-and-security"
                    ? "bg-white"
                    : ""
                )}
              >
                <ShieldIcon className="h-4 w-4 text-[#11131C]" />
                <span className="ml-2 text-sm font-[500] text-[#11131C]">
                  Privacy & Security
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/settings/notification"
                className={cn(
                  "mb-1 flex cursor-pointer items-center rounded-md p-2",
                  "hover:bg-white",
                  router.pathname === "/settings/notification" ? "bg-white" : ""
                )}
              >
                <BellDot className="h-4 w-4 text-[#11131C]" />
                <span className="ml-2 text-sm font-[500] text-[#11131C]">
                  Notifications
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="w-full grow overflow-auto">{children}</div>
    </div>
  )
}
