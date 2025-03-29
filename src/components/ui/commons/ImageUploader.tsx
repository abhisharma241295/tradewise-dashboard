import { useState } from "react";
import { useUploadWebsiteImageMutation } from "@/lib/redux/features/apis/websiteCreationApis";

interface ImageUploaderProps {
    slug: string;
    onUploadSuccess?: (imageUrl: string) => void;
}

export default function ImageUploader({ slug, onUploadSuccess }: ImageUploaderProps) {
    const [bgImage, setBgImage] = useState<string>('');
    const [uploadWebsiteImage, { isLoading }] = useUploadWebsiteImageMutation();

    const handleFileUpload = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await uploadWebsiteImage({ formData, slug }).unwrap();
            console.log(response)
            if (response.data?.image_url) {

                setBgImage(response.data.image_url);
                console.log(onUploadSuccess)
                onUploadSuccess?.(response.data.image_url);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div
            className={`
                border-2 border-dashed border-gray-300 rounded-lg
                ${bgImage ? 'bg-cover bg-center bg-no-repeat' : 'bg-gray-50'}
                transition-all duration-200 hover:border-primary
                relative min-h-[200px] flex flex-col items-center justify-center
            `}
            style={bgImage ? { backgroundImage: `url(${bgImage})` } : undefined}
        >
            <div className={`
                flex flex-col items-center justify-center w-full h-full
                ${isLoading ? 'opacity-50 pointer-events-none' : ''}
            `}>
                <div className="text-[#94A3B8] mb-2">
                    <svg width="49" height="46" viewBox="0 0 49 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M44.6461 30.6227C44.6549 30.3972 44.6254 30.1719 44.5586 29.9553L40.075 17.2839C39.9263 16.8635 39.6411 16.4978 39.2597 16.2386C38.8783 15.9793 38.42 15.8396 37.9497 15.8393H28.9824V20.0631H36.3334L40.0705 30.6227H8.92698L12.6641 20.0631H20.0151V15.8393H11.0478C10.5774 15.8396 10.1191 15.9793 9.73773 16.2386C9.35632 16.4978 9.07112 16.8635 8.9225 17.2839L4.43884 29.9553C4.37205 30.1719 4.34253 30.3972 4.35141 30.6227C4.32227 30.6227 4.32227 41.1822 4.32227 41.1822C4.32227 41.7423 4.55846 42.2795 4.97888 42.6756C5.39931 43.0716 5.96953 43.2941 6.5641 43.2941H42.4334C43.0279 43.2941 43.5982 43.0716 44.0186 42.6756C44.439 42.2795 44.6752 41.7423 44.6752 41.1822C44.6752 41.1822 44.6752 30.6227 44.6461 30.6227ZM33.4661 13.5247C34.0467 13.5247 34.6273 13.324 35.051 12.927C35.4713 12.5309 35.7074 11.9939 35.7074 11.4339C35.7074 10.8739 35.4713 10.3368 35.051 9.94075L24.4987 0L13.9464 9.94075C13.5262 10.3368 13.2901 10.8739 13.2901 11.4339C13.2901 11.9939 13.5262 12.5309 13.9464 12.927C14.3701 13.3261 14.9508 13.5247 15.5314 13.5247C16.112 13.5247 16.6927 13.3261 17.1164 12.927L22.2569 8.08439V22.175C22.2569 22.7352 22.4931 23.2723 22.9135 23.6684C23.3339 24.0644 23.9042 24.2869 24.4987 24.2869C25.0933 24.2869 25.6635 24.0644 26.0839 23.6684C26.5044 23.2723 26.7406 22.7352 26.7406 22.175V8.08439L31.8811 12.927C32.3051 13.3153 32.8747 13.5302 33.4661 13.5247Z" fill="#B6D3D6" />
                    </svg>
                </div>
                <p className="text-center text-gray-300">
                    {isLoading ? 'Uploading...' : 'Drag and drop your image here, or'}
                </p>
                <button
                    className="mt-2 px-4 py-2 text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-colors"
                    onClick={() => document.getElementById('bgImageInput')?.click()}
                    disabled={isLoading}
                >
                    Browse
                </button>
                <input
                    id="bgImageInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            handleFileUpload(file);
                            // Show preview immediately
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                setBgImage(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                        }
                    }}
                />
            </div>
        </div>
    );
}