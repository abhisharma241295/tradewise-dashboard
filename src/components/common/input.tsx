import * as React from "react";
import { cn } from "@/lib/utils";
import ValidationError from "./validationError";

// Define a proper interface for the Input component props
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	fieldLabel?: string;
	required?: boolean;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	validationErr?: string | null;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			type,
			fieldLabel,
			required,
			startIcon,
			endIcon,
			validationErr,
			...props
		},
		ref
	) => {
		return (
			<div className="mb-3">
				<label className="block text-sm font-medium text-[#0E121B] text-left pb-1">
					{fieldLabel}
					{/* {!required && <span className="text-[#525866]"> (Optional)</span>}{" "} */}
					{required && <span className="text-[#335CFF]">*</span>}
				</label>
				<div className="relative">
					<input
						type={type}
						disabled={props.disabled}
						className={cn(
							`border ${validationErr ? "border-[#FB3748]" : "border-[#E1E4EA]"} ${
								validationErr
									? "focus:border-[#FB3748] focus:outline-none"
									: "focus:border-[#E1E4EA] focus:outline-none"
							} shadow-[0px_1px_2px_0px_rgba(10,13,20,0.03)] text-sm font-normal rounded-xl p-2.5 ${
								startIcon ? "pl-10" : ""
							} 
			  ${
						props.disabled
							? "!text-[#CACFD8] bg-[#F5F7FA] border-none"
							: "text-[#0E121B]"
					}	
			  w-full text-[#0E121B]`,

							className
						)}
						ref={ref}
						{...props}
					/>

					{startIcon && (
						<div className="absolute left-3 top-[50%] transform -translate-y-1/2 flex items-center pr-2">
							{startIcon}
						</div>
					)}
					{endIcon && (
						<div className="absolute right-1 top-[50%] transform -translate-y-1/2 flex items-center pr-2">
							{endIcon}
						</div>
					)}
				</div>
				{validationErr && <ValidationError message={validationErr} />}
			</div>
		);
	}
);
Input.displayName = "Input";

export { Input };
