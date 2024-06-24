"use client";
import { FC } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { motion } from "framer-motion";

export const HomeCarousel: FC<{
    carousel?: {
        url: string;
    }[];
}> = ({ carousel }) => {
    return (
        <motion.div
            animate={{
                x: 0,
                opacity: 1,
            }}
            initial={{
                opacity: 0,
                x: -100,
            }}
            transition={{
                duration: 0.6,
            }}
            className="w-full"
        >
            <Carousel
                className="w-full h-[250px] sm:h-[400px] lg:h-[75vh] lg:max-h-[600px] relative"
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
                            <div className="relative w-full h-[250px] sm:h-[400px] lg:h-[75vh] lg:max-h-[600px]">
                                <Image
                                    src={image.url}
                                    fill
                                    alt={image.url}
                                    className="object-fill w-full h-full"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </motion.div>
    );
};
