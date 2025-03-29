import { SidebarButton } from "@/components/ui/commons/SidebarButton";
import { Divider } from "primereact/divider";
import SectionEnableToggle from "../SectionEnableToggle";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import ImageUploader from "@/components/ui/commons/ImageUploader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { Section } from "@/components/custom-website-themes/mappings/theme1";
import { updateWeddingDateSection, updateSaveButtonVisibility, updateEnableStatus } from "@/lib/redux/features/slices/custom-wedding-slices/theme1Slice";
import { useAppSelector } from "@/lib/redux/hooks";

interface WeddingDateOptionsProps {
    onNavigate: (title: string, section: string) => void;
}

export default function WeddingDateOptions({ onNavigate }: WeddingDateOptionsProps) {
    const dispatch = useDispatch();
    const weddingDateSection = useSelector((state: RootState) => 
        state.theme1.sections.find((section:any) => section.name === Section.WeddingDate)
    );
    const slug=useAppSelector((state)=> state.customWebsiteSlug.slug);

    const updateSection = (updates: Partial<typeof weddingDateSection.children>) => {
        if (!weddingDateSection) return;
        
        dispatch(updateWeddingDateSection({
            ...weddingDateSection.children,
            ...updates
        }));
    };

    const defaultDate = {
        text: "December 15, 2023",
        className: "flex justify-center space-x-8 text-5xl font-bold font-nunito text-white"
    };

    const defaultTitle = {
        text: "Looking forward to see you!",
        className: "text-5xl font-alex-brush italic text-white"
    };

    return (
        <div className="p-2 bg-white overflow-y-auto">
            <SectionEnableToggle checked={weddingDateSection.enabled} onChange={(checked) => {
                // console.log(checked)
                dispatch(updateEnableStatus({
                    section: Section.WeddingDate,
                    enable: checked 
                }));
                dispatch(updateSaveButtonVisibility(true));
            }}>
                Enable Wedding Date Section
            </SectionEnableToggle>
            <Divider />

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Title</label>
                    <InputText
                        value={weddingDateSection?.children?.title?.text || defaultTitle.text}
                        onChange={(e) => {
                            updateSection({
                                title: {
                                    ...defaultTitle,
                                    text: e.target.value
                                }
                            });
                            dispatch(updateSaveButtonVisibility(true));
                        }}
                        placeholder="Enter title"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium">Wedding Date</label>
                    <Calendar
                        value={new Date(weddingDateSection?.children?.date?.text || defaultDate.text)}
                        onChange={(e) => {
                            if (e.value) {
                                updateSection({
                                    date: {
                                        ...defaultDate,
                                        text: e.value.toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })
                                    }
                                });
                                dispatch(updateSaveButtonVisibility(true));
                            }
                        }}
                        placeholder="Select wedding date"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium">Background Image</label>
                    <ImageUploader 
                        slug={slug}
                        onUploadSuccess={(imageUrl) => {
                            updateSection({
                                bgImage: imageUrl
                            });
                            dispatch(updateSaveButtonVisibility(true));
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
