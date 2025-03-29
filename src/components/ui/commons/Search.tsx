import React from "react"

interface SearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function Search({
  value,
  onChange,
  placeholder = "Search...",
}: SearchProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className="mb-4 px-4">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
          value={value}
          onChange={handleSearch}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
