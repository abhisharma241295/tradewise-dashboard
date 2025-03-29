import { useState } from "react";
import { useUploadWebsitePdfMutation } from "@/lib/redux/features/apis/websiteCreationApis";

interface PdfUploaderProps {
    slug: string;
    onUploadSuccess?: (pdfUrl: string) => void;
}

export default function PdfUploader({ slug, onUploadSuccess }: PdfUploaderProps) {
    const [pdfFile, setPdfFile] = useState<string>('');
    const [uploadWebsitePdf, { isLoading }] = useUploadWebsitePdfMutation();

    const handleFileUpload = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await uploadWebsitePdf({ formData, slug }).unwrap();
            if (response.data?.pdf_url) {
                setPdfFile(response.data.pdf_url);
                onUploadSuccess?.(response.data.pdf_url);
            }
        } catch (error) {
            console.error('Error uploading PDF:', error);
        }
    };

    return (
        <div
            className={`
                border-2 border-dashed border-gray-300 rounded-lg
                bg-gray-50 transition-all duration-200 hover:border-primary
                relative min-h-[100px] flex flex-col items-center justify-center
                py-8
            `}
        >
            <div className={`
                flex flex-col items-center justify-center w-full h-full
                ${isLoading ? 'opacity-50 pointer-events-none' : ''}
            `}>
                <div className="text-[#94A3B8] mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#B6D3D6" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="12" y1="18" x2="12" y2="12"/>
                        <line x1="9" y1="15" x2="15" y2="15"/>
                    </svg>
                </div>
                <p className="text-center text-gray-300">
                    {isLoading ? 'Uploading...' : 'Drag and drop your PDF here, or'}
                </p>
                <button
                    className="mt-2 px-4 py-2 text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-colors"
                    onClick={() => document.getElementById('pdfInput')?.click()}
                    disabled={isLoading}
                >
                    Browse
                </button>
                <input
                    id="pdfInput"
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            handleFileUpload(file);
                        }
                    }}
                />
                {pdfFile && (
                    <div className="mt-2 text-sm text-gray-600">
                        PDF uploaded successfully
                    </div>
                )}
            </div>
        </div>
    );
}
