"use client";

import { useState } from "react";
import { ChevronsUpDown, X } from "lucide-react";
import { Command, CommandInput, CommandItem, CommandList, CommandGroup } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface IItem{
    name: string;
    img: string;
};

interface IMultiSelectDropdownWithImages{
    label:string;
    required:boolean;
    selectPlaceholder: string;
    searchPlaceholder:string;
    items: IItem[];
    selectedItems: IItem[];
    setSelectedItems: React.Dispatch<React.SetStateAction<IItem[]>>;
  }

const MultiSelectDropdownWithImages: React.FC<IMultiSelectDropdownWithImages> = ({
    label = "",
    required = false,
    selectPlaceholder = "",
    searchPlaceholder = "",   
    items,
    selectedItems,
    setSelectedItems
    })=> {
  const [open, setOpen] = useState(false);

  const toggleCode = (item: IItem) => {
    setSelectedItems((prev: IItem[]) =>
      prev.some((c) => c.name === item.name)
        ? prev.filter((c) => c.name !== item.name)
        : [...prev, item]
    );
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
              {selectedItems.map((item) => (
                <Badge key={item.name} variant="secondary" className="px-2 py-1 flex items-center space-x-1">
                  <img src={item.img} alt={item.name} className="h-4 w-4 rounded-full" />
                  <span >{item.name}</span>
                  <button     
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCode(item);
                    }}>
                  <X className="h-3 w-3 cursor-pointer pointer-events-auto"/>
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
              {items.map((item) => (
                <CommandItem
                  key={item.name}
                  onSelect={() => toggleCode(item)}
                  className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer ${
                  selectedItems.some((c) => c.name === item.name) ? "bg-blue-100" : "hover:bg-gray-100"
                  }`}
                >
                  <img src={item.img} alt={item.name} className="h-5 w-5 rounded-full" />
                  <span>{item.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelectDropdownWithImages;
