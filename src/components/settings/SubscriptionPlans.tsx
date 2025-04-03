"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import PricingPlanCard from "./PricingPlanCard";
import { pricingPlans } from "@/lib/constants";
import { Toaster, toast } from "sonner";
import { Dialog } from "@/components/ui/dialog";
// import ConfirmationDialog from "@/components/dailog-layouts/confirmation-dialog";
// import { cancelSubscription } from "@/lib/api/stripeApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { updateCredentials } from "@/lib/redux/features/auth/authSlice";
// import { getCookie } from "@/lib/cookieUtils";
// import { GENIUS_GATE_USER_DATA } from "@/lib/constants";
// import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { CustomSwitch } from "../ui/switch";
import { PricingPlanCardProps } from "@/redux/types/subscriptionTypes";

export default function SubscriptionPlan() {
	const userData = useAppSelector((state) => state.auth);

	// const { cardDetails, creditsInfo, userSubscribed } = userData;
	const [showCancelTrialDialog, setShowCancelTrialDialog] = useState(false);

	const router = useRouter();
	const dispatch = useAppDispatch();
	const [isMonthly, setIsMonthly] = useState(true);

	const togglePlan = () => {
		setIsMonthly(!isMonthly);
	};
	// const cancelMutation = useMutation({
	// 	mutationFn: cancelSubscription,
	// 	onSuccess: (data) => {
	// 		const userPrevData = getCookie(GENIUS_GATE_USER_DATA);
	// 		dispatch(
	// 			updateCredentials({
	// 				...userPrevData,
	// 				userSubscribed: "cancelled",
	// 			})
	// 		);
	// 		toast.success(data.message, {
	// 			position: "top-center",
	// 		});
	// 		router.push("/dashboard");
	// 	},
	// 	onError: (error: unknown) => {
	// 		if (error instanceof AxiosError) {
	// 			toast.error(error?.response?.data?.message);
	// 		}
	// 	},
	// });

	return (
		<div className="flex flex-col gap-4 justify-center items-center lg:gap-8 my-4">
			{/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-8">
				<div className="flex flex-col gap-1">
					<p className="p-1 text-lg font-semibold">Card Method Used</p>
					<div className="flex w-full flex-col gap-5 rounded-2xl bg-background p-3 lg:flex-row lg:items-center">
						<div className="flex w-full flex-col justify-center pl-1">
							<h1 className="text-lg font-semibold">
								•••• •••• ••••
								{cardDetails?.expiryDate}
							</h1>
							<h1 className="text-base text-muted-foreground">
								Expires
								{cardDetails?.expiryDate}/{cardDetails?.expiryYear}
							</h1>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<p className="p-1 text-lg font-semibold">Credits Usage Info</p>
					<div className="flex w-full flex-row items-center gap-5 rounded-2xl bg-background p-3">
						<div className="flex w-full flex-col justify-center pl-1">
							<h1 className="text-lg font-semibold">
								Credits Available:
								{creditsInfo?.availableCredits}
							</h1>
							<h1 className="text-base text-muted-foreground">
								Credits Used:
								{creditsInfo?.usedCredits} | Next Refresh:{" "}
								{creditsInfo?.creditsRefreshDate}
							</h1>
						</div>
					</div>
				</div>
			</div> */}
			<div className="flex flex-col">
				<p className="text-md font-semibold text-[#0E121B]">Select Plan</p>
				<p className="text-sm text-[#525866] mt-1">
					Simple and flexible per-user pricing.
				</p>
				<div
					// key={index}
					className={`flex items-center justify-between w-full mt-2 `}
				>
					<div className="flex items-center space-x-4">
						<p className="text-sm font-medium text-[#0E121B]">Monthly</p>
						<CustomSwitch checked={!isMonthly} onCheckedChange={togglePlan} />
						<p className="text-sm font-medium text-[#0E121B]">Yearly</p>
						<div>
							{/*  */}
							{/* <p className="text-xs text-[#525866]">{desc}</p> */}
						</div>
					</div>
				</div>
				{/* <div className="flex items-center justify-center space-x-2  mx-auto">
					<span id="monthlyText" className="text-[#335CFF] font-medium mr-2">
						Monthly
					</span>
					<label className="relative inline-flex items-center cursor-pointer">
						<input
							type="checkbox"
							id="toggle"
							className="sr-only peer "
							onClick={togglePlan}
						/>
						<div className="w-12 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer-checked:after:translate-x-6 peer-checked:after:border-white peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
					</label>
					<span id="yearlyText" className="font-medium">
						Yearly
					</span>
				</div> */}
				<div className="mt-8 flex w-full flex-col gap-4 md:flex-row">
					{pricingPlans.map((planCard: PricingPlanCardProps) => {
						return (
							<div key={planCard.plan} className="w-full max-w-md md:w-1/2">
								<PricingPlanCard
									planName={planCard.plan}
									monthlyPrice={planCard.monthlyPrice}
									yearlyPrice={planCard.yearlyPrice}
									features={planCard.features}
									isMonthly={isMonthly}
								/>
							</div>
						);
					})}
				</div>
				{/* {showCancelTrialDialog && (
					<Dialog
						open={showCancelTrialDialog}
						onOpenChange={() => setShowCancelTrialDialog(false)}
						modal={true}
					>
						<ConfirmationDialog
							title="Cancel Trial Plan"
							description="By canceling your trial, your access to the platform will end immediately. All your existing projects will remain saved, but your remaining trial credits will be forfeited. You can upgrade to a paid plan anytime."
							negativeTitle="Keep Trial"
							positiveTitle="Yes, Cancel Trial"
							onCancel={() => setShowCancelTrialDialog(false)}
							onConfirm={() => {
								setShowCancelTrialDialog(false);
								cancelMutation.mutate();
							}}
						/>
					</Dialog>
				)} */}
				{/* {userSubscribed === "Trial" && (
					<Button
						variant="ghost"
						className="mt-4 self-start text-sm text-muted-foreground hover:text-destructive"
						onClick={() => setShowCancelTrialDialog(true)}
					>
						Cancel Trial Plan
					</Button>
				)} */}
			</div>
		</div>
	);
}
