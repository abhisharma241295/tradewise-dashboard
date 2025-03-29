import { SidebarButton } from "@/components/ui/commons/SidebarButton";
import { Divider } from "primereact/divider";
import SectionEnableToggle from "../SectionEnableToggle";
import { InputText } from "primereact/inputtext";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateEnableStatus, updateFooterSection, updateSaveButtonVisibility } from "@/lib/redux/features/slices/custom-wedding-slices/theme1Slice";
import { Section } from "@/components/custom-website-themes/mappings/theme1";

interface FooterOptionsProps {
    onNavigate: (title: string, section: string) => void;
}

export default function FooterOptions({ onNavigate }: FooterOptionsProps) {
    const value = useAppSelector((state) => 
        state.theme1.sections.find((section: any) => section.name === Section.Footer)
    );
    const dispatch = useAppDispatch();

    return (
        <div className="p-2 bg-white overflow-y-auto">
            <SectionEnableToggle checked={value?.enabled} onChange={(checked) => {
                // console.log(checked)
                dispatch(updateEnableStatus({
                    section: Section.Footer,
                    enable: checked 
                }));
                dispatch(updateSaveButtonVisibility(true));
            }}>
                Enable Footer
            </SectionEnableToggle>
            <Divider />

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="font-medium">Couple Names</label>
                    <InputText
                        value={value?.children.text.text || ""}
                        onChange={(e) => dispatch(updateFooterSection({
                            ...value?.children,
                            text: {
                                ...value?.children.text,
                                text: e.target.value
                            }
                        }))}
                        placeholder="Enter couple names"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium">Wedding Date & Location</label>
                    <InputText
                        value={value?.children.date.text || ""}
                        onChange={(e) => dispatch(updateFooterSection({
                            ...value?.children,
                            date: {
                                ...value?.children.date,
                                text: e.target.value
                            }
                        }))}
                        placeholder="Enter wedding date and location"
                    />
                </div>
            </div>
        </div>
    );
}
