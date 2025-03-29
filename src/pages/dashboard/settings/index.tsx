import { useState } from "react"
import { UserRound, SettingsIcon, BellDot } from "lucide-react"
import ShieldIcon from "@/components/static/icons/shield"
import Image from "next/image"
// import LineIcon from "@/components/static/icons/line"
import { cn } from "@/lib/utils/cn"
import { useGetCollabsQuery } from "@/lib/redux/features/apis/collabApi"

const TABS = ["Plans & Billing", "Team"]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Team") // Default tab

  const { data } = useGetCollabsQuery(undefined)

  return (
    <div className="flex w-full">
      <div className="w-1/4 bg-[#ECF4F5] p-4">
        <ul>
          <li
            key={"profile"}
            className={cn(
              "mb-1 flex cursor-pointer items-center rounded-md p-2",
              "hover:bg-white"
            )}
          >
            <UserRound className="h-4 w-4 text-[#11131C]" />
            <span className="ml-2 text-sm font-[500] text-[#11131C]">
              Profile
            </span>
          </li>
          <li
            key={"settings"}
            className={cn(
              "mb-1 flex cursor-pointer items-center rounded-md p-2",
              "hover:bg-white"
            )}
            // onClick={handleSettingsClick}
          >
            <SettingsIcon className="h-4 w-4 text-[#11131C]" />
            <span className="ml-2 text-sm font-[500] text-[#11131C]">
              Settings
            </span>
          </li>
          <li
            key={"privacySecurity"}
            className={cn(
              "mb-1 flex cursor-pointer items-center rounded-md p-2",
              "hover:bg-white"
            )}
          >
            <ShieldIcon />
            <span className="ml-2 text-sm font-[500] text-[#11131C]">
              Privacy & Security
            </span>
          </li>
          <li
            key={"notifications"}
            className={cn(
              "mb-1 flex cursor-pointer items-center rounded-md p-2",
              "hover:bg-white"
            )}
          >
            <BellDot className="h-4 w-4 text-[#11131C]" />
            <span className="ml-2 text-sm font-[500] text-[#11131C]">
              Notifications
            </span>
          </li>
        </ul>
      </div>

      <div className="w-3/4 flex-1">
        <div className="flex space-x-4 border-b pt-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`px-8 py-2 text-sm font-medium ${
                activeTab === tab
                  ? "text-md border-b border-[#118FA8] font-[500] text-[#23273C]"
                  : "text-md font-[500] text-[#898DA2]"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mb-8 mt-6 px-8">
          {activeTab === "Team" && (
            <div>
              <h2 className="text-md font-[500] text-[#23273C]">
                Collaborator
              </h2>

              <div className="mb-8 mt-6 rounded-lg border border-gray-300">
                <div className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr] gap-4 px-4 py-2">
                  <p className="text-sm font-bold text-[#23273C]">Admin</p>
                  <p className="text-sm font-bold text-[#23273C]">Status</p>
                  <p className="text-sm font-bold text-[#23273C]">
                    Last Activity
                  </p>
                  <p className="text-sm font-bold text-[#23273C]">Access</p>
                  <p className="text-sm font-bold text-[#23273C]">Plan</p>
                </div>
                {data &&
                  data?.invites?.length &&
                  data?.invites?.length > 0 &&
                  data?.invites?.map((collaborator: any, index: number) => (
                    <div
                      key={index}
                      className="h grid grid-cols-[3fr_1fr_1fr_1fr_1fr] items-center gap-4 border-t border-gray-300 px-4 py-4 text-sm"
                    >
                      <div className="flex items-center space-x-4">
                        <Image
                          src="https://static.vecteezy.com/system/resources/thumbnails/004/899/680/small/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg"
                          alt={collaborator.email}
                          className="h-10 w-10 rounded-full"
                          width={50}
                          height={50}
                        />
                        <div>
                          <div className="font-medium text-gray-700">
                            {collaborator.name}
                            {collaborator.role && (
                              <span className="text-xs text-[#637083]">
                                {" "}
                                ({collaborator.email})
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-[#637083]">
                            {collaborator.email}
                          </div>
                        </div>
                      </div>{" "}
                      <div className="capitalize text-[#898DA2]">
                        {collaborator.status}
                      </div>
                      <div className="text-[#23273C]">
                        {collaborator.expiry_date}
                      </div>
                      <div className="text-[#898DA2]">
                        <select
                          className="gray-300 rounded px-2 py-1"
                          value={collaborator.access}
                        >
                          <option value="Can edit">Can edit</option>
                          <option value="Can view">Can view</option>
                          <option value="No access">No access</option>
                        </select>
                      </div>
                      <div className="text-[#23273C]">Individual</div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {activeTab === "Plans & Billing" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-700">
                Plans & Billing
              </h2>
              <p className="mt-2 text-gray-600">
                Here you can manage your subscription plans and billing details.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
