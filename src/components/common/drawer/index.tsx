"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  HelpCircle,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import { TeamSwitcher } from "./team-switcher";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { NavMenuBtm } from "./nav-menu-btm";
import { TradewiseLogo } from "@/components/icons/TradewiseLogo";
import { Separator } from "@/components/ui/separator";
import DashboardIcon from "@/components/icons/DashboardIcon";
import DutyCalculatorIcon from "@/components/icons/DutyCalculator";
import DocumentGeneratorIcon from "@/components/icons/DocumentGenerator";
import PolicyMonitoringIcon from "@/components/icons/PolicyMonitoringIcon";
import ComplianceAlertIcon from "@/components/icons/ComplainceAlertIcon";
import { cn } from "@/lib/utils";
const data = {
  teams: [
    {
      name: "Tradewise",
      logo: TradewiseLogo,
      plan: "Enterprise",
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: DashboardIcon,
      isUpcoming: true,
    },
    {
      name: "Duty Calculator",
      url: "/dashboard/duty-calculator",
      icon: DutyCalculatorIcon,
      isUpcoming: true,
    },
    {
      name: "Document Generator",
      url: "/dashboard/doc-generator",
      icon: DocumentGeneratorIcon,
      isUpcoming: true,
    },
    {
      name: "Policy Monitoring & Alerts",
      url: "/dashboard/policy-monitoring",
      icon: PolicyMonitoringIcon,
      isUpcoming: false,
    },
    {
      name: "Compliance Alerts",
      url: "/dashboard/compliance-alerts",
      icon: ComplianceAlertIcon,
      isUpcoming: false,
    },
  ],
  menuBtm: [
    {
      name: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
    },
    {
      name: "Support",
      url: "/dashboard/support",
      icon: HelpCircle,
    },
  ],
};
export default function Drawer({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const userData = useAppSelector((state) => state.auth);
  const { state } = useSidebar();
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "/avatars/shadcn.jpg",
  });

  useEffect(() => {
    setUser({
      name: userData.fullName,
      email: userData.email,
      avatar: "/avatars/shadcn.jpg",
    });
  }, [userData]);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={false}
              asChild
              size="lg"
              className={`cursor-default hover:bg-transparent active:bg-transparent ${
                state === "expanded" ? "my-2" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex aspect-square items-center justify-center rounded-full bg-[#7D52F4] text-sidebar-primary-foreground !p-1",
                    state === "expanded" ? "size-10" : "size-8"
                  )}
                >
                  <TradewiseLogo />
                </div>
                <div className="ml-1 grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {data.teams[0].name}
                  </span>
                  <span className="truncate text-xs">{data.teams[0].plan}</span>
                </div>
                <SidebarTrigger className="ml-auto data-[state=open]:hidden" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <div className="px-2">
        <Separator />
      </div>

      <SidebarContent className="flex flex-col justify-between bg-white">
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects projects={data.projects} />
        <div className="flex flex-col gap-2">
          <SidebarTrigger
            className={cn("mx-auto", state === "expanded" ? "hidden" : "")}
          />

          <NavMenuBtm projects={data.menuBtm} />
        </div>
      </SidebarContent>
      <div className="px-2">
        <Separator />
      </div>
      <SidebarFooter className="bg-white">
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
