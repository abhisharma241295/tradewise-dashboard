"use client";

import { useState } from "react";
import { ChevronsUpDown, X } from "lucide-react";
import { Command, CommandInput, CommandItem, CommandList, CommandGroup } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface IMultiSelectDropdown{
  label:string;
  required: boolean;
  selectPlaceholder: string;
  searchPlaceholder:string;
  items: string[];
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const MultiSelectDropdown: React.FC<IMultiSelectDropdown> = ({
  label = "",
  required = false,
  selectPlaceholder = "",
  searchPlaceholder = "",
  items,
  selectedItems,
  setSelectedItems
})=> {
  const [open, setOpen] = useState(false);

  const toggleCode = (code: string) => {
    setSelectedItems((prev:string[]) => prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <label className="mb-2 block text-[14px]">
        <span>{label}</span>
       {required && <span className="text-red-400 text-[20px]"> *</span> }
      </label>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {selectedItems.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {selectedItems.map((item:string) => (
                <Badge key={item} variant="secondary" className="px-2 py-1">
                 <span>{item} </span>
                 <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCode(item);
                  }}>
                   <X className="inline-block ml-1 h-3 w-3 cursor-pointer"/>
                 </button>
                </Badge>
              ))}
            </div>
          ) : (
            <span>{selectPlaceholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-2 bg-white shadow-lg rounded-md">
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="p-2 border rounded-md w-full" />
          <CommandList>
            <CommandGroup>
              {items.map((item:string) => (
                <CommandItem
                  key={item}
                  onSelect={() => toggleCode(item)}
                  className={`cursor-pointer p-2 rounded-md ${
                    selectedItems.includes(item) ? "bg-blue-100" : "hover:bg-gray-100"
                  }`}
                >
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};


export default MultiSelectDropdown;
