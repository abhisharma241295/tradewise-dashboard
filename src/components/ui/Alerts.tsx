import { FC } from "react"

interface AlertProps {
  title: string
  message: string
}

export const SuccessAlert: FC<AlertProps> = ({ title, message }) => {
  return (
    <div className="flex w-full max-w-4xl items-start justify-between rounded-xl border border-[#53C278] bg-[#ECFDF5] p-4 shadow-md">
      <div className="flex items-start">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM17.5303 8.53033C17.8232 8.23744 17.8232 7.76256 17.5303 7.46967C17.2374 7.17678 16.7626 7.17678 16.4697 7.46967L10 13.9393L7.53033 11.4697C7.23744 11.1768 6.76256 11.1768 6.46967 11.4697C6.17678 11.7626 6.17678 12.2374 6.46967 12.5303L9.46967 15.5303C9.76256 15.8232 10.2374 15.8232 10.5303 15.5303L17.5303 8.53033Z"
            fill="#11A843"
          />
        </svg>

        <div className="ml-3">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-foreground">{message}</p>
        </div>
      </div>
      <button className="ml-4">
        <CloseIcon />
      </button>
    </div>
  )
}

export const InfoAlert: FC<AlertProps> = ({ title, message }) => {
  return (
    <div className="flex w-full max-w-4xl items-start justify-between rounded-xl border border-[#6F91D4] bg-[#E5F2FF] p-4 shadow-md">
      <div className="flex items-start">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12.5675 7.50173C12.8446 7.19384 12.8196 6.71963 12.5117 6.44253C12.2038 6.16544 11.7296 6.19039 11.4525 6.49827L11.4425 6.50939C11.1654 6.81727 11.1904 7.29148 11.4983 7.56858C11.8062 7.84568 12.2804 7.82072 12.5575 7.51284L12.5675 7.50173ZM12.75 11.0011C12.75 10.5869 12.4142 10.2511 12 10.2511C11.5858 10.2511 11.25 10.5869 11.25 11.0011V16.0011C11.25 16.4153 11.5858 16.7511 12 16.7511C12.4142 16.7511 12.75 16.4153 12.75 16.0011V11.0011Z"
            fill="#3264CA"
          />
        </svg>

        <div className="ml-3">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-foreground">{message}</p>
        </div>
      </div>
      <button className="ml-4">
        <CloseIcon />
      </button>
    </div>
  )
}
export const ErrorAlert: FC<AlertProps> = ({ title, message }) => {
  return (
    <div className="flex w-full max-w-4xl items-start justify-between rounded-xl border border-[#F19090] bg-[#FFE5E5] p-4 shadow-md">
      <div className="flex items-start">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12.75 7C12.75 6.58579 12.4142 6.25 12 6.25C11.5858 6.25 11.25 6.58579 11.25 7V13C11.25 13.4142 11.5858 13.75 12 13.75C12.4142 13.75 12.75 13.4142 12.75 13V7ZM12.5675 17.5006C12.8446 17.1927 12.8196 16.7185 12.5117 16.4414C12.2038 16.1643 11.7296 16.1893 11.4525 16.4972L11.4425 16.5083C11.1654 16.8162 11.1904 17.2904 11.4983 17.5675C11.8062 17.8446 12.2804 17.8196 12.5575 17.5117L12.5675 17.5006Z"
            fill="#CA3232"
          />
        </svg>

        <div className="ml-3">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-foreground">{message}</p>
        </div>
      </div>
      <button className="ml-4">
        <CloseIcon />
      </button>
    </div>
  )
}

export const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.75732 17.2426L12 12M12 12L17.2426 6.75732M12 12L6.75732 6.75732M12 12L17.2426 17.2426"
      stroke="#141C25"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// export default SuccessAlert;
