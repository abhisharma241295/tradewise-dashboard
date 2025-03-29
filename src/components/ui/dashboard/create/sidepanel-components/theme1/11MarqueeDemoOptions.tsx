import { SidebarButton } from "@/components/ui/commons/SidebarButton";
import { Divider } from "primereact/divider";
import SectionEnableToggle from "../SectionEnableToggle";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateEnableStatus, updateSaveButtonVisibility } from "@/lib/redux/features/slices/custom-wedding-slices/theme1Slice";
import { Section } from "@/components/custom-website-themes/mappings/theme1";

interface MarqueeDemoOptionsProps {
    onNavigate: (title: string, section: string) => void;
}

export default function MarqueeDemoOptions({ onNavigate }: MarqueeDemoOptionsProps) {
    const value = useAppSelector((state) => state.theme1.sections.find((section:any) => section.name === Section.MarqueeDemo));
    const slug = useAppSelector((state) => state.customWebsiteSlug.slug);
    const dispatch = useAppDispatch();

    return (
        <div className="p-2 bg-white overflow-y-auto">
            <SectionEnableToggle checked={value?.enabled} onChange={(checked) => {
                // console.log(checked)
                dispatch(updateEnableStatus({
                    section: Section.MarqueeDemo,
                    enable: checked 
                }));
                dispatch(updateSaveButtonVisibility(true));
            }}>
                Enable Marquee Section
            </SectionEnableToggle>
            <Divider />

        </div>
    );
}
