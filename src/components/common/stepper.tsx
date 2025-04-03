"use client";
import { Check, ChevronRight } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { steps } from "@/lib/constants";

export default function Stepper() {
	const signUpData = useAppSelector((state) => state.auth.signUpData);

	return (
		<div className="flex items-center space-x-4 p-4">
			{steps.map((step, index) => (
				<div key={index} className="flex items-center space-x-4">
					<div className="flex items-center space-x-1">
						{!signUpData?.stepId || signUpData?.stepId <= index + 1 ? (
							<div className="bg-[--primary] text-xs text-white rounded-full w-5 h-5 p-2 flex items-center justify-center">
								{index + 1}
							</div>
						) : (
							<div className="bg-[#1FC16B] rounded-full p-1">
								<Check className="text-white" size={12} />
							</div>
						)}
						<span className="text-sm text=[#0E121B] hidden md:block">
							{step.label}
						</span>
					</div>
					{index < steps.length - 1 && (
						<ChevronRight className="text-[#99A0AE]" size={20} />
					)}
				</div>
			))}
		</div>
	);
}
