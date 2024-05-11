"use client";

import { FC } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { AnimationDiv } from "@/components/AnimatedDiv";

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
                duration: 0.6,
            }}
            className="w-full lg:max-w-xl"
        >
            <Carousel
                className="w-full h-[200px] md:h-[400px] lg:h-[300px] relative"
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
                            <div className="relative w-full h-[200px] md:h-[400px] lg:h-[300px]">
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
