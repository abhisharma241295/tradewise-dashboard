import React from "react"

interface CreateIconProps {
  className?: string
}

const CreateIcon: React.FC<CreateIconProps> = ({ className }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2.5 13.3333L8.33333 10.8333L17.5 15M17.5 17V3C17.5 2.72386 17.2761 2.5 17 2.5H3C2.72386 2.5 2.5 2.72386 2.5 3V17C2.5 17.2761 2.72386 17.5 3 17.5H17C17.2761 17.5 17.5 17.2761 17.5 17ZM11.6667 6.66667C11.6667 7.58714 12.4129 8.33333 13.3333 8.33333C14.2538 8.33333 15 7.58714 15 6.66667C15 5.74619 14.2538 5 13.3333 5C12.4129 5 11.6667 5.74619 11.6667 6.66667Z"
        stroke="#23273C"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default CreateIcon
