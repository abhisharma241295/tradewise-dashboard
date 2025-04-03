import Image from "next/image";
// import Button from "@/components/common/button";
import { Button } from "@/components/ui/button";
import { Formik, Form } from "formik";
import { Step2Schema } from "@/validationSchemas/authValidationSchema";
import { setSignUpData } from "@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Input } from "@/components/common/input";
import { Textarea } from "@/components/common/textarea";

export default function Step2() {
  const dispatch = useAppDispatch();
  const signUpData = useAppSelector((state) => state.auth.signUpData);

  const handleSubmit = (values: {
    department: string;
    designation: string;
    biography: string;
  }) => {
    dispatch(
      setSignUpData({
        ...values,
        stepId: 3,
        email: signUpData?.email,
        fullName: signUpData?.fullName,
        phoneNumber: signUpData?.phoneNumber,
      })
    );
  };
  return (
    <Formik
      initialValues={{
        department: "",
        designation: "",
        biography: "",
      }}
      validationSchema={Step2Schema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleChange }) => (
        <Form className="w-full">
          <Input
            type="text"
            placeholder="e.g. Human Resources"
            fieldLabel={"Department"}
            required
            validationErr={
              touched.department && errors.department ? errors.department : null
            }
            name="department"
            onChange={handleChange}
          />
          <Input
            type="text"
            placeholder="Your Title"
            fieldLabel={"Designation"}
            required
            validationErr={
              touched.designation && errors.designation
                ? errors.designation
                : null
            }
            name="designation"
            onChange={handleChange}
          />
          <Textarea
            rows={4}
            placeholder="Describe yourself"
            fieldLabel={"Biography (Optional)"}
            name="biography"
            onChange={handleChange}
          />
          <div className="flex items-center space-x-2 py-1">
            <Image
              src="/icons/information-fill.svg"
              width={16}
              height={16}
              alt="Information Icon"
            />
            <span className="text-[#525866] text-xs text-left">
              It will be displayed on your profile.
            </span>
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
      )}
    </Formik>
  );
}
