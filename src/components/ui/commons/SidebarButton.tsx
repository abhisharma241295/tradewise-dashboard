import { ChevronRight } from "lucide-react";
import { FC, ReactNode } from "react";

export interface SidebarButtonProps {
    children: ReactNode;
    onClick?: () => void;
}

export const SidebarButton: FC<SidebarButtonProps> = ({ children, onClick }) => {
    return (
        <div
            className="w-full flex items-center justify-between font-semibold p-2.5 cursor-pointer hover:bg-secondary"
            onClick={onClick}
        >
            {children}
            <ChevronRight size={16} />
        </div>
    );
};