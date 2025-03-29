import React from "react"

interface SendIconProps {
  className?: string
}

const SendIcon: React.FC<SendIconProps> = ({ className }) => {
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
        d="M18.4607 2.96094L9.31468 17.5036L7.92269 10.3398L1.66699 6.58155L18.4607 2.96094ZM18.4607 2.96094L7.88003 10.3696"
        stroke="#118FA8"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default SendIcon
