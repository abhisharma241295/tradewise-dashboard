import { cn } from "@/lib/utils/cn"
import { Group } from "@/types/Communication"
import { UserRound } from "lucide-react"

export interface GroupCardProps {
  group: Group
  onClick?: () => void
}

export function GroupCard({ group, onClick }: GroupCardProps) {
  return (
    <div
      className={cn(
        "group relative w-[250px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border shadow-lg"
      )}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="mb-2 flex items-center gap-2">
          <div className={cn("size-4 rounded-full", "bg-pink-500")} />
          <span className="text-xl font-bold">{group.group_name}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {group && group?.guests && group?.guests?.length > 0
              ? group?.guests?.length + " Guest(s)"
              : "No guest"}
          </span>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          {group &&
            group?.guests &&
            group?.guests.length > 0 &&
            group?.guests?.length < 5 &&
            group?.guests.map((item) => {
              return (
                <div className="flex items-center gap-2" key={item.guest_id}>
                  <UserRound className="h-4 w-4 text-muted-foreground" />
                  <span>{item.guest_name}</span>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
