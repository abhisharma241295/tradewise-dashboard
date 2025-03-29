import { SidebarButton } from "@/components/ui/commons/SidebarButton";
import { Divider } from "primereact/divider";
import SectionEnableToggle from "../SectionEnableToggle";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import ImageUploader from "@/components/ui/commons/ImageUploader";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { Section } from "@/components/custom-website-themes/mappings/theme1";
import { updateWeddingTimelineSection, updateSaveButtonVisibility, updateEnableStatus } from "@/lib/redux/features/slices/custom-wedding-slices/theme1Slice";

interface WeddingTimelineOptionsProps {
    onNavigate: (title: string, section: string) => void;
}

export default function WeddingTimelineOptions({ onNavigate }: WeddingTimelineOptionsProps) {
    const dispatch = useDispatch();
    const timelineSection = useSelector((state: RootState) => 
        state.theme1.sections.find((section:any) => section.name === Section.WeddingTimeline)
    );

    const updateSection = (updates: Partial<typeof timelineSection.children>) => {
        if (!timelineSection) return;
        
        dispatch(updateWeddingTimelineSection({
            ...timelineSection.children,
            ...updates
        }));
    };

    const defaultTitle = {
        text: "Wedding",
        className:
            "block font-alex-brush font-dancing-script text-4xl mb-2",
    };

    const defaultSubtitle = {
        text: "ORGANIZATION",
        className: "block text-3xl tracking-wider",
    };

    const defaultEvents = [
        {
            number: "01",
            title: "CEREMONY",
            description: "Exchange of vows and rings in the presence of loved ones"
        },
        {
            number: "02",
            title: "COCKTAIL HOUR",
            description: "Enjoy drinks and appetizers while we take photos"
        },
        {
            number: "03",
            title: "RECEPTION",
            description: "Dinner, toasts, and celebration with family and friends"
        },
        {
            number: "04",
            title: "DANCE PARTY",
            description: "Dance the night away with great music and company"
        }
    ];

    return (
        <div className="p-2 bg-white overflow-y-auto">
            <SectionEnableToggle checked={timelineSection?.enabled} onChange={(checked) => {
                // console.log(checked)
                dispatch(updateEnableStatus({
                    section: Section.WeddingTimeline,
                    enable: checked 
                }));
                dispatch(updateSaveButtonVisibility(true));
            }}>

                Enable Wedding Timeline
            </SectionEnableToggle>
            <Divider />

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Title</label>
                    <InputText
                        value={timelineSection?.children?.title?.text || defaultTitle.text}
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
                    <label className="font-medium">Subtitle</label>
                    <InputText
                        value={timelineSection?.children?.subtitle?.text || defaultSubtitle.text}
                        onChange={(e) => {
                            updateSection({
                                subtitle: {
                                    ...defaultSubtitle,
                                    text: e.target.value
                                }
                            });
                            dispatch(updateSaveButtonVisibility(true));
                        }}
                        placeholder="Enter subtitle"
                    />
                </div>

                <Divider className="mb-0" />
                
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Timeline Events</h3>
                    </div>

                    <div className="">
                        {(timelineSection?.children?.events || defaultEvents).map((event: any, index: number) => (
                            <div key={index} className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <label className="font-medium">Event Number</label>
                                    <InputText
                                        value={event.number}
                                        onChange={(e) => {
                                            const newEvents = [...(timelineSection?.children?.events || defaultEvents)];
                                            newEvents[index] = { ...newEvents[index], number: e.target.value };
                                            updateSection({ events: newEvents });
                                            dispatch(updateSaveButtonVisibility(true));
                                        }}
                                        placeholder="e.g., 01"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-medium">Event Title</label>
                                    <InputText
                                        value={event.title}
                                        onChange={(e) => {
                                            const newEvents = [...(timelineSection?.children?.events || defaultEvents)];
                                            newEvents[index] = { ...newEvents[index], title: e.target.value };
                                            updateSection({ events: newEvents });
                                            dispatch(updateSaveButtonVisibility(true));
                                        }}
                                        placeholder="e.g., CEREMONY"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-medium">Event Description</label>
                                    <InputTextarea
                                        value={event.description}
                                        onChange={(e) => {
                                            const newEvents = [...(timelineSection?.children?.events || defaultEvents)];
                                            newEvents[index] = { ...newEvents[index], description: e.target.value };
                                            updateSection({ events: newEvents });
                                            dispatch(updateSaveButtonVisibility(true));
                                        }}
                                        rows={3}
                                        placeholder="Enter event description"
                                    />
                                </div>
                                {index < 3 && <Divider />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
