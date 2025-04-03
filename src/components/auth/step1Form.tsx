"use client";
// import Button from "@/components/common/button";
import { Button } from "@/components/ui/button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { Formik, Form } from "formik";
import { Step1Schema } from "@/validationSchemas/authValidationSchema";
import ValidationError from "@/components/common/validationError";
import { Input } from "@/components/common/input";
import { setSignUpData } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/hooks";

export default function Step1() {
	const dispatch = useAppDispatch();

	const handleSubmit = (values: { fullName: string; phoneNumber: string }) => {
		dispatch(setSignUpData({ ...values, stepId: 2 }));
	};
	return (
		<Formik
			initialValues={{
				fullName: "",
				phoneNumber: "",
			}}
			validationSchema={Step1Schema}
			onSubmit={handleSubmit}
		>
			{({ errors, values, touched, handleChange }) => {
				return (
					<Form className="w-full">
						<Input
							type="fullName"
							placeholder="James Brown"
							fieldLabel={"Full Name"}
							required
							validationErr={
								touched.fullName && errors.fullName ? errors.fullName : null
							}
							name="fullName"
							onChange={handleChange}
						/>
						<div className="mb-3">
							<label className="block text-sm font-medium text-[#0E121B] text-left p-1.5">
								Phone Number <span className="text-[#335CFF]">*</span>
							</label>
							<PhoneInput
								country={"us"}
								enableSearch={true}
								placeholder="00-00-000-0000"
								onChange={handleChange("phoneNumber")}
								value={values.phoneNumber}
								inputClass={`bg-white ${
									errors.phoneNumber && touched.phoneNumber
										? "border-red-500"
										: "border-[#E1E4EA]"
								}`}
								inputStyle={{
									borderRadius: "10px",
									borderColor: "#E1E4EA",
									padding: "9.5px 10px 9.5px 56px",
									borderStyle: "solid",
									width: "100%",
									color: "#0E121B",
									fontSize: "14px",
									boxShadow: "0px 1px 2px 0px rgba(10, 13, 20, 0.03)",
								}}
							/>
							{errors.phoneNumber && touched.phoneNumber && (
								<ValidationError message={errors.phoneNumber} />
							)}
						</div>
						<Button
							type="submit"
							className="w-full my-6"
							size={"lg"}
							// loading={isLoading}
						>
							Continue
						</Button>
					</Form>
				);
			}}
		</Formik>
	);
}
