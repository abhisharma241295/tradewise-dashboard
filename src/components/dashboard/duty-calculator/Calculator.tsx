

import { useState } from "react";
import {Button} from "@/components/ui/button";
import {ArrowLeft, ArrowDownToLine, X} from "lucide-react";
import InvoiceComponent from "@/components/dashboard/duty-calculator/InvoiceComponent";

export default function Calculator({setCurrentTab}) {

  return (
    <div className="flex flex-col w-full h-full">

			<div className="flex just px-6 pt-8 flex flex-col">
				<div className="flex items-start mb-6">
					<div className="flex items-center">
						<div className="rounded-xl p-3 border bg-white flex items-center justify-center" 
                         onClick={()=>setCurrentTab('CALCULATIONLIST')}
                        >
                        <ArrowLeft />
						</div>
						<div className="flex flex-col ml-4">
							<p className="text-lg text-[#0E121B]">Duty Calculator</p>
							<p className="text-sm">Description Pending... 🗓️</p>
						</div>
					</div>

					<div className="ml-auto flex items-center justify-center">
                        <Button 
                        className='text-black bg-white shadow-none rounded-md h-[38px] border'
                        variant={'default'}>
                        <ArrowDownToLine/> 
                        <span>
                           Download
                        </span>
                        </Button>
                        <Button 
                        className='text-white bg-blue-700 hover:bg-blue-700 hover:text-white rounded-md h-[38px] mx-2 shadow-none'
                        >
                            <span>Save</span>
                        </Button>
                        <Button 
                            variant={'ghost'}
                            className='rounded-md h-[38px]'
                            >
                            <X/>
                        </Button>
					</div>
				</div>
				<div className="border-t"/>
            </div>

            <div>
                <InvoiceComponent/>
            </div>
                </div>
  )
};
