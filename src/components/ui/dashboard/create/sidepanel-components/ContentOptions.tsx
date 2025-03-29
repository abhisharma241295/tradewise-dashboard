import { SidebarButton } from "@/components/ui/commons/SidebarButton";
import { Divider } from "primereact/divider";

interface ContentOptionsProps {
    onNavigate: (title: string, section: string) => void;
}

export default function ContentOptions({ onNavigate }: ContentOptionsProps) {
    const contentSections = [
        { title: "Hero", section: "theme1_hero" },
        { title: "Couple Information", section: "theme1_couple_info" },
        { title: "Reverse Timer", section: "theme1_reverse_timer" },
        { title: "Our Story", section: "theme1_our_story" },
        { title: "Wedding Date", section: "theme1_wedding_date" },
        { title: "Wedding Timeline", section: "theme1_wedding_timeline" },
        { title: "Gallery", section: "theme1_gallery" },
        { title: "Q&A", section: "theme1_q_and_a" },
        { title: "Food Menu", section: "theme1_food_menu" },
        { title: "Rsvp Form", section: "theme1_rsvp_form" },
        { title: "Marquee Demo", section: "theme1_marquee_demo" },
        { title: "Footer", section: "theme1_footer" }
    ];

    return(
        <div className="p-2 bg-white overflow-y-auto">
            <h1 className="font-semibold text-gray-700 mb-2">Content Options</h1>
            
            <div className="overflow-x-auto">
                <div className="flex space-x-6 pb-0">
                    <div className="border w-full overflow-hidden rounded-md">
                        {contentSections.map((section, index) => (
                            <div key={section.section}>
                                <SidebarButton onClick={() => onNavigate(section.title, section.section)}>
                                    {section.title}
                                </SidebarButton>
                                {index < contentSections.length - 1 && (
                                    <Divider className="p-0 m-0" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}