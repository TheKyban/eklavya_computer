"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import MobileMode from "@/components/Navbar/MobileMode";
import { Hover, HoverContent, HoverTrigger } from "@/components/hover";
import { LinkStyle, MAX_WIDTH } from "@/lib/styles";
import { singleLink } from "@/components/Navbar/urls";
import { TimeComponent } from "./Time";
import { IsAuth } from "./isAuth";
import Image from "next/image";
import { motion } from "framer-motion";
import { AccordionLinks } from "@/components/Navbar/urls";

const Navbar = () => {
    return (
        <div className="flex justify-center items-center dark:bg-transparent">
            {/* PC */}
            <div
                className={`hidden md:flex flex-col justify-between w-full ${MAX_WIDTH} shadow-xl`}
            >
                <div className="w-full h-full flex items-center justify-between px-3 gap-4 text-white text-xs font-semibold bg-[#026335]">
                    {/* Login  & Dasboard*/}
                    <IsAuth />

                    {singleLink.map((link, idx) => {
                        if (idx <= 4) {
                            return (
                                <Link
                                    key={link.title}
                                    href={link.link}
                                    className={LinkStyle}
                                >
                                    <span>{link.title}</span>
                                </Link>
                            );
                        }
                    })}
                    <TimeComponent />
                </div>

                {/* Banner */}
                <motion.div
                    whileInView={{
                        rotateX: 0,
                    }}
                    initial={{
                        rotateX: 90,
                    }}
                    transition={{
                        delay: 0.1,
                        duration: 1,
                    }}
                    className="relative w-[50vw] m-auto h-[120px] overflow-hidden"
                >
                    <Image
                        src={
                            "https://res.cloudinary.com/ddgjcyk0q/image/upload/v1712899947/ekavaya_assets/opflfl8pq0yfpeqj0kwc.jpg"
                        }
                        fill
                        alt="banner"
                    />
                </motion.div>

                <div className="w-full h-full flex items-center flex-wrap justify-between px-3 text-white text-xs font-bold bg-[#0B0D38] z-20">
                    {singleLink.map((link, idx) => {
                        if (idx >= 5) {
                            return (
                                <Link
                                    key={link.title}
                                    href={link.link}
                                    className={LinkStyle}
                                >
                                    <span>{link.title}</span>
                                </Link>
                            );
                        }
                    })}

                    {AccordionLinks.map((links, idx) => (
                        <Hover key={idx}>
                            <HoverTrigger>
                                <span>{links.name}</span>
                            </HoverTrigger>
                            <HoverContent>
                                <div className="flex flex-col gap-0">
                                    {links.links.map((link) => (
                                        <Link
                                            key={link.title}
                                            className={cn(LinkStyle)}
                                            href={link.link}
                                        >
                                            <link.icon className="w-4 h-4" />
                                            <span>{link.title}</span>
                                        </Link>
                                    ))}
                                </div>
                            </HoverContent>
                        </Hover>
                    ))}
                </div>
            </div>
            {/* MOBILE */}
            <MobileMode />
        </div>
    );
};

export default Navbar;
