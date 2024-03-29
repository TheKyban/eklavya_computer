import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";

interface HoverTypes extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

export const Hover: React.FC<HoverTypes> = ({ children, className }) => {
    return <div className={cn("relative group", className)}>{children}</div>;
};

export const HoverTrigger: React.FC<HoverTypes> = ({ children }) => {
    return (
        <div className="flex gap-2 items-center hover:bg-primary/10 px-3 py-2 rounded-md transition">
            {children}
            <ArrowDown className="w-4 h-4" />
        </div>
    );
};

export const HoverContent: React.FC<HoverTypes> = ({
    children,
    className,
    ...props
}) => {
    return (
        <div
            className={cn(
                "hidden z-20 transition-all flex-col absolute group-hover:flex shadow-md px-3 py-3 group-hover:border rounded-md bg-red-500 dark:bg-red-500 top-[102%]  w-fit min-w-[320px] right-10",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export const HoverList: React.FC<HoverTypes> = ({ children }) => {
    return (
        <div className="flex gap-2 items-center hover:bg-primary/10 px-3 py-2 rounded-md transition">
            {children}
        </div>
    );
};
