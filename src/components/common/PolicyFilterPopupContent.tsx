import { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "./checkbox";
import {
  ListTodoIcon,
  BellIcon,
  ListFilterIcon,
  GlobeIcon,
  ChevronRightIcon,
  CodeIcon,
  GitPullRequestDraftIcon,
  BookOpenIcon,
  DotIcon,
  ExternalLinkIcon,
} from "lucide-react";

interface FilterOption {
  key: string;
  label: string;
  icon: string;
}

interface SelectedCountry {
  value: string;
  label: string;
}

interface PolicyFilterPopupContentProps {
  filtersOptions: FilterOption[];
  activeMenu: string;
  setActiveMenu: (key: string) => void;
  regulatorySources: string[];
  selectedSources: string[];
  setSelectedSources: (sources: string[]) => void;
  countries: SelectedCountry[];
  selectedCountries: string[];
  setSelectedCountries: (countries: string[]) => void;
  priorityStatus: string[];
  selectedStatuses: string[];
  setSelectedStatuses: (statuses: string[]) => void;
  handleResetFilters: () => void;
  handleApplyFilters: () => void;
  getIcon?: (icon: string, key: string) => React.ReactNode;
  onClose: () => void;
}

export default function PolicyFilterPopupContent ({
  filtersOptions,
  activeMenu,
  setActiveMenu,
  regulatorySources,
  selectedSources,
  setSelectedSources,
  countries,
  selectedCountries,
  setSelectedCountries,
  priorityStatus,
  selectedStatuses,
  setSelectedStatuses,
  handleResetFilters,
  handleApplyFilters,
  getIcon = (icon, key) => {
    // Default icon rendering if not provided
    switch (icon) {
      case "book":
        return <BookOpenIcon size={18} className="text-[#525866]" />;
      case "globe":
        return <GlobeIcon size={18} className="text-[#525866]" />;
      case "code":
        return <CodeIcon size={18} className="text-[#525866]" />;
      default:
        return <ListFilterIcon size={18} className="text-[#525866]" />;
    }
  },
  onClose,
}: PolicyFilterPopupContentProps) {
  return (
    <div className="flex justify-center h-full">
      {/* Left menu */}
      <div className="flex flex-col space-y-2 pt-4 min-w-[200px] h-full overflow-y-auto">
        {filtersOptions.map(({ key, label, icon }) => (
          <div
            key={key}
            onClick={() => setActiveMenu(key)}
            className={`flex items-center justify-between m-2 p-2 rounded-lg cursor-pointer ${
              activeMenu === key ? "bg-[#F5F7FA]" : "hover:bg-[#F5F7FA]"
            } transition-all`}
          >
            <div className="flex items-center space-x-2">
              {getIcon(icon, key)}
              <span className={`text-sm font-medium ${activeMenu === key ? "text-[#0E121B]" : "text-[#525866]"}`}>
                {label}
              </span>
            </div>
            {activeMenu === key && <ChevronRightIcon size={18} className="ml-2" />}
          </div>
        ))}
        
        {/* Reset Filter Button */}
        <div className="mt-auto p-4">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              setSelectedSources([]);
              setSelectedCountries([]);
              setSelectedStatuses([]);
              handleResetFilters();
            }}
          >
            Reset Filter
          </Button>
        </div>
      </div>

      {/* Content sections */}
      <div className="flex flex-col border-l border-[#E1E4EA]">
        {activeMenu === "regulatory" && (
          <div className="h-full flex flex-col">
            <div className="py-4 px-5 flex items-center font-medium">
              <BookOpenIcon size={24} className="pr-2 text-[#0E121B]" />
              Regulatory Sources
            </div>
            <div className="border-b border-[#E1E4EA]" />
            <div className="px-4 py-2 min-w-[350px] flex-1 overflow-y-auto">
              {regulatorySources.map((source) => (
                <div
                  key={source}
                  className="flex items-center mb-3 px-2 py-1.5 hover:bg-[#F5F7FA] rounded-md cursor-pointer"
                >
                  <Checkbox
                    id={source}
                    checked={selectedSources.includes(source)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedSources([...selectedSources, source]);
                      } else {
                        setSelectedSources(selectedSources.filter((c) => c !== source));
                      }
                    }}
                    className={selectedSources.includes(source) ? "data-[state=checked]:bg-[#335CFF] data-[state=checked]:border-[#335CFF]" : ""}
                  />
                  <label htmlFor={source} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2">
                    {source}
                  </label>
                </div>
              ))}
            </div>
           
          </div>
        )}
      </div>

      <div className="flex flex-col border-l border-[#E1E4EA] max-w-[350px]">
        {activeMenu === "countryOrigin" && (
          <>
            <div className="py-4 px-5 flex items-center font-medium">
              <GlobeIcon size={24} className="pr-2 text-[#0E121B]" />
              Country of Origin
            </div>
            <div className="border-b border-[#E1E4EA]" />
            <div className="px-4 py-2 min-w-[350px] overflow-y-auto">
              {countries.map((country: SelectedCountry) => (
                <div
                  key={country.value}
                  className="flex items-center mb-3 px-2 py-1.5 hover:bg-[#F5F7FA] rounded-md cursor-pointer"
                >
                  <Checkbox
                    id={country.value}
                    checked={selectedCountries.includes(country.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCountries([...selectedCountries, country.value]);
                      } else {
                        setSelectedCountries(selectedCountries.filter((c) => c !== country.value));
                      }
                    }}
                    className={selectedCountries.includes(country.value) ? "data-[state=checked]:bg-[#335CFF] data-[state=checked]:border-[#335CFF]" : ""}
                  />
                  <label htmlFor={country.value} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2">
                    {country.label}
                  </label>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col border-l border-[#E1E4EA] max-w-[350px]">
        {activeMenu === "Status" && (
          <>
            <div className="py-4 px-5 flex items-center font-medium">
              <CodeIcon size={24} className="pr-2 text-[#0E121B]" />
              Status
            </div>
            <div className="border-b border-[#E1E4EA]" />
            <div className="px-4 py-2 min-w-[350px] overflow-y-auto">
              {priorityStatus.map((item) => (
                <div
                  key={item}
                  className="flex items-center mb-3 px-2 py-1.5 hover:bg-[#F5F7FA] rounded-md cursor-pointer"
                >
                  <Checkbox
                    id={item}
                    checked={selectedStatuses.includes(item)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedStatuses([...selectedStatuses, item]);
                      } else {
                        setSelectedStatuses(selectedStatuses.filter((c) => c !== item));
                      }
                    }}
                    className={selectedStatuses.includes(item) ? "data-[state=checked]:bg-[#335CFF] data-[state=checked]:border-[#335CFF]" : ""}
                  />
                  <label htmlFor={item} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2">
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
