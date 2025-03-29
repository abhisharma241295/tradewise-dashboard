import React from "react"

interface PaperClipIconProps {
  className?: string
}
const PaperClipIcon: React.FC<PaperClipIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M17.8656 9.7186L10.2073 17.3769C9.26907 18.3151 7.99659 18.8422 6.66977 18.8422C5.34295 18.8422 4.07048 18.3151 3.13227 17.3769C2.19407 16.4387 1.66699 15.1663 1.66699 13.8394C1.66699 12.5126 2.19407 11.2401 3.13227 10.3019L10.7906 2.6436C11.4161 2.01813 12.2644 1.66675 13.1489 1.66675C14.0335 1.66675 14.8818 2.01813 15.5073 2.6436C16.1327 3.26907 16.4841 4.11739 16.4841 5.00193C16.4841 5.88648 16.1327 6.7348 15.5073 7.36027L7.84061 15.0186C7.52787 15.3313 7.10371 15.507 6.66144 15.507C6.21917 15.507 5.79501 15.3313 5.48227 15.0186C5.16954 14.7059 4.99385 14.2817 4.99385 13.8394C4.99385 13.3972 5.16954 12.973 5.48227 12.6603L12.5573 5.5936"
        stroke="#23273C"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
export default PaperClipIcon
