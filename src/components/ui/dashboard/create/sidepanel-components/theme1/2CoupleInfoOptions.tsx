import { SidebarButton } from "@/components/ui/commons/SidebarButton";
import { Divider } from "primereact/divider";
import SectionEnableToggle from "../SectionEnableToggle";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import ImageUploader from "@/components/ui/commons/ImageUploader";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateCoupleInfoSection, updateEnableStatus, updateSaveButtonVisibility } from "@/lib/redux/features/slices/custom-wedding-slices/theme1Slice";
import { Section } from "@/components/custom-website-themes/mappings/theme1";

interface CoupleInfoOptionsProps {
    onNavigate: (title: string, section: string) => void;
}

export default function CoupleInfoOptions({ onNavigate }: CoupleInfoOptionsProps) {
    const value = useAppSelector((state) => state.theme1.sections[1]);
    const dispatch = useAppDispatch();
    console.log(value)
    const slug=useAppSelector((state)=> state.customWebsiteSlug.slug);
    
    return (
        <div className="p-2 bg-white overflow-y-auto">
             <SectionEnableToggle checked={value.enabled} onChange={(checked) => {
                // console.log(checked)
                dispatch(updateEnableStatus({
                    section: Section.CoupleInfo,
                    enable: checked 
                }));
                dispatch(updateSaveButtonVisibility(true));
            }}>
                Enable Couple Information
            </SectionEnableToggle>
            <Divider />

            {/* Bride Information */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Bride Information</h3>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Name</label>
                        <InputText
                            value={value.children.couple[0].name.text}
                            onChange={(e) => {
                                dispatch(updateCoupleInfoSection({
                                    ...value.children,
                                    couple: [
                                        {
                                            ...value.children.couple[0],
                                            name: {
                                                ...value.children.couple[0].name,
                                                text: e.target.value
                                            }
                                        }, {
                                            ...value.children.couple[1],
                                        }
                                    ]
                                }));
                                dispatch(updateSaveButtonVisibility(true));
                            }}
                            placeholder="Enter bride's name"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Description</label>
                        <InputTextarea
                            rows={4}
                            placeholder="Enter bride's description"
                            value={value.children.couple[0].description.text}
                            onChange={(e) => {
                                dispatch(updateCoupleInfoSection({
                                    ...value.children,
                                    couple: [
                                        {
                                            ...value.children.couple[0],
                                            description: {
                                                ...value.children.couple[0].description,
                                                text: e.target.value
                                            }
                                        }, {
                                            ...value.children.couple[1],
                                        }
                                    ]
                                }));
                                dispatch(updateSaveButtonVisibility(true));
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Profile Image</label>
                        <ImageUploader 
                            slug={slug} 
                            onUploadSuccess={(imageUrl) => {
                                dispatch(updateCoupleInfoSection({
                                    ...value.children,
                                    couple: [
                                        {
                                            ...value.children.couple[0],
                                            imageUrl: imageUrl
                                        },
                                        value.children.couple[1]
                                    ]
                                }));
                                dispatch(updateSaveButtonVisibility(true));
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Enter Facebook link</label>
                        <InputText
                            value={value.children.couple[0].socialMedia[0].url}
                            onChange={(e) => {
                                dispatch(updateCoupleInfoSection({
                                    ...value.children,
                                    couple: [
                                        {
                                            ...value.children.couple[0],
                                            socialMedia: [
                                                {
                                                    ...value.children.couple[0].socialMedia[0],
                                                    url: e.target.value
                                                },
                                                ...value.children.couple[0].socialMedia.slice(1)
                                            ]
                                        }, {
                                            ...value.children.couple[1],
                                        }
                                    ]
                                }));
                                dispatch(updateSaveButtonVisibility(true));
                            }}
                            placeholder="Enter Facebook URL"
                        />
                        <label className="font-medium">Enter Twitter link</label>
                        <InputText
                            value={value.children.couple[0].socialMedia[1].url}
                            onChange={(e) => {
                                dispatch(updateCoupleInfoSection({
                                    ...value.children,
                                    couple: [
                                        {
                                            ...value.children.couple[0],
                                            socialMedia: [
                                                ...value.children.couple[0].socialMedia.slice(0, 1),
                                                {
                                                    ...value.children.couple[0].socialMedia[1],
                                                    url: e.target.value
                                                },
                                                ...value.children.couple[0].socialMedia.slice(2)
                                            ]
                                        }, {
                                            ...value.children.couple[1],
                                        }
                                    ]
                                }));
                                dispatch(updateSaveButtonVisibility(true));
                            }}
                            placeholder="Enter Twitter URL"
                        />
                        <label className="font-medium">Enter Instagram link</label>
                        <InputText
                            value={value.children.couple[0].socialMedia[2].url}
                            onChange={(e) => {
                                dispatch(updateCoupleInfoSection({
                                    ...value.children,
                                    couple: [
                                        {
                                            ...value.children.couple[0],
                                            socialMedia: [
                                                ...value.children.couple[0].socialMedia.slice(0, 2),
                                                {
                                                    ...value.children.couple[0].socialMedia[2],
                                                    url: e.target.value
                                                }
                                            ]
                                        }, {
                                            ...value.children.couple[1],
                                        }
                                    ]
                                }));
                                dispatch(updateSaveButtonVisibility(true));
                            }}
                            placeholder="Enter Instagram URL"
                        />
                    </div>

                </div>
            </div>

            {/* Groom Information */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Groom Information</h3>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Name</label>
                        <InputText
                            value={value.children.couple[1].name.text}
                            onChange={(e) => {
                                dispatch(updateCoupleInfoSection({
                                    ...value.children,
                                    couple: [
                                        {
                                            ...value.children.couple[0],
                                        }, {
                                            ...value.children.couple[1],
                                            name: {
                                                ...value.children.couple[1].name,
                                                text: e.target.value
                                            }
                                        }
                                    ]
                                }));
                                dispatch(updateSaveButtonVisibility(true));
                            }}
                            placeholder="Enter groom's name"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Description</label>
                        <InputTextarea
                            rows={4}
                            placeholder="Enter groom's description"
                            value={value.children.couple[1].description.text}
                            onChange={(e) => {
                                dispatch(updateCoupleInfoSection({
                                    ...value.children,
                                    couple: [
                                        {
                                            ...value.children.couple[0],
                                        }, {
                                            ...value.children.couple[1],
                                            description: {
                                                ...value.children.couple[1].description,
                                                text: e.target.value
                                            }
                                        }
                                    ]
                                }));
                                dispatch(updateSaveButtonVisibility(true));
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Profile Image dfgsdgf</label>
                        <ImageUploader 
                            slug={slug} 
                            onUploadSuccess={(imageUrl) => {
                                dispatch(updateCoupleInfoSection({
                                    ...value.children,
                                    couple: [
                                        value.children.couple[0],
                                        {
                                            ...value.children.couple[1],
                                            imageUrl: imageUrl
                                        }
                                    ]
                                }));
                                dispatch(updateSaveButtonVisibility(true));
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Enter Facebook link</label>
                        <InputText
                            value={value.children.couple[1].socialMedia[0].url}
                            onChange={(e) => {
                                dispatch(updateCoupleInfoSection({
                                    ...value.children,
                                    couple: [
                                        {
                                            ...value.children.couple[0],
                                        }, {
                                            ...value.children.couple[1],
                                            socialMedia: [
                                                {
                                                    ...value.children.couple[1].socialMedia[0],
                                                    url: e.target.value
                                                },
                                                ...value.children.couple[1].socialMedia.slice(1)
                                            ]
                                        }
                                    ]
                                }));
                                dispatch(updateSaveButtonVisibility(true));
                            }}
                            placeholder="Enter Facebook URL"
                        />
                        <label className="font-medium">Enter Twitter link</label>
                        <InputText
                            value={value.children.couple[1].socialMedia[1].url}
                            onChange={(e) => {
                                dispatch(updateCoupleInfoSection({
                                    ...value.children,
                                    couple: [
                                        {
                                            ...value.children.couple[0],
                                        }, {
                                            ...value.children.couple[1],
                                            socialMedia: [
                                                ...value.children.couple[1].socialMedia.slice(0, 1),
                                                {
                                                    ...value.children.couple[1].socialMedia[1],
                                                    url: e.target.value
                                                },
                                                ...value.children.couple[1].socialMedia.slice(2)
                                            ]
                                        }
                                    ]
                                }));
                                dispatch(updateSaveButtonVisibility(true));
                            }}
                            placeholder="Enter Twitter URL"
                        />
                        <label className="font-medium">Enter Instagram link</label>
                        <InputText
                            value={value.children.couple[1].socialMedia[2].url}
                            onChange={(e) => {
                                dispatch(updateCoupleInfoSection({
                                    ...value.children,
                                    couple: [
                                        {
                                            ...value.children.couple[0],
                                        }, {
                                            ...value.children.couple[1],
                                            socialMedia: [
                                                ...value.children.couple[1].socialMedia.slice(0, 2),
                                                {
                                                    ...value.children.couple[1].socialMedia[2],
                                                    url: e.target.value
                                                }
                                            ]
                                        }
                                    ]
                                }));
                                dispatch(updateSaveButtonVisibility(true));
                            }}
                            placeholder="Enter Instagram URL"
                        />
                    </div>

                </div>
            </div>

            {/* Bottom Section */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Title</label>
                        <InputText
                            value={value.children.bottomTitle.text}
                            onChange={(e) => {
                                dispatch(updateCoupleInfoSection({
                                    ...value.children,
                                    bottomTitle: {
                                        ...value.children.bottomTitle,
                                        text: e.target.value
                                    }
                                }));
                                dispatch(updateSaveButtonVisibility(true));
                            }}
                            placeholder="Enter bottom title"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Subtitle</label>
                        <InputText
                            value={value.children.bottomSubtitle.text}
                            onChange={(e) => {
                                dispatch(updateCoupleInfoSection({
                                    ...value.children,
                                    bottomSubtitle: {
                                        ...value.children.bottomSubtitle,
                                        text: e.target.value
                                    }
                                }));
                                dispatch(updateSaveButtonVisibility(true));
                            }}
                            placeholder="Enter bottom subtitle"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
