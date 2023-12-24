"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ThemeTogggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Album,
    BookUser,
    Computer,
    Database,
    Download,
    Files,
    GraduationCap,
    Home,
    LayoutDashboard,
    LibraryBig,
    Menu,
    User,
    Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    DownloadFiles,
    LinkStyle,
    LinkStyle2,
    LinkStyle3,
} from "@/lib/constants";

const MobileMode = ({ isAuth }: { isAuth: boolean }) => {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) return null;
    return (
        <div className="lg:hidden w-full flex justify-around py-5">
            <div>
                <Image
                    priority
                    src={"/logomen.png"}
                    width={80}
                    height={0}
                    alt="logo"
                />
            </div>
            <div className="flex gap-5 items-center justify-center">
                <ModeToggle />

                <Sheet open={open} onOpenChange={(val) => setOpen(val)}>
                    <SheetTrigger asChild>
                        <Button
                            variant={"outline"}
                            size={"sm"}
                            className="py-5 px-3"
                            suppressHydrationWarning
                        >
                            <Menu className="h-[1.2rem] w-[1.2rem]" />
                            <span className="sr-only">Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side={"left"}
                        className="flex flex-col gap-0 pt-16"
                    >
                        <ScrollArea>
                            <div className="flex flex-col">
                                <Link
                                    className={LinkStyle3}
                                    href={"/"}
                                    onClick={() => setOpen(!open)}
                                >
                                    <Home className="w-4 h-4" />{" "}
                                    <span>Home</span>
                                </Link>

                                {isAuth ? (
                                    <Link
                                        className={LinkStyle3}
                                        href={"/dashboard"}
                                        onClick={() => setOpen(!open)}
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        <span>Dashbord</span>
                                    </Link>
                                ) : (
                                    <Link
                                        className={LinkStyle3}
                                        href={"/login"}
                                        onClick={() => setOpen(!open)}
                                    >
                                        <User className="w-4 h-4" />
                                        <span>Login</span>
                                    </Link>
                                )}

                                <Link
                                    className={LinkStyle3}
                                    href={"/franchise"}
                                    onClick={() => setOpen(!open)}
                                >
                                    <Users className="w-4 h-4" />
                                    <span>Franchise</span>
                                </Link>
                                <Link
                                    className={LinkStyle3}
                                    href={"/studentzone"}
                                    onClick={() => setOpen(!open)}
                                >
                                    <GraduationCap className="w-4 h-4" />
                                    <span>Student Zone</span>
                                </Link>
                                <Link
                                    className={LinkStyle3}
                                    onClick={() => setOpen(!open)}
                                    href={"/course"}
                                >
                                    <LibraryBig className="w-4 h-4" />
                                    <span>Course</span>
                                </Link>

                                <Link
                                    className={LinkStyle3}
                                    href={"/about"}
                                    onClick={() => setOpen(!open)}
                                >
                                    <Album className="w-4 h-4" />
                                    <span>About Us</span>
                                </Link>
                                <Link
                                    className={LinkStyle3}
                                    href={"/contact"}
                                    onClick={() => setOpen(!open)}
                                >
                                    <BookUser className="w-4 h-4" />
                                    <span>Contact Us</span>
                                </Link>
                            </div>

                            <Accordion type="single" collapsible className="">
                                <AccordionItem
                                    value="download"
                                    className="hover:bg-primary/10 px-3  rounded-md"
                                >
                                    <AccordionTrigger>
                                        <div className="flex items-center gap-3 text-lg">
                                            <Download className="w-4 h-4" />
                                            <span>Download</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <AccordionContent>
                                            <div className="flex flex-col gap-0">
                                                {DownloadFiles?.map(
                                                    (file, i) => (
                                                        <a
                                                            key={i}
                                                            className={cn(
                                                                LinkStyle,
                                                                LinkStyle2
                                                            )}
                                                            href={file.link}
                                                            download={
                                                                file.download
                                                            }
                                                        >
                                                            <file.icon className="w-4 h-4" />
                                                            <span>
                                                                {file.title}
                                                            </span>
                                                        </a>
                                                    )
                                                )}
                                            </div>
                                        </AccordionContent>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem
                                    value="Project"
                                    className="hover:bg-primary/10 px-3  rounded-md"
                                >
                                    <AccordionTrigger>
                                        <div className="flex items-center gap-3 text-lg">
                                            <Files className="w-4 h-4" />
                                            <span>Syllabus</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="flex flex-col gap-0">
                                            <Link
                                                className="text-base font-medium flex items-center gap-4 hover:bg-primary/10 py-4 px-3 rounded hover:underline"
                                                href={"#"}
                                            >
                                                <Database className="w-4 h-4" />
                                                <span>ADCA</span>
                                            </Link>
                                            <Link
                                                className="text-base font-medium flex items-center gap-4 hover:bg-primary/10 py-4 px-3 rounded hover:underline"
                                                href={"#"}
                                            >
                                                <Computer className="w-4 h-4" />
                                                <span className="">DCA</span>
                                            </Link>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </ScrollArea>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};

export default MobileMode;
