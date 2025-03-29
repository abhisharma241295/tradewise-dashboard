import { useUploadCsvMutation } from "@/lib/redux/features/apis/guestApi"
import React, { useState, useRef, useEffect, ChangeEvent } from "react"
import CustomButton from "@/components/ui/Button"
import { Upload } from "lucide-react"
import { toast } from "sonner"

interface UploadCsvComponentProps {
  weddingId: string
}

const UploadCsvComponent: React.FC<UploadCsvComponentProps> = ({
  weddingId,
}) => {
  const [uploadCsv, { isLoading }] = useUploadCsvMutation()
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  useEffect(() => {
    if (file) {
      handleUploadCsv()
    }
  }, [file])

  const handleUploadCsv = async () => {
    if (!file) {
      toast.error("Please select a file first!")
      return
    }

    try {
      const formData = new FormData()
      formData.append("file", file, file.name)

      await uploadCsv({ weddingId, formData }).unwrap()

      // Reset the file state and file input value after successful upload
      resetFileInput()

      toast.success("File uploaded successfully!")
    } catch (err) {
      toast.error("Failed to upload data", {
        description: err instanceof Error ? err.message : String(err),
      })
    }
  }

  const resetFileInput = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div>
      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        className="hidden"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      <CustomButton
        onClick={triggerFileInput}
        size="sm"
        variant="ghost"
        className="gap-2 text-primary"
        disabled={isLoading}
      >
        <Upload />
        {isLoading ? "Uploading..." : "Upload Spreadsheet"}
      </CustomButton>
    </div>
  )
}

export default UploadCsvComponent
