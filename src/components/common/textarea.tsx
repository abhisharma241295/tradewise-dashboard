import * as React from "react";
import { cn } from "@/lib/utils";
import ValidationError from "./validationError";

// Define a proper interface for the Textarea component props
interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	fieldLabel?: string;
	rows?: number;
	required?: boolean;
	validationErr?: string;
	// Add any other custom props you need
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, rows, fieldLabel, required, validationErr, ...props }, ref) => {
		return (
			<div className="mb-3">
				{fieldLabel && (
					<label className="block text-sm font-medium text-[#0E121B] text-left pb-1">
						{fieldLabel} {required && <span className="text-[#335CFF]">*</span>}
					</label>
				)}
				<div className="relative">
					<textarea
						rows={rows}
						className={cn(
							`border ${validationErr ? "border-[#FB3748]" : "border-[#E1E4EA]"} ${
								validationErr
									? "focus:border-[#FB3748] focus:outline-none"
									: "focus:border-[#E1E4EA] focus:outline-none"
							} shadow-[0px_1px_2px_0px_rgba(10,13,20,0.03)] text-sm font-normal rounded-xl p-2.5 w-full text-[#0E121B]`,
							className
						)}
						ref={ref}
						{...props}
					/>
				</div>
				{validationErr && <ValidationError message={validationErr} />}
			</div>
		);
	}
);
Textarea.displayName = "Textarea";

export { Textarea };
