import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { FC, HTMLAttributes } from "react";

/**
 * ICONS
 */
interface IconProp extends HTMLAttributes<HTMLDivElement> {
    text: string;
    number: string;
    Icon: LucideIcon;
    color: "zinc" | "orange";
}
export const Icon: FC<IconProp> = ({ text, number, Icon, color, ...props }) => {
    return (
        <div className="flex flex-col items-center select-none " {...props}>
            <div className="flex flex-col items-center">
                <Icon
                    className={cn(
                        "w-10 h-10 md:w-16 md:h-16 select-none",
                        color === "zinc"
                            ? "text-zinc-600 dark:text-yellow-500"
                            : "text-orange-600 dark:text-cyan-400"
                    )}
                />
                <span
                    className={cn(
                        "font-medium uppercase",
                        color === "zinc"
                            ? "text-zinc-600 dark:text-yellow-500"
                            : "text-orange-600 dark:text-cyan-400"
                    )}
                >
                    {text}
                </span>
            </div>
            <span
                className={cn(
                    "text-3xl font-semibold",
                    color === "zinc"
                        ? "text-zinc-600 dark:text-yellow-500"
                        : "text-orange-600 dark:text-cyan-400"
                )}
            >
                {number}
            </span>
        </div>
    );
};
