import * as Yup from "yup";

export const ProfileInfoSchema = Yup.object().shape({
	designation: Yup.string().required("Designation is required"),
	department: Yup.string().required("Department is required"),
	biography: Yup.string(),
});

export const SecuritySchema = Yup.object().shape({
	currentPassword: Yup.string().required("Current Password is Required"),
	password: Yup.string().required("Password is Required"),
	confirmPassword: Yup.string()
		.required("Confirm Password is required")
		.oneOf([Yup.ref("password")], "Passwords must match"),
});
