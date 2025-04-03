"use client";
import { useState } from "react";
import { BellIcon, Settings as SettingsIcon } from "lucide-react";
import PersonalInformation from "@/components/settings/PersonalInformation";
import Notification from "@/components/settings/Notification";
import UpdatePassword from "@/components/settings/UpdatePassword";
import DashboardAppbar from "@/components/common/DashboardAppbar";
import PolicyMonitoringIcon from "@/components/icons/PolicyMonitoringIcon";
import SubscriptionPlan from "@/components/settings/SubscriptionPlans";
const myTabs = [
	{ id: 1, name: "Personal Information", isActive: true },
	{ id: 2, name: "Notification Preferences", isActive: false },
	{ id: 3, name: "Privacy & Security", isActive: false },
	{ id: 4, name: "Subscription & Billing", isActive: false },
];

export default function Profile() {
	const [tabs, setTabs] = useState(myTabs);

	const handleMenuClick = (id: number) => {
		setTabs((prevTabs) =>
			prevTabs.map((tab) =>
				tab.id === id ? { ...tab, isActive: true } : { ...tab, isActive: false }
			)
		);
	};

	return (
		<div className="flex w-full h-full">
			<div className="flex-[4] flex flex-col">
				<DashboardAppbar
					leading={PolicyMonitoringIcon}
					title={"Settings Page"}
					subtitle={"Manage your preferences and configure various options."}
				/>

				{/* Tabs ection */}
				<div className="border-b w-full">
					<ul className="flex items-start pb-2 overflow-hidden">
						{tabs.map((tab) => (
							<li key={tab.id} className="flex items-center text-sm shrink-0">
								<a
									href="#"
									onClick={() => handleMenuClick(tab.id)}
									className={`relative -mb-[10px] inline-block p-4 border-b-[3px] font-medium rounded-t-lg ${
										tab.isActive
											? "text-[#0E121B] border-[#335CFF]" // Blue thick underline
											: "text-[#525866] border-transparent"
									}`}
								>
									{tab.name}
								</a>
							</li>
						))}
					</ul>
				</div>

				{tabs.find((tab) => tab.isActive)?.id === 1 && <PersonalInformation />}

				{tabs.find((tab) => tab.isActive)?.id === 2 && <Notification />}

				{tabs.find((tab) => tab.isActive)?.id === 3 && <UpdatePassword />}

				{tabs.find((tab) => tab.isActive)?.id === 4 && <SubscriptionPlan />}
			</div>
		</div>
	);
}
