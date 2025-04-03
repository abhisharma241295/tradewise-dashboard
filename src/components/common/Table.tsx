import { useState, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {  Trash2, MoreVertical, Download,  ChevronLeft , ChevronsLeft, ChevronRight , ChevronsRight } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

const data = [
  { code: "J0K1L2", country: "India", value: "$100,000.00", quantity: 2000, trade: "Most Favored Name", document: "orange-sky.pdf", size: "2.2 MB" },
  { code: "S9T0U1", country: "South Africa", value: "$65,000.00", quantity: 34, trade: "Most Favored Name", document: "orange-sky.pdf", size: "2.2 MB" },
  { code: "M3N4O5", country: "Brazil", value: "$10,000,000.00", quantity: 45000, trade: "Most Favored Name", document: "orange-sky.pdf", size: "2.2 MB" },
  { code: "D4E5F6", country: "Canada", value: "$150,000.00", quantity: 100, trade: "Most Favored Name", document: "green-mountain.pdf", size: "2.0 MB" },
  { code: "G7H8I9", country: "Germany", value: "$250,000.00", quantity: 200, trade: "Most Favored Name", document: "red-forest.pdf", size: "2.8 MB" },
  { code: "J1K2L3", country: "Japan", value: "$400,000.00", quantity: 300, trade: "Most Favored Name", document: "yellow-sun.pdf", size: "3.0 MB" },
  { code: "J0K1L2", country: "India", value: "$100,000.00", quantity: 2000, trade: "Most Favored Name", document: "orange-sky.pdf", size: "2.2 MB" },
  { code: "S9T0U1", country: "South Africa", value: "$65,000.00", quantity: 34, trade: "Most Favored Name", document: "orange-sky.pdf", size: "2.2 MB" },
  { code: "M3N4O5", country: "Brazil", value: "$10,000,000.00", quantity: 45000, trade: "Most Favored Name", document: "orange-sky.pdf", size: "2.2 MB" },
  { code: "D4E5F6", country: "Canada", value: "$150,000.00", quantity: 100, trade: "Most Favored Name", document: "green-mountain.pdf", size: "2.0 MB" },
  { code: "G7H8I9", country: "Germany", value: "$250,000.00", quantity: 200, trade: "Most Favored Name", document: "red-forest.pdf", size: "2.8 MB" },
  { code: "J1K2L3", country: "Japan", value: "$400,000.00", quantity: 300, trade: "Most Favored Name", document: "yellow-sun.pdf", size: "3.0 MB" },
  { code: "G7H8I9", country: "Germany", value: "$250,000.00", quantity: 200, trade: "Most Favored Name", document: "red-forest.pdf", size: "2.8 MB" },
  { code: "J1K2L3", country: "Japan", value: "$400,000.00", quantity: 300, trade: "Most Favored Name", document: "yellow-sun.pdf", size: "3.0 MB" },
  { code: "J0K1L2", country: "India", value: "$100,000.00", quantity: 2000, trade: "Most Favored Name", document: "orange-sky.pdf", size: "2.2 MB" },
  { code: "S9T0U1", country: "South Africa", value: "$65,000.00", quantity: 34, trade: "Most Favored Name", document: "orange-sky.pdf", size: "2.2 MB" },
  { code: "M3N4O5", country: "Brazil", value: "$10,000,000.00", quantity: 45000, trade: "Most Favored Name", document: "orange-sky.pdf", size: "2.2 MB" },
  { code: "D4E5F6", country: "Canada", value: "$150,000.00", quantity: 100, trade: "Most Favored Name", document: "green-mountain.pdf", size: "2.0 MB" },
  { code: "G7H8I9", country: "Germany", value: "$250,000.00", quantity: 200, trade: "Most Favored Name", document: "red-forest.pdf", size: "2.8 MB" },
  { code: "J1K2L3", country: "Japan", value: "$400,000.00", quantity: 300, trade: "Most Favored Name", document: "yellow-sun.pdf", size: "3.0 MB" },
];

const itemsPerPageOptions = [7, 15, 30];

const columns = [
  { accessorKey: "code", 
    header: "HS Code",
    cell: ({row})=> (
        <span className="text-[14px] font-medium text-[#0E121B]">
            {row.original.code}
        </span>
    )
  },
  { accessorKey: "country", 
    header: "Country of Origin",
    cell: ({row})=> (
        <span className="text-[14px] font-normal text-[#0E121B]">
            {row.original.country}
        </span>
    )    
},
  { accessorKey: "value", 
    header: "Unit Value (USD)",
    cell: ({row})=> (
        <span className="text-[14px] font-normal text-[#0E121B]">
            {row.original.value}
        </span>
    )   
},
  { accessorKey: "quantity", 
    header: "Quantity",
    cell: ({row})=> (
        <span className="text-[14px] font-normal text-[#0E121B]">
            {row.original.quantity}
        </span>
    )
   },
  { accessorKey: "trade", 
    header: "Trade Program",
    cell: ({row})=> (
        <span className="text-[14px] font-normal text-[#0E121B]">
            {row.original.trade}
        </span>
    )      
  },
  {
    accessorKey: "document",
    header: "Required Documents",
    cell: ({ row }) => (
      <div className="flex justify-between items-center gap-2">
        <div className="flex gap-2 items-center justify-center">
        <img src="/icons/PDF.svg" alt="PDF" className="w-8 h-8" />
        <p className="flex flex-col">
        <span className="text-[14px] font-normal text-[#0E121B]">{row.original.document}</span>
        <span className="text-[12px] font-normal text-[#525866]">{row.original.size}</span>
        </p>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5 text-[#525866]" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-26 p-2 shadow-md border bg-white mr-6">
            <Button variant="ghost" className=" flex justify-between gap-2 text-left">
              <Trash2 className="w-4 h-4 text-[#525866]"  /> 
              <span className="text-[#525866] text-[14px] font-medium">Delete</span>
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    ),
  },
];

const DataTable = ()=> {
  const [itemsPerPage , setItemsPerPage] = useState(7);
  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
  });

  useEffect(() => {
    table.setPageSize(itemsPerPage);
  }, [itemsPerPage, table]);

  return (
    <div>
      <Table>
        <TableHeader >
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
            key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  className="bg-[#F5F7FA] text-[#525866]  mb-4"
                key={header.id}>
                  <Button
                    variant="ghost"
                    onClick={() => header.column.toggleSorting()}
                    className="flex px-0"
                  >
                    <span className="text-[#525866] text-[14px] font-normal">
                     {header.column.columnDef.header}
                    </span>
                     <img src="/icons/UpDownArrow.svg" alt="Sort Options"  className="w-[8.5px] h-[12.5px] ml-2"/>
                  </Button>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
             className="border-b"
             key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell className="py-4" key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

         <div className="flex justify-between items-center mt-4 border-t py-4 mb-4">
        <span className="text-[#525866] text-[14px] font-normal">Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</span>
        <div className="flex gap-2">
          <Button  variant="ghost" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
            <ChevronsLeft/>
          </Button>
          <Button  variant="ghost" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <ChevronLeft/>
          </Button>
          {[...Array(table.getPageCount()).keys()].slice(0, 5).map((page) => (
            <Button
              className={`hover:bg-[#F5F7FA] border px-3 rounded-lg shadow-none text-black ${table.getState().pagination.pageIndex === page ? "bg-[#F5F7FA]" : "bg-white"}`}
              key={page}
              onClick={() => table.setPageIndex(page)}
            >
              {page + 1}
            </Button>
          ))}
          <Button  variant="ghost" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <ChevronRight/>
          </Button>
          <Button  variant="ghost" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
        <ChevronsRight/>
          </Button>
        </div>
        <select
            className="border py-[6px] px-[6px] rounded-lg text-[14px] text-[#525866] font-normal"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}

          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>{option} / page</option>
            ))}
          </select>
      </div>
    </div>
  );
}


export default  DataTable;