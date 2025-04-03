"use client";
import { useState }  from "react";

import CalculationList from "@/components/dashboard/duty-calculator/CalculationList";
import Calculator from "@/components/dashboard/duty-calculator/Calculator";

export default function DutyCalculator() {
	const [currentTab, setCurrentTab] = useState('CALCULATIONLIST');

	return (
		<div className="w-full h-full">
            {
                currentTab === 'CALCULATIONLIST' && <CalculationList setCurrentTab={setCurrentTab}/>
            }
            {
                currentTab === 'CALCULATOR' && <Calculator setCurrentTab={setCurrentTab}/>
            }
		</div>
	);
}


