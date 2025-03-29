import { cn } from "@/lib/utils/cn"

interface ValidationErrorProps {
  className?: string
  error: string
}
const ValidationError = ({ error, className }: ValidationErrorProps) => {
  return (
    <div
      className={cn(
        "my-1 flex flex-row items-center justify-center gap-1 text-sm text-[#CA3232]",
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9ZM9.5625 5.25C9.5625 4.93934 9.31066 4.6875 9 4.6875C8.68934 4.6875 8.4375 4.93934 8.4375 5.25V9.75C8.4375 10.0607 8.68934 10.3125 9 10.3125C9.31066 10.3125 9.5625 10.0607 9.5625 9.75V5.25ZM9.4256 13.1255C9.63342 12.8946 9.61471 12.5389 9.38379 12.3311C9.15288 12.1232 8.79722 12.142 8.5894 12.3729L8.5819 12.3812C8.37408 12.6121 8.39279 12.9678 8.62371 13.1756C8.85462 13.3834 9.21028 13.3647 9.4181 13.1338L9.4256 13.1255Z"
          fill="#CA3232"
        />
      </svg>
      {error}
    </div>
  )
}
export default ValidationError
