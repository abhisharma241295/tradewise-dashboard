"use client"

import React, { useState, useRef, useEffect } from "react"
import { Loader } from "lucide-react"
import ArrowDown from "@/components/static/icons/arrowDown"

interface Option {
  value: string
  label: string
  raw: any
}

interface SingleSelectProps {
  options: Option[]
  placeholder?: string
  value: Option | null
  setValue: (selectedOption: Option | null) => void
  disabled?: boolean
  itemTemplate?: (option: Option) => React.ReactNode
  querying?: boolean
  onQueryChange?: (searchTerm: string) => void
}

export const SingleSelect: React.FC<SingleSelectProps> = ({
  options,
  placeholder = "Select an option...",
  value,
  setValue,
  disabled = false,
  itemTemplate,
  querying = false,
  onQueryChange,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const filteredOptions = options.filter((option) =>
    (option.label ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (onQueryChange) {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
      debounceTimeout.current = setTimeout(() => {
        onQueryChange(searchTerm)
      }, 300)
    }
  }, [searchTerm, onQueryChange])

  const handleSelect = (option: Option) => {
    if (disabled) return
    setValue(option)
    setSearchTerm("")
    setIsOpen(false)
    // inputRef.current?.focus() // TODO: focusing this is causing the dropdown to visible.
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setFocusedIndex((prevIndex) =>
        prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex
      )
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setFocusedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      )
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      handleSelect(filteredOptions[focusedIndex])
    } else if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  return (
    <div
      className={`relative w-full ${disabled ? "opacity-90" : ""}`}
      ref={dropdownRef}
    >
      <div
        className={`relative flex items-center rounded-lg border bg-white py-1.5 pl-2 transition-all duration-200 ${
          disabled
            ? "opacity-90"
            : "border-gray-300 hover:border-[var(--primary)]"
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        <input
          ref={inputRef}
          type="text"
          disabled={disabled}
          className={`flex-grow bg-transparent outline-none ${
            disabled ? "opacity-90" : "text-gray-700 placeholder:text-gray-500"
          }`}
          placeholder={value ? value.label : placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute right-2">
          <ArrowDown
            className={`text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180 transform" : ""
            } ${disabled ? "opacity-90" : ""}`}
          />
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-[var(--primary)] bg-white shadow-lg">
          {querying && (
            <div className="flex items-center justify-center py-2">
              <Loader size={20} className="animate-spin text-gray-500" />
            </div>
          )}
          {filteredOptions.length > 0
            ? filteredOptions.map((option, index) => (
                <div
                  key={option.value}
                  className={`cursor-pointer px-4 py-2.5 transition-colors duration-200 ${
                    index === focusedIndex ? "bg-blue-50" : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {itemTemplate ? itemTemplate(option) : option.label}
                </div>
              ))
            : !querying && (
                <div className="px-4 py-2 text-gray-500">
                  No options available
                </div>
              )}
        </div>
      )}
    </div>
  )
}
