"use client";
import Link from "next/link";
import { Computer, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import MobileMode from "@/components/Navbar/MobileMode";
import { Hover, HoverContent, HoverTrigger } from "@/components/hover";
import { LinkStyle, MAX_WIDTH } from "@/lib/styles";
import { DownloadFiles } from "@/lib/constants";
import { TimeComponent } from "./Time";
import { IsAuth } from "./isAuth";
import Image from "next/image";
import { motion } from "framer-motion";

const Navbar = () => {
    return (
        <div className="flex justify-center items-center dark:bg-transparent">
            {/* PC */}
            <div
                className={`hidden lg:flex flex-col justify-between w-full ${MAX_WIDTH} shadow-xl`}
            >
                <div className="w-full h-full flex items-center justify-between px-3 gap-4 text-white text-xs font-semibold bg-[#026335]">
                    {/* Login  & Dasboard*/}
                    <IsAuth />

                    {/* Home */}
                    <Link href="/" className={LinkStyle}>
                        <span>Home</span>
                    </Link>

                    {/* Franchise */}
                    <Link href="/franchise" className={LinkStyle}>
                        <span>Franchise</span>
                    </Link>

                    {/* Course */}

                    <Link href={"/course"} className={LinkStyle}>
                        <span>Course</span>
                    </Link>

                    {/* Student Zone */}
                    <Link href={"/studentzone"} className={LinkStyle}>
                        <span className="">Student Zone</span>
                    </Link>

                    {/* About us */}

                    <Link className={LinkStyle} href={"/about"}>
                        <span>About Us</span>
                    </Link>

                    {/* Contact us */}
                    {/* <Link className={LinkStyle} href={"#contact"}>
                        <span className="">Contact Us</span>
                    </Link> */}

                    {/* DOWNLOAD */}
                    {/* <Hover>
                        <HoverTrigger>
                            <span>Download</span>
                        </HoverTrigger>
                        <HoverContent className="bg-red-500">
                            <div className="flex flex-col gap-0">
                                {DownloadFiles?.map((file, i) => (
                                    <a
                                        key={i}
                                        className={cn(LinkStyle)}
                                        href={file.link}
                                        download={file.download}
                                    >
                                        <file.icon className="w-4 h-4" />
                                        <span>{file.title}</span>
                                    </a>
                                ))}
                            </div>
                        </HoverContent>
                    </Hover> */}

                    {/* Syllabus */}
                    {/* <Hover>
                        <HoverTrigger>
                            <span>Syllabus</span>
                        </HoverTrigger>
                        <HoverContent className="bg-red-500">
                            <div className="flex flex-col">
                                <Link className={LinkStyle} href={"#"}>
                                    <Database className="w-4 h-4" />
                                    <span>ADCA</span>
                                </Link>
                                <Link className={LinkStyle} href={"#"}>
                                    <Computer className="w-4 h-4" />
                                    <span className="">DCA</span>
                                </Link>
                            </div>
                        </HoverContent>
                    </Hover> */}

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
                    <Image src={"/banner.jpg"} fill alt="banner" />
                </motion.div>

                <div className="w-full h-full flex items-center justify-between px-3 gap-4 text-white text-xs font-bold bg-[#0B0D38] z-20">
                    {/* Home */}
                    <Link href="/" className={LinkStyle}>
                        <span>Home</span>
                    </Link>

                    {/* Home */}
                    <Link href="/" className={LinkStyle}>
                        <span>Addmission</span>
                    </Link>

                    {/* Franchise */}
                    <Link href="/franchise" className={LinkStyle}>
                        <span>Franchise Apply</span>
                    </Link>

                    {/* Course */}

                    <Link href={"/course"} className={LinkStyle}>
                        <span>Course</span>
                    </Link>

                    <Link href={"/course"} className={LinkStyle}>
                        <span>University Programs</span>
                    </Link>

                    {/* Affiliation */}

                    <Link className={LinkStyle} href={"/affiliation"}>
                        <span>Affiliation</span>
                    </Link>

                    {/* Contact us */}
                    <Link className={LinkStyle} href={"#contact"}>
                        <span className="">Contact Us</span>
                    </Link>

                    {/* DOWNLOAD */}
                    <Hover>
                        <HoverTrigger>
                            <span>Download</span>
                        </HoverTrigger>
                        <HoverContent className="bg-red-500">
                            <div className="flex flex-col gap-0">
                                {DownloadFiles?.map((file, i) => (
                                    <a
                                        key={i}
                                        className={cn(LinkStyle)}
                                        href={file.link}
                                        download={file.download}
                                    >
                                        <file.icon className="w-4 h-4" />
                                        <span>{file.title}</span>
                                    </a>
                                ))}
                            </div>
                        </HoverContent>
                    </Hover>

                    {/* Syllabus */}
                    <Hover>
                        <HoverTrigger>
                            <span>Syllabus</span>
                        </HoverTrigger>
                        <HoverContent className="bg-red-500">
                            <div className="flex flex-col">
                                <Link className={LinkStyle} href={"#"}>
                                    <Database className="w-4 h-4" />
                                    <span>ADCA</span>
                                </Link>
                                <Link className={LinkStyle} href={"#"}>
                                    <Computer className="w-4 h-4" />
                                    <span className="">DCA</span>
                                </Link>
                            </div>
                        </HoverContent>
                    </Hover>
                </div>
            </div>
            {/* MOBILE */}
            <MobileMode />
        </div>
    );
};

export default Navbar;
