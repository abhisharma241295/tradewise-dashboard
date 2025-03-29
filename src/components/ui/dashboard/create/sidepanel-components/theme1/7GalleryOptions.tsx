import { SidebarButton } from "@/components/ui/commons/SidebarButton";
import { Divider } from "primereact/divider";
import SectionEnableToggle from "../SectionEnableToggle";
import { InputText } from "primereact/inputtext";
import ImageUploader from "@/components/ui/commons/ImageUploader";
import { Button } from "primereact/button";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { Section } from "@/components/custom-website-themes/mappings/theme1";
import { updateEnableStatus, updateGallerySection, updateSaveButtonVisibility } from "@/lib/redux/features/slices/custom-wedding-slices/theme1Slice";
import { v4 as uuidv4 } from 'uuid';

interface GalleryOptionsProps {
    onNavigate: (title: string, section: string) => void;
}

export default function GalleryOptions({ onNavigate }: GalleryOptionsProps) {
    const slug = useAppSelector((state) => state.customWebsiteSlug.slug);
    const dispatch = useAppDispatch();
    const value = useAppSelector((state) => state.theme1.sections.find((section: any) => section.name === Section.Gallery));
    return (
        <div className="p-2 bg-white overflow-y-auto">
            <SectionEnableToggle checked={value?.enabled} onChange={(checked) => {
                // console.log(checked)
                dispatch(updateEnableStatus({
                    section: Section.Gallery,
                    enable: checked 
                }));
                dispatch(updateSaveButtonVisibility(true));
            }}>
                Enable Gallery
            </SectionEnableToggle>
            <Divider />
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="font-medium">Title</label>
                    <InputText
                        id="title"
                        value={value?.children.title.text}
                        onChange={(e) => {
                            dispatch(updateGallerySection({
                                ...value?.children,
                                title: {
                                    ...value?.children.title,
                                    text: e.target.value
                                }
                            }));
                            dispatch(updateSaveButtonVisibility(true));
                        }}
                        placeholder="Enter title"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="subtitle" className="font-medium">Subtitle</label>
                    <InputText
                        id="subtitle"
                        value={value?.children.subtitle.text}
                        onChange={(e) => {
                            dispatch(updateGallerySection({
                                ...value?.children,
                                subtitle: {
                                    ...value?.children.subtitle,
                                    text: e.target.value
                                }
                            }));
                            dispatch(updateSaveButtonVisibility(true));
                        }}
                        placeholder="Enter subtitle"
                    />
                </div>
                <Divider />
                {
                    value.children.tabs?.map((tag: any, index: number) => {
                        if (index == 0) {
                            return null;
                        }
                        return (

                            <div className="rounded-lg border p-2 space-y-2">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="category" className="font-medium">Category</label>
                                    <InputText
                                        id="category"
                                        value={value?.children.tabs[index].label}
                                        onChange={(e) => {
                                            dispatch(updateGallerySection({
                                                ...value?.children,
                                                tabs: [
                                                    ...value?.children.tabs.slice(0, index),
                                                    {
                                                        ...value?.children.tabs[index],
                                                        label: e.target.value
                                                    },
                                                    ...value?.children.tabs.slice(index + 1)
                                                ]
                                            }));
                                            dispatch(updateSaveButtonVisibility(true));
                                        }}
                                        placeholder="Enter category"
                                    />

                                </div>
                                <ImageUploader slug={slug} onUploadSuccess={(url)=>{
                                    dispatch(updateGallerySection({
                                        ...value?.children,
                                        images: [
                                            ...value?.children.images,
                                            {
                                                src: url,
                                                category: tag.value
                                            }
                                        ]
                                    }));
                                    dispatch(updateSaveButtonVisibility(true));
                                }} />
                                <div className="flex flex-wrap gap-2 mt-4" style={{ width: '100%' }}>
                                    {
                                        (value?.children.images.filter((image: any) => image.category === tag.value) || [])
                                            .map((image: any, index: number) => (
                                                <div key={index} className="size-16 relative overflow-hidden rounded-lg group">
                                                    <img
                                                        src={image.src}
                                                        alt={`Gallery image ${index}`}
                                                        className="object-cover w-full h-full"
                                                    />
                                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="text-white">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                </div>
                            </div>
                        )
                    })
                }
                <Button
                    label="Add Image Category"
                    size="small"
                    onClick={() => { 
                        dispatch(updateGallerySection({
                            ...value?.children,
                            tabs: [...value?.children.tabs, {
                                label: "",
                                value: uuidv4()
                            }]
                        }));
                        dispatch(updateSaveButtonVisibility(true));
                    }}
                />


            </div>
        </div>
    );
}
//  [
//           { value: "all", label: "All" },
//           { value: "ceremony", label: "Ceremony" },
//           { value: "party", label: "Party" },
//         ],