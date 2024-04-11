"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
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
import { DownloadFiles } from "@/lib/constants";
import { LinkStyle, LinkStyle2, LinkStyle3 } from "@/lib/styles";
import { useSession } from "next-auth/react";

const MobileMode = () => {
    const [open, setOpen] = useState(false);
    const { status } = useSession();
    const isAuth = status === "authenticated" ? true : false;

    return (
        <div className="md:hidden w-full flex justify-around bg-orange-50">
            <Image
                priority
                src={"/banner.jpg"}
                width={500}
                height={50}
                alt="logo"
                className="w-full h-auto max-h-20 object-fill shadow-2xl"
            />
            <div className="flex gap-5 items-center justify-center">
                <Sheet open={open} onOpenChange={(val) => setOpen(val)}>
                    <SheetTrigger asChild>
                        <Button
                            variant={"outline"}
                            size={"sm"}
                            className="py-5 px-3 drop-shadow-md"
                            suppressHydrationWarning
                        >
                            <Menu className="h-[1.2rem] w-[1.2rem] text-red-700" />
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
                                    href="/"
                                    onClick={() => setOpen(!open)}
                                    className={LinkStyle3}
                                >
                                    <GraduationCap className="w-4 h-4" />
                                    <span>Addmission</span>
                                </Link>

                                {/* Franchise */}
                                <Link
                                    href="/franchise"
                                    onClick={() => setOpen(!open)}
                                    className={LinkStyle3}
                                >
                                    <Users className="w-4 h-4" />
                                    <span>Franchise Apply</span>
                                </Link>

                                <Link
                                    href={"/university"}
                                    className={LinkStyle3}
                                    onClick={() => setOpen(!open)}
                                >
                                    <GraduationCap className="w-4 h-4" />
                                    <span>University Programs</span>
                                </Link>

                                {/* Affiliation */}

                                <Link
                                    className={LinkStyle3}
                                    href={"/affiliation"}
                                    onClick={() => setOpen(!open)}
                                >
                                    <LibraryBig className="w-4 h-4" />
                                    <span>Affiliation</span>
                                </Link>
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
                                    href={"#contact"}
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
