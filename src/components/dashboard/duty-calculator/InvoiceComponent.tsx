"use client"
import { useState, useEffect } from "react";
// import dynamic from "next/dynamic";
// import { Document, Page, pdfjs } from 'react-pdf';
// import {  Worker } from "@react-pdf-viewer/core";

// import "react-pdf/dist/esm/Page/TextLayer.css";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// import "@react-pdf-viewer/core/lib/styles/index.css";
 
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import MultiSelectDropdown from "@/components/common/MultiSelectDropdown";
import MultiSelectDropdownWithImages from "@/components/common/MultiSelectDropdownWithImages";

// pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const Viewer = dynamic(() => import("@react-pdf-viewer/core").then((mod) => mod.Viewer), {
//   ssr: false,
// });

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

  const tradeProgram = [
    "Program 1",
    "Program 2",
     "Program 3",
    "Program 4",
    "Program 5",
  ];


const InvoiceComponent = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedHSCodes, setSelectedHSCodes] = useState<string[]>([]);
  const [selectedHSCodesWithCountry, setSelectedHSCodesWithCountry] = useState<{name:string; img:string;}[]>([]);
  const [selectedTradeProgram, setSelectedTradeProgram] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

// function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }

  return (
    <div className="flex gap-8">
      {/* Left Section */}
      <div className="w-1/2 space-y-4 p-6">
        <h2 className="text-lg font-semibold">Enter Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
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
          <div>
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
          <div>
            <label className="text-sm font-medium">
                <span>Amount</span>
                <span className="text-red-400 text-[20px]">*</span>
                </label>
            <div className="border flex justify-between items-center w-full rounded-md px-1">
                <div className="flex items-center  w-[90%]">
              <span className="text-[14px] px-1 text-gray-500">$</span>
              <input className="border-0 !shadow-none outline-none focus:!outline-none focus:border-0 text-left h-[36px]"
               placeholder="0.00"
              />
              </div>
              <div className=" border-l flex justify-between items-center gap-1 w-[65px] pl-1">
              <img src={'https://picsum.photos/60/40'} alt={'flag'} className="h-5 w-5 rounded-full" />
                <span className="text-[14px]">USD</span>
                </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">
                <span>Quantity</span>
               <span className="text-red-400 text-[20px]"> *</span>
            </label>
            <div className="flex items-center gap-2">
                <div className="border flex w-full rounded-md">
                <Button variant="outline" size="icon" className="border-0 !shadow-none"><Minus /></Button>
              <input className="border-0 !shadow-none outline-none focus:!outline-none focus:border-0 w-full text-center" />
              <Button variant="outline" size="icon" className="border-0 !shadow-none"><Plus /></Button>
                </div>
             
            </div>
          </div>
          <div className="col-span-2">
            <MultiSelectDropdown
                label={"Trade Program"}
                required={true}
                selectPlaceholder={"Choose your trade program..."}
                searchPlaceholder={"Search your trade program..."}
                items={tradeProgram}
                selectedItems={selectedTradeProgram}
                setSelectedItems={setSelectedTradeProgram}
            />
          </div>
        </div>
        <Button className="w-full bg-blue-600 text-white">Calculate Duty</Button>
      </div>

      {/* Right Section - PDF Preview */}
      <div className="w-1/2  border-l">
      <div className="border-b p-4">
      <h2 className="text-lg font-semibold">Document Preview</h2>
      <p className="text-sm text-gray-500">Easily preview the document, and download it for reference.</p>
      </div>
      
        <div className="w-full overflow-hidden bg-gray-100 px-8 py-4 flex flex-col justify-center items-center">
        { !isClient ? <p>Loading...</p> :
        <>

          {/* <Document file="/sample.pdf" onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from({ length: numPages }, (_, i) => (
          <Page key={i} pageNumber={i + 1} />
        ))}
          </Document> */}

{/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
<div>
  <Viewer  fileUrl="/sample.pdf" />
</div>
</Worker> */}
         <img src="/images/PDF.png" alt="PDF" className="w-[90%]" />
          <p className="text-center text-sm mt-2">Page {1} of {1}</p>
          </>
     }
        </div>
      </div>
    </div>
  );
};

export default InvoiceComponent;
