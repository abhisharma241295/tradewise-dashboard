"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function Calendar({ selected, onSelect, numberOfMonths=1 }: { selected: Date | undefined; onSelect: (date: Date) => void; numberOfMonths:number; pagedNavigation :any }) {
  return <DayPicker mode="single" required={false} selected={selected} onSelect={(date)=>onSelect(date)} 
//   numberOfMonths={numberOfMonths} 
//   pagedNavigation 
     classNames={{
        nav_button_previous: "absolute left-1",
		nav_button_next: "absolute right-1",
     }}
  />;
}

// export {
//     Calendar
// }