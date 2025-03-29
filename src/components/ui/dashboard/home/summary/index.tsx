import PiggybankIcon from "@/components/static/icons/piggybank"
import WorkbagIcon from "@/components/static/icons/workbag"
import WeddingOverview from "@/types/WeddingOverview"
import { Skeleton } from "primereact/skeleton"
import { useEffect, useState } from "react"
import { PencilLine } from "lucide-react"
import CustomButton from "@/components/ui/Button"
import { Avatar } from "primereact/avatar"
import { ProgressBar } from "primereact/progressbar"

interface Props {
  data: WeddingOverview | undefined
  loading?: boolean
  setIsWeddingEditVisible: React.Dispatch<React.SetStateAction<boolean>>
  weddingInfo: any
}

export default function HomeSummary({
  data,
  loading,
  setIsWeddingEditVisible,
  weddingInfo,
}: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div>
        <div className="flex h-full flex-col justify-between rounded-xl border">
          <div className="relative mb-4 ml-4 flex items-center">
            <div className="mr-4 mt-4 size-36 rounded-lg bg-gray-300"></div>
            <div className="mt-4 flex flex-col gap-3">
              <Skeleton width="12rem" height="2rem" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 border-t">
            <div className="flex flex-row items-center justify-start gap-2 p-2">
              <Skeleton width="100%" height="4rem" />
            </div>
            <div className="flex flex-row items-center justify-start gap-2 border-l p-2">
              <Skeleton width="100%" height="4rem" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // console.log(data)
  return (
    <div>
      <div className="flex h-full flex-col justify-between rounded-xl border">
        <div className="relative mb-4 ml-4 flex items-center">
          <CustomButton
            variant="link"
            className="group absolute right-4 top-4 flex h-5 items-center gap-1 p-0 font-bold text-[#3264CA]"
            onClick={() => setIsWeddingEditVisible(true)}
          >
            <span className="group-hover:underline">Edit</span>
            <PencilLine className="h-5 w-5" />
          </CustomButton>
          {weddingInfo?.image_url ? (
            <Avatar
              image={weddingInfo.image_url}
              shape="square"
              className="mr-4 mt-4 size-36 overflow-hidden !rounded-lg !whitespace-nowrap w-[30%]"
            />
          ) : (
            <div className="mr-4 mt-4 size-36 rounded-lg bg-gray-300"></div>
          )}
          <div className="mt-4 flex flex-col gap-1 w-full">
            {loading ? (
              <Skeleton width="100%" height="2rem" />
            ) : (
              <>
                <span className="text-2xl font-bold">
                  {data?.wedding_name || "No Wedding Name"}
                </span>
                {data?.wedding_status.type === "Upcoming" ? (
                  <>
                    <p>
                      <span className="text-xl font-bold">{data?.wedding_status.noOfDays || 0}</span> Days
                    </p>

                    <ProgressBar
                      value={50}
                      style={{ height: "0.625rem", width: "70%" }}
                      className="mb-2"
                      showValue={false}
                    />
                  </>
                ) : (
                  <p className="text-base font-medium text-gray-600">
                    {data?.wedding_status.type || "Status Unavailable"}
                  </p>
                )}
              </>
            )}


          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t">
          <div className="flex flex-row items-center justify-start gap-2 p-2">
            <div className="hidden md:block">
              <PiggybankIcon />
            </div>
            <div>
              {loading ? (
                <>
                  <Skeleton width="6rem" height="1.25rem" className="mb-2" />
                  <Skeleton width="8rem" height="2rem" />
                </>
              ) : (
                <>
                  <h4 className="mt-2 text-sm md:text-base">Total Budget</h4>
                  <p className="text-xl font-bold md:text-2xl">
                    ${data?.budget_overview?.total_budget || 0}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-2 border-l p-2">
            <div className="hidden md:block">
              <WorkbagIcon />
            </div>
            <div>
              {loading ? (
                <>
                  <Skeleton width="6rem" height="1.25rem" className="mb-2" />
                  <Skeleton width="8rem" height="2rem" />
                </>
              ) : (
                <>
                  <h4 className="mt-2 text-sm md:text-base">Total Left</h4>
                  <p className="text-xl font-bold md:text-2xl">
                    ${data?.budget_overview?.budget_left || 0}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
