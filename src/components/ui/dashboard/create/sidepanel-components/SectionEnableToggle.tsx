import { InputSwitch } from "primereact/inputswitch";
import { ReactNode } from "react";

interface SectionEnableToggleProps {
    children: ReactNode,
    checked?: boolean,
    onChange?: (checked: boolean) => void
}
export default function SectionEnableToggle(
    { children, checked: initialChecked, onChange }: SectionEnableToggleProps
) {
    const handleChange = (checked: boolean) => {
        if (onChange) {
            onChange(checked);
        }
    };
    return (
        <div className="w-full flex items-center justify-between font-semibold p-2.5 border border-gray-200 rounded-lg">
            {children}
            <InputSwitch checked={initialChecked || false} onChange={(e) => {
                // console.log(e.target.value)
                handleChange(e.value);
            }} />
        </div>
    );
}