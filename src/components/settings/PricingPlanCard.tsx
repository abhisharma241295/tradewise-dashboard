"use client";
import { getCookie } from "@/lib/cookieUtils";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
// import {
// 	checkoutSession,
// 	updateSubscription,
// 	cancelSubscription,
// } from "@/lib/api/stripeApi";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { toast } from "sonner";
// import { updateCredentials } from "@/lib/redux/features/auth/authSlice";
// import { PricingPlanCardProps } from "@/lib/types/subscriptionTypes";
import { GENIUS_GATE_USER_DATA, pricingPlans } from "@/lib/constants";
// import ConfirmationDialog from "../dailog-layouts/confirmation-dialog";
import { Dialog } from "@/components/ui/dialog";
import { AxiosError } from "axios";
// import { PricePlan } from "@/lib/types/subscriptionTypes";
import { useRouter } from "next/navigation";
import { useCreateCheckoutSessionMutation } from "@/redux/apis/subscriptionApi";

const PricingPlanCard: React.FC<PricingPlanCardProps> = ({
	planName,
	monthlyPrice,
	yearlyPrice,
	features,
	isMonthly,
}) => {
	const router = useRouter();
	const userSubscribed = useAppSelector((state) => state.auth.userSubscribed);
	const dispatch = useAppDispatch();
	const [showConfirmationPopup, setShowConfirmationPopup] = useState("");
	const [createCheckoutSession, { isLoading }] =
		useCreateCheckoutSessionMutation();

	// const checkoutMutation = useMutation({
	// 	mutationFn: (planName: string) => checkoutSession({ product_id: planName }),
	// 	onSuccess: (data) => {
	// 		window.location.href = data.url;
	// 	},
	// 	onError: (error: unknown) => {
	// 		if (error instanceof AxiosError) {
	// 			toast.error(error?.response?.data?.error);
	// 		}
	// 	},
	// });

	// const upgradeMutation = useMutation({
	//   mutationFn: (planName: string) =>
	//     updateSubscription({ product_id: planName }),
	//   onSuccess: (data) => {
	//     const userPrevData = getCookie(GENIUS_GATE_USER_DATA)
	//     dispatch(
	//       updateCredentials({
	//         ...userPrevData,
	//         userSubscribed: planName,
	//       })
	//     )
	//     toast.success(data.message, {
	//       position: "top-center",
	//     })
	//   },
	//   onError: (error: unknown) => {
	//     if (error instanceof AxiosError) {
	//       toast.error(error?.response?.data?.error)
	//     }
	//   },
	// })

	// const cancelMutation = useMutation({
	//   mutationFn: cancelSubscription,
	//   onSuccess: (data) => {
	//     const userPrevData = getCookie(GENIUS_GATE_USER_DATA)
	//     dispatch(
	//       updateCredentials({
	//         ...userPrevData,
	//         userSubscribed: "cancelled",
	//       })
	//     )
	//     toast.success(data.message, {
	//       position: "top-center",
	//     })
	//     router.push("/dashboard")
	//   },
	//   onError: (error: unknown) => {
	//     if (error instanceof AxiosError) {
	//       toast.error(error?.response?.data?.message)
	//     }
	//   },
	// })

	const getCardDetails = () => {
		return (
			<>
				<h4 className={`mb-2 text-[#0E121B]`}>{planName}</h4>
				<div className="mb-4 text-4xl font-semibold text-[#0E121B]">
					${isMonthly ? monthlyPrice : yearlyPrice}
					<span className={`text-base font-normal text-[#0E121B]`}>
						/{isMonthly ? "month" : "year"}
					</span>
				</div>
				<ul className="mb-8 mt-5 text-sm  min-h-[215px]">
					{features.map((feature, index) => (
						<li key={index} className={`mb-3 flex items-center text-[#525866]`}>
							<svg
								className={`mr-2 size-4 ${
									userSubscribed === planName ? "fill-white" : "fill-primary"
								}`}
								viewBox="0 0 20 20"
							>
								<path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
							</svg>
							{feature}
						</li>
					))}
				</ul>
			</>
		);
	};

	const getPriceOfCurrentPlan = () => {
		const currentPlanPrice = pricingPlans.find(
			(plan: PricePlan) => plan.title === userSubscribed
		);
		return currentPlanPrice?.price || 0;
	};

	const getButtonText = () => {
		if (!userSubscribed) {
			return "Subscribe";
		}
		// if (subscriptionError) {
		// 	return "Please Try Again";
		// }
		if (userSubscribed && userSubscribed === planName) {
			return "Current Plan";
		}
		if (userSubscribed && getPriceOfCurrentPlan() < monthlyPrice) {
			return "Upgrade Plan";
		}
		if (userSubscribed && getPriceOfCurrentPlan() > monthlyPrice) {
			return "Downgrade Plan";
		}
	};

	const handleCreateCheckoutSession = async (planName: string) => {
		try {
			const result = await createCheckoutSession({
				plan_type: planName === "Essential" ? "essential" : "premium",
				pricing_type: isMonthly ? "monthly" : "yearly",
			});
			console.log("res", result);
			if (result.data) {
				window.location.href = result.data.checkout_url;
			} else {
				// toast.error((result?.error as any).message || "Something went wrong!");
				toast.error("Something went wrong!");
			}
		} catch (err: Error | unknown) {
			toast.error(err instanceof Error ? err.message : "Something went wrong!");
		}
	};

	return (
		<>
			<div
				className={cn(
					`w-full max-w-xs rounded-xl border bg-background p-4`,
					userSubscribed === planName && "bg-primary"
				)}
			>
				{getCardDetails()}
				<Button
					className={`w-full rounded-lg px-4 py-2
					${userSubscribed === planName ? "bg-white text-primary" : "text-white"}`}
					onClick={() =>
						userSubscribed && userSubscribed !== planName
							? setShowConfirmationPopup("upgrade-downgrade")
							: handleCreateCheckoutSession(planName)
					}
				>
					{getButtonText()}
				</Button>
			</div>
			{/* {showConfirmationPopup && (
				<Dialog
					open={showConfirmationPopup !== ""}
					onOpenChange={() => setShowConfirmationPopup("")}
					modal={true}
				>
					<ConfirmationDialog
						title={"Confirm Now"}
						description={
							showConfirmationPopup === "cancel"
								? "Are You Sure You Want to Cancel your plan?"
								: getPriceOfCurrentPlan() < price
								? "Are You Sure You Want to Upgrade your plan. Payment will be deducted for the same payment method?"
								: "Are you sure you want to downgrade? This will remove Pro plan privileges, shifting your account to the Free plan on February 1, 2025."
						}
						negativeTitle={
							getPriceOfCurrentPlan() < price || showConfirmationPopup === "cancel"
								? "No"
								: "Don't Downgrade"
						}
						positiveTitle={
							showConfirmationPopup === "cancel"
								? "Yes, Cancel"
								: getPriceOfCurrentPlan() < price
								? "Yes, Upgrade"
								: "Yes Downgrade"
						}
						onCancel={() => setShowConfirmationPopup("")}
						onConfirm={() => {
							setShowConfirmationPopup("");
							showConfirmationPopup === "cancel"
								? cancelMutation.mutate()
								: upgradeMutation.mutate(planName);
						}}
					/>
				</Dialog>
			)} */}
		</>
	);
};

export default PricingPlanCard;
