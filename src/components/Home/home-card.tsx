"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC, HTMLAttributes, forwardRef } from "react";
import { motion } from "framer-motion";

/**
 * CARDS
 */
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    imgSrc: string;
    text: string;
}

export const Card: FC<CardProps> = ({ imgSrc, text, className }) => {
    const animations = {
        whileInView: {
            x: 0,
            y: 0,
            opacity: 1,
        },
        one: {
            opacity: 0,
            y: 50,
        },
    };
    return (
        <motion.div
            className={cn(
                "w-[350px] h-fit flex flex-col gap-6 items-center justify-center bg-orange-200 rounded-xl px-4 py-3 text-center dark:bg-white/5",
                className
            )}
            whileInView={animations.whileInView}
            initial={animations.one}
        >
            <Image
                src={imgSrc}
                width={400}
                height={0}
                alt="vector"
                className="object-cover w-full h-[180px]"
            />

            <p className="text-base font-medium text-zinc-700">{text}</p>
        </motion.div>
    );
};
