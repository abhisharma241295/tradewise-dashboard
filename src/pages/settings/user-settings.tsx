import { useState } from "react"
// import LineIcon from "@/components/static/icons/line"
import { useGetCollabsQuery } from "@/lib/redux/features/apis/collabApi"
import { NextPage } from "next"
import PricingCard from "@/components/ui/commons/PricingCard"
import { Divider } from "primereact/divider"
import Image from "next/image"
interface UserSettingsProps {
  error?: string
}

const billingHistoryData = [
  {
    admin: {
      name: "Anna Taylor",
      email: "annataylor@email.com",
      avatar:
        "https://static.vecteezy.com/system/resources/thumbnails/004/899/680/small/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg", // You'll want to add actual avatar URL
    },
    plan: "Basic Plan",
    billingDate: "03/01/2024",
    amount: 980,
  },
  {
    admin: {
      name: "Anna Taylor",
      email: "annataylor@email.com",
      avatar:
        "https://static.vecteezy.com/system/resources/thumbnails/004/899/680/small/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg",
    },
    plan: "Basic Plan",
    billingDate: "02/01/2024",
    amount: 980,
  },
  {
    admin: {
      name: "Anna Taylor",
      email: "annataylor@email.com",
      avatar:
        "https://static.vecteezy.com/system/resources/thumbnails/004/899/680/small/beautiful-blonde-woman-with-makeup-avatar-for-a-beauty-salon-illustration-in-the-cartoon-style-vector.jpg",
    },
    plan: "Basic Plan",
    billingDate: "01/01/2024",
    amount: 980,
  },
]

const UserSettings: NextPage<UserSettingsProps> = ({}) => {
  const TABS = ["Plans & Billing", "Team"]
  const [activeTab, setActiveTab] = useState(TABS[0]) // Default tab
  const { data } = useGetCollabsQuery(undefined)

  return (
    <div className="flex w-full">
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
              <h2 className="mb-4 font-semibold text-gray-700">
                Plans & Billing
              </h2>
              <div className="grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <PricingCard />
                <PricingCard />
                <PricingCard />
              </div>
              <Divider className="my-8" />
              <div>
                <h2 className="text-md font-[500] text-[#23273C]">
                  Billing History
                </h2>

                <div className="mb-8 mt-6 rounded-lg border border-gray-300">
                  <div className="grid grid-cols-[3fr_1fr_1fr_1fr] gap-4 px-4 py-2">
                    <p className="text-sm font-bold text-[#23273C]">Admin</p>
                    <p className="text-sm font-bold text-[#23273C]">Plan</p>
                    <p className="text-sm font-bold text-[#23273C]">
                      Billing Date
                    </p>
                    <p className="text-sm font-bold text-[#23273C]">Amount</p>
                  </div>
                  {billingHistoryData.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[3fr_1fr_1fr_1fr] items-center gap-4 border-t border-gray-300 px-4 py-4 text-sm"
                    >
                      <div className="flex items-center space-x-4">
                        <Image
                          src={item.admin.avatar}
                          alt={item.admin.name}
                          className="h-10 w-10 rounded-full"
                          width={50}
                          height={50}
                        />
                        <div>
                          <div className="font-medium text-gray-700">
                            {item.admin.name}
                          </div>
                          <div className="text-xs text-[#637083]">
                            {item.admin.email}
                          </div>
                        </div>
                      </div>
                      <div className="text-[#23273C]">{item.plan}</div>
                      <div className="text-[#23273C]">{item.billingDate}</div>
                      <div className="text-[#23273C]">${item.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserSettings

// export const getServerSideProps = async () => {
//   try {
//     return {
//       props: {
//         // Add your props here
//       },
//     }
//   } catch (error) {
//     return {
//       props: {
//         error: "Failed to fetch data",
//       },
//     }
//   }
// }
