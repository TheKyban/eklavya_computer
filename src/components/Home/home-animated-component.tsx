"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { FC, HTMLAttributes, ReactNode } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

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

export const HomeCarousel: FC<{
    carousel?: {
        secure_url: string;
    }[];
}> = ({ carousel }) => {
    return (
        <AnimationDiv
            animate={{
                x: 0,
                opacity: 1,
            }}
            initial={{
                opacity: 0,
                x: -100,
            }}
            transition={{
                delay: 0.4,
                duration: 0.6,
            }}
            className="w-full lg:w-[70%] "
        >
            <Carousel
                className="w-full h-[230px] sm:h-[450px] relative"
                plugins={[
                    Autoplay({
                        delay: 3000,
                        stopOnInteraction: false,
                    }),
                ]}
            >
                <CarouselContent>
                    {carousel?.map((image, idx) => (
                        <CarouselItem key={idx}>
                            <div className="relative w-full h-[230px] sm:h-[450px]">
                                <Image
                                    src={image.secure_url}
                                    fill
                                    alt={image.secure_url}
                                    className="object-fill w-full h-full"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </AnimationDiv>
    );
};
