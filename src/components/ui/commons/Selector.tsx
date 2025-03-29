import { Dropdown } from "primereact/dropdown"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

type DropdownSelectorProps = {
  options: { label: string; value: string }[]
  defaultSelected?: string
  onSelect?: (selected: string) => void
}

const DropdownSelector = ({
  options,
  defaultSelected,
  onSelect,
}: DropdownSelectorProps) => {
  const [selected, setSelected] = useState(
    options.find((option) => option.value === defaultSelected) || options[0]
  )

  const handleSelect = (option: { label: string; value: string }) => {
    setSelected(option)
    if (onSelect) {
      onSelect(option.value)
    }
  }

  return (
    <div className="relative inline-block">
      <Dropdown
        value={selected}
        onChange={(e) => handleSelect(e.value)}
        options={options}
        unstyled
        optionLabel="label"
        placeholder={selected.label}
        // Panel styling updated to allow scrolling
        panelClassName="bg-white border border-gray-200 rounded-md shadow-lg z-[999] max-h-[200px] overflow-auto"
        className="flex w-full items-center justify-between border-b border-gray-300 py-2 text-lg focus:outline-none"
        dropdownIcon={<ChevronDown className="ml-1 h-4 w-4 text-gray-500" />}
        itemTemplate={(option) => (
          <div className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            {option.label}
          </div>
        )}
      />
    </div>
  )
}

export default DropdownSelector
