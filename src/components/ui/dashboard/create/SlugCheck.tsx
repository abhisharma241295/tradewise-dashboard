import { Dialog } from "primereact/dialog"
import CustomButton from "../../Button"
import { useState, useEffect } from "react"
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { toast } from "sonner";
import { useCheckWebsiteSlugQuery, useCreateWebsiteUrlMutation, useCreateWebsiteDataMutation } from "@/lib/redux/features/apis/websiteCreationApis";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { getCurrentWedding } from "@/lib/cookies/currentWeddingCookie";
import Theme1MappingValue from "@/components/custom-website-themes/mappings/theme1";
import { updateSlug } from "@/lib/redux/features/slices/custom-wedding-slices/customWebsiteSlugSlice";
// import { Theme1MappingValue } from "@/components/custom-website-themes/mappings/theme1";

interface Template {
    id: number;
    name: string;
    image: string;
    selected: boolean;
}

interface SlugCheckProps {
    visible: boolean
    onHide: () => void
}

export default function SlugCheck({ visible, onHide }: SlugCheckProps) {
    const [createEnabled, setCreateEnabled] = useState(false);
    const [slug, setSlug] = useState('');
    const [triggerSlug, setTriggerSlug] = useState('');
    const { data, isLoading: isChecking, error } = useCheckWebsiteSlugQuery(triggerSlug, {
        skip: !triggerSlug
    });

    const currentWeddingId =
        useAppSelector((state) => state.currentWedding.currentWeddingId) ??
        getCurrentWedding()
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        if (data) {
            // console.log(data);
            if (data.data.is_available) {
                setCreateEnabled(true);
                dispatch(updateSlug(slug));
                toast.success('Slug is available!');
            } else {
                setCreateEnabled(false);
                toast.error('This slug is already taken. Please try another one.');
            }
        }
        if (error) {
            toast.error('Failed to check slug availability');
            setCreateEnabled(false);
        }
    }, [data, error]);

    const [templates, setTemplates] = useState<Template[]>([
        {
            id: 1,
            name: 'Template 1',
            image: '/website-layout-images/theme1.png',
            selected: true,
        },
        {
            id: 2,
            name: 'Template 2',
            image: '/website-layout-images/theme2.png',
            selected: false,
        },
        {
            id: 3,
            name: 'Template 3',
            image: '/website-layout-images/theme3.png',
            selected: false,
        },
    ]);

    const handleSelect = (id: number) => {
        setTemplates(templates.map(template => ({
            ...template,
            selected: template.id === id
        })));
    };
    const [createWebsiteUrl,] = useCreateWebsiteUrlMutation();
    const [createWebsiteData] = useCreateWebsiteDataMutation();

    async function makeProjectWithSlug() {
        // throw new Error("Function not implemented.");
        try {
            const response = await createWebsiteUrl({ weddingId: currentWeddingId, websiteSlug: slug });
            if ('data' in response) {
                toast.success('Website URL created successfully');
                onHide();
            } else {
                toast.error('Failed to create website URL');
            }
        } catch (error) {
            console.error('Error creating website URL:', error);
            toast.error('An error occurred while creating the website URL');
        }

    }

    async function saveBoilerplateState() {
        try {
            const selectedTemplate = templates.find(template => template.selected);
            if (!selectedTemplate) {
                toast.error('Please select a template');
                return;
            }
            const templateData = {
                template_id: selectedTemplate.name.toString(),
                website_slug: slug,
                primary_font: Theme1MappingValue.primaryFont,
                secondary_font: Theme1MappingValue.secondaryFont,
                primary_color: Theme1MappingValue.primaryColor, // default color
                secondary_color: Theme1MappingValue.secondaryColor, // default color
                template_json_content: Theme1MappingValue.sections.map(section => ({
                    section_id: section.name,
                    children: section.children
                })),
                custom_utils: {
                    tertiaryColor: Theme1MappingValue.custom_utils.tertiaryColor,
                    quaternaryColor: Theme1MappingValue.custom_utils.quaternaryColor,
                    tertiaryFont: Theme1MappingValue.custom_utils.tertiaryFont
                }
            };
            console.log("SHASHANK2", templateData)

            const response = await createWebsiteData({
                weddingId: currentWeddingId,
                data: templateData
            });

            if ('data' in response) {
                toast.success('Website template created successfully');
                onHide();
            } else {
                toast.error('Failed to create website template');
            }
        } catch (error) {
            console.error('Error creating website template:', error);
            toast.error('An error occurred while creating the website template');
        }
    }

    return (<Dialog
        draggable={false}
        visible={visible}
        onHide={onHide}
        className="w-full max-w-xl"
        header="Get started with template"
    >
        <p className="mb-6 border-t px-2 pt-4">
            Seems like you haven't created a website yet. Please choose a template and identifier to get started.
        </p>

        <div className="px-2">
            <div className="grid grid-cols-2 gap-4">
                {templates.map((template) => (
                    <div key={template.id} className="relative">
                        <div
                            className={`rounded-lg overflow-hidden cursor-pointer border-2 transition-all
                    ${template.selected ? 'border-blue-500' : 'border-gray-200'}`}
                            onClick={() => handleSelect(template.id)}
                        >
                            <img
                                src={template.image}
                                alt={template.name}
                                className="w-full h-32 object-cover"
                            />
                        </div>

                        <div className="flex items-center mt-3">
                            <div
                                className={`w-5 h-5 rounded-full border-2 mr-2 flex items-center justify-center
                      ${template.selected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}
                            >
                                {template.selected && (
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                )}
                            </div>
                            <span className="text-sm text-gray-700">{template.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="px-2">
            <div className="my-4 flex space-x-2">
                <InputText
                    placeholder="Enter your website slug"
                    className="w-full"
                    value={slug}
                    onChange={(e) => {
                        const slug = e.currentTarget.value
                        setSlug(slug)
                        setCreateEnabled(false)
                    }}
                />
                <CustomButton
                    size="sm"
                    className="!bg-primary !text-white whitespace-nowrap"
                    disabled={isChecking || !slug.trim()}
                    onClick={() => {
                        setTriggerSlug(slug);
                    }}
                >
                    {isChecking ? 'Checking...' : 'Check'}
                </CustomButton>
            </div>
        </div>


        <div className="flex justify-end space-x-4 border-t pt-4 mt-4">
            <CustomButton
                size="sm"
                disabled={!createEnabled}
                className="!hover:bg-primary rounded-[8px] !border-primary !bg-primary px-6 py-2 !font-medium"
                onClick={async () => {
                    await makeProjectWithSlug();
                    await saveBoilerplateState();
                    // onHide()
                }}
            >
                Start
            </CustomButton>
        </div>
    </Dialog>)
}