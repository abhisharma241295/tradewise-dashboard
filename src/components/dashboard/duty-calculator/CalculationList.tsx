"use client";

import * as React from "react";
import { useState } from "react";
import { addDays, format } from "date-fns";
import {
	Calendar as CalendarIcon,
	Calculator,
	BellIcon,
	SearchIcon,
	ListFilterIcon,
	GlobeIcon,
	ChevronRightIcon,
	CodeIcon,
	GitPullRequestDraftIcon,
	BookOpenIcon,
	DotIcon,
	ExternalLinkIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {Button } from "@/components/ui/button";
import { Input } from "@/components/common/input";
// import { Calendar } from "@/components/common/calendar";
import { Checkbox } from "@/components/common/checkbox";



import MultiSelectDropdown from "@/components/common/MultiSelectDropdown";
import DateRangePicker from "@/components/common/DateRangePicker";
import  DataTable from "@/components/common/Table";
import EmptyListFallbackUI from "@/components/dashboard/duty-calculator/EmptyListFallback";



const hsCodes = [
  "34LA71",
  "4N9368",
  "792JU8",
  "PO1494",
  "23A591",
];


const hsCodeWithCountry = [
  { name: "India", img: "https://picsum.photos/60/40" },
  { name: "UAE", img: "https://picsum.photos/60/40" },
  { name: "UK", img: "https://picsum.photos/60/40" },
  { name: "US", img: "https://picsum.photos/60/40" },
  { name: "USA", img: "https://picsum.photos/60/40" },
  { name: "Uganda", img: "https://picsum.photos/60/40" },
];

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/common/popover";
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
import Buttons from "@/components/common/button";
import MultiSelectDropdownWithImages from "@/components/common/MultiSelectDropdownWithImages";
import { Table } from "@/components/ui/table";


const filter = [
	{ key: "HSCode", label: "HS Code", Icon: CodeIcon },
	{ key: "countryOfOrigin", label: "Country of Origin", Icon: GlobeIcon },
];

const data = [
	{
		country: "Canada",
		date: "Mar 15, 2026",
		tariffInfo: "30% tariff increase on European textiles - July 1",
		tags: ["B2C3D4", "Y8Z9A0"],
	},
	{
		country: "Canada",
		date: "Mar 15, 2026",
		tariffInfo: "30% tariff increase on European textiles - July 1",
		tags: ["B2C3D4", "Y8Z9A0", "N5O6P7"],
	},
	{
		country: "Canada",
		date: "Mar 15, 2026",
		tariffInfo: "30% tariff increase on European textiles - July 1",
		tags: ["B2C3D4", "Y8Z9A0", "N5O6P7", "Q8R9S0", "+3"],
	},
];


export default function CalculationList({setCurrentTab}) {
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: new Date(2025, 0, 20),
		to: addDays(new Date(2025, 0, 20), 20),
	});

    const [selectedHSCodes, setSelectedHSCodes] = useState<string[]>([]);
    const [selectedHSCodesWithCountry, setSelectedHSCodesWithCountry] = useState<{name:string; img:string;}[]>([]);


	const [activeMenu, setActiveMenu] = useState('HSCode');

	return (
		<div className="flex w-full h-full">
			<div className="flex-[4] px-6 py-8 flex flex-col">
				<div className="flex items-start mb-6">
					<div className="flex items-center">
						<div className="rounded-full p-3 border bg-white flex items-center justify-center">
                        <Calculator />
						</div>
						<div className="flex flex-col ml-4">
							<p className="text-lg text-[#0E121B]">Duty Calculator</p>
							<p className="text-sm">Description Pending... 🗓️</p>
						</div>
					</div>

					{/* Notification Icon */}
					<div className="ml-auto flex items-center justify-center">
						<BellIcon className="w-6 h-6 text-[#525866]" />
					</div>
				</div>

				<div className="border-t mb-5" />

				{/* Filters */}
				<div className="flex justify-between m-4.5 items-center ">
					<div className="flex items-center gap-2 ">
                    <DateRangePicker
                    // selected={''} 
                    // onSelect={} 
                    // numberOfMonths={1} 
                    />

					</div>

					<div className="flex  justify-between items-center gap-2">
			
							<Input
								type="text"
								placeholder="Search..."
								startIcon={<SearchIcon className="h-4 w-4 text-[#525866]" />}
								endIcon={<p className="text-xs text-[#99A0AE] border rounded-sm px-1">⌘1</p>}
								name="search"
								className="pl-10 pr-4 h-[38px] mt-2 rounded-md flex min-w-[300px]"
							/>
                            
                       

			
					
						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 border rounded-md">
								<ListFilterIcon className="h-5 w-5 text-[#525866]" />
								<p className="text-sm text-[#525866] ">Filters</p>
							</DropdownMenuTrigger>

							<DropdownMenuContent align="start" side="bottom" className="mt-1 mr-6 flex items-stretch justify-center border  rounded-xl p-0">

									<div className="flex flex-col justify-start space-y-2 border-r p-3">
										{filter.map(({ key, label, Icon }) => (
											<div
												key={key}
												onClick={() => setActiveMenu(key)}
												className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${
													activeMenu === key ? "bg-[#F5F7FA]" : "hover:bg-[#F5F7FA]"
												} transition-all`}
											>
												<div className="flex items-center space-x-2">
													<Icon
														size={20}
														className={`pr-2  ${
															activeMenu === key ? "text-[#335CFF]" : "text-[#99A0AE]"
														}`}
													/>
													<span
														className={`text-sm font-medium ${
															activeMenu === key ? "text-[#0E121B]" : "text-[#525866]"
														}`}
													>
														{label}
													</span>
												</div>
												{activeMenu === key && (
													<ChevronRightIcon
														size={18}
														className="bg-white rounded-full ml-2"
													/>
												)}
											</div>
										))}
									</div>
									<div className="flex flex-col">
                                        <>
										{activeMenu === "HSCode" && (
											<>
												<DropdownMenuLabel className="pt-3 pb-2 px-4 flex justify-start gap-2">
                                                  <CodeIcon/>
                                                    <span>
                                                    HS Code
                                                    </span>
													
												</DropdownMenuLabel>
												<DropdownMenuSeparator />
												<div className="p-5 ">
 
                                 <MultiSelectDropdown
                                 label={"HS Code"}
                                 required={true}
                                 selectPlaceholder={"Choose your HS code..."}
                                 searchPlaceholder={"Search your HS code..."}
                                 items={hsCodes}
                                 selectedItems={selectedHSCodes}
                                 setSelectedItems={setSelectedHSCodes}
                                />

                                </div>
													
												
											</>
										)}

                                        {
                                            activeMenu == "countryOfOrigin" && (
                                                <>
												<DropdownMenuLabel className="pt-3 pb-2 px-4 flex justify-start gap-2">
                                                  <GlobeIcon/>
                                                    <span>
                                                   Country Of Origin
                                                    </span>
													
												</DropdownMenuLabel>
												<DropdownMenuSeparator />
												<div className="p-5 ">
                   <MultiSelectDropdownWithImages
                      label={"Country"}
                      required={true}
                      selectPlaceholder={"Choose your country..."}
                      searchPlaceholder={"Search your country..."}
                      items={hsCodeWithCountry}
                      selectedItems={selectedHSCodesWithCountry}
                      setSelectedItems={setSelectedHSCodesWithCountry}
                   />
                                </div>
			</>
                                            )
                                        }
                                        </>
                                        <div className="flex justify-between gap-2 py-4 px-5 border-t">
                                        <Buttons
                                            buttonText="Clear"
                                            type="button"
                                            className="bg-white text-black border text-[14px] px-2 py-1 rounded-md flex-[0_1_45%]"
                                        />
                                        <Buttons
                                            buttonText="Apply"
                                            type="submit"
                                            className="bg-blue-700 text-white text-[14px] px-2 py-1 rounded-md flex-[0_1_45%]"
                                        />
                                    </div>

                                    
									</div>
							</DropdownMenuContent>
						</DropdownMenu>
					
        
                        <Button 
                          className=' text-white bg-blue-700 hover:bg-blue-700 hover:text-white rounded-md h-[38px]'
                          onClick={()=>setCurrentTab('CALCULATOR')}
                        >
                            <span>
                            Duty Calculator 
                            </span>
                         </Button>
                         </div>
				</div>

				{/* Empty State */}
                <div>
                    {
                    true ?
                    <DataTable/>
                    : <EmptyListFallbackUI/>
                    }
                    

                </div>
		
			</div>
		</div>
	);
}




