"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { AnimationDiv } from "./home-animated-div";
import { useClients } from "@/hooks/useFetch";

const carousel_Image = [
    {
        url: "/carousel/squareBanner.jpg",
        alt: "banner",
    },
    {
        url: "/carousel/banner2.jpg",
        alt: "banner",
    },
    {
        url: "/carousel/msOffice.jpg",
        alt: "banner",
    },
    {
        url: "/carousel/keyboarBasics.jpg",
        alt: "banner",
    },
    {
        url: "/carousel/dca.jpg",
        alt: "banner",
    },
];

export const HomeCarousel = () => {
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
                    {carousel_Image.map((image, idx) => (
                        <CarouselItem key={idx}>
                            <div className="relative w-full h-[230px] sm:h-[450px]">
                                <Image
                                    src={image.url}
                                    fill
                                    alt={image.alt}
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

export const HomeFamily = () => {
    const { data, isLoading } = useClients();

    return (
        <AnimationDiv
            animate={{
                x: 0,
                opacity: 1,
            }}
            initial={{
                opacity: 0,
                x: 100,
            }}
            transition={{
                delay: 0.4,
                duration: 0.6,
            }}
            className="flex-1 relative max-h-[450px] w-full flex flex-col"
        >
            <h1 className="text-center bg-red-500 text-white uppercase text-2xl font-semibold py-2">
                Family
            </h1>
            {/* @ts-ignore */}
            <marquee direction="up">
                {isLoading && (
                    <div className="flex text-black items-center justify-center">
                        Loading...
                    </div>
                )}
                {data?.map(
                    (
                        user: {
                            img: string;
                            name: string;
                            branch: string;
                        },
                        idx: number
                    ) => (
                        <div
                            key={idx}
                            className="flex flex-col gap-2 mt-4 mb-4 items-center"
                        >
                            <Image
                                src={user.img}
                                width={100}
                                height={100}
                                alt="avatar"
                                placeholder="empty"
                                className="rounded-full object-cover min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px] lg:min-w-[100px] lg:min-h-[100px] lg:max-w-[100px] lg:max-h-[100px]"
                            />
                            <div className="flex flex-col gap-1 font-semibold items-center">
                                <span className="capitalize text-rose-800">
                                    {user.name}
                                </span>
                                <span className="capitalize text-orange-600">
                                    {user.branch}
                                </span>
                            </div>
                        </div>
                    )
                )}

                {/* @ts-ignore */}
            </marquee>
        </AnimationDiv>
    );
};