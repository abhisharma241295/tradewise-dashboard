import { SidebarButton } from "@/components/ui/commons/SidebarButton";
import { Divider } from "primereact/divider";
import SectionEnableToggle from "../SectionEnableToggle";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import ImageUploader from "@/components/ui/commons/ImageUploader";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { Section } from "@/components/custom-website-themes/mappings/theme1";
import { updateEnableStatus, updateRsvpFormSection, updateSaveButtonVisibility } from "@/lib/redux/features/slices/custom-wedding-slices/theme1Slice";

interface RsvpFormOptionsProps {
    onNavigate: (title: string, section: string) => void;
}

export default function RsvpFormOptions({ onNavigate }: RsvpFormOptionsProps) {
    const dispatch = useAppDispatch();
    const value = useAppSelector((state) => state.theme1.sections.find((section:any) => section.name === Section.RsvpForm));
    const slug = useAppSelector((state) => state.customWebsiteSlug.slug);

    return (
        <div className="p-2 bg-white overflow-y-auto">
            <SectionEnableToggle checked={value?.enabled} onChange={(checked) => {
                // console.log(checked)
                dispatch(updateEnableStatus({
                    section: Section.RsvpForm,
                    enable: checked 
                }));
                dispatch(updateSaveButtonVisibility(true));
            }}>
                Enable RSVP Form
            </SectionEnableToggle>
            <Divider />

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Section Title</label>
                    <InputText
                        value={value?.children?.title?.text}
                        onChange={(e) => {
                            dispatch(updateRsvpFormSection({
                                ...value?.children,
                                title: {
                                    ...value?.children?.title,
                                    text: e.target.value
                                }
                            }));
                            dispatch(updateSaveButtonVisibility(true));
                        }}
                        placeholder="Enter section title"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium">Section Subtitle</label>
                    <InputTextarea
                        rows={3}
                        value={value?.children?.subtitle?.text}
                        onChange={(e) => {
                            dispatch(updateRsvpFormSection({
                                ...value?.children,
                                subtitle: {
                                    ...value?.children?.subtitle,
                                    text: e.target.value
                                }
                            }));
                            dispatch(updateSaveButtonVisibility(true));
                        }}
                        placeholder="Enter section description"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium">Background Image</label>
                    <ImageUploader 
                        slug={slug}
                        onUploadSuccess={(imageUrl) => {
                            dispatch(updateRsvpFormSection({
                                ...value?.children,
                                bgImage: imageUrl
                            }));
                            dispatch(updateSaveButtonVisibility(true));
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
