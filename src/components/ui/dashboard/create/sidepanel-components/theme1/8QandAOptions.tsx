import { SidebarButton } from "@/components/ui/commons/SidebarButton";
import { Divider } from "primereact/divider";
import SectionEnableToggle from "../SectionEnableToggle";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { Section } from "@/components/custom-website-themes/mappings/theme1";
import { updateEnableStatus, updateQandASection, updateSaveButtonVisibility } from "@/lib/redux/features/slices/custom-wedding-slices/theme1Slice";
import ImageUploader from "@/components/ui/commons/ImageUploader";
import InputBoxWithEmoji from "@/components/ui/commons/InputBoxWithEmoji";

interface QandAOptionsProps {
    onNavigate: (title: string, section: string) => void;
}

export default function QandAOptions({ onNavigate }: QandAOptionsProps) {
    const value = useAppSelector((state) =>
        state.theme1.sections.find((section: any) => section.name === Section.QandA)
    );
    const dispatch = useAppDispatch();
    const slug = useAppSelector((state) => state.customWebsiteSlug.slug);

    return (
        <div className="p-2 bg-white overflow-y-auto">
          <SectionEnableToggle checked={value?.enabled} onChange={(checked) => {
                // console.log(checked)
                dispatch(updateEnableStatus({
                    section: Section.QandA,
                    enable: checked 
                }));
                dispatch(updateSaveButtonVisibility(true));
            }}>
                Enable Q&A Section
            </SectionEnableToggle>
            <Divider />

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Section Title</label>
                    <InputText
                        placeholder="Enter section title"
                        value={value?.children.title?.text || ""}
                        onChange={(e) => {
                            if (value) {
                                dispatch(updateQandASection({
                                    ...value.children,
                                    title: {
                                        ...value.children.title,
                                        text: e.target.value
                                    }
                                }));
                            }
                        }}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Section Subtitle</label>
                    <InputText
                        placeholder="Enter section subtitle"
                        value={value?.children.subtitle?.text || ""}
                        onChange={(e) => {
                            if (value) {
                                dispatch(updateQandASection({
                                    ...value.children,
                                    subtitle: {
                                        ...value.children.subtitle,
                                        text: e.target.value
                                    }
                                }));
                            }
                        }}
                    />
                </div>

                <Divider />

                <div className="flex flex-col gap-2">
                    {value?.children.content.map((item: any, index: number) => (
                        <div key={index} className="flex flex-col gap-4 mb-4">
                            <div className="flex flex-col gap-2">
                                <label className="font-medium">Title</label>
                                <InputText
                                    placeholder="Enter title"
                                    value={item.title || ""}
                                    onChange={(e) => {
                                        if (value) {
                                            const newContent = [...value.children.content];
                                            newContent[index] = { ...newContent[index], title: e.target.value };
                                            dispatch(updateQandASection({
                                                ...value.children,
                                                content: newContent
                                            }));
                                        }
                                    }}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-medium">Information 1</label>
                                <InputText
                                    placeholder="Enter information 1"
                                    value={item.text1?.text || ""}
                                    onChange={(e) => {
                                        if (value) {
                                            const newContent = [...value.children.content];
                                            newContent[index] = {
                                                ...newContent[index],
                                                text1: { ...newContent[index].text1, text: e.target.value }
                                            };
                                            dispatch(updateQandASection({
                                                ...value.children,
                                                content: newContent
                                            }));
                                        }
                                    }}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-medium">Information 2</label>
                                <InputText
                                    placeholder="Enter information 2"
                                    value={item.text2?.text || ""}
                                    onChange={(e) => {
                                        if (value) {
                                            const newContent = [...value.children.content];
                                            newContent[index] = {
                                                ...newContent[index],
                                                text2: { ...newContent[index].text2, text: e.target.value }
                                            };
                                            dispatch(updateQandASection({
                                                ...value.children,
                                                content: newContent
                                            }));
                                        }
                                    }}
                                />
                            </div>
                            <ImageUploader slug={slug} onUploadSuccess={(imageUrl) => {
                                const newContent = [...value.children.content];
                                newContent[index] = {
                                    ...newContent[index],
                                    image: {
                                        ...newContent[index].image,
                                        src: imageUrl
                                    }
                                };
                                dispatch(updateQandASection({
                                    ...value.children,
                                    content: newContent
                                }));
                                dispatch(updateSaveButtonVisibility(true));
                            }} />
                            <Divider />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
