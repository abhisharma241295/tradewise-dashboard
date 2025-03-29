import { SidebarButton } from "@/components/ui/commons/SidebarButton";
import { Divider } from "primereact/divider";
import SectionEnableToggle from "../SectionEnableToggle";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import ImageUploader from "@/components/ui/commons/ImageUploader";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateEnableStatus, updateHeroSection, updateSaveButtonVisibility } from "@/lib/redux/features/slices/custom-wedding-slices/theme1Slice";
import { title } from "process";
import { Section } from "@/components/custom-website-themes/mappings/theme1";

interface HeroOptionsProps {
    onNavigate: (title: string, section: string) => void;
}

export default function HeroOptions({ onNavigate }: HeroOptionsProps) {
    const value = useAppSelector((state) => state.theme1.sections[0]);
    const dispatch = useAppDispatch();
    const slug = useAppSelector((state) => state.customWebsiteSlug.slug);
    return (
        <div className="p-2 bg-white overflow-y-auto">
            <SectionEnableToggle checked={value.enabled} onChange={(checked) => {
                // console.log(checked)
                dispatch(updateEnableStatus({
                    section: Section.Hero,
                    enable: checked 
                }));
                dispatch(updateSaveButtonVisibility(true));
            }}>
                Enable Hero
            </SectionEnableToggle>
            <Divider />

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="font-medium">Title</label>
                    <InputText
                        id="title"
                        value={value.children.title.text}
                        onChange={(e) => {
                            dispatch(updateHeroSection({
                                ...value.children,
                                title: {
                                    ...value.children.title,
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
                        value={value.children.description.text}
                        onChange={(e) => {
                            dispatch(updateHeroSection({
                                ...value.children,
                                description: {
                                    ...value.children.description,
                                    text: e.target.value
                                }
                            }));
                            dispatch(updateSaveButtonVisibility(true));
                        }}
                        placeholder="Enter subtitle"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium">Background Image</label>
                    <ImageUploader slug={slug} onUploadSuccess={(imageUrl) => {
                        dispatch(updateHeroSection({
                            ...value.children,
                            bgImageUrl: imageUrl
                        }));
                        dispatch(updateSaveButtonVisibility(true));
                    }} />
                </div>
            </div>
        </div>
    )
}