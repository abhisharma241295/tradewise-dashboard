"use client"

import React, { useState, useRef, useEffect } from "react"
import { X, Loader } from "lucide-react"
import ArrowDown from "@/components/static/icons/arrowDown"

interface Option {
  value: string
  label: string
  raw: any
}

interface MultiSelectProps {
  options: Option[]
  placeholder?: string
  value: Option[]
  setValue: (selectedOptions: Option[]) => void
  maxSelections?: number
  chip?: boolean
  disabled?: boolean
  itemTemplate?: (option: Option) => React.ReactNode
  selectedItemTemplate?: (
    option: Option,
    onRemove: () => void
  ) => React.ReactNode
  querying?: boolean
  onQueryChange?: (searchTerm: string) => void
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  placeholder = "Select items...",
  value: selectedOptions,
  setValue: setSelectedOptions,
  maxSelections = Infinity,
  chip = false,
  disabled = false,
  itemTemplate,
  selectedItemTemplate,
  querying = false,
  onQueryChange,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const filteredOptions = options.filter(
    (option) =>
      (option.label ?? "").toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedOptions.some((selected) => selected.value === option.value)
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
    if (selectedOptions.length < maxSelections) {
      setSelectedOptions([...selectedOptions, option])
      setSearchTerm("")
      setIsOpen(false)
      inputRef.current?.focus()
    }
  }

  const handleRemove = (option: Option) => {
    if (disabled) return
    setSelectedOptions(
      selectedOptions.filter((selected) => selected.value !== option.value)
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return
    if (
      e.key === "Backspace" &&
      searchTerm === "" &&
      selectedOptions.length > 0
    ) {
      handleRemove(selectedOptions[selectedOptions.length - 1])
    } else if (e.key === "ArrowDown") {
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
    }
  }

  const defaultItemTemplate = (option: Option) => option.label
  const defaultSelectedItemTemplate = (
    option: Option,
    onRemove: () => void
  ) => (
    <span className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-800 transition-all duration-200 hover:bg-blue-200">
      {option.label}
      <X
        size={14}
        className="cursor-pointer hover:text-blue-600"
        onClick={(e) => {
          e.stopPropagation()
          onRemove()
        }}
      />
    </span>
  )

  return (
    <div
      className={`relative w-full ${disabled ? "opacity-90" : ""}`}
      ref={dropdownRef}
    >
      <div
        className={`relative flex flex-wrap items-center gap-2 rounded-lg bg-white py-1.5 pl-2 transition-all duration-200 ${disabled ? "opacity-90" : "border-gray-300 hover:border-[var(--primary)]"}`}
        style={{ alignItems: "center" }}
        onClick={() => inputRef.current?.focus()}
      >
        {chip ? (
          selectedOptions.map((option) =>
            selectedItemTemplate
              ? selectedItemTemplate(option, () => handleRemove(option))
              : defaultSelectedItemTemplate(option, () => handleRemove(option))
          )
        ) : (
          <span
            className={` ${disabled ? "text-gray-500 opacity-90" : "text-gray-700"}`}
          >
            {selectedOptions.map((option) => option.label).join(", ")}
          </span>
        )}
        <input
          ref={inputRef}
          type="text"
          disabled={disabled}
          className={`flex-grow bg-transparent outline-none ${disabled ? "opacity-90" : "text-gray-700 placeholder:text-gray-500"}`}
          placeholder={selectedOptions.length === 0 ? placeholder : ""}
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
            // size={20}
            className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180 transform" : ""} ${disabled ? "opacity-90" : ""}`}
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
                  className={`cursor-pointer px-4 py-2.5 transition-colors duration-200 ${index === focusedIndex ? "bg-blue-50" : "hover:bg-gray-100"}`}
                  onClick={() => handleSelect(option)}
                >
                  {itemTemplate
                    ? itemTemplate(option)
                    : defaultItemTemplate(option)}
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
