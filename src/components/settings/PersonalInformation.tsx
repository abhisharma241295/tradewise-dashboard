import { Form, Formik } from "formik";
import { Input } from "@/components/common/input";
import { Textarea } from "@/components/common/textarea";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
// import Button from "../common/button";
import { Loader2, MailIcon } from "lucide-react";
import Image from "next/image";
import { ProfileInfoSchema } from "@/validationSchemas/settingValidationSchema";
import { useUpdateUserProfileMutation } from "@/redux/apis/settingsApi";
import { updateCredentials } from "@/redux/slices/authSlice";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function PersonalInformation() {
  const userData = useAppSelector((state) => state.auth);
  const [updateUserProfile, { isLoading, isError, error }] =
    useUpdateUserProfileMutation();
  const dispatch = useAppDispatch();
  const handleSubmit = async (values: {
    department: string;
    designation: string;
    biography: string;
  }) => {
    try {
      const result = await updateUserProfile(values);
      console.log(result);
      if (result.data) {
        dispatch(
          updateCredentials({
            department: result.data.user.department,
            designation: result.data.user.designation,
            biography: result.data.user.biography,
          })
        );

        toast.success(
          result.data.message || "User Profile updated successfully!"
        );
      } else {
        //TODO: (result?.error?.message??"") 
        toast.error("Something went wrong!");
      }
    } catch (err: Error | unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong!");
    }
  };

  return (
    <Formik
      initialValues={{
        department: userData?.department || "",
        designation: userData?.designation || "",
        biography: userData?.biography || "",
      }}
      validationSchema={ProfileInfoSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, values, touched, handleChange, resetForm }) => {
        return (
          <Form className="container max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <Input
              type="text"
              placeholder="Sophia Williams"
              fieldLabel="Full Name"
              required={true}
              name="fullName"
              onChange={handleChange}
              disabled
              value={userData?.fullName}
            />
            <Input
              type="email"
              placeholder="bmitchell@outlook.com"
              fieldLabel="Email Address"
              required={true}
              startIcon={<MailIcon className="h-5 w-5 text-[#99A0AE]" />}
              name="email"
              onChange={handleChange}
              disabled
              value={userData?.email}
            />
            <div>
              <label className="text-sm font-medium text-[#0E121B] block pb-1">
                Phone Number <span className="text-[#335CFF]">*</span>
              </label>
              <div className="relative">
                <PhoneInput
                  country={"us"}
                  enableSearch={true}
                  value={""}
                  disabled
                  inputClass="!w-full !text-[#CACFD8] !bg-[#F5F7FA] !border-none !rounded-lg !px-3 !py-2 !text-sm"
                  containerClass="!w-full"
                  buttonClass="!bg-transparent !border-none"
                />
              </div>
            </div>

            <div className=" text-[#CACFD8]">
              <Input
                type="text"
                fieldLabel="Enter Department"
                required={true}
                name="department"
                onChange={handleChange}
                validationErr={
                  touched.department && errors.department
                    ? errors.department
                    : null
                }
                value={values.department}
              />
            </div>

            <Input
              type="text"
              fieldLabel="Enter Designation"
              required={true}
              name="designation"
              onChange={handleChange}
              validationErr={
                touched.designation && errors.designation
                  ? errors.designation
                  : null
              }
              value={values.designation}
            />

            <Textarea
              rows={4}
              placeholder="Describe yourself"
              fieldLabel={"Biography (Optional)"}
              name="biography"
              onChange={handleChange}
              value={values.biography}
            />

            <div className=" flex items-center mt">
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

            <div className="flex justify-end gap-4 m-2">
           
              <Button
				        variant="default"
                type="submit"
                disabled={isLoading}
                className="w-[400px] my-6"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apply Changes"}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
