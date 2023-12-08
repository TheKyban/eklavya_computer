import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC, HTMLAttributes } from "react";

/**
 * CARDS
 */
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    imgSrc: string;
    text: string;
}

export const Card: FC<CardProps> = ({ imgSrc, text, className, ...props }) => {
    return (
        <div
            className={cn(
                "w-[350px] h-fit flex flex-col gap-6 items-center justify-center bg-orange-200 rounded-xl px-4 py-3 text-center dark:bg-white/5",
                className
            )}
            {...props}
        >
            <Image
                src={imgSrc}
                width={400}
                height={0}
                alt="vector"
                className="object-cover w-full h-[180px]"
            />

            <p className="text-base font-medium text-zinc-700">{text}</p>
        </div>
    );
};
