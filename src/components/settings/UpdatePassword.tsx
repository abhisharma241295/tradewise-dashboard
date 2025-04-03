"use client";
import { useState } from "react";
import { Formik, Form } from "formik";
import { SecuritySchema } from "@/validationSchemas/settingValidationSchema";
import { Input } from "@/components/common/input";
import { LockKeyholeIcon, EyeOffIcon, EyeIcon, Check, X, Loader2 } from "lucide-react";
import { usePasswordManagerMutation } from "@/redux/apis/userApi";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function UpdatePassword() {
	const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
		useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
		useState(false);

	const [passwordManager, { isLoading }] = usePasswordManagerMutation();

	const handleSubmit = async (
		values: {
			password: string;
			confirmPassword: string;
			currentPassword: string;
		},
		{ resetForm }: { resetForm: (options?: { values?: any }) => void }
	) => {
		try {
			const result = await passwordManager({
				action: "update",
				...values,
			});
			if (result.data) {
				resetForm({
					values: { password: "", currentPassword: "", confirmPassword: "" },
				});
				toast.success(result.data.message || "Password updated successfully!");
			} else if ('error' in result) {
				const errorMessage = 
					typeof result.error === 'object' && result.error !== null && 'message' in result.error
						? result.error.message
						: "Something went wrong!";
				toast.error(errorMessage);
			}
		} catch (err: Error | unknown) {
			toast.error(err instanceof Error ? err.message : "Something went wrong!");
		}
	};

	return (
		<div className="container mx-auto max-w-md size-full">
			<div className="flex flex-col pt-10">
				<p className="text-md font-semibold text-[#0E121B]">Change Password</p>
				<p className="text-sm text-[#525866] mt-1">Update password for enhanced account security.</p>
				<Formik
					initialValues={{
						currentPassword: "",
						password: "",
						confirmPassword: "",
					}}
					validationSchema={SecuritySchema}
					onSubmit={handleSubmit}
				>
					{({ errors, values, touched, handleChange, resetForm }) => {
						// Calculate password strength
						const passwordStrength = values.password
							? (values.password.length >= 8 ? 1 : 0) +
							  (/[A-Z]/.test(values.password) ? 1 : 0) +
							  (/[0-9]/.test(values.password) ? 1 : 0)
							: 0;

						return (
							<Form className="pt-4 gap-4">
								<div className="border-t gap-4 pb-4" />
								<Input
									type={isCurrentPasswordVisible ? "text" : "password"}
									placeholder="........"
									fieldLabel={"Current Password"}
									required
									startIcon={<LockKeyholeIcon className="h-5 w-5 text-[#99A0AE]" />}
									name="currentPassword"
									validationErr={
										touched.currentPassword && errors.currentPassword
											? errors.currentPassword
											: null
									}
									onChange={handleChange}
									endIcon={
										isCurrentPasswordVisible ? (
											<EyeOffIcon
												className="h-5 w-5 text-[#E1E4EA]"
												onClick={() =>
													setIsCurrentPasswordVisible(!isCurrentPasswordVisible)
												}
											/>
										) : (
											<EyeIcon
												className="h-5 w-5 text-[#E1E4EA]"
												onClick={() =>
													setIsCurrentPasswordVisible(!isCurrentPasswordVisible)
												}
											/>
										)
									}
								/>
								<Input
									type={isPasswordVisible ? "text" : "password"}
									placeholder="........"
									fieldLabel={"New Password"}
									required
									startIcon={<LockKeyholeIcon className="h-5 w-5 text-[#99A0AE]" />}
									name="password"
									validationErr={
										touched.password && errors.password ? errors.password : null
									}
									onChange={handleChange}
									endIcon={
										isPasswordVisible ? (
											<EyeOffIcon
												className="h-5 w-5 text-[#E1E4EA]"
												onClick={() => setIsPasswordVisible(!isPasswordVisible)}
											/>
										) : (
											<EyeIcon
												className="h-5 w-5 text-[#E1E4EA]"
												onClick={() => setIsPasswordVisible(!isPasswordVisible)}
											/>
										)
									}
								/>
								<Input
									type={isConfirmPasswordVisible ? "text" : "password"}
									placeholder="........"
									fieldLabel={"Confirm Password"}
									required
									startIcon={<LockKeyholeIcon className="h-5 w-5 text-[#99A0AE]" />}
									name="confirmPassword"
									validationErr={
										touched.confirmPassword && errors.confirmPassword
											? errors.confirmPassword
											: null
									}
									onChange={handleChange}
									endIcon={
										isConfirmPasswordVisible ? (
											<EyeOffIcon
												className="h-5 w-5 text-[#E1E4EA]"
												onClick={() =>
													setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
												}
											/>
										) : (
											<EyeIcon
												className="h-5 w-5 text-[#E1E4EA]"
												onClick={() =>
													setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
												}
											/>
										)
									}
								/>

								{/* Password strength indicator */}
								<ol className="flex items-center w-full justify-between mt-4">
									<li className="flex items-center w-full">
										<div
											className={`h-1 ${
												passwordStrength >= 1 ? "bg-[#FB3748]" : "bg-[#E1E4EA]"
											} w-24`}
										></div>
									</li>
									<li className="flex items-center w-full mx-2">
										<div
											className={`h-1 ${
												passwordStrength >= 2 ? "bg-[#FF8447]" : "bg-[#E1E4EA]"
											} w-24`}
										></div>
									</li>
									<li className="flex items-center w-full">
										<div
											className={`h-1 ${
												passwordStrength >= 3 ? "bg-[#1FC16B]" : "bg-[#E1E4EA]"
											} w-24`}
										></div>
									</li>
								</ol>

								<div className="text-xs text-[#525866] mt-2">
									Must contain at least:
								</div>
								<div className="flex items-center space-x-2 text-xs text-[#525866] py-1">
									{/[A-Z]/.test(values.password) ? (
										<div className="bg-[#1FC16B] rounded-full p-1">
											<Check className="text-white" size={12} />
										</div>
									) : (
										<div className="bg-[#99A0AE] rounded-full p-1">
											<X color="#fff" size={12} />
										</div>
									)}
									<span>At least 1 uppercase</span>
								</div>
								<div className="flex items-center space-x-2 text-xs text-[#525866] py-1">
									{/[0-9]/.test(values.password) ? (
										<div className="bg-[#1FC16B] rounded-full p-1">
											<Check className="text-white" size={12} />
										</div>
									) : (
										<div className="bg-[#99A0AE] rounded-full p-1">
											<X color="#fff" size={12} />
										</div>
									)}
									<span>At least 1 number</span>
								</div>
								<div className="flex items-center space-x-2 text-xs text-[#525866] py-1">
									{values.password.length >= 8 ? (
										<div className="bg-[#1FC16B] rounded-full p-1">
											<Check className="text-white" size={12} />
										</div>
									) : (
										<div className="bg-[#99A0AE] rounded-full p-1">
											<X color="#fff" size={12} />
										</div>
									)}
									<span>At least 8 characters</span>
								</div>

								<div className="col-span-2 flex justify-end gap-4 m-2">
									
									<Button
										type="submit"
										variant="default"
										className="w-full my-6"
										disabled={isLoading}
									>
										{isLoading ? (
											<>
												<Loader2 className="w-4 h-4 animate-spin mr-2" />
												Applying Changes
											</>
										) : (
											"Apply Changes"
										)}
									</Button>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
}
