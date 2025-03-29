import React from "react"

interface ArrowDownProps {
  className?: string
}

const ArrowDown: React.FC<ArrowDownProps> = ({ className }) => {
  return (
    <svg
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_3575_11512)">
        <path
          d="M7.5 13L0.138784 5.5L14.8612 5.5L7.5 13Z"
          fill="currentColor"
        />
      </g>
    </svg>
  )
}

export default ArrowDown
