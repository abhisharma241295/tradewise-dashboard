"use client";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { useSidebar } from "../ui/sidebar";

export default function DashboardAppbar({
  title,
  subtitle,
  leading,
  ending,
}: {
  title: string;
  subtitle: string;
  leading?: ({
    className,
  }: {
    className?: string | undefined;
  }) => React.JSX.Element;
  ending?: ({
    className,
  }: {
    className?: string | undefined;
  }) => React.JSX.Element;
}) {
  const { state } = useSidebar();
  return (
    <div className="mb-3">
      <div
        className={cn(
          "flex items-center py-2 pl-4",
          state === "collapsed" ? "h-12" : "h-20"
        )}
      >
        <div className="flex items-center">
          {leading && (
            <div
              className={cn(
                "rounded-full border bg-white flex items-center justify-center",
                state == "collapsed" ? "p-2" : "p-3"
              )}
            >
              {leading({
                className: cn(
                  state == "collapsed" ? "size-3.5" : "size-5"
                ),
              })}
            </div>
          )}
          <div
            className={cn("flex flex-col justify-center", leading && "ml-4")}
          >
            <p className={cn(
              "text-[#0E121B]",
              state === "collapsed" ? "text-base" : "text-lg"
            )}>{title}</p>
            {state == "expanded" && <p className="text-sm">{subtitle}</p>}
          </div>
        </div>

        {ending && (
          <div className="ml-auto mr-4">{ending({ className: "size-5" })}</div>
        )}
      </div>
      <div className="px-4">
        <Separator className="" />
      </div>
    </div>
  );
}
