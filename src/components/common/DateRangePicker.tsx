'use client';

import { useState } from 'react';
import { format, subDays } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ChevronsUpDown, ChevronDown } from 'lucide-react';
import { getDayOfYear } from "date-fns";

const predefinedRanges = [
  {label:'Today', days:1},
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 3 months', days: 90 },
  { label: 'Last 12 months', days: 365 },
  { label: 'Month to date', days: new Date().getDate() - 1 },
  { label: 'Year to date', days: getDayOfYear(new Date()) - 1 },
  { label: 'All time', days: null },
];

const DateRangePicker = ()=> {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(subDays(new Date(), 7));
  const [endDate, setEndDate] = useState(new Date());
  const [currentSelection, setCurrentSelection] = useState('Today')

  const handleRangeSelect = (days, label) => {

    if (days === null) {
      setStartDate(null);
      setEndDate(null);
    } else {
      setStartDate(subDays(new Date(), days));
      setEndDate(new Date());
    }
    setCurrentSelection(label);
    // setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex justify-between !py-0">
          <span className='flex justify-between items-center gap-4 border-r pr-2'>
            {currentSelection}
            <ChevronDown/>
          </span>
        <CalendarIcon className="w-4 h-4" />
          <span>
            {startDate && endDate
              ? `${format(startDate, 'MMM dd, yyyy')} - ${format(endDate, 'MMM dd, yyyy')}`
              : 'Select date range'}
          </span>
          
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px]  p-0 bg-white shadow-lg rounded-lg">
        <div className="flex border-b pb-2 mb-2">
          <div className="w-1/3 border-r p-2">
            {predefinedRanges.map(({ label, days }) => (
              <button
                key={label}
                className={`w-full text-left text-[14px] font-500 py-2 px-3 hover:bg-gray-100  rounded ${currentSelection === label ? `bg-blue-700 text-white hover:bg-blue-700`: ``}`}
                onClick={() => handleRangeSelect(days, label)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="w-2/3 flex flex-col gap-2 p-3 pt-1">
            <Calendar
              mode="range"
              numberOfMonths={2}
              pagedNavigation 
              selected={{ from: startDate, to: endDate }}
              onSelect={(range) => {
                setStartDate(range?.from || startDate);
                setEndDate(range?.to || endDate);
              }}
              className={'flex flex-row'}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 p-4">
          <Button className='text-black bg-white hover:bg-white'  onClick={() => setOpen(false)}>Cancel</Button>
          <Button className='bg-blue-700 text-white hover:bg-blue-700' onClick={() => setOpen(false)}>Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;