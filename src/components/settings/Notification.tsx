/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BoltIcon,
  ChevronRightIcon,
  SlidersHorizontalIcon,
  UserIcon,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
// import Select from "react-select";
import Image from "next/image";
// import Button from "../common/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/select";
import {
  useCreateNotificationPreferencesMutation,
  useGetNotificationPreferencesQuery,
  useUpdateNotificationPreferencesMutation,
} from "@/redux/apis/settingsApi";
import { toast } from "sonner";
// import MultiSelectCountry from "../common/multiSelectCountry";
import { Country, SelectedCountry } from "@/redux/types/addressTypes";
import MultiSelectHSCodeInput from "../common/MultiSelectHsCodeInput";
import MultiSelectInput from "../common/MultiSelectInput";
import { Button } from "../ui/button";
import { CustomSwitch } from "../ui/switch";
import { Switcher } from "../ui/switcher";
// import { useForm, Controller, Resolver } from "react-hook-form";

type NotificationScheduleType = "daily" | "weekly" | "monthly";
const hsCodes = ["34LA71", "4N9368", "792JU8", "P01494", "74NM91", "23A591"];
const notificationSettings = [
  { name: "Preferences", icon: SlidersHorizontalIcon },
  { name: "Advanced", icon: BoltIcon },
];
export default function Notification() {
  const { data, isLoading, isError, error } =
    useGetNotificationPreferencesQuery({});
  const [createNotificationPreferences, { isLoading: isCreating }] =
    useCreateNotificationPreferencesMutation();
  const [updatesNotificationPreferences, { isLoading: isUpdating }] =
    useUpdateNotificationPreferencesMutation();

  const [countries, setCountries] = useState<SelectedCountry[]>([]);
  const [activeMenu, setActiveMenu] = useState<string>("preferences");
  const [notificationSchedule, setNotificationSchedule] =
    useState<NotificationScheduleType>("daily"); // Default value
  const [selectedCountries, setselectedCountries] = useState<string[]>([]);
  const [selectedHSCodes, setselectedHSCodes] = useState<string[]>([]);

  const [notifications, setNotifications] = useState([
    {
      label: "Email Notifications",
      key: "email_notifications",
      desc: "Receive notifications via email",
      enabled: true,
    },
    {
      label: "SMS Notifications",
      key: "sms_notifications",
      desc: "Receive notifications via SMS",
      enabled: false,
    },
  ]);
  const [hasChanges, setHasChanges] = useState(false);

  const toggleNotification = (index: number) => {
    setNotifications((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, enabled: !item.enabled } : item
      )
    );
    setHasChanges(true);
  };

  const handleScheduleChange = (value: NotificationScheduleType) => {
    setNotificationSchedule(value);
    setHasChanges(true);
  };

  const handleHSCodesChange = (values: string[]) => {
    setselectedHSCodes(values);
    setHasChanges(true);
  };

  const handleCountriesChange = (values: string[]) => {
    setselectedCountries(values);
    setHasChanges(true);
  };

  useEffect(() => {
    if (data && data?.preferences) {
      setNotificationSchedule(data?.preferences?.notification_schedule);
      setNotifications((prev) =>
        prev.map((item) => {
          if (item.key === "email_notifications") {
            return {
              ...item,
              enabled: data?.preferences?.email_notifications,
            };
          }
          if (item.key === "sms_notifications") {
            return {
              ...item,
              enabled: data?.preferences?.sms_notification,
            };
          }
          return item;
        })
      );
      setselectedHSCodes(data?.preferences?.hs_codes || []);
      setselectedCountries(data?.preferences?.countries || []);
    }
  }, [data]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const formattedCountries = data.map((country: Country) => ({
          value: country.cca2,
          label: country.name.common,
          flag: country.flags.svg,
        }));
        setCountries(formattedCountries);
      });
  }, []);

  const handlePreferenceSubmit = async () => {
    try {
      let tempData;
      if (activeMenu === "preferences") {
        tempData = {
          notification_schedule: notificationSchedule,
          email_notifications: notifications.find(
            (item) => item.key === "email_notifications"
          )?.enabled,
          sms_notification: notifications.find(
            (item) => item.key === "sms_notifications"
          )?.enabled,
        };
      } else {
        tempData = { hs_codes: selectedHSCodes, countries: selectedCountries };
      }
      const result = data
        ? await updatesNotificationPreferences(tempData)
        : await createNotificationPreferences(tempData);
      if (result.data) {
        toast.success(
          result.data.message ||
            "Notification preferences updated successfully!"
        );
        setHasChanges(false);
      } else {
        //TODO: (result?.error?.message??"")
        toast.error("Something went wrong!");
      }
    } catch (err: Error | unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong!");
    }
  };
  const renderBottomSection = () => {
    return (
      <div>
        <div className="flex items-start space-x-2 text-xs text-[#525866] p-3 bg-[#EBF1FF] rounded-lg mt-4">
          <Image
            src="/icons/information-fill-blue.svg"
            width={16}
            height={16}
            alt="Information Icon"
          />
          <span>
            Maximize your app usage by leaving notification settings active.
          </span>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <Button
            variant="default"
            size="default"
            className="w-full mr-auto max-w-sm my-6"
            disabled={isLoading || !hasChanges}
            onClick={handlePreferenceSubmit}
          >
            {isCreating || isUpdating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Applying Changes
              </>
            ) : (
              "Apply Changes"
            )}
          </Button>
        </div>
      </div>
    );
  };
  //   console.log(data);
  return (
    <div className="relative">
      <div className="container mx-auto max-w-md size-full">
        <div
          className="absolute top-2 left-4 bg-white pt-8 border-1 w-full max-w-xs hidden 2xl:block"
          style={{
            boxShadow: "0px 1px 2px 0px rgba(10, 13, 20, 0.03)",
          }}
        >
          <div className="border border-[#E1E4EA] p-4 shadow-[0px_1px_2px_0px_rgba(10,13,20,0.03)] rounded-xl min-w-[200px]">
            <p className="text-xs font-semibold text-[#99A0AE]">SELECT MENU</p>

            <div
              onClick={() =>
                setActiveMenu(activeMenu === "preferences" ? "" : "preferences")
              }
              className={`flex items-center justify-between p-3 mt-2 rounded-lg cursor-pointer ${
                activeMenu === "preferences"
                  ? "bg-[#F5F7FA]"
                  : "hover:bg-[#F5F7FA]"
              } transition-all`}
            >
              <div className="flex items-center space-x-2">
                <SlidersHorizontalIcon
                  size={18}
                  className={
                    activeMenu === "preferences"
                      ? "text-[#335CFF]"
                      : "text-[#525866]"
                  }
                />
                <span
                  className={`text-sm font-medium ${
                    activeMenu === "preferences"
                      ? "text-[#0E121B]"
                      : "text-[#525866]"
                  }`}
                >
                  Preferences
                </span>
              </div>
              {activeMenu === "preferences" && (
                <ChevronRightIcon
                  size={18}
                  className="bg-white rounded-full text-[#525866]"
                />
              )}
            </div>

            <div
              onClick={() =>
                setActiveMenu(activeMenu === "advanced" ? "" : "advanced")
              }
              className={`flex items-center justify-between p-3 mt-2 rounded-lg cursor-pointer ${
                activeMenu === "advanced"
                  ? "bg-[#F5F7FA]"
                  : "hover:bg-[#F5F7FA]"
              } transition-all`}
            >
              <div className="flex items-center space-x-2">
                <BoltIcon
                  size={18}
                  className={
                    activeMenu === "advanced"
                      ? "text-[#335CFF]"
                      : "text-[#525866]"
                  }
                />
                <span
                  className={`text-sm font-medium ${
                    activeMenu === "advanced"
                      ? "text-[#0E121B]"
                      : "text-[#525866]"
                  }`}
                >
                  Advanced
                </span>
              </div>
              {activeMenu === "advanced" && (
                <ChevronRightIcon
                  size={18}
                  className="bg-white rounded-full text-[#525866]"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full mx-auto mt-10 max-w-2xl">
          {/* Common header section */}
          <p className="text-md font-semibold text-[#0E121B]">
            Notification Preferences
          </p>
          <p className="text-sm text-[#525866] mt-1">
            Choose what notifications you want to receive.
          </p>

          {/* Switcher component for both views */}
          <Switcher
            className="max-w-sm border rounded-lg mt-2 2xl:hidden"
            items={notificationSettings}
            label="Select Menu"
            onItemSelect={(team) => {
              if (team.name === "Preferences") {
                setActiveMenu("preferences");
              } else {
                setActiveMenu("advanced");
              }
            }}
          />

          <div className="border-b border-[#E1E4EA] py-2" />

          {/* Conditional content based on active menu */}
          {activeMenu === "preferences" && (
            <>
              <div className="w-full max-w-sm mt-4">
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Choose Notification Schedule
                </label>
                <Select
                  onValueChange={handleScheduleChange}
                  defaultValue={notificationSchedule}
                  value={notificationSchedule}
                >
                  <SelectTrigger className="w-full border border-[#E1E4EA] py-2 px-3 text-left shadow-sm focus:ring-2 focus:ring-primary rounded-lg">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg py-3 px-1 border border-[#E1E4EA] shadow-[0px_16px_32px_-12px_rgba(14,18,27,0.10)]">
                    <SelectItem
                      value="daily"
                      className="p-2 text-sm text-[#0E121B]"
                    >
                      Daily
                    </SelectItem>
                    <SelectItem
                      value="weekly"
                      className="p-2 text-sm text-[#0E121B]"
                    >
                      Weekly
                    </SelectItem>
                    <SelectItem
                      value="monthly"
                      className="p-2 text-sm text-[#0E121B]"
                    >
                      Monthly
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4 pt-4">
                {notifications.map(({ label, desc, enabled }, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between w-full mt-2 `}
                  >
                    <div className="flex items-center space-x-4">
                      <CustomSwitch
                        checked={enabled}
                        onCheckedChange={() => toggleNotification(index)}
                      />
                      <div>
                        <p className="text-sm font-medium text-[#0E121B]">
                          {label}
                        </p>
                        <p className="text-xs text-[#525866]">{desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeMenu === "advanced" && (
            <>
              <div className="w-full max-w-sm mt-8">
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Select Notifications Based on HS Code
                </label>
                <MultiSelectHSCodeInput
                  options={[
                    ...hsCodes.map((code) => ({
                      value: code,
                      label: code,
                    })),
                  ]}
                  selectedValues={selectedHSCodes}
                  onSelectionChange={handleHSCodesChange}
                />
              </div>
              <div className="w-full max-w-sm mt-8">
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Select the Country
                </label>
                <MultiSelectInput
                  options={countries}
                  selectedValues={selectedCountries}
                  onSelectionChange={handleCountriesChange}
                />
              </div>
            </>
          )}

          {/* Common bottom section */}
          {renderBottomSection()}
        </div>
      </div>
    </div>
  );
}
