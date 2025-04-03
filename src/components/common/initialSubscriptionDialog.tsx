import React from "react";
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { TradewiseLogo } from "@/components/icons/TradewiseLogo";
import PricingPlanCard from "@/components/settings/PricingPlanCard";
import { pricingPlans } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { PricingPlanCardProps } from "@/redux/types/subscriptionTypes";

const InitialSubscriptionDialog = () => {
	return (
		<DialogContent
			className={cn("flex max-h-[90vh] flex-col !max-w-4xl")}
			showCloseButton={false}
			// style={{
			// 	opacity: 0.8,
			// 	background: `linear-gradient(180deg, rgba(126, 82, 244, 0.40) 0%, rgba(126, 82, 244, 0.00) 100%), ${
			// 		document.documentElement.classList.contains("dark") ? "#000000" : "#fdfdfd"
			// 	}`,
			// }}
		>
			<div className="flex flex-col items-center">
				<div className="flex aspect-square size-8 items-center justify-center rounded-full bg-blue-500 text-sidebar-primary-foreground !p-1">
					<TradewiseLogo />
				</div>

				<DialogHeader>
					<DialogTitle className="text-center text-[#0E121B] mt-4">
						Tradewise Subscription
					</DialogTitle>
				</DialogHeader>
				<DialogDescription className="whitespace-pre-line px-2 text-center md:px-6 text-[#525866] mt-1">
					Choose the right plan for you to start using Tradewise today
				</DialogDescription>
			</div>
			<div className="scrollbar-hide mx-auto flex-1 overflow-y-auto px-4 md:px-6">
				<div className="mt-8 flex w-full flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
					<div className="flex w-full flex-col items-center gap-4 md:flex-row md:gap-6">
						{pricingPlans.map((planCard: PricingPlanCardProps) => (
							<div key={planCard.plan} className="w-full max-w-md md:w-1/2">
								<PricingPlanCard
									planName={planCard.plan}
									monthlyPrice={planCard.monthlyPrice}
									yearlyPrice={planCard.yearlyPrice}
									features={planCard.features}
									isMonthly={true}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</DialogContent>
	);
};

export default InitialSubscriptionDialog;
