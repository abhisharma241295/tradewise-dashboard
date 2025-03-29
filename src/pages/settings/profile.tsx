import React from "react"
import type { NextPage } from "next"
import { InputText } from "primereact/inputtext"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  ProfileFormSchema,
  type ProfileFormType,
} from "@/lib/form-schema/profileForm"
import { Avatar } from "primereact/avatar"
import CustomButton from "@/components/ui/Button"
import { Button } from "primereact/button"
import {
  useGetCurrentUserQuery,
  userApi,
} from "@/lib/redux/features/apis/userApi"
import { wrapper } from "@/lib/redux/store"
import { toast } from "sonner"
import { Dialog } from "primereact/dialog"

interface ProfileSettingsProps {
  error?: string
  userData?: any
}

const ProfileSettings: NextPage<ProfileSettingsProps> = ({
  error,
  userData,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormType>({
    resolver: yupResolver(ProfileFormSchema),
    defaultValues: {
      firstName: userData?.data.profile?.first_name || "",
      lastName: userData?.data.profile?.last_name || "",
      email: userData?.data.profile?.email || "",
      password: "",
    },
  })

  const {
    data: currentUserData,
    isLoading: isCurrentUserLoading,
    isError: isCurrentUserError,
    error: currentUserError,
  } = useGetCurrentUserQuery()

  const [updateUser, { isLoading: isUpdating }] =
    userApi.useUpdateUserMutation()
  const [deleteUser, { isLoading: isDeleting }] =
    userApi.useDeleteUserMutation()

  const onSubmit = async (data: ProfileFormType) => {
    try {
      await updateUser(data).unwrap()
      toast.success("Profile updated successfully")
    } catch (error) {
      console.error("Failed to update profile:", error)
      toast.error("Failed to update profile")
    }
  }

  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    React.useState(false)

  const handleDeleteAccount = async () => {
    try {
      await deleteUser().unwrap()
      toast.success("Account deleted successfully")
      setDeleteConfirmationVisible(false)
      // Redirect to home page or login page after successful deletion
    } catch (error) {
      console.error("Failed to delete account:", error)
      toast.error("Failed to delete account")
    }
  }

  React.useEffect(() => {
    if (currentUserData) {
      // Populate form with current user data
      reset({
        firstName: currentUserData.data.profile?.first_name || "",
        lastName: currentUserData.data.profile?.last_name || "",
        email: currentUserData.data.profile?.email || "",
        password: currentUserData.data.profile?.password || "",
      })
    }
  }, [currentUserData, reset])

  React.useEffect(() => {
    if (isCurrentUserError && currentUserError) {
      toast.error(`Error fetching user data: ${currentUserError}`)
    }
  }, [isCurrentUserError, currentUserError])

  return (
    <div className="grow overflow-y-auto p-6">
      {error && <div className="mb-4 text-red-500">{error}</div>}

      <div className="mb-6 flex items-center gap-4">
        <Avatar size="xlarge" shape="circle" className="h-20 w-20" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="field">
            <label htmlFor="firstName" className="mb-1 block">
              First Name
            </label>
            <InputText
              id="firstName"
              {...register("firstName")}
              className="w-full"
              disabled
            />
            {errors.firstName && (
              <small className="text-red-500">{errors.firstName.message}</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="lastName" className="mb-1 block">
              Last Name
            </label>
            <InputText
              id="lastName"
              {...register("lastName")}
              className="w-full"
              disabled
            />
            {errors.lastName && (
              <small className="text-red-500">{errors.lastName.message}</small>
            )}
          </div>
        </div>

        <div className="field">
          <label htmlFor="email" className="mb-1 block">
            Email
          </label>
          <InputText
            id="email"
            type="email"
            {...register("email")}
            className="w-full"
            disabled
          />
          {errors.email && (
            <small className="text-red-500">{errors.email.message}</small>
          )}
        </div>

        <div className="field">
          <label htmlFor="password" className="mb-1 block">
            Password
          </label>
          <InputText
            id="password"
            type="password"
            {...register("password")}
            className="w-full"
          />
          {errors.password && (
            <small className="text-red-500">{errors.password.message}</small>
          )}
        </div>

        <Button
          label="Save Changes"
          type="submit"
          loading={isCurrentUserLoading || isUpdating}
          size="small"
          className="p-button-primary w-auto"
        />
      </form>

      <div className="mt-8 border-t pt-8">
        <h2 className="mb-4 text-lg font-semibold text-red-600">Danger Zone</h2>
        <CustomButton
          className="!hover:bg-red-700 rounded-[8px] !border-red-600 !bg-red-600 px-6 py-2 !font-medium"
          onClick={() => setDeleteConfirmationVisible(true)}
        >
          Delete Account
        </CustomButton>
      </div>

      <Dialog
        draggable={false}
        visible={deleteConfirmationVisible}
        onHide={() => {
          if (!deleteConfirmationVisible) return
          setDeleteConfirmationVisible(false)
        }}
        className="w-full max-w-md"
        header="Delete Account Confirmation"
      >
        <p className="mb-6 border-t px-2 pt-4">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-4 border-t pt-4">
          <CustomButton
            variant={"outline"}
            size="sm"
            className="rounded-md border border-primary px-6 py-2 !font-medium text-primary"
            onClick={() => {
              setDeleteConfirmationVisible(false)
            }}
          >
            No
          </CustomButton>
          <CustomButton
            loading={isDeleting}
            size="sm"
            className="!hover:bg-red-700 rounded-[8px] !border-red-600 !bg-red-600 px-6 py-2 !font-medium"
            onClick={handleDeleteAccount}
          >
            Yes, Delete
          </CustomButton>
        </div>
      </Dialog>
    </div>
  )
}

export default ProfileSettings

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      store.dispatch(userApi.endpoints.getCurrentUser.initiate(undefined))
      await Promise.all(store.dispatch(userApi.util.getRunningQueriesThunk()))

      const userData =
        store.getState().userApi.queries["getCurrentUser(undefined)"]

      return {
        props: {
          userData: userData.data || null,
          error: "",
        },
      }
    } catch (error) {
      console.error("Error in getServerSideProps:", error)
      return {
        props: {
          userData: null,
          error: "Failed to fetch user data",
        },
      }
    }
  }
)
