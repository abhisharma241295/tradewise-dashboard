import { SidebarButton } from "@/components/ui/commons/SidebarButton";
import { Divider } from "primereact/divider";
import SectionEnableToggle from "../SectionEnableToggle";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import ImageUploader from "@/components/ui/commons/ImageUploader";
import PdfUploader from "@/components/ui/commons/PdfUploader";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateEnableStatus, updateFoodMenuSection, updateSaveButtonVisibility } from "@/lib/redux/features/slices/custom-wedding-slices/theme1Slice";
import { Section } from "@/components/custom-website-themes/mappings/theme1";

interface FoodMenuOptionsProps {
    onNavigate: (title: string, section: string) => void;
}

export default function FoodMenuOptions({ onNavigate }: FoodMenuOptionsProps) {
    const value = useAppSelector((state) => state.theme1.sections[8]); // Food menu is the 9th section (index 8)
    const dispatch = useAppDispatch();
    const slug = useAppSelector((state) => state.customWebsiteSlug.slug);

    const updateSection = (newChildren: any) => {
        dispatch(updateFoodMenuSection(newChildren));
        dispatch(updateSaveButtonVisibility(true));
    };

    return (
        <div className="p-2 bg-white overflow-y-auto">
            <SectionEnableToggle checked={value?.enabled} onChange={(checked) => {
                // console.log(checked)
                dispatch(updateEnableStatus({
                    section: Section.FoodMenu,
                    enable: checked 
                }));
                dispatch(updateSaveButtonVisibility(true));
            }}>
                Enable Food Menu
            </SectionEnableToggle>
            <Divider />

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Section Title</label>
                    <InputText
                        value={value.children.title.text}
                        onChange={(e) => updateSection({
                            ...value.children,
                            title: {
                                ...value.children.title,
                                text: e.target.value
                            }
                        })}
                        placeholder="Enter section title"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Section Subtitle</label>
                    <InputText
                        value={value.children.subtitle.text}
                        onChange={(e) => updateSection({
                            ...value.children,
                            subtitle: {
                                ...value.children.subtitle,
                                text: e.target.value
                            }
                        })}
                        placeholder="Enter section subtitle"
                    />
                </div>
                <Divider />
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Download Text</label>
                    <InputText
                        value={value.children.downloadText}
                        onChange={(e) => updateSection({
                            ...value.children,
                            downloadText: e.target.value
                        })}
                        placeholder="Enter download text"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Background Image</label>
                    <ImageUploader
                        slug={slug}
                        onUploadSuccess={(url) => updateSection({
                            ...value.children,
                            menuImage: {
                                ...value.children.menuImage,
                                src: url
                            }
                        })}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium">Upload Menu in PDF</label>
                    <PdfUploader
                        slug={slug}
                        onUploadSuccess={(url) => updateSection({
                            ...value.children,
                            menuPdf: {
                                ...value.children.menuPdf,
                                src: url
                            }
                        })}
                    />
                </div>
            </div>
        </div>
    );
}
