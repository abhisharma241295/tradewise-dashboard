"use client";

import * as React from "react";
import { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/common/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/common/dropdown-menu";
import Button from "@/components/common/button";
import {
  daysFilterMenu,
  filtersOptions,
  regulatorySources,
} from "@/lib/constants";
import { useGetPolicyAndCompliancesQuery } from "@/redux/apis/policyAndComplianceApi";
import { hsCodes, priorityStatus } from "@/lib/constants";
import Image from "next/image";
import { Country, SelectedCountry } from "@/redux/types/addressTypes";
import { PolicyType } from "@/redux/types/policyAndComplainceTypes";
import {
  Command,
  CommandInput,
  CommandShortcut,
} from "@/components/ui/command";
import PolicyCardSkeleton from "@/components/common/PolicyCardSkeleton";
import PolicyFilterPopupContent from "@/components/common/PolicyFilterPopupContent";
import { cn } from "@/lib/utils";
import DashboardAppbar from "@/components/common/DashboardAppbar";
import PolicyMonitoringIcon from "@/components/icons/PolicyMonitoringIcon";

export default function PolicyAndMonitoring() {
  const [period, setPeriod] = useState<"7" | "14" | "30" | "60" | "90">("7");
  const { data, isLoading, isError, error } = useGetPolicyAndCompliancesQuery({
    category: "policy",
    period: period,
  });
  const [activeMenu, setActiveMenu] = useState<string>("countryOrigin");

  const [countries, setCountries] = useState<SelectedCountry[]>([]);
  const [selectedHSCodes, setSelectedHSCodes] = useState<string>("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  const [filteredPoliciesList, setFilteredPoliciesList] = useState(data);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        // console.log("Countries data", data)
        const formattedCountries = data.map((country: Country) => ({
          value: country.name.common,
          label: country.name.common,
          flag: country.flags.svg,
        }));
        setCountries(formattedCountries);
      });
  }, []);

  useEffect(() => {
    handleApplyFilters();
  }, [
    data,
    selectedHSCodes,
    selectedCountries,
    selectedStatuses,
    selectedSources,
  ]);

  const handleApplyFilters = () => {
    // console.log("data", data);
    if (!data) {
      setFilteredPoliciesList([]);
      return;
    }
    let filtered = [...data];
    // Filter by HS Codes
    if (selectedHSCodes && selectedHSCodes.length > 0) {
      filtered = filtered.filter((item: PolicyType) => {
        if (!item.hts_code_linked || item.hts_code_linked.length === 0)
          return false;
        return item.hts_code_linked.some((code: string) => {
          return code.toLowerCase().includes(selectedHSCodes.toLowerCase());
        });
      });
    }
    // Filter by Countries
    if (selectedCountries.length > 0) {
      filtered = filtered.filter(
        (item: PolicyType) =>
          item.country_linked &&
          item.country_linked.some((country: string) =>
            selectedCountries.includes(country)
          )
      );
    }
    // console.log("filtered", filtered);
    // Filter by Status (priority_level)
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter((item: PolicyType) =>
        selectedStatuses.includes(item.priority_level)
      );
    }
    // Filter by Regulatory Sources
    if (selectedSources.length > 0) {
      filtered = filtered.filter((item: PolicyType) =>
        selectedSources
          .map((source) => source.toLowerCase())
          .includes(item.source?.toLowerCase())
      );
    }
    setFilteredPoliciesList(filtered);
  };
  const handleResetFilters = () => {
    setFilteredPoliciesList(data || []);
  };

  const getIcon = (icon: string, key: string) => {
    return icon === "code" ? (
      <CodeIcon
        size={24}
        className={`pr-2  ${
          activeMenu === key ? "text-[#335CFF]" : "text-[#99A0AE]"
        }`}
      />
    ) : icon === "globe" ? (
      <GlobeIcon
        size={24}
        className={`pr-2  ${
          activeMenu === key ? "text-[#335CFF]" : "text-[#99A0AE]"
        }`}
      />
    ) : icon === "gitpull" ? (
      <GitPullRequestDraftIcon
        size={24}
        className={`pr-2  ${
          activeMenu === key ? "text-[#335CFF]" : "text-[#99A0AE]"
        }`}
      />
    ) : (
      <BookOpenIcon
        size={24}
        className={`pr-2  ${
          activeMenu === key ? "text-[#335CFF]" : "text-[#99A0AE]"
        }`}
      />
    );
  };
  return (
    <div className="flex w-full h-full">
      <div className="flex-[4] flex flex-col ">
        <DashboardAppbar
          leading={PolicyMonitoringIcon}
          title={"Policy Monitoring & Alerts"}
          subtitle={"Description Pending... 🗓️"}
        />
        <p className="text-center py-3 mx-4 bg-[#EBF1FF] rounded-lg">
          <span className="text-sm font-normal text-[#0E121B]">
            Manage your alerts effortlessly! Your current schedule
          </span>

          <span className="px-2 text-[#0E121B]">.</span>
          <span className="text-sm font-medium text-[#0E121B]">
            Daily Notifications.
          </span>
          <span className="text-sm px-3 font-md underline text-[#0E121B]">
            Modify Alerts
          </span>
        </p>

        <div className="flex justify-between mt-4 mx-4 items-center ">
          <div className="flex items-center gap-2 ">
            <Select
              onValueChange={(value) => {
                // handleInvalidate(value);
                setPeriod(value as "7" | "14" | "30" | "60");
              }}
            >
              <SelectTrigger className="text-sm text-[#525866] px-6">
                <SelectValue placeholder="Last 7 days" className="" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {daysFilterMenu.map((day) => (
                    <SelectItem
                      value={day.value}
                      key={day.key}
                      className="text-sm font-medium"
                    >
                      {day.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Command className="border rounded-lg">
                <CommandInput
                  value={selectedHSCodes}
                  onValueChange={setSelectedHSCodes}
                  placeholder="Search HS code..."
                  className="h-8"
                />
              </Command>
            </div>
            <div className="relative">
              <DropdownMenu
                open={filterDialogOpen}
                onOpenChange={setFilterDialogOpen}
              >
                <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 border rounded-lg">
                  <ListFilterIcon className="h-5 w-5 text-[#525866]" />
                  <p className="text-sm text-[#525866]">Filters</p>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="start"
                  side="bottom"
                  className={cn(
                    "mt-1 border rounded-2xl w-fit",
                    "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2",
                    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-top-2"
                  )}
                  style={{ height: "500px" }}
                >
                  <PolicyFilterPopupContent
                    filtersOptions={filtersOptions}
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                    regulatorySources={regulatorySources}
                    selectedSources={selectedSources}
                    setSelectedSources={setSelectedSources}
                    countries={countries}
                    selectedCountries={selectedCountries}
                    setSelectedCountries={setSelectedCountries}
                    priorityStatus={priorityStatus}
                    selectedStatuses={selectedStatuses}
                    setSelectedStatuses={setSelectedStatuses}
                    handleResetFilters={handleResetFilters}
                    handleApplyFilters={handleApplyFilters}
                    onClose={() => setFilterDialogOpen(false)}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="px-6 py-8 overflow-y-auto">
          {isLoading ? (
            <div className="spa">
              <PolicyCardSkeleton />
              <PolicyCardSkeleton />
              <PolicyCardSkeleton />
            </div>
          ) : filteredPoliciesList && filteredPoliciesList.length > 0 ? (
            filteredPoliciesList.map((item: any, index: number) => (
              <div
                key={index}
                className={`border-l-4 border rounded-2xl p-4 w-full mb-4 ${
                  item.priority_level === "HIGH"
                    ? "border-l-[#FF8447]"
                    : item.priority_level === "CRITICAL"
                    ? "border-l-[#FB3748]"
                    : item.priority_level === "LOW"
                    ? "border-l-[#335CFF]"
                    : item.priority_level === "MEDIUM"
                    ? "border-l-[#F6B51E]"
                    : "border-l-[#E1E4EA]"
                }`}
              >
                <div className="w-full">
                  {/* First Row: Type + Category */}
                  <div className="flex flex-row items-center">
                    <div className="bg-[#E1E4EA] text-[#0E121B] text-xs font-medium px-1.5 py-2.5 rounded-full">
                      {item.source}
                    </div>
                    <div className="ml-2 w-full">
                      <div className="flex flex-row items-center justify-between flex-wrap gap-2 ">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-medium px-2.5 py-0.5 rounded-full 
														${
                              item.priority_level === "HIGH"
                                ? "bg-[#FFD5C0] text-[#682F12] "
                                : item.priority_level === "CRITICAL"
                                ? "bg-[#FFC0C5] text-[#681219] "
                                : item.priority_level === "LOW"
                                ? "bg-[#C0D5FF] text-[#122368] "
                                : item.priority_level === "MEDIUM"
                                ? "bg-[#FFECC0] text-[#624C18] "
                                : "bg-[#E1E4EA] text-[#0E121B]"
                            }`}
                          >
                            {item.priority_level}
                          </span>

                          <span className="flex items-center text-[#717784] text-xs font-medium pr-2 border rounded-full">
                            <DotIcon className="h-4 w-4" />
                            {item.updates_category}
                          </span>
                        </div>

                        <a
                          href={item.data_source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLinkIcon className="h-5 w-5" />
                        </a>
                      </div>

                      {/* Second Row: Dates */}
                      <div className="flex flex-wrap pt-1 text-xs text-[#525866] gap-2">
                        <p>
                          Effective:{" "}
                          {new Date(item.publication_date).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </p>
                        <p>
                          Posted:{" "}
                          {new Date(item.publication_date).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Separator */}
                  <div className="border-t mt-4" />

                  {/* HS Code & Countries of Origin */}
                  <div className="flex flex-col sm:flex-row w-full gap-4 pt-4">
                    {/* Left Section */}
                    <div className="w-full sm:w-1/2">
                      <p className="text-[#0E121B] text-sm font-medium mb-2">
                        HS Code
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.hts_code_linked &&
                        item.hts_code_linked.length > 0 ? (
                          item.hts_code_linked.map((code: string) => (
                            <p
                              key={code}
                              className="rounded-full text-xs px-2 py-1 bg-[#F2F5F8] text-[#717784]"
                            >
                              {code}
                            </p>
                          ))
                        ) : (
                          <p className="rounded-full text-xs px-2 py-1 bg-[#F2F5F8] text-[#717784]">
                            NO HS Code
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-full sm:w-1/2">
                      <p className="text-[#0E121B] text-sm font-medium mb-2">
                        Country Linked
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.country_linked && item.country_linked.length > 0 ? (
                          item.country_linked.map((country: string) => (
                            <p
                              key={country}
                              className="rounded-full text-xs px-2 py-1 bg-[#F2F5F8] text-[#717784]"
                            >
                              {country}
                            </p>
                          ))
                        ) : (
                          <p className="rounded-full text-xs px-2 py-1 bg-[#F2F5F8] text-[#717784]">
                            No Country Linked
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Third Row: Tariff Information */}
                  <p className="text-sm text-[#0E121B] font-medium pt-4 pb-1">
                    {item.one_liner_updates}
                  </p>
                  <p className="text-xs text-[#525866] pb-4">
                    {item.detailed_summary_updates}
                  </p>

                  {/* Required Actions */}
                  <div className="flex flex-col gap-2 pt-2">
                    <div
                      className={`rounded-lg text-xs p-3 ${
                        item.priority_level === "HIGH"
                          ? "bg-[#FFF1EB] text-[#682F12] "
                          : item.priority_level === "CRITICAL"
                          ? "bg-[#FFEBEC] text-[#681219] "
                          : item.priority_level === "LOW"
                          ? "bg-[#EBF1FF] text-[#122368] "
                          : item.priority_level === "MEDIUM"
                          ? "bg-[#FFFAEB] text-[#624C18] "
                          : "bg-[#E1E4EA] text-[#0E121B]"
                      } `}
                    >
                      <span className="block font-semibold pb-1.5">
                        Required Actions:{" "}
                      </span>
                      <ul className="list-disc pl-5">
                        <li>Check the latest version of the user manual</li>
                        <li>Refresh saved website links</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center pt-8">
              <Image
                src="/icons/HR.svg"
                width={148}
                height={148}
                alt="HR Icon"
                className="rounded-full pb-6"
              />
              <p className="text-lg text-[#0E121B] font-medium text-center">
                Policy Monitoring Updates
                <br />
                <span className="text-lg font-medium text-[#0E121B] pb-1">
                  Unavailable
                </span>
              </p>
              <p className="text-sm text-[#99A0AE] text-center">
                We couldn&apos;t find any policy monitoring <br />
                updates. Stay tuned for future updates.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
