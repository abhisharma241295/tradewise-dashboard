"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
// import Button from "@/components/common/button";
import Image from "next/image";
import { MailIcon, EyeIcon, EyeOffIcon, LockKeyholeIcon } from "lucide-react"; // Correct import
import { Formik, Form } from "formik";
import { SignInSchema } from "@/validationSchemas/authValidationSchema";
import { Input } from "@/components/common/input";
import { useLoginMutation } from "@/redux/apis/userApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/slices/authSlice";

export default function Login() {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isChecked, setIsChecked] = useState(false);
	const dispatch = useAppDispatch();

	const [login, { isLoading }] = useLoginMutation();
	const router = useRouter();

	const handleTogglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	const handleSubmit = async (values: { email: string; password: string }) => {
		try {
			const result = await login(values);
			if (result.data) {
				dispatch(
					setCredentials({
						fullName: result.data.full_name,
						isUserVerified: result.data.user_verified,
						token: result.data.access_token,
						days: isChecked ? 7 : 0,
						userSubscribed: result.data.has_active_subscription,
						subscriptionStatus: result.data.subscription_status,
						...result.data,
					})
				);
				if (result.data.user_verified) {
					router.push("/dashboard");
				} else {
					router.push("/email-verification");
				}
			} else {
				// toast.error("Something went wrong!");
				toast.error((result?.error as any).message || "Something went wrong!");
			}
		} catch (err: Error | unknown) {
			toast.error(err instanceof Error ? err.message : "Something went wrong!");
		}
	};

	return (
		<div className="min-h-screen flex flex-col text-center items-center justify-center py-10">
			<div className="w-full max-w-lg rounded-xl p-6 flex flex-col items-center bg-white z-10 shadow-[0px_1px_2px_rgba(27,28,29,0.48)] shadow-[0px_0px_0px_1px_#242628]">
				<div
					className="rounded-full p-4 bg-[#E1E4EA] flex items-center justify-center"
					style={{
						background:
							"linear-gradient(180deg, rgba(113, 119, 132, 0.10) 0%, rgba(113, 119, 132, 0.00) 100%)",
						backdropFilter: "blur(12px)",
					}}
				>
					<div className=" bg-white rounded-full p-4 flex items-center justify-center">
						<Image
							src="/icons/user-add-fill.svg"
							alt="User Icon"
							width={32}
							height={32}
						/>
					</div>
				</div>

				<h3 className="pt-2 pb-1">Welcome Back</h3>
				<p className="pb-6 text-[#525866]">Log In to your Tradewise account</p>

				<div className="rounded-lg border border-[#E1E4EA] p-2 flex items-center justify-center w-full mb-6">
					<Image
						src="/icons/Google-logo.svg"
						alt="Google Logo"
						width={20}
						height={20}
					/>
				</div>

				<div className="flex items-center w-full mb-6">
					<div className="flex-1 border-t border-[#E1E4EA]"></div>
					<p className="text-[#99A0AE] text-xs px-2.5">OR</p>
					<div className="flex-1 border-t border-[#E1E4EA]"></div>
				</div>

				<Formik
					initialValues={{
						email: "",
						password: "",
					}}
					validationSchema={SignInSchema}
					onSubmit={handleSubmit}
				>
					{({ errors, touched, handleChange }) => (
						<Form className="w-full">
							<Input
								type="email"
								placeholder="hello@alignui.com"
								fieldLabel={"Email Address"}
								required
								startIcon={<MailIcon className="h-5 w-5 text-[#99A0AE]" />}
								validationErr={touched.email && errors.email ? errors.email : null}
								name="email"
								onChange={handleChange}
							/>

							<Input
								type={isPasswordVisible ? "text" : "password"}
								placeholder="........."
								fieldLabel={"Password"}
								required
								startIcon={<LockKeyholeIcon className="h-5 w-5 text-[#99A0AE]" />}
								validationErr={
									errors.password && touched.password ? errors.password : null
								}
								endIcon={
									isPasswordVisible ? (
										<EyeIcon
											className="h-5 w-5 text-[#99A0AE]"
											onClick={handleTogglePasswordVisibility}
										/>
									) : (
										<EyeOffIcon
											className="h-5 w-5 text-[#99A0AE]"
											onClick={handleTogglePasswordVisibility}
										/>
									)
								}
								name="password"
								onChange={handleChange}
							/>

							<div className="flex flex-col md:flex-row justify-between items-center md:items-start w-full text-sm text-blue-600 mb-4 gap-3">
								<label className="flex w-full md:w-auto items-center text-[#0E121B]">
									<input
										type="checkbox"
										className="mr-2"
										checked={isChecked}
										onChange={(e) => setIsChecked(e.target.checked)}
									/>{" "}
									Keep me logged in
								</label>
								<a
									href="/reset-password"
									className="ml-auto md:ml-0 text-[#525866] underline"
								>
									Forgot password?
								</a>
							</div>
							<Button
								type="submit"
								size={"lg"}
								className="w-full my-6"
								disabled={isLoading}
							>
								{isLoading ? "Logging In..." : "Log In"}
							</Button>
						</Form>
					)}
				</Formik>
				<p className="text-sm text-[#525866]">
					Don&apos;t have an account?{"  "}
					<a href="/signup" className="text-[#0E121B] font-medium underline">
						Sign Up
					</a>
				</p>
			</div>
		</div>
	);
}
