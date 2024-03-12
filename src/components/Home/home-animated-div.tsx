"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { FC, HTMLAttributes, ReactNode } from "react";

interface CustomMotionDivProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    whileInView?: { x?: number; y?: number; opacity?: number; scale?: number };
    initial?: { x?: number; y?: number; opacity?: number; scale?: number };
    transition?: {
        delay?: number;
        duration?: number;
    };
    animate?: {
        scale?: number;
        opacity?: number;
        x?: number;
        y?: number;
    };
}

export const AnimationDiv: FC<CustomMotionDivProps> = ({
    children,
    initial,
    whileInView,
    transition,
    animate,
    className,
}) => {
    return (
        <motion.div
            initial={initial}
            whileInView={whileInView}
            transition={{
                type: "tween",
                ...transition,
            }}
            viewport={{
                once: true,
            }}
            animate={animate}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
};
