import { SidebarButton } from "@/components/ui/commons/SidebarButton";
import { Divider } from "primereact/divider";
import SectionEnableToggle from "../SectionEnableToggle";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import ImageUploader from "@/components/ui/commons/ImageUploader";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateEnableStatus, updateOurStorySection, updateSaveButtonVisibility } from "@/lib/redux/features/slices/custom-wedding-slices/theme1Slice";
import { Section } from "@/components/custom-website-themes/mappings/theme1";

interface OurStoryOptionsProps {
    onNavigate: (title: string, section: string) => void;
}

export default function OurStoryOptions({ onNavigate }: OurStoryOptionsProps) {
    const value = useAppSelector((state) => state.theme1.sections.find((section:any) => section.name === Section.OurStory));
    const dispatch = useAppDispatch();
    const slug=useAppSelector((state)=> state.customWebsiteSlug.slug);

    return (
        <div className="p-2 bg-white overflow-y-auto">
            <SectionEnableToggle checked={value.enabled} onChange={(checked) => {
                // console.log(checked)
                dispatch(updateEnableStatus({
                    section: Section.OurStory,
                    enable: checked 
                }));
                dispatch(updateSaveButtonVisibility(true));
            }}>
                Enable Our Story
            </SectionEnableToggle>
            <Divider />

            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="font-medium">Title</label>
                    <InputText
                        id="title"
                        value={value?.children.title.text}
                        onChange={(e) => {
                            dispatch(updateOurStorySection({
                                ...value?.children,
                                title: {
                                    ...value?.children.title,
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
                        value={value?.children.subtitle.text}
                        onChange={(e) => {
                            dispatch(updateOurStorySection({
                                ...value?.children,
                                subtitle: {
                                    ...value?.children.subtitle,
                                    text: e.target.value
                                }
                            }));
                            dispatch(updateSaveButtonVisibility(true));
                        }}
                        placeholder="Enter subtitle"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="circularText" className="font-medium">Circular Text</label>
                    <InputText
                        id="circularText"
                        value={value?.children.circularText}
                        onChange={(e) => {
                            dispatch(updateOurStorySection({
                                ...value?.children,
                                circularText: e.target.value
                            }));
                            dispatch(updateSaveButtonVisibility(true));
                        }}
                        placeholder="Enter circular text"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="font-medium">Description</label>
                    <InputTextarea
                        id="description"
                        value={value?.children.description}
                        onChange={(e) => {
                            dispatch(updateOurStorySection({
                                ...value?.children,
                                description: e.target.value
                            }));
                            dispatch(updateSaveButtonVisibility(true));
                        }}
                        rows={4}
                        placeholder="Enter your story"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium">Story Image</label>
                    <ImageUploader
                        slug={slug}
                        onUploadSuccess={(imageUrl) => {
                            dispatch(updateOurStorySection({
                                ...value?.children,
                                image: {
                                    ...value?.children.image,
                                    src: imageUrl
                                }
                            }));
                            dispatch(updateSaveButtonVisibility(true));
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
