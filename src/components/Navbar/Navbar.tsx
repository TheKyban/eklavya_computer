"use client";
import Link from "next/link";
import Image from "next/image";
import {
    LayoutDashboard,
    User,
    Users,
    Home,
    GraduationCap,
    LibraryBig,
    Download,
    Files,
    Album,
    BookUser,
    Computer,
    Database,
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import MobileMode from "@/components/Navbar/MobileMode";
import { Hover, HoverContent, HoverTrigger } from "@/components/hover";
import { LinkStyle, LinkStyle2, MAX_WIDTH } from "@/lib/styles";
import { DownloadFiles } from "@/lib/constants";
import { useSession } from "next-auth/react";

const Navbar = () => {
    const { status } = useSession();
    return (
        <div className="flex justify-center items-center dark:bg-transparent">
            {/* PC */}
            <div
                className={`hidden lg:flex justify-between py-2 w-full ${MAX_WIDTH} bg-red-500 px-3`}
            >
                {/* Logo */}
                <Image
                    priority
                    src={"/logomen.png"}
                    width={90}
                    height={0}
                    alt="logo"
                />

                <div className="flex items-center gap-4 text-white">
                    {/* Login  & Dasboard*/}
                    {status === "authenticated" ? (
                        <Link href="/dashboard" className={LinkStyle}>
                            <LayoutDashboard className="w-6 h-6" />
                            <span>Dashbord</span>
                        </Link>
                    ) : (
                        <Link href="/login" className={LinkStyle}>
                            <User className="w-6 h-6" />
                            <span>Login</span>
                        </Link>
                    )}

                    {/* Home */}
                    <Link href="/" className={LinkStyle}>
                        <Home className="w-6 h-6" />
                        <span>Home</span>
                    </Link>

                    {/* Franchise */}
                    <Link href="/franchise" className={LinkStyle}>
                        <Users className="w-6 h-6" />
                        <span>Franchise</span>
                    </Link>

                    {/* Course */}

                    <Link href={"/course"} className={LinkStyle}>
                        <LibraryBig className="w-4 h-4" />
                        <span>Course</span>
                    </Link>

                    {/* Student Zone */}
                    <Link href={"/studentzone"} className={LinkStyle}>
                        <GraduationCap className="w-4 h-4" />
                        <span className="">Student Zone</span>
                    </Link>

                    {/*
                     More
                        About
                        Download
                        Contact
                        Projects
                    
                    */}
                    <Hover>
                        <HoverTrigger>
                            <span>More</span>
                        </HoverTrigger>
                        <HoverContent className="bg-red-500">
                            <Accordion
                                type="single"
                                collapsible
                                className="gap-0"
                            >
                                {/* Download */}

                                <AccordionItem
                                    value="Download"
                                    className="hover:bg-primary/5 px-3 rounded-md m-0"
                                >
                                    <AccordionTrigger>
                                        <div className="flex gap-4 items-center">
                                            <Download className="w-4 h-4" />
                                            <span>Download</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
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
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Syllabus */}

                                <AccordionItem
                                    value="Projects"
                                    className="hover:bg-primary/5 px-3 rounded-md m-0"
                                >
                                    <AccordionTrigger>
                                        <div className="flex items-center gap-4">
                                            <Files className="w-4 h-4" />
                                            <span>Syllabus</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="flex flex-col">
                                            <Link
                                                className={LinkStyle}
                                                href={"#"}
                                            >
                                                <Database className="w-4 h-4" />
                                                <span>ADCA</span>
                                            </Link>
                                            <Link
                                                className={LinkStyle}
                                                href={"#"}
                                            >
                                                <Computer className="w-4 h-4" />
                                                <span className="">DCA</span>
                                            </Link>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                            {/* About us */}

                            <Link
                                className={cn(LinkStyle, LinkStyle2)}
                                href={"/about"}
                            >
                                <Album className="w-4 h-4" />
                                <span>About Us</span>
                            </Link>

                            {/* Contact us */}
                            <Link
                                className={cn(LinkStyle, LinkStyle2)}
                                href={"#contact"}
                            >
                                <BookUser className="w-4 h-4" />
                                <span className="">Contact Us</span>
                            </Link>
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
