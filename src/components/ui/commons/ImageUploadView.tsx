import React, { useRef } from 'react'
import { Avatar } from 'primereact/avatar'
import { useUploadImageMutation } from '@/lib/redux/features/apis/uploadImageApi'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface ImageUploadViewProps {
    url: string
    onChangeUrl: (url: string) => void
    onError: (error: any) => void
    isEditMode?: boolean
    placeholder?: React.ReactNode
}

export const ImageUploadView: React.FC<ImageUploadViewProps> = ({
    url,
    onChangeUrl,
    onError,
    isEditMode = true,
    placeholder,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [uploadImage, { isLoading: isPending }] = useUploadImageMutation()

    const handleClick = () => {
        if (isEditMode && fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0]
        if (!file) return

        try {
            const formData = new FormData()
            formData.append('file', file)

            const response = await uploadImage(formData).unwrap()
            if (response) {
                onChangeUrl(response)
                toast.success('Image uploaded successfully')
            }
        } catch (error) {
            console.error('Error uploading image:', JSON.stringify(error))
            onError(error)
            toast.error('Failed to upload image. Please try again.')
        }
    }

    const EditIcon = () => (
        <div className="absolute bottom-1 right-1">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12.5" cy="12.5" r="12" fill="#F2F2F2" stroke="#118FA8" />
                <path d="M7 18H19M13.1479 7.88562L15.0335 6L18.3333 9.29983L16.4477 11.1854M13.1479 7.88562L9.41015 11.6234C9.28513 11.7484 9.21489 11.9179 9.21489 12.0948L9.21489 15.1184L12.2386 15.1184C12.4154 15.1184 12.585 15.0482 12.71 14.9232L16.4477 11.1854M13.1479 7.88562L16.4477 11.1854" stroke="#118FA8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )

    return (
        <div className="mx-auto relative inline-block">
            {url ? (
                <div className="relative">
                    <Avatar
                        image={url}
                        shape="circle"
                        className={`size-24 cursor-${isEditMode ? 'pointer' : 'default'}`}
                        onClick={handleClick}
                    />
                    {isPending && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                            <Loader2 className="w-8 h-8 text-gray-300 animate-spin" />
                        </div>
                    )}
                    {isEditMode && <EditIcon />}
                </div>
            ) : (
                <div onClick={handleClick} className="relative">
                    {placeholder || (
                        <div
                            className={`relative size-24 bg-gray-200 rounded-full flex items-center justify-center cursor-${
                                isEditMode ? 'pointer' : 'default'
                            }`}
                        >
                            {isPending ? (
                                <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                            ) : (
                                <span className="text-gray-500">No Image</span>
                            )}
                        </div>
                    )}
                    {isEditMode && <EditIcon />}
                </div>
            )}
            {isEditMode && (
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />
            )}
        </div>
    )
}

export default ImageUploadView
