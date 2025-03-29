import { SidebarButton } from "@/components/ui/commons/SidebarButton"

interface AppearanceOptionsProps {
    onNavigate: (title: string) => void;
}
const theme1AppearanceOptions=[{
    primary: "#E5D4BD",
    secondary: "#BD945A",
    tertiary: "#F6F1F0",
    quaternary: "#FAF8F7",

},
{
    primary: "#009D69",
    secondary: "#97C1B3",
    tertiary: "#F1FFFA",
    quaternary: "#F7FAF9",
},
{
    primary: "#A700B9",
    secondary: "#B98BBE",
    tertiary: "#FDECFF",
    quaternary: "#FEF5FF",
},
{
    primary: "#004BBC",
    secondary: "#7694C1",
    tertiary: "#E9F2FF",
    quaternary: "#F5F9FF",
}
];

export default function AppearanceOptions({ onNavigate }: AppearanceOptionsProps) {
    return (
        <div className="px-2 bg-white overflow-y-auto">
            <h1 className="font-semibold text-gray-700 mb-2">Appearance Options</h1>

            <div className="overflow-x-auto">
                <div className="flex space-x-6">
                    <div className="border w-full overflow-hidden rounded-md">
                        <SidebarButton onClick={() => onNavigate("Theme & Font")}>
                            Theme & Font
                        </SidebarButton>
                    </div>
                </div>
            </div>
        </div>
    )
}