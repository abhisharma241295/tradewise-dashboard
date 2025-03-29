import React from "react"
import { ArrowRight } from "lucide-react"
import WeddingOverview from "@/types/WeddingOverview"
import { useRouter } from "next/router"

interface Props {
  data: WeddingOverview | undefined
}

const HomePlanner: React.FC<Props> = ({ data }) => {
  console.log(data)
  const router = useRouter()
  return (
    <div>
      <div className="overflow-hidden rounded-xl border">
        <p className="p-4 text-lg font-bold">Planner</p>
        <ul className="border-t">
          <div>
            <div
              className="cursor-pointer p-4 hover:bg-hover"
              onClick={() => {
                router.push("/dashboard/planner")
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pending Tasks</p>
                  <h3 className="text-xl font-semibold">
                    {data?.pending_tasks || 0}
                  </h3>
                </div>
                <ArrowRight size={20} className="text-gray-500" />
              </div>
            </div>
            <div className="mx-4 border-b border-gray-200"></div>
            <div
              className="cursor-pointer p-4 hover:bg-hover"
              onClick={() => {
                router.push("/dashboard/budgeter")
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Due Payments</p>
                  <h3 className="text-xl font-semibold">
                    {data?.due_payments || 0}
                  </h3>
                </div>
                <ArrowRight size={20} className="text-gray-500" />
              </div>
            </div>
          </div>
        </ul>
      </div>
    </div>
  )
}

export default HomePlanner
