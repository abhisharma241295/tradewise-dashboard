import { Search } from "lucide-react"
import React, { useState, useEffect } from "react"
import Button from "../Button"

interface SearchComponentProps {
  value: string
  setValue: (value: string) => void
  placeholder?: string
}

const SearchButton: React.FC<SearchComponentProps> = ({
  value,
  setValue,
  placeholder = "Search...",
}) => {
  const [isSearching, setIsSearching] = useState(false)

  const handleSearchClick = () => {
    setIsSearching(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleInputBlur = () => {
    if (value.trim() === "") {
      setIsSearching(false)
    }
  }

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Perform search action here
      console.log("Search query:", value)
    }
  }

  useEffect(() => {
    if (value.trim() !== "") {
      setIsSearching(true)
    }
  }, [value])

  return (
    <div className="relative">
      {isSearching ? (
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyPress={handleInputKeyPress}
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          autoFocus
        />
      ) : (
        <Button size="sm" variant="ghost" onClick={handleSearchClick}>
          <Search />
          Search
        </Button>
      )}
    </div>
  )
}

export default SearchButton
