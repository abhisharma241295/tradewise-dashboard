import * as Yup from "yup";

export const SignInSchema = Yup.object().shape({
	email: Yup.string()
		.email("Please enter a valid email")
		.required("Email is required"),
	password: Yup.string().required("Password is required"),
});

export const SignUpSchema = Yup.object().shape({
	email: Yup.string()
		.email("Please enter a valid email")
		.required("Email is required"),
});

export const Step1Schema = Yup.object().shape({
	fullName: Yup.string().required("Full name is required"),
	phoneNumber: Yup.string()
		.required("Phone number is required")
		.min(10, "Phone number must be at least 10 characters"),
});

export const Step2Schema = Yup.object().shape({
	department: Yup.string().required("Department is Required"),
	designation: Yup.string().required("Designation is required"),
	biography: Yup.string(),
});

export const Step3Schema = Yup.object().shape({
	password: Yup.string().required("Password is Required"),
	confirmPassword: Yup.string()
		.required("Confirm Password is required")
		.oneOf([Yup.ref("password")], "Passwords must match"),
});

export const ResetPasswordSchema = Yup.object().shape({
	email: Yup.string()
		.email("Please enter a valid email")
		.required("Email is required"),
});

export const OTPSchema = Yup.object().shape({
	otp: Yup.number().required("OTP is required"),
});
