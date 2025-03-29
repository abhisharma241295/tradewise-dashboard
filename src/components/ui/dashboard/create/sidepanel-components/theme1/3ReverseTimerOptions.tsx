import { SidebarButton } from "@/components/ui/commons/SidebarButton";
import { Divider } from "primereact/divider";
import SectionEnableToggle from "../SectionEnableToggle";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import ImageUploader from "@/components/ui/commons/ImageUploader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { Section } from "@/components/custom-website-themes/mappings/theme1";
import { updateEnableStatus, updateReverseTimerSection, updateSaveButtonVisibility } from "@/lib/redux/features/slices/custom-wedding-slices/theme1Slice";
import { useAppSelector } from "@/lib/redux/hooks";

interface ReverseTimerOptionsProps {
    onNavigate: (title: string, section: string) => void;
}

export default function ReverseTimerOptions({ onNavigate }: ReverseTimerOptionsProps) {
    const dispatch = useDispatch();
    const slug=useAppSelector((state)=> state.customWebsiteSlug.slug);
    
    const reverseTimerSection = useSelector((state: RootState) => 
        state.theme1.sections.find((section:any) => section.name === Section.ReverseTimer)
    );

    const updateSection = (updates: Partial<typeof reverseTimerSection.children>) => {
        if (!reverseTimerSection) return;
        
        dispatch(updateReverseTimerSection({
            ...reverseTimerSection.children,
            ...updates
        }));
    };

    return (
        <div className="p-2 bg-white overflow-y-auto">
            <SectionEnableToggle checked={reverseTimerSection.enabled} onChange={(checked) => {
                // console.log(checked)
                dispatch(updateEnableStatus({
                    section: Section.ReverseTimer,
                    enable: checked 
                }));
                dispatch(updateSaveButtonVisibility(true));
            }}>
                Enable Reverse Timer
            </SectionEnableToggle>
            <Divider />

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Title</label>
                    <InputText
                        value={reverseTimerSection?.children?.title?.text || ""}
                        onChange={(e) => {
                            updateSection({
                                title: {
                                    ...reverseTimerSection?.children?.title,
                                    text: e.target.value
                                }
                            });
                            dispatch(updateSaveButtonVisibility(true));
                        }}
                        placeholder="Enter title"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium">Target Date & Time</label>
                    <Calendar
                        value={new Date(reverseTimerSection?.children?.targetTime || Date.now())}
                        onChange={(e) => {
                            if (e.value) {
                                updateSection({
                                    targetTime: e.value.getTime()
                                });
                                dispatch(updateSaveButtonVisibility(true));
                            }
                        }}
                        showTime
                        hourFormat="24"
                        placeholder="Select date and time"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium">Background Image</label>
                    <ImageUploader 
                        slug={slug}
                        onUploadSuccess={(imageUrl) => {
                            updateSection({
                                bgImageUrl: imageUrl
                            });
                            dispatch(updateSaveButtonVisibility(true));
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
